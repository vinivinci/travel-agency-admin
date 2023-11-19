import React from 'react';
import './LoadingOverlay.css';

const LoadingOverlay = () => {
    return (
        <div className="loading-overlay">
            <div className="loading-spinner">
                Carregando...
            </div>
        </div>
    );
};

export default LoadingOverlay;
