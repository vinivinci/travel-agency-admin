import React from 'react';
import NavBar from '../Header';
import Footer from '../Footer';
import './Layout.css';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="layout">
            <NavBar />
            <main className="content">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
