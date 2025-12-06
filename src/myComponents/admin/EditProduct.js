import React, { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import FormCard from './FormCardProduct';
import ProductCard from "../ProductCard";
import PreviewModal from "./PreviewModal";
import ConfirmationModal from './ConfirmationModal';
import { updateProduct } from '../../utils/productStorage';

const EditProduct = ({ product, onCancel, onSave }) => {
    const [data, setData] = useState({
        id: '',
        name: '',
        price: '',
        image: '',
        type: '',
        compatibleDevices: '',
        rating: '',
        isHot: false,
    });

    useEffect(() => {
        if (product) {
            setData({
                ...product,
                compatibleDevices: Array.isArray(product.compatibleDevices)
                    ? product.compatibleDevices.join(', ')
                    : '',
            });
        }
    }, [product]);

    const [showPreview, setShowPreview] = useState(false);
    const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData({ ...data, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = () => {
        if (!data.name || !data.price) {
            alert('Please fill in at least the Product Name and Price.');
            return;
        }
        setShowUpdateConfirm(true);
    };

    const confirmUpdate = () => {
        const product = {
            ...data,
            price: parseFloat(data.price),
            rating: parseInt(data.rating) || 0,
            compatibleDevices: data.compatibleDevices ? data.compatibleDevices.split(',').map(d => d.trim()) : []
        };
        updateProduct(product);
        alert('Product Updated Successfully!');
        if (onSave) onSave();
    };

    return (
        <>
            <FormCard
                title="Edit Inventory Item"
                icon={Package}
                onSubmit={handleSubmit}
                onPreview={() => setShowPreview(true)}
                onCancel={onCancel}
            >
                <input
                    name="name"
                    placeholder="Product Name"
                    value={data.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700"
                />

                <div className="flex space-x-4">
                    <input
                        name="price"
                        type="number"
                        placeholder="Price"
                        value={data.price}
                        onChange={handleChange}
                        className="w-1/2 px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700"
                    />
                    <input
                        name="type"
                        placeholder="Category"
                        value={data.type}
                        onChange={handleChange}
                        className="w-1/2 px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700"
                    />
                </div>

                <input
                    name="compatibleDevices"
                    placeholder="Compatible Devices (comma separated)"
                    value={data.compatibleDevices}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700"
                />

                <input
                    name="image"
                    placeholder="Image URL"
                    value={data.image}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700"
                />

                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        name="isHot"
                        checked={data.isHot}
                        onChange={handleChange}
                    />
                    <span className="text-gray-400">Hot Product?</span>
                </div>

                <input
                    name="rating"
                    type="number"
                    placeholder="Rating (1-5)"
                    value={data.rating}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700"
                />
            </FormCard>

            <PreviewModal open={showPreview} onClose={() => setShowPreview(false)}>
                <ProductCard
                    id={data.id || "preview"}
                    image={data.image}
                    name={data.name || "Untitled product"}
                    price={data.price ? parseFloat(data.price) : 0}
                    type={data.type}
                    compatibleDevices={data.compatibleDevices ? data.compatibleDevices.split(',').map(s => s.trim()) : []}
                    isHot={data.isHot}
                    onClick={() => { }}
                />
            </PreviewModal>

            <ConfirmationModal
                open={showUpdateConfirm}
                onClose={() => setShowUpdateConfirm(false)}
                onConfirm={confirmUpdate}
                title="Update Product"
                message="Are you sure you want to update this product with the new information?"
                confirmText="Update"
                confirmColor="bg-blue-600"
            />
        </>
    );
};

export default EditProduct;
