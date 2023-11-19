import axios from 'axios';
import { Package } from '../interfaces';

const API_URL = 'http://localhost:3000/';

const api = axios.create({
    baseURL: API_URL,
});

export const getTravelPackages = async () => {
    return api.get<Package[]>('travel-packages');
};

export const getTravelPackageById = async (id: number) => {
    return api.get<Package>(`travel-packages/${id}`);
};

export const addTravelPackage = async (packageData: Package, images: string[]) => {
    return api.post('travel-packages', { ...packageData, images: images });
};

export const updateTravelPackage = async (id: number, packageData: Package, images: string[]) => {
    return api.put(`travel-packages/${id}`, { ...packageData, images: images });
};

export const deleteTravelPackage = async (id: number) => {
    return api.delete(`travel-packages/${id}`);
};

export default api;
