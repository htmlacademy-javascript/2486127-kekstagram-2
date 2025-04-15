import { isEscapeKey } from './util.js';

// Элементы DOM для работы с полноразмерным окном
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentShownCount = bigPicture.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPicture.querySelector('.social__comment-total-count');
const commentsList = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

// Функция для создания разметки одного комментария
const createCommentElement = ({avatar, name, message}) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');
  comment.innerHTML = `
    <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
    <p class="social__text">${message}</p>
  `;
  return comment;
};

// Функция для заполнения списка комментариев
const renderComments = (comments) => {
  commentsList.innerHTML = '';
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    fragment.appendChild(createCommentElement(comment));
  });
  commentsList.appendChild(fragment);
};

// Функция для закрытия окна
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

// Обработчик нажатия клавиши Esc
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

// Функция для открытия окна и заполнения данными
const openBigPicture = ({url, likes, comments, description}) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // Заполнение данных
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  likesCount.textContent = likes;
  commentShownCount.textContent = comments.length;
  commentTotalCount.textContent = comments.length;
  socialCaption.textContent = description;

  // Отрисовка комментариев
  renderComments(comments);

  // Скрытие блоков счетчика и загрузки комментариев
  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  // Обработчик закрытия по кнопке
  closeButton.addEventListener('click', closeBigPicture);

  // Обработчик Esc
  document.addEventListener('keydown', onDocumentKeydown);
};

// Функция для связки с миниатюрами (делегирование событий)
const showBigPicture = (photos) => {
  const picturesContainer = document.querySelector('.pictures');

  picturesContainer.addEventListener('click', (evt) => {
    const picture = evt.target.closest('.picture');
    if (picture) {
      evt.preventDefault();
      const photoId = Number(picture.querySelector('.picture__img').src.match(/(\d+)\.jpg$/)[1]);
      const photo = photos.find(({id}) => id === photoId);
      if (photo) {
        openBigPicture(photo);
      }
    }
  });
};

export {showBigPicture};
