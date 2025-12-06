import React, { useState, useEffect } from "react";
import { Eye, Heart, Sliders } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductModal from "./ProductModal";

// --- MAIN PREMIUM CARD ---
const ProductCard = ({
    id,
    image,
    name,
    price,
    type,
    compatibleDevices,
    isHot,
    onClick,
}) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    // Like state
    const [liked, setLiked] = useState(false);

    // Compare state
    const [compared, setCompared] = useState(false);

    // Load localStorage states on mount
    useEffect(() => {
        const wl = JSON.parse(localStorage.getItem("wishlist") || "[]");
        const cmp = JSON.parse(localStorage.getItem("compare") || "[]");

        setLiked(wl.some(item => item.id === id));
        setCompared(cmp.some(item => item.id === id));
    }, [id]);

    // LIKE HANDLER (FULL OBJECT VERSION)
    const toggleLike = (e) => {
        e.stopPropagation();

        let wl = JSON.parse(localStorage.getItem("wishlist") || "[]");

        const exists = wl.some(item => item.id === id);

        if (exists) {
            wl = wl.filter(item => item.id !== id);
            setLiked(false);
        } else {
            wl.push({
                id,
                name,
                image,
                price,
                type,
                compatibleDevices,
            });
            setLiked(true);
        }

        localStorage.setItem("wishlist", JSON.stringify(wl));
        window.dispatchEvent(new Event("wishlistUpdated"));
    };

    // COMPARE HANDLER (unchanged)
    const toggleCompare = (e) => {
        e.stopPropagation();

        let compareList = JSON.parse(localStorage.getItem("compare") || "[]");
        const exists = compareList.some(item => item.id === id);

        if (exists) {
            compareList = compareList.filter(item => item.id !== id);
            setCompared(false);
        } else {
            compareList.push({
                id,
                name,
                price,
                image,
                type,
                compatibleDevices,
            });
            setCompared(true);
        }

        localStorage.setItem("compare", JSON.stringify(compareList));
        window.dispatchEvent(new Event("compareUpdated"));
    };

    // Modal product data - matches ProductModal.js structure
    const modalProduct = {
        image: image,
        images: [image],
        title: name,
        price: price,
        description: `Compatible with ${compatibleDevices?.join(", ") || type}.`,
        brand: type,
        category: type,
        categorySlug: type?.toLowerCase().replace(/\s+/g, '-'),
    };

    // Handle card click - navigate to product page
    const handleCardClick = () => {
        if (onClick) {
            onClick();
        } else {
            navigate(`/product/${id}`);
        }
    };

    return (
        <>
            {/* CARD */}
            <div
                onClick={handleCardClick}
                className="group w-full bg-white rounded-2xl border border-transparent hover:border-gray-200 overflow-hidden shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300"
            >
                {/* IMAGE */}
                <div className="relative overflow-hidden bg-gray-50 aspect-[3/4]">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                                "https://placehold.co/300x400/f3f4f6/9ca3af?text=Product";
                        }}
                    />

                    {/* HOT BADGE */}
                    {isHot && (
                        <div className="absolute top-3 right-3 bg-black text-white px-3 py-1 rounded-full text-xs font-medium tracking-wide shadow-md">
                            NEW
                        </div>
                    )}

                    {/* ACTION ICONS */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">

                        {/* LIKE */}
                        <button
                            onClick={toggleLike}
                            className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition"
                        >
                            <Heart
                                size={18}
                                className={liked ? "text-red-600" : "text-gray-700"}
                                fill={liked ? "red" : "none"}
                            />
                        </button>

                        {/* QUICK VIEW */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowModal(true);
                            }}
                            className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition"
                        >
                            <Eye size={18} className="text-gray-700" />
                        </button>

                        {/* COMPARE */}
                        <button
                            onClick={toggleCompare}
                            className="bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition"
                        >
                            <Sliders
                                size={18}
                                className={compared ? "text-blue-700" : "text-gray-700"}
                            />
                        </button>
                    </div>
                </div>

                {/* PRODUCT INFO */}
                <div className="p-4 text-center">
                    <h3 className="text-sm sm:text-base font-medium text-gray-900 tracking-wide line-clamp-2 min-h-[2.6rem] group-hover:text-gray-700 transition">
                        {name}
                    </h3>

                    <p className="text-xs text-gray-500 tracking-wide mt-1 line-clamp-1">
                        {compatibleDevices?.join(" · ") || type}
                    </p>

                    <div className="mt-3">
                        <span className="text-xl font-semibold text-gray-900">
                            {price.toFixed(2)} DT
                        </span>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {showModal && (
                <ProductModal
                    product={modalProduct}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
};

export default ProductCard;
