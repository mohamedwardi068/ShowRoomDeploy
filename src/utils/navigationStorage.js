const STORAGE_KEY = 'navigation_items_v2';

const defaultNavigationItems = [
    {
        title: "Data Cables",
        slug: "data-cables",
        items: []
    },
    {
        title: "Adapters",
        slug: "adapters",
        items: []
    },
    {
        title: "Chargers",
        slug: "chargers",
        items: []
    },
    {
        title: "Earphones",
        slug: "earphones",
        items: []
    },
    {
        title: "Car Charger",
        slug: "car-charger",
        items: []
    },
    {
        title: "Glass Protection",
        slug: "glass-protection",
        items: [
            { title: "Clear", filter: "Clear", type: "filter-link" },
            { title: "Print", filter: "Print", type: "filter-link" }
        ]
    },
];

export const getNavigationItems = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultNavigationItems));
        return defaultNavigationItems;
    }
    return JSON.parse(stored);
};

export const saveNavigationItems = (items) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('navigationUpdated'));
    return items;
};

export const addCategory = (category) => {
    const items = getNavigationItems();
    const newItems = [...items, category];
    saveNavigationItems(newItems);
    return newItems;
};

export const addToCategory = (slug, product) => {
    const items = getNavigationItems();
    const newItems = items.map(item => {
        if (item.slug === slug) {
            // Check for duplicate ID
            const exists = item.items.some(i => i.id === product.id);
            if (!exists) {
                return { ...item, items: [...item.items, { id: product.id, title: product.name || product.title }] };
            }
        }
        return item;
    });
    saveNavigationItems(newItems);
    return newItems;
};

export const initializeNavigation = () => {
    getNavigationItems();
};
