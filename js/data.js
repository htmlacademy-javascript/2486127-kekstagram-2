
/*Для выполнения ДЗ module4-task1
Функция по получению случайного числа из диапазона
Функция по генерации случайного индекса элемента из массива
Функция для создания комментария
Функция создания массива комментариев
Функция создания объекта фотографии
Создание массива фотографий
*/


import {getRandomInteger} from './util.js';
import {getRandomArrayElement} from './util.js';

// Константы
const PHOTO_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const AVATAR_COUNT = 6;

const DESCRIPTIONS = [
  'Закат на пляже',
  'Городские огни',
  'Горный пейзаж',
  'Утро на озере',
  'Портрет питомца',
  'Красивый цветок',
  'Замок в горах',
  'Интересная книга',
  'Уютный вечер',
  'Дикая природа'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Александр',
  'Екатерина',
  'Дмитрий',
  'Анастасия',
  'Игорь',
  'Ольга',
  'Сергей',
  'Мария',
  'Андрей',
  'Елена'
];


// Функция для создания комментария
const createComment = (id) => ({
  id,
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  massage: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});


// Функция создания массива комментариев
const createComments = () => {
  const commentsCount = getRandomInteger (MIN_COMMENTS, MAX_COMMENTS);
  return Array.from({length: commentsCount}, (_, index) => createComment(index + 1));
};


// Функция создания объекта фотографии
const createPhoto = (_, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: createComments()
});


// Создание массива фотографий
const photos = Array.from({ length: PHOTO_COUNT }, createPhoto);

window.console.log(photos);

