import React, { useState, useEffect } from 'react';
import { Image } from 'lucide-react';
import FormCard from './FormCardSlider';
import SlidePreview from './SlidePreview';
import PreviewModal from './PreviewModalSlider';
import ConfirmationModal from './ConfirmationModal';
import { updateSlider } from '../../services/sliderService';

const EditSlider = ({ slider, onCancel, onSave }) => {
    const [data, setData] = useState({
        id: '',
        image: '',
        title: '',
        description: '',
        button1: '',
        button2: '',
        button1Link: '',
        button2Link: '',
    });

    useEffect(() => {
        if (slider) {
            setData(slider);
        }
    }, [slider]);

    const [showPreview, setShowPreview] = useState(false);
    const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleSubmit = () => {
        if (!data.image || !data.title) {
            alert('Please fill in at least the Image URL and Title.');
            return;
        }
        setShowUpdateConfirm(true);
    };

    const confirmUpdate = async () => {
        try {
            // Use id or _id, whichever exists
            const sliderId = data._id || data.id;
            const { _id, id, createdAt, updatedAt, __v, ...updateData } = data;
            await updateSlider(sliderId, updateData);
            alert('Slider Updated Successfully!');
            if (onSave) onSave();
        } catch (error) {
            console.error("Error updating slider:", error);
            alert('Failed to update slider.');
        }
    };

    return (
        <>
            <FormCard
                title="Edit Slider"
                icon={Image}
                onSubmit={handleSubmit}
                onPreview={() => setShowPreview(true)}
                onCancel={onCancel}
            >
                <input
                    name="image"
                    placeholder="Image URL"
                    value={data.image}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors"
                />

                <input
                    name="title"
                    placeholder="Title"
                    value={data.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={data.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                />

                <input
                    name="button1"
                    placeholder="Button 1 Text (e.g., TO SHOP)"
                    value={data.button1}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors"
                />

                <input
                    name="button1Link"
                    placeholder="Button 1 Link (e.g., /shop)"
                    value={data.button1Link}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors"
                />

                <input
                    name="button2"
                    placeholder="Button 2 Text (e.g., READ MORE)"
                    value={data.button2}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors"
                />

                <input
                    name="button2Link"
                    placeholder="Button 2 Link (e.g., /about)"
                    value={data.button2Link}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors"
                />
            </FormCard>

            <PreviewModal open={showPreview} onClose={() => setShowPreview(false)}>
                <SlidePreview slide={data} />
            </PreviewModal>

            <ConfirmationModal
                open={showUpdateConfirm}
                onClose={() => setShowUpdateConfirm(false)}
                onConfirm={confirmUpdate}
                title="Update Slider"
                message="Are you sure you want to update this slider with the new information?"
                confirmText="Update"
                confirmColor="bg-blue-600"
            />
        </>
    );
};

export default EditSlider;
