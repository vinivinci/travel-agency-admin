import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="social-icons">
                <a href="https://github.com/vinivinci" target="_blank" rel="noreferrer" aria-label="Github">
                    <FaGithub size={24} />
                </a>
                <a href="https://www.linkedin.com/in/vinicius-andrade-6254721a4/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <FaLinkedin size={24} />
                </a>
            </div>
            <p>&copy; {new Date().getFullYear()} VN soluções tech. Todos os direitos reservados.</p>
        </footer>
    );
};

export default Footer;
