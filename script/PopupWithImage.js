import { popupImage, popupElementImage, popupImageName } from './initial.js';
import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
    open(img) {
        popupImageName.textContent = img.alt;
        popupImage.setAttribute('src', img.src);
        popupImage.setAttribute('alt', img.alt);
        popupElementImage.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
}