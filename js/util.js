const DEBOUNCE_DEFAULT_DELAY = 500;

const isEscapeKey = (evt) => evt.key === 'Escape';

const getRandomSubset = (array, count) => {
  const shuffled = array.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, array.length));
};

function debounce(callback, timeoutDelay = DEBOUNCE_DEFAULT_DELAY) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {isEscapeKey, getRandomSubset, debounce};

