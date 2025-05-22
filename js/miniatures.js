const createPicture = ({id, url, description, likes, comments}) => {
  const templatePicture = document.querySelector('#picture').content.querySelector('.picture');
  const picture = templatePicture.cloneNode(true);
  picture.dataset.id = id;
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__img').alt = description;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;
  return picture;
};


const renderMiniatures = (photos) => {
  const listFragment = document.createDocumentFragment();

  for (const photo of photos) {
    listFragment.appendChild(createPicture(photo));
  }

  document.querySelector('.pictures').appendChild(listFragment);
};

export {renderMiniatures};
