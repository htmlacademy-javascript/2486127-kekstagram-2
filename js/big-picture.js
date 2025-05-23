import {isEscapeKey} from './util.js';

const COMMENTS_PER_PAGE = 5;

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

const createCommentElement = ({avatar, name, message}) => {
  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = avatar;
  img.alt = name;
  img.width = 35;
  img.height = 35;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = message;

  comment.appendChild(img);
  comment.appendChild(text);

  return comment;
};

const renderComments = (comments, shownCount) => {
  commentsList.innerHTML = '';
  const fragment = document.createDocumentFragment();

  comments.slice(0, shownCount).forEach((comment) => {
    fragment.appendChild(createCommentElement(comment));
  });
  commentsList.appendChild(fragment);
  commentShownCount.textContent = Math.min(shownCount, comments.length);
  commentsLoader.classList.toggle('hidden', shownCount >= comments.length);
};

const onCloseButtonClick = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey (evt)) {
    evt.preventDefault();
    onCloseButtonClick();
  }
}

const openBigPicture = ({url, likes, comments, description}) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  likesCount.textContent = likes;
  socialCaption.textContent = description;

  commentCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  commentTotalCount.textContent = comments.length;

  let shownCommentsCount = Math.min(comments.length, COMMENTS_PER_PAGE);
  renderComments(comments, shownCommentsCount);

  commentsLoader.onclick = () => {
    shownCommentsCount += COMMENTS_PER_PAGE;
    renderComments(comments, shownCommentsCount);
  };

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

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
