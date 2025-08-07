import { useState, useEffect } from 'react';
import portfolioData from '../data/portfolio.json';
import blogData from '../data/blog.json';

// Custom hook for loading local data
export const usePortfolioData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for smooth UX
    const timer = setTimeout(() => {
      setData(portfolioData);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return { data, loading };
};

// Custom hook for loading blog data
export const useBlogData = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for smooth UX
    const timer = setTimeout(() => {
      // Sort posts by date (newest first)
      const sortedPosts = blogData.posts.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setPosts(sortedPosts);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const getPostById = (id) => {
    return posts.find(post => post.id === id);
  };

  const getPostsByCategory = (category) => {
    if (category === 'All') return posts;
    return posts.filter(post => post.category === category);
  };

  const getCategories = () => {
    const categories = ['All', ...new Set(posts.map(post => post.category))];
    return categories;
  };

  return {
    posts,
    loading,
    getPostById,
    getPostsByCategory,
    getCategories
  };
};