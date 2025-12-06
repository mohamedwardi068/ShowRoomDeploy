const STORAGE_KEY = 'admin_users';

// Default admin credentials
const defaultAdmins = [
    {
        id: 'admin_1',
        username: 'admin',
        password: 'admin123', // In a real app, this would be hashed
    }
];

export const getAdmins = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultAdmins));
        return defaultAdmins;
    }
    return JSON.parse(stored);
};

export const authenticateAdmin = (username, password) => {
    const admins = getAdmins();
    const admin = admins.find(
        a => a.username === username && a.password === password
    );

    if (admin) {
        // Generate a fake token
        const token = btoa(`${username}:${Date.now()}`);
        return { success: true, token, admin: { id: admin.id, username: admin.username } };
    }

    return { success: false, message: 'Invalid username or password' };
};

export const validateToken = (token) => {
    // Simple token validation - just check if it exists
    if (!token) return false;

    try {
        // Decode and check if it's a valid base64 string
        atob(token);
        return true;
    } catch (e) {
        return false;
    }
};

export const addAdmin = (username, password) => {
    const admins = getAdmins();
    const newAdmin = {
        id: `admin_${Date.now()}`,
        username,
        password,
    };
    const updatedAdmins = [...admins, newAdmin];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedAdmins));
    return newAdmin;
};

export const initializeAdmins = () => {
    getAdmins();
};
