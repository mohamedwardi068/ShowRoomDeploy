const STORAGE_KEY = 'admin_products';

const defaultProducts = [
    // ADAPTERS
    {
        id: "BC_01",
        name: "USB-C to USB Adapter",
        price: 25,
        image: "/images/cables/BC_01.png",
        type: "adapters",
        compatibleDevices: ["Samsung", "iPhone", "iPad"],
        rating: 4,
        isHot: false,
    },
    {
        id: "BC_02",
        name: "Lightning to USB-C Adapter",
        price: 30,
        image: "/images/cables/BC_02.png",
        type: "adapters",
        compatibleDevices: ["iPhone", "iPad"],
        rating: 4,
        isHot: false,
    },
    {
        id: "BL_01",
        name: "Type-C to HDMI Adapter",
        price: 45,
        image: "/images/adapters/BL_01.png",
        type: "adapters",
        compatibleDevices: ["Samsung", "MacBook"],
        rating: 5,
        isHot: true,
    },
    {
        id: "AD_01",
        name: "Multi-Port USB Hub",
        price: 55,
        image: "https://placehold.co/300x400/f3f4f6/9ca3af?text=USB+Hub",
        type: "adapters",
        compatibleDevices: ["Universal"],
        rating: 5,
        isHot: true,
    },
    {
        id: "AD_02",
        name: "USB-C to VGA Adapter",
        price: 35,
        image: "https://placehold.co/300x400/f3f4f6/9ca3af?text=VGA",
        type: "adapters",
        compatibleDevices: ["MacBook", "Dell", "HP"],
        rating: 4,
        isHot: false,
    },
    {
        id: "AD_03",
        name: "Mini DisplayPort to HDMI",
        price: 28,
        image: "https://placehold.co/300x400/f3f4f6/9ca3af?text=DisplayPort",
        type: "adapters",
        compatibleDevices: ["MacBook", "Surface"],
        rating: 4,
        isHot: false,
    },
    {
        id: "AD_04",
        name: "Ethernet to USB-C Adapter",
        price: 38,
        image: "https://placehold.co/300x400/f3f4f6/9ca3af?text=Ethernet",
        type: "adapters",
        compatibleDevices: ["Universal"],
        rating: 5,
        isHot: false,
    },
    {
        id: "AD_05",
        name: "USB 3.0 to Ethernet",
        price: 32,
        image: "https://placehold.co/300x400/f3f4f6/9ca3af?text=USB+Ethernet",
        type: "adapters",
        compatibleDevices: ["Universal"],
        rating: 4,
        isHot: false,
    },

    // CHARGERS
    {
        id: "CH_01",
        name: "Fast Wall Charger 20W",
        price: 42,
        image: "https://placehold.co/300x400/f3f4f6/9ca3af?text=20W",
        type: "chargers",
        compatibleDevices: ["iPhone", "Samsung"],
        rating: 5,
        isHot: true,
    },
    {
        id: "CH_02",
        name: "Dual USB Wall Charger",
        price: 35,
        image: "https://placehold.co/300x400/f3f4f6/9ca3af?text=Dual+USB",
        type: "chargers",
        compatibleDevices: ["Universal"],
        rating: 4,
        isHot: false,
    },
    {
        id: "CH_03",
        name: "USB-C PD Charger 65W",
        price: 58,
        image: "https://placehold.co/300x400/f3f4f6/9ca3af?text=65W+PD",
        type: "chargers",
        compatibleDevices: ["MacBook", "iPad", "Samsung"],
        rating: 5,
        isHot: true,
    },
    {
        id: "CH_04",
        name: "Wireless Charging Pad",
        price: 48,
        image: "https://placehold.co/300x400/f3f4f6/9ca3af?text=Wireless",
        type: "chargers",
        compatibleDevices: ["iPhone", "Samsung", "AirPods"],
        rating: 4,
        isHot: true,
    },
    {
        id: "CH_05",
        name: "3-in-1 Wireless Charger",
        price: 75,
        image: "https://placehold.co/300x400/f3f4f6/9ca3af?text=3in1",
        type: "chargers",
        compatibleDevices: ["iPhone", "Apple Watch", "AirPods"],
        rating: 5,
        isHot: true,
    },
    {
        id: "CH_06",
        name: "Car Charger Dual Port",
        price: 28,
        image: "https://placehold.co/300x400/f3f4f6/9ca3af?text=Car",
        type: "chargers",
        compatibleDevices: ["Universal"],
        rating: 4,
        isHot: false,
    },
    {
        id: "CH_07",
        name: "Portable Power Bank 10000mAh",
        price: 45,
        image: "https://placehold.co/300x400/f3f4f6/9ca3af?text=PowerBank",
        type: "chargers",
        compatibleDevices: ["Universal"],
        rating: 5,
        isHot: true,
    },
    {
        id: "CH_08",
        name: "GaN Charger 100W",
        price: 68,
        image: "https://placehold.co/300x400/f3f4f6/9ca3af?text=100W+GaN",
        type: "chargers",
        compatibleDevices: ["MacBook", "iPad", "iPhone"],
        rating: 5,
        isHot: true,
    },
    {
        id: "CH_09",
        name: "Desktop Charging Station",
        price: 52,
        image: "https://placehold.co/300x400/f3f4f6/9ca3af?text=Station",
        type: "chargers",
        compatibleDevices: ["Universal"],
        rating: 4,
        isHot: false,
    },
    {
        id: "CH_10",
        name: "Magnetic Wireless Charger",
        price: 38,
        image: "https://placehold.co/300x400/f3f4f6/9ca3af?text=MagSafe",
        type: "chargers",
        compatibleDevices: ["iPhone 12+"],
        rating: 5,
        isHot: true,
    },

    // EARPHONES
    {
        id: "EP_01",
        name: "USB-C Wired Earphones",
        price: 22,
        image: "https://placehold.co/300x400/f3f4f6/9ca3af?text=USB-C",
        type: "earphones",
        compatibleDevices: ["Samsung", "iPad", "MacBook"],
        rating: 4,
        isHot: false,
    },
    {
        id: "EP_02",
        name: "Lightning Earphones",
        price: 25,
        image: "https://placehold.co/300x400/f3f4f6/9ca3af?text=Lightning",
        type: "earphones",
        compatibleDevices: ["iPhone", "iPad"],
        rating: 4,
        isHot: false,
    },
    {
        id: "EP_03",
        name: "3.5mm Jack Earphones",
        price: 18,
        image: "https://placehold.co/300x400/f3f4f6/9ca3af?text=3.5mm",
        type: "earphones",
        compatibleDevices: ["Universal"],
        rating: 3,
        isHot: false,
    },
    {
        id: "EP_04",
        name: "USB-C Noise Cancelling",
        price: 48,
        image: "https://placehold.co/300x400/f3f4f6/9ca3af?text=ANC",
        type: "earphones",
        compatibleDevices: ["Samsung", "Google Pixel"],
        rating: 5,
        isHot: true,
    },
    {
        id: "EP_05",
        name: "Premium Lightning Earbuds",
        price: 45,
        image: "https://placehold.co/300x400/f3f4f6/9ca3af?text=Premium",
        type: "earphones",
        compatibleDevices: ["iPhone", "iPad"],
        rating: 5,
        isHot: true,
    },
    {
        id: "EP_06",
        name: "Sport USB-C Earphones",
        price: 32,
        image: "https://placehold.co/300x400/f3f4f6/9ca3af?text=Sport",
        type: "earphones",
        compatibleDevices: ["Samsung", "OnePlus"],
        rating: 4,
        isHot: false,
    },
    {
        id: "EP_07",
        name: "In-Ear 3.5mm Earphones",
        price: 15,
        image: "https://placehold.co/300x400/f3f4f6/9ca3af?text=InEar",
        type: "earphones",
        compatibleDevices: ["Universal"],
        rating: 3,
        isHot: false,
    },
    {
        id: "EP_08",
        name: "Studio USB-C Earphones",
        price: 55,
        image: "https://placehold.co/300x400/f3f4f6/9ca3af?text=Studio",
        type: "earphones",
        compatibleDevices: ["Samsung", "iPad Pro"],
        rating: 5,
        isHot: true,
    },
    {
        id: "EP_09",
        name: "Gaming Lightning Earphones",
        price: 42,
        image: "https://placehold.co/300x400/f3f4f6/9ca3af?text=Gaming",
        type: "earphones",
        compatibleDevices: ["iPhone", "iPad"],
        rating: 4,
        isHot: false,
    },
    {
        id: "EP_10",
        name: "Classic 3.5mm Earbuds",
        price: 12,
        image: "https://placehold.co/300x400/f3f4f6/9ca3af?text=Classic",
        type: "earphones",
        compatibleDevices: ["Universal"],
        rating: 3,
        isHot: false,
    },
];

export const getProducts = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProducts));
        return defaultProducts;
    }
    return JSON.parse(stored);
};

export const saveProduct = (product) => {
    const products = getProducts();
    const newProduct = {
        ...product,
        id: `PROD_${Date.now()}`,
    };
    const updatedProducts = [...products, newProduct];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
    return newProduct;
};

export const updateProduct = (updatedProduct) => {
    const products = getProducts();
    const newProducts = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
    return updatedProduct;
};

export const deleteProduct = (id) => {
    const products = getProducts();
    const filteredProducts = products.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredProducts));
    return filteredProducts;
};

export const initializeProducts = () => {
    getProducts();
}
