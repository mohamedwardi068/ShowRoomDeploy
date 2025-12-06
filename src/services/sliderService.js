import api from './api';

export const getAllSliders = async () => {
    const response = await api.get('/sliders');
    return response.data;
};

export const getSlider = async (id) => {
    const response = await api.get(`/sliders/${id}`);
    return response.data;
};

export const createSlider = async (sliderData) => {
    const response = await api.post('/sliders', sliderData);
    return response.data;
};

export const updateSlider = async (id, sliderData) => {
    const response = await api.patch(`/sliders/${id}`, sliderData);
    return response.data;
};

export const deleteSlider = async (id) => {
    const response = await api.delete(`/sliders/${id}`);
    return response.data;
};
