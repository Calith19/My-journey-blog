import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share, BookmarkPlus, Tag } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { useBlogData } from '../hooks/useLocalData';

const BlogPostStatic = () => {
  const { id } = useParams();
  const { posts, loading, getPostById } = useBlogData();
  
  if (loading) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p>Loading blog post...</p>
        </div>
      </div>
    );
  }
  
  const post = getPostById(id);
  
  if (!post) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Post Not Found</h1>
          <p className="text-slate-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Research': 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      'Personal': 'bg-purple-100 text-purple-800 hover:bg-purple-200',
      'Industry': 'bg-green-100 text-green-800 hover:bg-green-200',
      'News': 'bg-orange-100 text-orange-800 hover:bg-orange-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  };

  // Related posts (excluding current post)
  const relatedPosts = posts
    .filter(p => p.id !== post.id && (
      p.category === post.category || 
      p.tags.some(tag => post.tags.includes(tag))
    ))
    .slice(0, 3);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/blog">
            <Button variant="ghost" className="text-slate-600 hover:text-slate-900">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <article className="mb-16">
          <header className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <Badge className={getCategoryColor(post.category)}>
                {post.category}
              </Badge>
              <div className="flex items-center text-slate-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime}
              </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-between text-slate-600 mb-8">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="text-sm">
                  By {post.author}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Share className="w-4 h-4 mr-1" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <BookmarkPlus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Featured Image Placeholder */}
            <div className="h-64 lg:h-96 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mb-8">
              <span className="text-4xl font-light text-slate-400">[Featured Image]</span>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg prose-slate max-w-none">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg mb-8">
              <p className="text-lg text-slate-700 leading-relaxed italic">
                {post.excerpt}
              </p>
            </div>

            <div className="text-slate-700 leading-relaxed space-y-6">
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                } else if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                } else if (paragraph.startsWith('- ')) {
                  return (
                    <li key={index} className="ml-4">
                      {paragraph.replace('- ', '')}
                    </li>
                  );
                } else if (paragraph.match(/^\d+\./)) {
                  return (
                    <li key={index} className="ml-4 list-decimal">
                      {paragraph.replace(/^\d+\.\s/, '')}
                    </li>
                  );
                } else if (paragraph.trim()) {
                  return (
                    <p key={index} className="leading-relaxed">
                      {paragraph}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <div className="flex items-center space-x-2 mb-4">
              <Tag className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">Tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="hover:bg-slate-100 transition-colors">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-0">
                    {/* Image placeholder */}
                    <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center group-hover:from-blue-50 group-hover:to-purple-50 transition-colors duration-300">
                      <span className="text-lg font-light text-slate-400">[Image]</span>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={getCategoryColor(relatedPost.category)}>
                          {relatedPost.category}
                        </Badge>
                        <span className="text-xs text-slate-500">{relatedPost.readTime}</span>
                      </div>
                      
                      <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      
                      <p className="text-sm text-slate-600 line-clamp-2 mb-3">
                        {relatedPost.excerpt}
                      </p>
                      
                      <Link to={`/blog/${relatedPost.id}`}>
                        <Button variant="ghost" size="sm" className="p-0 h-auto text-blue-600 hover:text-blue-700">
                          Read More →
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Author Bio */}
        <section className="mt-16 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xl font-bold text-slate-700">[Photo]</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{post.author}</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                [Your brief professional bio and academic background. This section provides context 
                about your expertise and perspective on the topics you write about.]
              </p>
              <div className="flex items-center space-x-4">
                <Link to="/contact">
                  <Button variant="outline" size="sm">
                    Connect
                  </Button>
                </Link>
                <Link to="/blog">
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    More Articles
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogPostStatic;