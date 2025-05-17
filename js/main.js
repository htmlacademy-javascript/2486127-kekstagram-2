import {renderMiniatures} from './miniatures.js';
import {showBigPicture} from './big-picture.js';
import {openEditingForm} from './form.js';
import {loadPhotos} from './data.js';
import {initFilters} from './filters.js';

const DATA_ERROR_TIMEOUT = 5000;

const showDataError = () => {
  const template = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorElement = template.cloneNode(true);
  document.body.appendChild(errorElement);
  setTimeout(() => {
    errorElement.remove();
  }, DATA_ERROR_TIMEOUT);
};

const init = async () => {
  try {
    const photos = await loadPhotos();
    renderMiniatures(photos);
    showBigPicture(photos);
    initFilters(photos);
  } catch {
    showDataError();
  }
  openEditingForm();
};

init();
