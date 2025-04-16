// Отображение фотографий других пользователей (отрисовка миниатюр)

const renderMiniatures = (photos) => {

  const pictureList = document.querySelector('.pictures');
  const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
  const listFragment = document.createDocumentFragment();

  photos.forEach(({id, url, description, likes, comments}) => {
    const picture = templatePicture.cloneNode(true);
    picture.dataset.id = id;
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__img').alt = description;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments.length;
    listFragment.appendChild(picture);
  });

  pictureList.appendChild(listFragment);
};

export {renderMiniatures};
