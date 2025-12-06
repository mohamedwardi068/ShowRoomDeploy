import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Package as PackageIcon, Eye } from 'lucide-react';
import { getProducts, deleteProduct } from '../../utils/productStorage';
import ConfirmationModal from './ConfirmationModal';
import PreviewModal from './PreviewModal';
import ProductCard from '../ProductCard';

const ProductList = ({ onEdit, onAdd }) => {
    const [products, setProducts] = useState([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [previewProduct, setPreviewProduct] = useState(null);

    useEffect(() => {
        setProducts(getProducts());
    }, []);

    const handleDelete = (id) => {
        setProductToDelete(id);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        if (productToDelete) {
            const updatedProducts = deleteProduct(productToDelete);
            setProducts(updatedProducts);
            setProductToDelete(null);
        }
    };

    const handlePreview = (product) => {
        setPreviewProduct(product);
        setShowPreview(true);
    };

    return (
        <div className="bg-gray-900 p-6 rounded-xl shadow-2xl border border-gray-800">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                    <PackageIcon className="mr-3 text-blue-500" />
                    Manage Inventory
                </h2>
                <button
                    onClick={onAdd}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add New Product
                </button>
            </div>

            <div className="grid gap-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-gray-800 p-4 rounded-lg flex items-center justify-between border border-gray-700 hover:border-blue-500/50 transition-colors"
                    >
                        <div className="flex items-center space-x-4">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-24 h-24 object-cover rounded-md bg-gray-700"
                            />
                            <div>
                                <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                                <p className="text-gray-400 text-sm">
                                    ${product.price} • {product.type}
                                    {product.isHot && <span className="ml-2 text-red-400">🔥 Hot</span>}
                                </p>
                                <p className="text-gray-500 text-xs">
                                    {product.compatibleDevices && product.compatibleDevices.length > 0
                                        ? product.compatibleDevices.join(', ')
                                        : 'Universal'}
                                </p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handlePreview(product)}
                                className="p-2 text-green-400 hover:bg-green-900/30 rounded-lg transition-colors"
                                title="Preview"
                            >
                                <Eye className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => onEdit(product)}
                                className="p-2 text-blue-400 hover:bg-blue-900/30 rounded-lg transition-colors"
                                title="Edit"
                            >
                                <Edit className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => handleDelete(product.id)}
                                className="p-2 text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
                                title="Delete"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}

                {products.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        No products found. Add one to get started.
                    </div>
                )}
            </div>

            <ConfirmationModal
                open={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={confirmDelete}
                title="Delete Product"
                message="Are you sure you want to delete this product? This action cannot be undone."
                confirmText="Delete"
                confirmColor="bg-red-600"
            />

            <PreviewModal open={showPreview} onClose={() => setShowPreview(false)}>
                {previewProduct && (
                    <ProductCard
                        id={previewProduct.id}
                        image={previewProduct.image}
                        name={previewProduct.name}
                        price={previewProduct.price}
                        type={previewProduct.type}
                        compatibleDevices={previewProduct.compatibleDevices || []}
                        isHot={previewProduct.isHot}
                        onClick={() => { }}
                    />
                )}
            </PreviewModal>
        </div>
    );
};

export default ProductList;
