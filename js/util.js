// Функция по получению случайного числа из диапазона
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a,b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция по генерации случайного индекса элемента из массива
const getRandomArrayElement = (elements) => elements [getRandomInteger(0, elements.length - 1)];

// Функция для проверки клавиши Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

// Функция для получения случайного подмножества массива
const getRandomSubset = (array, count) => {
  const shuffled = array.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, array.length));
};

// Устранение дребезга
function debounce(callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {getRandomInteger, getRandomArrayElement, isEscapeKey, getRandomSubset, debounce};

