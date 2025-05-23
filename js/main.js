import {renderMiniatures} from './miniatures.js';
import {showBigPicture} from './big-picture.js';
import {openEditingForm} from './form.js';
import {loadPhotos} from './data.js';
import {initializeFilters} from './filters.js';

const DATA_ERROR_TIMEOUT = 5000;

const showDataError = () => {
  const template = document.querySelector('#data-error').content.querySelector('.data-error');
  const errorMessage = template.cloneNode(true);
  document.body.appendChild(errorMessage);
  setTimeout(() => {
    errorMessage.remove();
  }, DATA_ERROR_TIMEOUT);
};

const init = async () => {
  openEditingForm();

  try {
    const photos = await loadPhotos();
    renderMiniatures(photos);
    showBigPicture(photos);
    initializeFilters(photos);
  } catch {
    showDataError();
  }
};

init();
