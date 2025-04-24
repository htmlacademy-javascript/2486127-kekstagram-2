import { isEscapeKey } from './util.js';

const COMMENTS_PER_PAGE = 5;

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

// Функция для отображения комментариев
const renderComments = (comments, shownCount) => {
  commentsList.innerHTML = ''; // Очищаем список
  const fragment = document.createDocumentFragment();

  // Показ комментариев до shownCount
  comments.slice(0, shownCount).forEach((comment) => {
    fragment.appendChild(createCommentElement(comment));
  });

  commentsList.appendChild(fragment);

  // Обновление счётчика
  commentShownCount.textContent = Math.min(shownCount, comments.length);


  // Видимость кнопки
  commentsLoader.classList.toggle('hidden', shownCount >= comments.length);
};

// Функция для закрытия окна
const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

// Обработчик нажатия клавиши Esc
function onDocumentKeydown (evt) {
  if (isEscapeKey (evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

// Функция для открытия окна и заполнения данными
const openBigPicture = ({url, likes, comments, description}) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // Заполнение данных
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  likesCount.textContent = likes;
  socialCaption.textContent = description;

  // Показ блоков
  commentCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');


  // Общее количество комментариев
  commentTotalCount.textContent = comments.length;

  // Показ комментариев
  let shownCommentsCount = Math.min(comments.length, COMMENTS_PER_PAGE);
  renderComments(comments, shownCommentsCount);

  // Обработчик для кнопки "Загрузить ещё"
  commentsLoader.onclick = () => {
    shownCommentsCount += COMMENTS_PER_PAGE;
    renderComments(comments, shownCommentsCount);
  };

  // Обработчики закрытия
  closeButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onDocumentKeydown);
};

// Функция для связки с миниатюрами
const showBigPicture = (photos) => {
  const picturesContainer = document.querySelector('.pictures');

  picturesContainer.addEventListener('click', (evt) => {
    const picture = evt.target.closest('.picture');
    if (picture) {
      evt.preventDefault();
      const photoId = Number(picture.dataset.id);
      const photo = photos.find(({id}) => id === photoId);
      if (photo) {
        openBigPicture(photo);
      }
    }
  });
};

export {showBigPicture};
