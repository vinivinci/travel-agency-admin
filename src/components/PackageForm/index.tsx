import React, { useEffect, useState } from 'react';
import { Package } from '../../interfaces';
import ImageUpload from '../ImageUpload';
import { addTravelPackage, getTravelPackageById, updateTravelPackage } from '../../services/api';
import './PackageForm.css';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingOverlay from '../LoadingOverlay';
const PackageForm = ({ packageData }: { packageData?: Package }) => {
    const { id } = useParams();
    const [images, setImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Package>(packageData || {
        packageName: '',
        packageID: 0,
        description: '',
        destination: '',
        startDate: '',
        endDate: '',
        price: 0,
        images: [],
    });

    const handleImagesUploaded = (images: string[]) => {
        setImages(images);
    }

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            getTravelPackageById(+id).then(response => {
                const packageData = response.data;
                setFormData(packageData)
                setImages(packageData.images.map(image => image.image));
                setIsLoading(false);
            }).catch(error => {
                toast.error('Erro ao carregar pacote de viagem.');
                setIsLoading(false);
            });
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (event: React.FormEvent) => {

        event.preventDefault();
        const { packageName, description, destination, startDate, endDate, price } = formData;
        if (!packageName || !description || !destination || !startDate || !endDate || price <= 0) {
            toast.error('Todos os campos devem ser preenchidos e o preço deve ser maior que zero.');
            return;
        }

        const today = new Date().toISOString().split('T')[0];
        if (startDate <= today) {
            toast.error('A data de início de vigência deve ser maior que a data atual.');
            return;
        }
        if (endDate <= startDate) {
            toast.error('A data final deve ser maior que a data de início.');
            return;
        }
        try {
            setIsLoading(true);
            if (formData.packageID) {
                await updateTravelPackage(formData.packageID, formData, images);
                toast.success('Pacote atualizado com sucesso!');
                setIsLoading(false);
            } else {
                await addTravelPackage(formData, images);

                toast.success('Pacote adicionado com sucesso!');
                setIsLoading(false);
                navigate('/');
            }
        } catch (error) {
            console.error('Error ao enviar formulário: ', error);
            toast.error('Erro ao enviar formulário.');
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && <LoadingOverlay />}
            <form onSubmit={handleSubmit} className="package-form">
                <h2 className="form-title">{id ? "Editar pacote de viagens" : "Criar pacote de viagens"} </h2>
                <div className="form-group">
                    <label htmlFor="packageName">Nome do pacote</label>
                    <input type="text" id="packageName" name="packageName" value={formData.packageName} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Descrição</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="destination">Destino</label>
                    <input type="text" id="destination" name="destination" value={formData.destination} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="startDate">Data do inicio de vigência</label>
                    <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="endDate">Data do inicio de vigência</label>
                    <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Preço</label>
                    <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} />
                </div>
                <label htmlFor="images">Imagens</label>
                <ImageUpload initialImages={images} onImagesUploaded={handleImagesUploaded} />

                <button type="submit" className="submit-button">Salvar</button>
            </form>

        </>
    );
};

export default PackageForm;
