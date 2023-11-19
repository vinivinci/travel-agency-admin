import React, { useEffect, useState } from 'react';
import { Package } from '../../interfaces';
import { deleteTravelPackage, getTravelPackages } from '../../services/api';
import './PackageList.css';
import { useNavigate } from 'react-router-dom';
import LoadingOverlay from '../LoadingOverlay';
import { toast } from 'react-toastify';

const PackageList = () => {
    const [packages, setPackages] = useState<Package[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    function getPackages() {
        setIsLoading(true);
        getTravelPackages()
            .then(response => {
                setPackages(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                toast.error('Erro ao carregar pacotes de viagem.');
                setIsLoading(false);
            });
    }
    useEffect(() => {
        getPackages();
    }, []);

    async function handleDeletePackage(id: number) {
        try {
            setIsLoading(true);
            await deleteTravelPackage(id);
            setPackages(packages.filter(pkg => pkg.packageID !== id));
            setIsLoading(false);
        }
        catch (error) {
            toast.error('Erro ao excluir pacote de viagem.');
            setIsLoading(false);
        }
    }

    return (
        <> {isLoading && <LoadingOverlay />}
            <div className="package-list">
                {packages.map(pkg => (
                    <div key={pkg.packageID} className="package-item">
                        <img src={pkg.images[0].image} alt={pkg.packageName} className="package-image" />
                        <div className="package-details">
                            <h2 className="package-name">{pkg.packageName}</h2>
                            <h3 className="package-name">{pkg.destination}</h3>
                            <p className="package-price">R$ {pkg.price}</p>
                        </div>

                        <button onClick={() => navigate(`edit-package/${pkg.packageID}`)} className="view-more-button edit">Editar</button>
                        <button onClick={() => handleDeletePackage(pkg.packageID)} className="view-more-button delete">Excluir</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default PackageList;
