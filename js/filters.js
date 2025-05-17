import {renderMiniatures} from './miniatures.js';
import {showBigPicture} from './big-picture.js';
import {debounce} from './util.js';

const FILTER_DEBOUNCE_DELAY = 500;
const RANDOM_PHOTOS_COUNT = 10;

const imgFilters = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

// Функция для получения случайного подмножества массива
const getRandomSubset = (array, count) => {
  const shuffled = array.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, array.length));
};

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
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  activeButton.classList.add('img-filters__button--active');
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
    debouncedRender(getDefaultPhotos, filterDefault);
  });

  filterRandom.addEventListener('click', () => {
    debouncedRender(getRandomPhotos, filterRandom);
  });

  filterDiscussed.addEventListener('click', () => {
    debouncedRender(getDiscussedPhotos, filterDiscussed);
  });
};

export {initFilters};
