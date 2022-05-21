import { popupImage, popupImageName } from './initial.js';
import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
    open = (img) => {
        super.open();
        popupImageName.textContent = img.alt;
        popupImage.setAttribute('src', img.src);
        popupImage.setAttribute('alt', img.alt);
    }
}