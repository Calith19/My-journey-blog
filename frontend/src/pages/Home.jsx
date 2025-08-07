import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, ExternalLink, BookOpen, Award, FlaskConical, PenTool, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mockData } from '../mock/data';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const { personal, academic, achievements, research } = mockData;
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blog posts from API
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get(`${API}/blog/posts?limit=3`);
        setBlogPosts(response.data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        // Fallback to mock data if API fails
        setBlogPosts(mockData.blogPosts.slice(0, 3));
      }
      setLoading(false);
    };

    fetchBlogPosts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-pink-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                  Available for Academic Opportunities
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  Hello, I'm{' '}
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {personal.name}
                  </span>
                </h1>
                <h2 className="text-xl lg:text-2xl text-slate-600 font-medium">
                  {personal.title}
                </h2>
              </div>
              
              <p className="text-lg text-slate-700 leading-relaxed max-w-2xl">
                {personal.bio}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link to="/contact">
                    <Mail className="w-4 h-4 mr-2" />
                    Get In Touch
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-slate-300 hover:bg-slate-100 transition-all duration-300"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </Button>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">{research.length}+</div>
                  <div className="text-sm text-slate-600">Research Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">{achievements.length}+</div>
                  <div className="text-sm text-slate-600">Achievements</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">{blogPosts.length}+</div>
                  <div className="text-sm text-slate-600">Blog Posts</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl transform rotate-6 opacity-20"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-slate-200">
                <div className="space-y-6">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-slate-700">[Photo]</span>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-slate-900">{personal.name}</h3>
                    <p className="text-slate-600">{personal.title}</p>
                    <p className="text-sm text-slate-500 mt-2">{personal.location}</p>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Mail className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Academic Excellence & Innovation
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Explore my journey through research, achievements, and thought leadership in {personal.title.split(' ')[1]} and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Academic Background</h3>
                <p className="text-slate-600 text-sm mb-4">
                  {academic.length} degrees from prestigious institutions
                </p>
                <Link to="/academic">
                  <Button variant="ghost" size="sm">
                    View Details
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Achievements</h3>
                <p className="text-slate-600 text-sm mb-4">
                  {achievements.length} certifications, awards & publications
                </p>
                <Link to="/achievements">
                  <Button variant="ghost" size="sm">
                    Explore
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <FlaskConical className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Research</h3>
                <p className="text-slate-600 text-sm mb-4">
                  {research.length} active research projects and publications
                </p>
                <Link to="/research">
                  <Button variant="ghost" size="sm">
                    View Research
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-orange-100 rounded-xl flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                  <PenTool className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Blog & Insights</h3>
                <p className="text-slate-600 text-sm mb-4">
                  {blogPosts.length} articles on research and industry trends
                </p>
                <Link to="/blog">
                  <Button variant="ghost" size="sm">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Content */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Latest Research */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <FlaskConical className="w-6 h-6 mr-2 text-green-600" />
                Latest Research
              </h2>
              
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{research[0].category}</Badge>
                      <span className="text-sm text-slate-500">{research[0].status}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-slate-900">
                      {research[0].title}
                    </h3>
                    
                    <p className="text-slate-600">
                      {research[0].description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {research[0].technologies.slice(0, 3).map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    
                    <Link to="/research">
                      <Button variant="ghost" className="p-0 hover:bg-transparent text-blue-600 hover:text-blue-700">
                        View All Research
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Blog Posts */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <PenTool className="w-6 h-6 mr-2 text-orange-600" />
                Recent Insights
              </h2>
              
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-orange-500 border-t-transparent mx-auto mb-2"></div>
                    <p className="text-sm text-slate-600">Loading latest posts...</p>
                  </div>
                ) : blogPosts.length > 0 ? (
                  blogPosts.map((post) => (
                    <Card key={post.id} className="hover:shadow-md transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                          <span className="text-xs text-slate-500">{post.readTime}</span>
                        </div>
                        
                        <Link to={`/blog/${post.id}`}>
                          <h4 className="font-semibold text-slate-900 mb-2 hover:text-blue-600 transition-colors">
                            {post.title}
                          </h4>
                        </Link>
                        
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-slate-500">
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                          <Link to={`/blog/${post.id}`}>
                            <Button variant="ghost" size="sm" className="text-xs p-1 h-auto">
                              Read More
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <PenTool className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600 mb-2">No blog posts yet</p>
                    <Link to="/admin">
                      <Button variant="outline" size="sm">
                        Create First Post
                      </Button>
                    </Link>
                  </div>
                )}
                
                <Link to="/blog">
                  <Button variant="ghost" className="w-full justify-center text-blue-600 hover:text-blue-700">
                    View All Posts
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;