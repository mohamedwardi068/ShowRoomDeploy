import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Image as ImageIcon, Eye } from 'lucide-react';
import { getAllSliders, deleteSlider } from '../../services/sliderService';
import ConfirmationModal from './ConfirmationModal';
import PreviewModal from './PreviewModalSlider';
import SlidePreview from './SlidePreview';

const SliderList = ({ onEdit, onAdd }) => {
    const [sliders, setSliders] = useState([]);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [sliderToDelete, setSliderToDelete] = useState(null);
    const [showPreview, setShowPreview] = useState(false);
    const [previewSlider, setPreviewSlider] = useState(null);

    const fetchSliders = async () => {
        try {
            const data = await getAllSliders();
            setSliders(data);
        } catch (error) {
            console.error("Error fetching sliders:", error);
        }
    };

    useEffect(() => {
        fetchSliders();
    }, []);

    const handleDelete = (id) => {
        setSliderToDelete(id);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        if (sliderToDelete) {
            try {
                await deleteSlider(sliderToDelete);
                fetchSliders(); // Refresh list after delete
                setSliderToDelete(null);
            } catch (error) {
                console.error("Error deleting slider:", error);
                alert("Failed to delete slider.");
            }
        }
    };

    const handlePreview = (slider) => {
        setPreviewSlider(slider);
        setShowPreview(true);
    };

    return (
        <div className="bg-gray-900 p-6 rounded-xl shadow-2xl border border-gray-800">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                    <ImageIcon className="mr-3 text-blue-500" />
                    Manage Sliders
                </h2>
                <button
                    onClick={onAdd}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add New Slider
                </button>
            </div>

            <div className="grid gap-4">
                {sliders.map((slider) => (
                    <div
                        key={slider._id}
                        className="bg-gray-800 p-4 rounded-lg flex items-center justify-between border border-gray-700 hover:border-blue-500/50 transition-colors"
                    >
                        <div className="flex items-center space-x-4">
                            <img
                                src={slider.image}
                                alt={slider.title}
                                className="w-24 h-16 object-cover rounded-md bg-gray-700"
                            />
                            <div>
                                <h3 className="text-lg font-semibold text-white">{slider.title}</h3>
                                <p className="text-gray-400 text-sm truncate max-w-md">{slider.description}</p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handlePreview(slider)}
                                className="p-2 text-green-400 hover:bg-green-900/30 rounded-lg transition-colors"
                                title="Preview"
                            >
                                <Eye className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => onEdit(slider)}
                                className="p-2 text-blue-400 hover:bg-blue-900/30 rounded-lg transition-colors"
                                title="Edit"
                            >
                                <Edit className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => handleDelete(slider._id)}
                                className="p-2 text-red-400 hover:bg-red-900/30 rounded-lg transition-colors"
                                title="Delete"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}

                {sliders.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        No sliders found. Add one to get started.
                    </div>
                )}
            </div>

            <ConfirmationModal
                open={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={confirmDelete}
                title="Delete Slider"
                message="Are you sure you want to delete this slider? This action cannot be undone."
                confirmText="Delete"
                confirmColor="bg-red-600"
            />

            <PreviewModal open={showPreview} onClose={() => setShowPreview(false)}>
                {previewSlider && <SlidePreview slide={previewSlider} />}
            </PreviewModal>
        </div>
    );
};

export default SliderList;
