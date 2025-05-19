import {renderMiniatures} from './miniatures.js';
import {showBigPicture} from './big-picture.js';
import {debounce, getRandomSubset} from './util.js';

const FILTER_DEBOUNCE_DELAY = 500;
const RANDOM_PHOTOS_COUNT = 10;

const imgFilters = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

let currentActiveButton = filterDefault;

const clearMiniatures = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
};

const getDefaultPhotos = (photos) => photos.slice();
const getRandomPhotos = (photos) => getRandomSubset(photos, RANDOM_PHOTOS_COUNT);
const getDiscussedPhotos = (photos) => photos.slice().sort((a, b) => b.comments.length - a.comments.length);

const setActiveFilter = (activeButton) => {
  if (activeButton === currentActiveButton) {
    return;
  }
  currentActiveButton.classList.remove('img-filters__button--active');
  activeButton.classList.add('img-filters__button--active');
  currentActiveButton = activeButton;
};

const renderFilteredPhotos = (photos, filterFn, activeButton) => {
  clearMiniatures();
  const filteredPhotos = filterFn(photos);
  renderMiniatures(filteredPhotos);
  showBigPicture(filteredPhotos);
  setActiveFilter(activeButton);
};

const initFilters = (photos) => {
  imgFilters.classList.remove('img-filters--inactive');

  const debouncedRender = debounce((filterFn, activeButton) => {
    renderFilteredPhotos(photos, filterFn, activeButton);
  }, FILTER_DEBOUNCE_DELAY);

  filterDefault.addEventListener('click', () => {
    if (filterDefault !== currentActiveButton) {
      debouncedRender(getDefaultPhotos, filterDefault);
    }
  });

  filterRandom.addEventListener('click', () => {
    if (filterRandom !== currentActiveButton) {
      debouncedRender(getRandomPhotos, filterRandom);
    }
  });

  filterDiscussed.addEventListener('click', () => {
    if (filterDiscussed !== currentActiveButton) {
      debouncedRender(getDiscussedPhotos, filterDiscussed);
    }
  });
};

export {initFilters};
