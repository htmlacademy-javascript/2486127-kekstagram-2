

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

// Удаление существующих миниатюр
const clearMiniatures = () => {
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
};

// Функции фильтрации
const getDefaultPhotos = (photos) => photos.slice();

const getRandomPhotos = (photos) => getRandomSubset(photos, RANDOM_PHOTOS_COUNT);

const getDiscussedPhotos = (photos) => photos.slice().sort((a, b) => b.comments.length - a.comments.length);

// Обновление активного фильтра
const setActiveFilter = (activeButton) => {
  if (activeButton === currentActiveButton) {
    return;
  }
  currentActiveButton.classList.remove('img-filters__button--active');
  activeButton.classList.add('img-filters__button--active');
  currentActiveButton = activeButton;
};

// Отрисовка фотографий с фильтром
const renderFilteredPhotos = (photos, filterFn, activeButton) => {
  clearMiniatures();
  const filteredPhotos = filterFn(photos);
  renderMiniatures(filteredPhotos);
  showBigPicture(filteredPhotos);
  setActiveFilter(activeButton);
};

// Инициализация фильтров
const initFilters = (photos) => {
  imgFilters.classList.remove('img-filters--inactive');

  const debouncedRender = debounce((filterFn, activeButton) => {
    renderFilteredPhotos(photos, filterFn, activeButton);
  }, FILTER_DEBOUNCE_DELAY);

  filterDefault.addEventListener('click', () => {
    if (!filterDefault.classList.contains('img-filters__button--active')) {
      debouncedRender(getDefaultPhotos, filterDefault);
    }
  });

  filterRandom.addEventListener('click', () => {
    if (!filterRandom.classList.contains('img-filters__button--active')) {
      debouncedRender(getRandomPhotos, filterRandom);
    }
  });

  filterDiscussed.addEventListener('click', () => {
    if (!filterDiscussed.classList.contains('img-filters__button--active')) {
      debouncedRender(getDiscussedPhotos, filterDiscussed);
    }
  });
};

export {initFilters};
