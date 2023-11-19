import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <header className="navbar">
            <div onClick={() => navigate('/')} className="logo">
                <img src='/logo.png' alt='logo' width={60} height={60} />
            </div>
            <h1 className="header-title">Administrativo</h1>
            <div className={`links ${isMobileMenuOpen ? 'active' : ''}`}>
                <Link to="/">Pagina inicial</Link>
                <Link to="/add-package">Criar pacote de viagens</Link>
            </div>
            <div className="hamburger" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                ☰
            </div>
        </header>
    );
};

export default Header;
