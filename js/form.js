// form.js
import {isEscapeKey} from './util.js';
import {initImageEditor, resetImageEditor} from './image-editor.js';
import {sendData} from './api.js';

const HASHTAGS_MAXCOUNT = 5;
const COMMENT_MAXLENGTH = 140;
const VALID_HASHTAG_STRING = /^#[a-zа-яё0-9]{1,19}$/i;
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...',
};
const errorMessages = {
  INVALID_HASHTAG_STRING: 'Хэш-тег должен начинаться с #, состоять из букв и чисел без пробелов, и быть не длиннее 20 символов, включая #',
  COMMENT_MAXLENGTH_ERROR: `Максимальная длина комментария ${COMMENT_MAXLENGTH} символов`,
  COUNT_ERROR: `Нельзя указать больше ${HASHTAGS_MAXCOUNT} хэш-тегов`,
  UNIQUENESS_ERROR: 'Хэш-теги не должны повторяться',
};

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const uploadHashtag = document.querySelector('.text__hashtags');
const uploadComment = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectPreviews = document.querySelectorAll('.effects__preview');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error-text',
  errorClass: 'img-upload__field-wrapper--error'
}, false);

// Проверка хэштэгов
const getHashtags = (value) => value.trim().split(/\s+/);

const checkSymbols = (value) => getHashtags(value).every((hashtag) => VALID_HASHTAG_STRING.test(hashtag));

const checkCount = (value) => getHashtags(value).length <= HASHTAGS_MAXCOUNT;

const checkUniqueness = (value) => {
  const hashtags = getHashtags(value);
  const modifiedHashtags = hashtags.map((hashtag) => hashtag.toLowerCase());
  return modifiedHashtags.length === new Set(modifiedHashtags).size;
};

// Проверка комментариев
const checkComment = (value) => value.length <= COMMENT_MAXLENGTH;

// Проверка, является ли текстовое поле активным
const isInputOnFocus = () =>
  document.activeElement === uploadHashtag || document.activeElement === uploadComment;

// Закрытие формы
const onUploadCancelButtonClick = () => {
  uploadForm.reset();
  pristine.reset();
  resetImageEditor();
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscKeydown);
  imagePreview.src = '';
  effectPreviews.forEach((preview) => {
    preview.style.backgroundImage = '';
  });
};

// Закрытие по esc
const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !isInputOnFocus()) {
    evt.preventDefault();
    onUploadCancelButtonClick();
  }
};

// Показ сообщения об успехе
const showSuccessMessage = () => {
  const template = document.querySelector('#success').content.querySelector('.success');
  const successElement = template.cloneNode(true);
  const successButton = successElement.querySelector('.success__button');

  const closeSuccess = () => {
    successElement.remove();
    document.removeEventListener('keydown', onSuccessKeydown);
    document.removeEventListener('click', onSuccessClick);
  };

  function onSuccessKeydown(evt) {
    if (isEscapeKey(evt)) {
      closeSuccess();
    }
  }

  function onSuccessClick(evt) {
    if (!evt.target.closest('.success__inner')) {
      closeSuccess();
    }
  }

  successButton.addEventListener('click', closeSuccess);
  document.addEventListener('keydown', onSuccessKeydown);
  document.addEventListener('click', onSuccessClick);
  document.body.appendChild(successElement);
};

// Показ сообщения об ошибке
const showErrorMessage = () => {
  const template = document.querySelector('#error').content.querySelector('.error');
  const errorElement = template.cloneNode(true);
  const errorButton = errorElement.querySelector('.error__button');

  const closeError = () => {
    errorElement.remove();
    document.removeEventListener('keydown', onErrorKeydown);
    document.removeEventListener('click', onErrorClick);
  };

  function onErrorKeydown(evt) {
    if (isEscapeKey(evt)) {
      closeError();
    }
  }

  function onErrorClick(evt) {
    if (!evt.target.closest('.error__inner')) {
      closeError();
    }
  }

  errorButton.addEventListener('click', closeError);
  document.addEventListener('keydown', onErrorKeydown);
  document.addEventListener('click', onErrorClick);
  document.body.appendChild(errorElement);
};

// Блокировка/разблокировка кнопки отправки
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

// Валидаторы хэштэгов и комментариев
pristine.addValidator(uploadHashtag, checkSymbols, errorMessages.INVALID_HASHTAG_STRING);
pristine.addValidator(uploadHashtag, checkCount, errorMessages.COUNT_ERROR);
pristine.addValidator(uploadHashtag, checkUniqueness, errorMessages.UNIQUENESS_ERROR);
pristine.addValidator(uploadComment, checkComment, errorMessages.COMMENT_MAXLENGTH_ERROR);

// Открытие формы редактирования и отправка формы
const openEditingForm = () => {
  uploadInput.addEventListener('change', () => {
    const file = uploadInput.files[0];
    if (file && file.type.startsWith('image/')) {
      const fileUrl = URL.createObjectURL(file);
      imagePreview.src = fileUrl;

      // Обновление миниатюр эффектов
      effectPreviews.forEach((preview) => {
        preview.style.backgroundImage = `url(${fileUrl})`;
      });

      uploadCancelButton.addEventListener('click', () => {
        URL.revokeObjectURL(fileUrl);
      }, { once: true });

      uploadOverlay.classList.remove('hidden');
      document.addEventListener('keydown', onDocumentEscKeydown);
      document.body.classList.add('modal-open');
      uploadCancelButton.addEventListener('click', onUploadCancelButtonClick);
      initImageEditor();
    }
  });

  uploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      try {
        await sendData(new FormData(uploadForm));
        onUploadCancelButtonClick();
        showSuccessMessage();
      } catch {
        showErrorMessage();
      } finally {
        unblockSubmitButton();
      }
    }
  });
};

export {openEditingForm};
