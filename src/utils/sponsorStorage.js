const STORAGE_KEY = 'admin_sponsors';

const defaultSponsors = [
    {
        id: 'sponsor_1',
        name: 'Tech Hub Downtown',
        description: 'Premium electronics retailer in the heart of the city',
        lat: 48.8566,
        lng: 2.3522,
    },
    {
        id: 'sponsor_2',
        name: 'Digital Plaza',
        description: 'Your one-stop shop for all digital accessories',
        lat: 48.8584,
        lng: 2.2945,
    },
    {
        id: 'sponsor_3',
        name: 'Mobile World',
        description: 'Specialized in mobile accessories and gadgets',
        lat: 48.8606,
        lng: 2.3376,
    },
];

export const getSponsors = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSponsors));
        return defaultSponsors;
    }
    return JSON.parse(stored);
};

export const saveSponsor = (sponsor) => {
    const sponsors = getSponsors();
    const newSponsor = {
        ...sponsor,
        id: `sponsor_${Date.now()}`,
    };
    const updatedSponsors = [...sponsors, newSponsor];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSponsors));
    return newSponsor;
};

export const updateSponsor = (id, updatedData) => {
    const sponsors = getSponsors();
    const updatedSponsors = sponsors.map(s =>
        s.id === id ? { ...s, ...updatedData, id } : s
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSponsors));
    return updatedSponsors.find(s => s.id === id);
};

export const deleteSponsor = (id) => {
    const sponsors = getSponsors();
    const filteredSponsors = sponsors.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredSponsors));
    return filteredSponsors;
};

export const initializeSponsors = () => {
    getSponsors();
};
