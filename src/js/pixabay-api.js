import axios from 'axios';

const API_KEY = '49391267-a4a459152a4326aa641ed2d74';
const BASE_URL = 'https://pixabay.com/api/';

let currentPage = 1;

export const fetchImages = async (searchQuery, page) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
      },
    });

    currentPage += 1;
    return {
      hits: response.data.hits,
      totalHits: response.data.totalHits
    };
  } catch (error) {
    console.error('Error fetching images', error);
    throw error;
  }
};

export const resetPage = () => {
  currentPage = 1;
};