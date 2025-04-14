import {photos} from './data.js'; // Импортируем массив фотографий

// Элементы DOM
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
const body = document.querySelector('body');

// Функция для создания разметки комментария
const createCommentElement = ({ avatar, name, message }) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  commentElement.innerHTML = `
    <img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35">
    <p class="social__text">${message}</p>
  `;

  return commentElement;
};

// Функция для заполнения комментариев
const renderComments = (comments) => {
  commentsList.innerHTML = ''; // Очищаем текущий список комментариев
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    fragment.appendChild(commentElement);
  });

  commentsList.appendChild(fragment);
};

// Функция для заполнения данных полноразмерного изображения
const fillBigPicture = ({ url, description, likes, comments }) => {
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  likesCount.textContent = likes;
  commentShownCount.textContent = comments.length; // Пока показываем все комментарии
  commentTotalCount.textContent = comments.length;
  socialCaption.textContent = description;

  renderComments(comments);
};

// Функция для открытия окна
const openBigPicture = (photo) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  // Скрываем блоки счётчика комментариев и загрузки новых комментариев
  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  fillBigPicture(photo);
};

// Функция для закрытия окна
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

// Обработчик закрытия по клавише Esc
const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

// Обработчик закрытия по клику на кнопку
closeButton.addEventListener('click', () => {
  closeBigPicture();
});

// Функция для инициализации кликов по миниатюрам
const showBigPicture = (photos) => {
  const pictureList = document.querySelector('.pictures');

  pictureList.addEventListener('click', (evt) => {
    const picture = evt.target.closest('.picture');
    if (picture) {
      evt.preventDefault();
      const photoId = parseInt(picture.querySelector('.picture__img').src.match(/photos\/(\d+)\.jpg/)[1], 10);
      const photo = photos.find((item) => item.id === photoId);
      if (photo) {
        openBigPicture(photo);
      }
    }
  });

  // Добавляем обработчик для закрытия по Esc
  document.addEventListener('keydown', onDocumentKeydown);
};

export {showBigPicture};
