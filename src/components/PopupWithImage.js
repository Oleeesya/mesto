import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup);
        this._popupImage = this._popupElement.querySelector('.popup__image');
        this._popupImageName = this._popupElement.querySelector('.popup__paragraph-image');
    }
    
    open = (img) => {
        super.open();
        this._popupImageName.textContent = img.alt;
        this._popupImage.setAttribute('src', img.src);
        this._popupImage.setAttribute('alt', img.alt);
    }
}