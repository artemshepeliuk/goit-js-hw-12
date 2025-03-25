import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";
import { fetchImages, resetPage } from './js/pixabay-api.js';
import { showLoader, hideLoader, clearGallery, renderImages, showNoImagesFoundMessage, showEndMessage, scrollToNewImages } from './js/render-functions';

let query = '';
let currentPage = 1;

const form = document.querySelector('.form');
const searchInput = form.querySelector('input[name="search-text"]');
const loadMoreButton = document.querySelector('.load-more');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  query = searchInput.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Input error',
      message: 'Please enter a search term.',
    });
    return;
  }

  searchInput.value = '';
  
  resetPage();
  currentPage = 1;
  showLoader();
  clearGallery();

  showEndMessage(false);

  try {
    const { hits, totalHits } = await fetchImages(query, currentPage);
    
    if (hits.length === 0) {
      showNoImagesFoundMessage();
    } else {
      renderImages(hits);


      if (hits.length >= totalHits) {
        showEndMessage(true);
      } else {
        loadMoreButton.classList.remove('hidden');
      }
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again.',
    });
  } finally {
    hideLoader();
  }
});

loadMoreButton.addEventListener('click', async () => {
  showLoader();
  
  try {
    currentPage += 1;
    const { hits, totalHits } = await fetchImages(query, currentPage);

    if (hits.length > 0) {
      renderImages(hits);
      scrollToNewImages();

      if (hits.length + (currentPage - 1) * 15 >= totalHits) {
        showEndMessage(true);
      }
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again.',
    });
  } finally {
    hideLoader();
  }
});
