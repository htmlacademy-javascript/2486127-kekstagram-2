import {isEscapeKey} from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadCancelButton = uploadForm.querySelector('.img-upload__cancel');
const uploadHashtag = uploadForm.querySelector('.text__hashtags');
const uploadComment = uploadForm.querySelector('.text__description');

const HASHTAGS_MAXCOUNT = 5;
const COMMENT_MAXLENGTH = 140;
const VALID_HASHTAG_STRING = /^#[a-zа-яё0-9]{1,19}$/i;
const errorMessages = {
  INVALID_HASHTAG_STRING: 'Хэш-тег должен начинаться с #, состоять из букв и чисел без пробелов, и быть не диннее 20 символов, включая #',
  COMMENT_MAXLENGTH_ERROR: `Максимальная длина комментария ${COMMENT_MAXLENGTH} символов`,
  COUNT_ERROR: `Нельзя указать больше ${HASHTAGS_MAXCOUNT} хэш-тегов`,
  UNIQUENESS_ERROR: 'Хэш-теги не должны повторяться',
};

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

// Закрытие по esc
const onDocumentEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !isInputOnFocus()) {
    evt.preventDefault();
    onUploadCancelButtonClick();
  }
};

// Открытие формы редактирования
const openEditingForm = () => {
  uploadInput.addEventListener('change', () => {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentEscKeydown);
    document.body.classList.add('modal-open');
    uploadCancelButton.addEventListener('click', onUploadCancelButtonClick);
  });
};

// Закрытие формы
function onUploadCancelButtonClick() {
  uploadForm.reset();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentEscKeydown);
}

// Валидаторы хэштэгов и комментариев
pristine.addValidator(uploadHashtag, checkSymbols, errorMessages.INVALID_HASHTAG_STRING);
pristine.addValidator(uploadHashtag, checkCount, errorMessages.COUNT_ERROR);
pristine.addValidator(uploadHashtag, checkUniqueness, errorMessages.UNIQUENESS_ERROR);
pristine.addValidator(uploadComment, checkComment, errorMessages.COMMENT_MAXLENGTH_ERROR);

// Проверка формы перед отправкой на сервер
uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    uploadForm.submit();
  }
});

export {openEditingForm};
