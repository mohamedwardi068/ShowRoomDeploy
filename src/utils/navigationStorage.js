const STORAGE_KEY = 'navigation_items';

const defaultNavigationItems = [
    {
        title: "Data Cables",
        slug: "data-cables",
        items: [
            { id: "DC_01", title: "Fast Data Cable USB-C" },
            { id: "DC_02", title: "Premium Braided Lightning" },
            { id: "DC_03", title: "Micro USB Cable 2M" },
            { id: "DC_04", title: "AUX Cable 3.5mm" },
            { id: "DC_05", title: "Audio Adapter Jack" }
        ]
    },
    {
        title: "Adapters",
        slug: "adapters",
        items: [
            { id: "BC_01", title: "USB-C to USB Adapter" },
            { id: "BC_02", title: "Lightning to USB-C" },
            { id: "BL_01", title: "Type-C to HDMI" },
            { id: "AD_01", title: "Multi-Port USB Hub" },
            { id: "AD_02", title: "USB-C to VGA" }
        ]
    },
    {
        title: "Chargers",
        slug: "chargers",
        items: [
            { id: "CH_01", title: "Fast Wall Charger 20W" },
            { id: "CH_02", title: "Dual USB Wall Charger" },
            { id: "CH_03", title: "USB-C PD Charger" },
            { id: "CH_04", title: "Wireless Charging Pad" },
            { id: "CH_05", title: "3-in-1 Wireless Charger" }
        ]
    },
    {
        title: "Earphones",
        slug: "earphones",
        items: [
            { id: "EP_01", title: "USB-C Wired Earphones" },
            { id: "EP_02", title: "Lightning Earphones" },
            { id: "EP_03", title: "3.5mm Jack Earphones" },
            { id: "EP_04", title: "USB-C Noise Cancelling" },
            { id: "EP_05", title: "Premium Lightning" }
        ]
    },
    {
        title: "Car Charger",
        slug: "car-charger",
        items: [
            { id: "CC_01", title: "Dual Port Car Charger" },
            { id: "CC_02", title: "Fast Car Charger PD" },
            { id: "CC_03", title: "Car Charger Lightning" },
            { id: "CC_04", title: "High Power 45W" },
            { id: "CC_05", title: "Mini Car Charger" }
        ]
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
