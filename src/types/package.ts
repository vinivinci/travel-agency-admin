export interface Image {
    image: string;
}
export interface Package {
    packageName: string;
    packageID: number;
    description: string;
    destination: string;
    startDate: string;
    endDate: string;
    price: number;
    images: Image[];
}