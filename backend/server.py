from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
from bson import ObjectId


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Blog Models
class BlogPost(BaseModel):
    id: Optional[str] = None
    title: str
    category: str
    date: datetime = Field(default_factory=datetime.utcnow)
    excerpt: str
    content: str
    tags: List[str] = Field(default_factory=list)
    readTime: str = "5 min read"
    author: str = "[Your Name]"

class BlogPostCreate(BaseModel):
    title: str
    category: str
    excerpt: str
    content: str
    tags: List[str] = Field(default_factory=list)
    readTime: Optional[str] = "5 min read"
    author: Optional[str] = "[Your Name]"

class BlogPostUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    tags: Optional[List[str]] = None
    readTime: Optional[str] = None

# Contact Form Models
class ContactSubmission(BaseModel):
    id: Optional[str] = None
    name: str
    email: str
    subject: str
    message: str
    type: str = "general"
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class ContactSubmissionCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str
    type: str = "general"

# Helper function to convert ObjectId to string
def blog_post_helper(post) -> dict:
    if post:
        post["id"] = str(post["_id"])
        del post["_id"]
    return post

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Academic Portfolio API"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Blog Post Routes
@api_router.get("/blog/posts", response_model=List[BlogPost])
async def get_blog_posts(category: Optional[str] = None, limit: Optional[int] = None):
    """Get all blog posts, optionally filtered by category"""
    query = {}
    if category and category != "All":
        query["category"] = category
    
    posts_cursor = db.blog_posts.find(query).sort("date", -1)
    if limit:
        posts_cursor = posts_cursor.limit(limit)
    
    posts = await posts_cursor.to_list(1000)
    return [blog_post_helper(post) for post in posts]

@api_router.get("/blog/posts/{post_id}", response_model=BlogPost)
async def get_blog_post(post_id: str):
    """Get a specific blog post by ID"""
    try:
        post = await db.blog_posts.find_one({"_id": ObjectId(post_id)})
        if post:
            return blog_post_helper(post)
        raise HTTPException(status_code=404, detail="Blog post not found")
    except Exception as e:
        raise HTTPException(status_code=404, detail="Blog post not found")

@api_router.post("/blog/posts", response_model=BlogPost)
async def create_blog_post(post: BlogPostCreate):
    """Create a new blog post"""
    post_dict = post.dict()
    post_dict["date"] = datetime.utcnow()
    
    result = await db.blog_posts.insert_one(post_dict)
    new_post = await db.blog_posts.find_one({"_id": result.inserted_id})
    
    return blog_post_helper(new_post)

@api_router.put("/blog/posts/{post_id}", response_model=BlogPost)
async def update_blog_post(post_id: str, post: BlogPostUpdate):
    """Update a blog post"""
    try:
        update_data = {k: v for k, v in post.dict().items() if v is not None}
        if update_data:
            await db.blog_posts.update_one(
                {"_id": ObjectId(post_id)}, 
                {"$set": update_data}
            )
        
        updated_post = await db.blog_posts.find_one({"_id": ObjectId(post_id)})
        if updated_post:
            return blog_post_helper(updated_post)
        raise HTTPException(status_code=404, detail="Blog post not found")
    except Exception as e:
        raise HTTPException(status_code=404, detail="Blog post not found")

@api_router.delete("/blog/posts/{post_id}")
async def delete_blog_post(post_id: str):
    """Delete a blog post"""
    try:
        result = await db.blog_posts.delete_one({"_id": ObjectId(post_id)})
        if result.deleted_count:
            return {"message": "Blog post deleted successfully"}
        raise HTTPException(status_code=404, detail="Blog post not found")
    except Exception as e:
        raise HTTPException(status_code=404, detail="Blog post not found")

@api_router.get("/blog/categories")
async def get_blog_categories():
    """Get all unique blog categories"""
    categories = await db.blog_posts.distinct("category")
    return {"categories": categories}

# Contact Form Routes
@api_router.post("/contact", response_model=ContactSubmission)
async def submit_contact_form(contact: ContactSubmissionCreate):
    """Submit contact form"""
    contact_dict = contact.dict()
    contact_dict["timestamp"] = datetime.utcnow()
    
    result = await db.contact_submissions.insert_one(contact_dict)
    new_submission = await db.contact_submissions.find_one({"_id": result.inserted_id})
    
    if new_submission:
        new_submission["id"] = str(new_submission["_id"])
        del new_submission["_id"]
    
    return new_submission

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
