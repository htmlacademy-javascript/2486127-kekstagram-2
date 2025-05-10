import './util.js';
import {photos} from './data.js';
import {renderMiniatures} from './miniatures.js';
import {showBigPicture} from './big-picture.js';
import {openEditingForm} from './form.js';

renderMiniatures(photos);
showBigPicture(photos);
openEditingForm();
