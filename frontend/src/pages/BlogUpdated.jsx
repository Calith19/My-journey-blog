import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, ArrowRight, Filter, Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BlogUpdated = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);

  // Fetch blog posts
  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get(`${API}/blog/posts`);
      const posts = response.data;
      setBlogPosts(posts);
      
      // Extract unique categories
      const uniqueCategories = ['All', ...new Set(posts.map(post => post.category))];
      setCategories(uniqueCategories);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    const colors = {
      'Research': 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      'Personal': 'bg-purple-100 text-purple-800 hover:bg-purple-200',
      'Industry': 'bg-green-100 text-green-800 hover:bg-green-200',
      'News': 'bg-orange-100 text-orange-800 hover:bg-orange-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  };

  if (loading) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
            <p>Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Blog & Insights
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Sharing thoughts on research, personal experiences, industry trends, and current events 
            that shape our academic and professional landscape.
          </p>
        </div>

        {/* Admin Link */}
        <div className="mb-8 text-center">
          <Link to="/admin">
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Manage Blog Posts
            </Button>
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-600" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`transition-all duration-200 ${
                      selectedCategory === category 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'hover:bg-slate-100'
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 rounded-full flex items-center justify-center">
              {blogPosts.length === 0 ? (
                <Plus className="w-8 h-8 text-slate-400" />
              ) : (
                <Search className="w-8 h-8 text-slate-400" />
              )}
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              {blogPosts.length === 0 ? 'No blog posts yet' : 'No articles found'}
            </h3>
            <p className="text-slate-600 mb-6">
              {blogPosts.length === 0 
                ? 'Create your first blog post to get started.'
                : 'Try adjusting your search terms or filter criteria.'
              }
            </p>
            {blogPosts.length === 0 ? (
              <Link to="/admin">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Post
                </Button>
              </Link>
            ) : (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <CardContent className="p-0">
                  {/* Post Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center group-hover:from-blue-50 group-hover:to-purple-50 transition-colors duration-300">
                    <span className="text-4xl font-light text-slate-400">[Image]</span>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={getCategoryColor(post.category)}>
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-slate-500 text-sm">
                        <Clock className="w-3 h-3 mr-1" />
                        {post.readTime}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-slate-600 mb-4 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-slate-500 text-sm">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>

                      <Link to={`/blog/${post.id}`}>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-1 h-auto">
                          Read More
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Call to Action */}
        {filteredPosts.length > 0 && (
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Stay Updated
              </h2>
              <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                Get notified when I publish new insights on research, academia, and industry trends.
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Get In Touch
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogUpdated;