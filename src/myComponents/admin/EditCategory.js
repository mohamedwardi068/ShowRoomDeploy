// components/EditCategory.js
import React, { useState, useEffect } from "react";
import { List } from "lucide-react";
import FormCard from "./FormCardProduct";
import CategoryPreviewCard from "./CategoryPreviewCard";
import CategoryModal from "./CategoryModal ";
import ConfirmationModal from './ConfirmationModal';
import { updateCategory } from '../../utils/categoryStorage';

const EditCategory = ({ category, onCancel, onSave }) => {
    const [data, setData] = useState({
        id: '',
        name: "",
        count: "",
        image: "",
    });

    useEffect(() => {
        if (category) {
            setData(category);
        }
    }, [category]);

    const [showPreview, setShowPreview] = useState(false);
    const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = () => {
        if (!data.name || !data.image) {
            alert('Please fill in at least the Category Name and Image.');
            return;
        }
        setShowUpdateConfirm(true);
    };

    const confirmUpdate = () => {
        const category = {
            ...data,
            count: parseInt(data.count) || 0,
        };
        updateCategory(category);
        alert("Category Updated Successfully!");
        if (onSave) onSave();
    };

    return (
        <>
            <FormCard
                title="Edit Product Category"
                icon={List}
                onSubmit={handleSubmit}
                onPreview={() => setShowPreview(true)}
                onCancel={onCancel}
            >
                <input
                    name="name"
                    placeholder="Category Name"
                    value={data.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700"
                />

                <input
                    name="count"
                    type="number"
                    placeholder="Item Count"
                    value={data.count}
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
            </FormCard>

            {/* ---- PREVIEW ---- */}
            <CategoryModal open={showPreview} onClose={() => setShowPreview(false)}>
                <CategoryPreviewCard
                    name={data.name}
                    count={data.count ? parseInt(data.count) : 0}
                    image={data.image}
                />
            </CategoryModal>

            <ConfirmationModal
                open={showUpdateConfirm}
                onClose={() => setShowUpdateConfirm(false)}
                onConfirm={confirmUpdate}
                title="Update Category"
                message="Are you sure you want to update this category with the new information?"
                confirmText="Update"
                confirmColor="bg-blue-600"
            />
        </>
    );
};

export default EditCategory;
