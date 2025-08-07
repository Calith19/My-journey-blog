import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomeStatic from './pages/HomeStatic';
import AcademicStatic from './pages/AcademicStatic';
import AchievementsStatic from './pages/AchievementsStatic';
import ResearchStatic from './pages/ResearchStatic';
import BlogStatic from './pages/BlogStatic';
import BlogPostStatic from './pages/BlogPostStatic';
import ContactStatic from './pages/ContactStatic';
import { Toaster } from './components/ui/toaster';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomeStatic />} />
            <Route path="/academic" element={<AcademicStatic />} />
            <Route path="/achievements" element={<AchievementsStatic />} />
            <Route path="/research" element={<ResearchStatic />} />
            <Route path="/blog" element={<BlogStatic />} />
            <Route path="/blog/:id" element={<BlogPostStatic />} />
            <Route path="/contact" element={<ContactStatic />} />
          </Routes>
          <Toaster />
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;