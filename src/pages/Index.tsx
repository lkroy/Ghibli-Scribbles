
import React, { useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/homepage/HeroSection';
import FeaturedPosts from '@/components/homepage/FeaturedPosts';

const Index: React.FC = () => {
  // Set document title
  useEffect(() => {
    document.title = 'Ghibli Scribbles - A Studio Ghibli Inspired Blog';
  }, []);

  return (
    <MainLayout showSidebar={false}>
      <HeroSection />
      <FeaturedPosts />
    </MainLayout>
  );
};

export default Index;
