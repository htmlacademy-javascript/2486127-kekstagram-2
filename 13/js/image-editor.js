const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const imagePreview = document.querySelector('.img-upload__preview img');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleValueInput = document.querySelector('.scale__control--value');
const effectsList = document.querySelector('.effects__list');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');

const EffectSettings = {
  none: {
    filter: () => 'none',
    range: { min: 0, max: 100 },
    step: 1,
    start: 100,
    hidden: true
  },
  chrome: {
    filter: (value) => `grayscale(${value})`,
    range: { min: 0, max: 1 },
    step: 0.1,
    start: 1
  },
  sepia: {
    filter: (value) => `sepia(${value})`,
    range: { min: 0, max: 1 },
    step: 0.1,
    start: 1
  },
  marvin: {
    filter: (value) => `invert(${value}%)`,
    range: { min: 0, max: 100 },
    step: 1,
    start: 100
  },
  phobos: {
    filter: (value) => `blur(${value}px)`,
    range: { min: 0, max: 3 },
    step: 0.1,
    start: 3
  },
  heat: {
    filter: (value) => `brightness(${value})`,
    range: { min: 1, max: 3 },
    step: 0.1,
    start: 3
  }
};

const initScale = () => {
  if (!imagePreview || !scaleSmallerButton || !scaleBiggerButton || !scaleValueInput) {
    return;
  }

  let currentScale = SCALE_DEFAULT;

  const updateScale = () => {
    scaleValueInput.value = `${currentScale}%`;
    imagePreview.style.transform = `scale(${currentScale / 100})`;
  };

  scaleSmallerButton.addEventListener('click', () => {
    currentScale = Math.max(currentScale - SCALE_STEP, SCALE_MIN);
    updateScale();
  });

  scaleBiggerButton.addEventListener('click', () => {
    currentScale = Math.min(currentScale + SCALE_STEP, SCALE_MAX);
    updateScale();
  });

  updateScale();
};

const initSlider = () => {
  if (!effectLevelSlider || !effectsList || !effectLevelValue || !effectLevelContainer || typeof noUiSlider === 'undefined') {
    return;
  }

  noUiSlider.create(effectLevelSlider, {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    connect: 'lower'
  });

  let currentEffect = 'none';

  const updateSlider = (effect) => {
    const settings = EffectSettings[effect];
    effectLevelSlider.noUiSlider.updateOptions({
      range: settings.range,
      start: settings.start,
      step: settings.step
    });

    effectLevelContainer.classList.toggle('hidden', settings.hidden || false);
    effectLevelValue.value = Number.isInteger(settings.start) ? settings.start : settings.start.toFixed(1);
    imagePreview.style.filter = settings.filter(settings.start);
  };

  effectLevelSlider.noUiSlider.on('update', () => {
    const value = parseFloat(effectLevelSlider.noUiSlider.get());
    effectLevelValue.value = Number.isInteger(value) ? value : value.toFixed(1);
    if (currentEffect !== 'none') {
      imagePreview.style.filter = EffectSettings[currentEffect].filter(value);
    }
  });

  effectsList.addEventListener('change', (evt) => {
    currentEffect = evt.target.value;
    updateSlider(currentEffect);
  });

  updateSlider('none');
};

const initImageEditor = () => {
  initScale();
  initSlider();
};

const resetImageEditor = () => {
  if (imagePreview) {
    imagePreview.style = '';
  }
  if (scaleValueInput) {
    scaleValueInput.value = '100%';
  }
  if (effectLevelValue) {
    effectLevelValue.value = '';
  }
  if (effectLevelSlider && effectLevelSlider.noUiSlider) {
    effectLevelSlider.noUiSlider.destroy();
  }
};

export {initImageEditor, resetImageEditor};
