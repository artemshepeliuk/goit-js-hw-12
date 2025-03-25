import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');
const endMessage = document.querySelector('.end-message');

document.addEventListener('DOMContentLoaded', () => {
  loader.classList.add('hidden');
  endMessage.classList.add('hidden');
  loadMoreButton.classList.add('hidden');
});

export const showLoader = () => {
  loader.classList.remove('hidden');
};

export const hideLoader = () => {
  loader.classList.add('hidden');
};

export const clearGallery = () => {
  gallery.innerHTML = '';
};

export const renderImages = (images) => {
  const markup = images
    .map(
      (image) => `
        <li class="gallery-item">
          <a href="${image.largeImageURL}">
            <img class="gallery-img" src="${image.webformatURL}" alt="${image.tags}" />
          </a>
          <div class="info">
            <p><b>Likes</b> ${image.likes}</p>
            <p><b>Views</b> ${image.views}</p>
            <p><b>Comments</b> ${image.comments}</p>
            <p><b>Downloads</b> ${image.downloads}</p>
          </div>
        </li>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);

  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();

  loadMoreButton.classList.remove('hidden');
};

export const showEndMessage = () => {
  loadMoreButton.classList.add('hidden');
  endMessage.classList.remove('hidden');
};

export const showNoImagesFoundMessage = () => {
  iziToast.error({
    title: 'Sorry, no images found',
    message: 'Please try again with a different search term.',
  });
};

export const scrollToNewImages = () => {
  const galleryItemHeight = gallery.querySelector('.gallery-item').getBoundingClientRect().height;
 window.scrollBy({
    top: galleryItemHeight * 2,
    behavior: 'smooth',
  });
};
