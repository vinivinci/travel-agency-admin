import React, { useState, useRef, useEffect } from 'react';
import './ImageUpload.css';

interface ImageUploadProps {
    initialImages?: string[];
    onImagesUploaded: (images: string[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ initialImages = [], onImagesUploaded }) => {
    const [images, setImages] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const newImagesPromises = files.map((file) => {
            return new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target!.result as string);
                reader.readAsDataURL(file);
            });
        });

        Promise.all(newImagesPromises).then(newImages => {
            const updatedImages = [...images, ...newImages];
            setImages(updatedImages);
            onImagesUploaded(updatedImages);
        });
    };

    useEffect(() => {
        setImages(initialImages);
    }, [initialImages]);
    const handleRemoveImage = (index: number) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
        onImagesUploaded(updatedImages);
    };

    const handleAddButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="image-upload">
            {images.map((image, index) => (
                <div key={index} className="image-container">
                    <img src={image} alt={`Uploaded ${index}`} className="uploaded-image" />
                    <button onClick={() => handleRemoveImage(index)} className="remove-image">X</button>
                </div>
            ))}
            <div className="add-image-container" onClick={handleAddButtonClick}>
                <div className="add-image-button">+</div>
            </div>
            <input
                ref={fileInputRef}
                type="file"
                onChange={handleImageChange}
                multiple
                style={{ display: 'none' }}
            />
        </div>
    );
};

export default ImageUpload;
