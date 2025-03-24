// Функция по получению случайного числа из диапазона
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a,b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция по генерации случайного индекса элемента из массива
const getRandomArrayElement = (elements) => elements [getRandomInteger(0, elements.length - 1)];

export {getRandomInteger};
export {getRandomArrayElement};

