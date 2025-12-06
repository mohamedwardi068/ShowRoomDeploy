const STORAGE_KEY = 'admin_sliders';

const defaultSliders = [
    {
        _id: 'slider_1',
        image: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a?w=1200&h=700&fit=crop',
        title: 'Premium Accessories for Every Device',
        description: 'Discover our wide selection of high-quality chargers, cables, and adapters designed for maximum compatibility and durability.',
        button1: 'Shop Now',
        button1Link: '#products',
        button2: 'Learn More',
        button2Link: '#about',
    },
    {
        _id: 'slider_2',
        image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=1200&h=700&fit=crop',
        title: 'Fast Charging Solutions',
        description: 'Power up your devices quickly with our range of fast chargers and wireless charging pads. Compatible with all major brands.',
        button1: 'View Chargers',
        button1Link: '#chargers',
        button2: 'Compare Products',
        button2Link: '#compare',
    },
    {
        _id: 'slider_3',
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200&h=700&fit=crop',
        title: 'Quality Earphones & Audio',
        description: 'Experience crystal-clear sound with our premium earphones collection. From USB-C to Lightning, we have the perfect audio solution.',
        button1: 'Browse Audio',
        button1Link: '#earphones',
        button2: 'See Details',
        button2Link: '#details',
    },
];

export const getSliders = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSliders));
        return defaultSliders;
    }
    return JSON.parse(stored);
};

export const saveSlider = (slider) => {
    const sliders = getSliders();
    const newSlider = {
        ...slider,
        _id: `slider_${Date.now()}`,
    };
    const updatedSliders = [...sliders, newSlider];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSliders));
    return newSlider;
};

export const updateSlider = (id, updatedData) => {
    const sliders = getSliders();
    const updatedSliders = sliders.map(s =>
        s._id === id ? { ...s, ...updatedData, _id: id } : s
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSliders));
    return updatedSliders.find(s => s._id === id);
};

export const deleteSlider = (id) => {
    const sliders = getSliders();
    const filteredSliders = sliders.filter(s => s._id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredSliders));
    return filteredSliders;
};

export const initializeSliders = () => {
    getSliders();
};
