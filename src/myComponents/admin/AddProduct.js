import React, { useState } from 'react';
import { Package } from 'lucide-react';
import FormCard from './FormCardProduct';
import ProductCard from "../ProductCard";
import PreviewModal from "./PreviewModal";
import { saveProduct } from '../../utils/productStorage';

const AddProduct = ({ onCancel, onSave }) => {
  const [data, setData] = useState({
    name: '',
    price: '',
    image: '',
    type: '',
    compatibleDevices: '',
    rating: '',
    isHot: false,
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({ ...data, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = () => {
    if (!data.name || !data.price) {
      alert('Please fill in at least the Product Name and Price.');
      return;
    }
    const product = {
      ...data,
      price: parseFloat(data.price),
      rating: parseInt(data.rating) || 0,
      compatibleDevices: data.compatibleDevices ? data.compatibleDevices.split(',').map(d => d.trim()) : []
    };
    saveProduct(product);
    alert('Product Added Successfully!');
    if (onSave) onSave();
    setData({
      name: '',
      price: '',
      image: '',
      type: '',
      compatibleDevices: '',
      rating: '',
      isHot: false
    });
  };

  return (
    <>
      <FormCard
        title="Add New Inventory Item"
        icon={Package}
        onSubmit={handleSubmit}
        onPreview={() => setShowPreview(true)}
        onCancel={onCancel}
      >
        <input name="name" placeholder="Product Name" value={data.name} onChange={handleChange} className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700" />

        <div className="flex space-x-4">
          <input name="price" type="number" placeholder="Price" value={data.price} onChange={handleChange} className="w-1/2 px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700" />
          <input name="type" placeholder="Category" value={data.type} onChange={handleChange} className="w-1/2 px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700" />
        </div>

        <input name="compatibleDevices" placeholder="Compatible Devices (comma separated)" value={data.compatibleDevices} onChange={handleChange} className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700" />

        <input name="image" placeholder="Image URL" value={data.image} onChange={handleChange} className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700" />

        <div className="flex items-center space-x-2">
          <input type="checkbox" name="isHot" checked={data.isHot} onChange={handleChange} />
          <span className="text-gray-400">Hot Product?</span>
        </div>

        <input name="rating" type="number" placeholder="Rating (1-5)" value={data.rating} onChange={handleChange} className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700" />
      </FormCard>

      <PreviewModal open={showPreview} onClose={() => setShowPreview(false)}>
        <ProductCard
          id="preview"
          image={data.image}
          name={data.name || "Untitled product"}
          price={data.price ? parseFloat(data.price) : 0}
          type={data.type}
          compatibleDevices={data.compatibleDevices ? data.compatibleDevices.split(',').map(s => s.trim()) : []}
          isHot={data.isHot}
          onClick={() => { }}
        />
      </PreviewModal>
    </>
  );
};

export default AddProduct;
