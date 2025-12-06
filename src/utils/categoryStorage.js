const STORAGE_KEY = 'admin_categories';

const defaultCategories = [
    { id: 1, name: "Data Cables", count: 51, image: "https://static.thenounproject.com/png/884572-200.png", slug: "data-cables" },
    { id: 2, name: "Adapters", count: 15, image: "https://thumbs.dreamstime.com/b/minimalist-usb-c-to-adapter-icon-black-white-background-414055477.jpg", slug: "adapters" },
    { id: 3, name: "Chargers", count: 18, image: "https://t.pimg.jp/092/860/826/1/92860826.jpg", slug: "chargers" },
    { id: 4, name: "Earphones", count: 12, image: "https://t4.ftcdn.net/jpg/10/56/66/65/360_F_1056666546_5yA2wRTx33DUB1RaKP0Xd1nGecPlvaHb.jpg", slug: "earphones" },
    { id: 5, name: "Car Charger", count: 38, image: "https://www.shutterstock.com/image-vector/usb-car-charger-line-icon-260nw-2145857033.jpg", slug: "car-charger" },
    { id: 6, name: "Glass Protection", count: 18, image: "https://png.pngtree.com/png-clipart/20230131/ourmid/pngtree-anti-crack-tempered-glass-logo-png-image_6577027.png", slug: "glass-protection" }
]


export const getCategories = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCategories));
        return defaultCategories;
    }
    return JSON.parse(stored);
};

export const saveCategory = (category) => {
    const categories = getCategories();
    const slug = category.name.toLowerCase().replace(/\s+/g, '-');
    const newCategory = {
        ...category,
        id: Date.now(),
        slug: slug,
    };
    const updatedCategories = [...categories, newCategory];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCategories));
    return newCategory;
};

export const updateCategory = (updatedCategory) => {
    const categories = getCategories();
    const slug = updatedCategory.name.toLowerCase().replace(/\s+/g, '-');
    const categoryWithSlug = { ...updatedCategory, slug };
    const newCategories = categories.map(c => c.id === categoryWithSlug.id ? categoryWithSlug : c);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newCategories));
    return categoryWithSlug;
};

export const deleteCategory = (id) => {
    const categories = getCategories();
    const filteredCategories = categories.filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredCategories));
    return filteredCategories;
};

export const initializeCategories = () => {
    getCategories();
}
