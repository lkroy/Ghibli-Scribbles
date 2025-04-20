
import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import CategorySidebar from '@/components/sidebar/CategorySidebar';

interface MainLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  showSidebar = true 
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex flex-1">
        {showSidebar && (
          <CategorySidebar />
        )}
        
        <main className="flex-1">
          {children}
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default MainLayout;
