import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, List as ListIcon, Eye } from 'lucide-react';
import { getCategories, deleteCategory } from '../../utils/categoryStorage';
import ConfirmationModal from './ConfirmationModal';
import CategoryModal from './CategoryModal ';
import CategoryPreviewCard from './CategoryPreviewCard';

const CategoryList = ({ onEdit, onAdd }) => {
    const [categories, setCategories] = useState([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [previewCategory, setPreviewCategory] = useState(null);

    useEffect(() => {
        setCategories(getCategories());
    }, []);

    const handleDelete = (id) => {
        setCategoryToDelete(id);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        if (categoryToDelete) {
            const updatedCategories = deleteCategory(categoryToDelete);
            setCategories(updatedCategories);
            setCategoryToDelete(null);
        }
    };

    const handlePreview = (category) => {
        setPreviewCategory(category);
        setShowPreview(true);
    };

    return (
        <div className="bg-gray-900 p-6 rounded-xl shadow-2xl border border-gray-800">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                    <ListIcon className="mr-3 text-blue-500" />
                    Manage Categories
                </h2>
                <button
                    onClick={onAdd}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add New Category
                </button>
            </div>

            <div className="grid gap-4">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="bg-gray-800 p-4 rounded-lg flex items-center justify-between border border-gray-700 hover:border-blue-500/50 transition-colors"
                    >
                        <div className="flex items-center space-x-4">
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-24 h-24 object-cover rounded-md bg-gray-700"
                            />
                            <div>
                                <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                                <p className="text-gray-400 text-sm">
                                    {category.count} items • {category.slug}
                                </p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handlePreview(category)}
                                className="p-2 text-green-400 hover:bg-green-900/30 rounded-lg transition-colors"
                                title="Preview"
                            >
                                <Eye className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => onEdit(category)}
                                className="p-2 text-blue-400 hover:bg-blue-900/30 rounded-lg transition-colors"
                                title="Edit"
                            >
                                <Edit className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => handleDelete(category.id)}
                                className="p-2 text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
                                title="Delete"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}

                {categories.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        No categories found. Add one to get started.
                    </div>
                )}
            </div>

            <ConfirmationModal
                open={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={confirmDelete}
                title="Delete Category"
                message="Are you sure you want to delete this category? This action cannot be undone."
                confirmText="Delete"
                confirmColor="bg-red-600"
            />

            <CategoryModal open={showPreview} onClose={() => setShowPreview(false)}>
                {previewCategory && (
                    <CategoryPreviewCard
                        name={previewCategory.name}
                        count={previewCategory.count}
                        image={previewCategory.image}
                    />
                )}
            </CategoryModal>
        </div>
    );
};

export default CategoryList;
