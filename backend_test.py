#!/usr/bin/env python3
"""
Comprehensive Backend API Tests for Academic Portfolio Blog
Tests all CRUD operations, filtering, error handling, and database integration
"""

import requests
import json
import time
from datetime import datetime
from typing import Dict, List, Optional

# Backend URL from frontend/.env
BACKEND_URL = "https://3fb29ce3-8fd4-4160-86de-dc195e97b05f.preview.emergentagent.com/api"

class BlogAPITester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.created_posts = []  # Track created posts for cleanup
        self.test_results = {
            "passed": 0,
            "failed": 0,
            "errors": []
        }
    
    def log_result(self, test_name: str, success: bool, message: str = ""):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name}")
        if message:
            print(f"   {message}")
        
        if success:
            self.test_results["passed"] += 1
        else:
            self.test_results["failed"] += 1
            self.test_results["errors"].append(f"{test_name}: {message}")
    
    def test_health_check(self):
        """Test basic health check endpoint"""
        print("\n=== Testing Health Check ===")
        try:
            response = requests.get(f"{self.base_url}/")
            if response.status_code == 200:
                data = response.json()
                if data.get("message") == "Academic Portfolio API":
                    self.log_result("Health Check", True, "API is responding correctly")
                else:
                    self.log_result("Health Check", False, f"Unexpected response: {data}")
            else:
                self.log_result("Health Check", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_result("Health Check", False, f"Connection error: {str(e)}")
    
    def test_create_blog_posts(self):
        """Test creating various blog posts"""
        print("\n=== Testing Blog Post Creation ===")
        
        test_posts = [
            {
                "title": "Machine Learning Applications in Climate Science",
                "category": "Research",
                "excerpt": "Exploring how deep learning models can improve climate prediction accuracy and help understand complex environmental patterns.",
                "content": "Climate science has always been a data-intensive field, but recent advances in machine learning are revolutionizing how we analyze and predict climate patterns. In this research, we explore the application of deep neural networks to improve the accuracy of climate models...",
                "tags": ["machine-learning", "climate-science", "deep-learning", "research"],
                "readTime": "8 min read",
                "author": "Dr. Sarah Chen"
            },
            {
                "title": "My Journey from Academia to Tech Industry",
                "category": "Personal",
                "excerpt": "Reflections on transitioning from academic research to working in the technology sector, including challenges and lessons learned.",
                "content": "After spending six years in academic research, I made the decision to transition to the tech industry. This journey has been both challenging and rewarding, offering new perspectives on how research can be applied in commercial settings...",
                "tags": ["career", "academia", "tech-industry", "personal-growth"],
                "readTime": "6 min read",
                "author": "Dr. Sarah Chen"
            },
            {
                "title": "The Future of Quantum Computing in Cryptography",
                "category": "Industry",
                "excerpt": "An analysis of how quantum computing advancements will impact current cryptographic methods and what the industry needs to prepare for.",
                "content": "Quantum computing represents one of the most significant technological advances of our time, with profound implications for cybersecurity and cryptography. As quantum computers become more powerful, traditional encryption methods face unprecedented challenges...",
                "tags": ["quantum-computing", "cryptography", "cybersecurity", "technology"],
                "readTime": "10 min read",
                "author": "Dr. Sarah Chen"
            },
            {
                "title": "New Breakthrough in Renewable Energy Storage",
                "category": "News",
                "excerpt": "Recent developments in battery technology show promising results for large-scale renewable energy storage solutions.",
                "content": "Researchers at MIT have announced a significant breakthrough in battery technology that could revolutionize how we store renewable energy. The new lithium-metal batteries show 90% efficiency over 10,000 charge cycles...",
                "tags": ["renewable-energy", "battery-technology", "sustainability", "innovation"],
                "readTime": "5 min read",
                "author": "Dr. Sarah Chen"
            }
        ]
        
        for i, post_data in enumerate(test_posts):
            try:
                response = requests.post(f"{self.base_url}/blog/posts", json=post_data)
                if response.status_code == 200:
                    created_post = response.json()
                    self.created_posts.append(created_post["id"])
                    self.log_result(f"Create Blog Post {i+1}", True, f"Created post: {post_data['title'][:50]}...")
                else:
                    self.log_result(f"Create Blog Post {i+1}", False, f"Status: {response.status_code}, Response: {response.text}")
            except Exception as e:
                self.log_result(f"Create Blog Post {i+1}", False, f"Error: {str(e)}")
    
    def test_get_all_posts(self):
        """Test retrieving all blog posts"""
        print("\n=== Testing Get All Blog Posts ===")
        try:
            response = requests.get(f"{self.base_url}/blog/posts")
            if response.status_code == 200:
                posts = response.json()
                if isinstance(posts, list) and len(posts) > 0:
                    self.log_result("Get All Posts", True, f"Retrieved {len(posts)} posts")
                    
                    # Verify post structure
                    first_post = posts[0]
                    required_fields = ["id", "title", "category", "excerpt", "content", "tags", "readTime", "author", "date"]
                    missing_fields = [field for field in required_fields if field not in first_post]
                    
                    if not missing_fields:
                        self.log_result("Post Structure Validation", True, "All required fields present")
                    else:
                        self.log_result("Post Structure Validation", False, f"Missing fields: {missing_fields}")
                else:
                    self.log_result("Get All Posts", False, "No posts returned or invalid format")
            else:
                self.log_result("Get All Posts", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_result("Get All Posts", False, f"Error: {str(e)}")
    
    def test_get_posts_with_filters(self):
        """Test retrieving posts with category filters and limits"""
        print("\n=== Testing Blog Post Filtering ===")
        
        # Test category filtering
        categories = ["Research", "Personal", "Industry", "News"]
        for category in categories:
            try:
                response = requests.get(f"{self.base_url}/blog/posts?category={category}")
                if response.status_code == 200:
                    posts = response.json()
                    if isinstance(posts, list):
                        # Verify all posts have the correct category
                        correct_category = all(post.get("category") == category for post in posts)
                        if correct_category:
                            self.log_result(f"Filter by {category}", True, f"Found {len(posts)} posts")
                        else:
                            self.log_result(f"Filter by {category}", False, "Some posts have incorrect category")
                    else:
                        self.log_result(f"Filter by {category}", False, "Invalid response format")
                else:
                    self.log_result(f"Filter by {category}", False, f"Status: {response.status_code}")
            except Exception as e:
                self.log_result(f"Filter by {category}", False, f"Error: {str(e)}")
        
        # Test limit parameter
        try:
            response = requests.get(f"{self.base_url}/blog/posts?limit=2")
            if response.status_code == 200:
                posts = response.json()
                if isinstance(posts, list) and len(posts) <= 2:
                    self.log_result("Limit Parameter", True, f"Returned {len(posts)} posts (limit=2)")
                else:
                    self.log_result("Limit Parameter", False, f"Expected ≤2 posts, got {len(posts) if isinstance(posts, list) else 'invalid'}")
            else:
                self.log_result("Limit Parameter", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_result("Limit Parameter", False, f"Error: {str(e)}")
    
    def test_get_single_post(self):
        """Test retrieving a single blog post by ID"""
        print("\n=== Testing Get Single Blog Post ===")
        
        if not self.created_posts:
            self.log_result("Get Single Post", False, "No posts available for testing")
            return
        
        post_id = self.created_posts[0]
        try:
            response = requests.get(f"{self.base_url}/blog/posts/{post_id}")
            if response.status_code == 200:
                post = response.json()
                if post.get("id") == post_id:
                    self.log_result("Get Single Post", True, f"Retrieved post: {post.get('title', 'Unknown')[:50]}...")
                else:
                    self.log_result("Get Single Post", False, "Post ID mismatch")
            else:
                self.log_result("Get Single Post", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_result("Get Single Post", False, f"Error: {str(e)}")
        
        # Test with invalid ID
        try:
            response = requests.get(f"{self.base_url}/blog/posts/invalid_id_123")
            if response.status_code == 404:
                self.log_result("Get Single Post - Invalid ID", True, "Correctly returned 404 for invalid ID")
            else:
                self.log_result("Get Single Post - Invalid ID", False, f"Expected 404, got {response.status_code}")
        except Exception as e:
            self.log_result("Get Single Post - Invalid ID", False, f"Error: {str(e)}")
    
    def test_update_blog_post(self):
        """Test updating blog posts"""
        print("\n=== Testing Blog Post Updates ===")
        
        if not self.created_posts:
            self.log_result("Update Blog Post", False, "No posts available for testing")
            return
        
        post_id = self.created_posts[0]
        update_data = {
            "title": "Updated: Machine Learning Applications in Climate Science",
            "excerpt": "Updated excerpt: Exploring how deep learning models can improve climate prediction accuracy.",
            "tags": ["machine-learning", "climate-science", "deep-learning", "research", "updated"]
        }
        
        try:
            response = requests.put(f"{self.base_url}/blog/posts/{post_id}", json=update_data)
            if response.status_code == 200:
                updated_post = response.json()
                if updated_post.get("title") == update_data["title"]:
                    self.log_result("Update Blog Post", True, "Post updated successfully")
                else:
                    self.log_result("Update Blog Post", False, "Post not updated correctly")
            else:
                self.log_result("Update Blog Post", False, f"Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_result("Update Blog Post", False, f"Error: {str(e)}")
        
        # Test update with invalid ID
        try:
            response = requests.put(f"{self.base_url}/blog/posts/invalid_id_123", json=update_data)
            if response.status_code == 404:
                self.log_result("Update Blog Post - Invalid ID", True, "Correctly returned 404 for invalid ID")
            else:
                self.log_result("Update Blog Post - Invalid ID", False, f"Expected 404, got {response.status_code}")
        except Exception as e:
            self.log_result("Update Blog Post - Invalid ID", False, f"Error: {str(e)}")
    
    def test_get_categories(self):
        """Test retrieving blog categories"""
        print("\n=== Testing Get Blog Categories ===")
        try:
            response = requests.get(f"{self.base_url}/blog/categories")
            if response.status_code == 200:
                data = response.json()
                if "categories" in data and isinstance(data["categories"], list):
                    categories = data["categories"]
                    expected_categories = {"Research", "Personal", "Industry", "News"}
                    found_categories = set(categories)
                    
                    if expected_categories.issubset(found_categories):
                        self.log_result("Get Categories", True, f"Found categories: {categories}")
                    else:
                        missing = expected_categories - found_categories
                        self.log_result("Get Categories", False, f"Missing categories: {missing}")
                else:
                    self.log_result("Get Categories", False, "Invalid response format")
            else:
                self.log_result("Get Categories", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_result("Get Categories", False, f"Error: {str(e)}")
    
    def test_contact_form(self):
        """Test contact form submission"""
        print("\n=== Testing Contact Form ===")
        
        contact_data = {
            "name": "Dr. Michael Rodriguez",
            "email": "m.rodriguez@university.edu",
            "subject": "Collaboration Opportunity",
            "message": "Hello, I'm interested in discussing potential collaboration opportunities on climate science research. I've read your recent paper on machine learning applications and would love to explore how our research groups might work together.",
            "type": "collaboration"
        }
        
        try:
            response = requests.post(f"{self.base_url}/contact", json=contact_data)
            if response.status_code == 200:
                submission = response.json()
                required_fields = ["id", "name", "email", "subject", "message", "type", "timestamp"]
                missing_fields = [field for field in required_fields if field not in submission]
                
                if not missing_fields:
                    self.log_result("Contact Form Submission", True, f"Contact form submitted successfully")
                else:
                    self.log_result("Contact Form Submission", False, f"Missing fields in response: {missing_fields}")
            else:
                self.log_result("Contact Form Submission", False, f"Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_result("Contact Form Submission", False, f"Error: {str(e)}")
        
        # Test with missing required fields
        invalid_contact = {"name": "Test User"}  # Missing required fields
        try:
            response = requests.post(f"{self.base_url}/contact", json=invalid_contact)
            if response.status_code == 422:  # FastAPI validation error
                self.log_result("Contact Form - Invalid Data", True, "Correctly rejected invalid contact data")
            else:
                self.log_result("Contact Form - Invalid Data", False, f"Expected 422, got {response.status_code}")
        except Exception as e:
            self.log_result("Contact Form - Invalid Data", False, f"Error: {str(e)}")
    
    def test_delete_blog_post(self):
        """Test deleting blog posts"""
        print("\n=== Testing Blog Post Deletion ===")
        
        if not self.created_posts:
            self.log_result("Delete Blog Post", False, "No posts available for testing")
            return
        
        # Delete the last created post
        post_id = self.created_posts.pop()
        
        try:
            response = requests.delete(f"{self.base_url}/blog/posts/{post_id}")
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "deleted" in data["message"].lower():
                    self.log_result("Delete Blog Post", True, "Post deleted successfully")
                else:
                    self.log_result("Delete Blog Post", False, f"Unexpected response: {data}")
            else:
                self.log_result("Delete Blog Post", False, f"Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_result("Delete Blog Post", False, f"Error: {str(e)}")
        
        # Verify post is actually deleted
        try:
            response = requests.get(f"{self.base_url}/blog/posts/{post_id}")
            if response.status_code == 404:
                self.log_result("Verify Post Deletion", True, "Post correctly removed from database")
            else:
                self.log_result("Verify Post Deletion", False, f"Post still exists, status: {response.status_code}")
        except Exception as e:
            self.log_result("Verify Post Deletion", False, f"Error: {str(e)}")
        
        # Test delete with invalid ID
        try:
            response = requests.delete(f"{self.base_url}/blog/posts/invalid_id_123")
            if response.status_code == 404:
                self.log_result("Delete Blog Post - Invalid ID", True, "Correctly returned 404 for invalid ID")
            else:
                self.log_result("Delete Blog Post - Invalid ID", False, f"Expected 404, got {response.status_code}")
        except Exception as e:
            self.log_result("Delete Blog Post - Invalid ID", False, f"Error: {str(e)}")
    
    def cleanup(self):
        """Clean up created test data"""
        print("\n=== Cleaning Up Test Data ===")
        for post_id in self.created_posts:
            try:
                requests.delete(f"{self.base_url}/blog/posts/{post_id}")
                print(f"Cleaned up post: {post_id}")
            except:
                print(f"Failed to clean up post: {post_id}")
    
    def run_all_tests(self):
        """Run all tests in sequence"""
        print("🚀 Starting Comprehensive Backend API Tests")
        print(f"Testing against: {self.base_url}")
        print("=" * 60)
        
        # Run tests in logical order
        self.test_health_check()
        self.test_create_blog_posts()
        self.test_get_all_posts()
        self.test_get_posts_with_filters()
        self.test_get_single_post()
        self.test_update_blog_post()
        self.test_get_categories()
        self.test_contact_form()
        self.test_delete_blog_post()
        
        # Print summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"✅ Passed: {self.test_results['passed']}")
        print(f"❌ Failed: {self.test_results['failed']}")
        print(f"📈 Success Rate: {(self.test_results['passed'] / (self.test_results['passed'] + self.test_results['failed']) * 100):.1f}%")
        
        if self.test_results['errors']:
            print("\n🔍 FAILED TESTS:")
            for error in self.test_results['errors']:
                print(f"   • {error}")
        
        # Cleanup
        self.cleanup()
        
        return self.test_results['failed'] == 0

if __name__ == "__main__":
    tester = BlogAPITester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All tests passed! Backend is working correctly.")
        exit(0)
    else:
        print(f"\n⚠️  {tester.test_results['failed']} test(s) failed. Please check the issues above.")
        exit(1)