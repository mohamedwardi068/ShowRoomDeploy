// components/AddCategory.js
import React, { useState } from "react";
import { List } from "lucide-react";
import FormCard from "./FormCardProduct";
import CategoryPreviewCard from "./CategoryPreviewCard";
import CategoryModal from "./CategoryModal ";
import { saveCategory } from '../../utils/categoryStorage';

const AddCategory = ({ onCancel, onSave }) => {
  const [data, setData] = useState({
    name: "",
    count: "",
    image: "",
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = () => {
    if (!data.name || !data.image) {
      alert('Please fill in at least the Category Name and Image.');
      return;
    }
    const category = {
      ...data,
      count: parseInt(data.count) || 0,
    };

    saveCategory(category);
    alert("Category Added Successfully!");
    if (onSave) onSave();

    setData({ name: "", count: "", image: "" });
  };

  return (
    <>
      <FormCard
        title="Define Product Categories"
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
      </CategoryModal >

    </>
  );
};

export default AddCategory;
