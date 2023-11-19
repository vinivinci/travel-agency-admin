import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { getTravelPackages } from '../services/api';
import { Package } from '../types/package';
import './Homepage.css';

export const HomePage: React.FC = () => {
    const [packages, setPackages] = useState<Package[]>([]);
    const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

    useEffect(() => {
        loadPackages();
    }, []);

    const loadPackages = async () => {
        const response = await getTravelPackages();
        setPackages(response.data);
    };

    const handleCreatePackage = () => {
        // Lógica para criar um novo pacote
    };

    return (
        <div className="homepage">
            <Header />
        </div>
    );
};
