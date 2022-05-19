import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
    constructor(selectorPopup, formElementSubmit) {
        super(selectorPopup);
        this._functionForm = formElementSubmit;
        this._popupElement = document.querySelector(selectorPopup);
    }
    _getInputValues() {
        const arrayInput = document.querySelector(selectorPopup).querySelectorAll('.popup__input');
        return arrayInput
    }
    //слушатели клика закрытия попапа и обработчик создания новой формы
    setEventListeners(popup) {
        super.setEventListeners(popup);
        this._popupElement.addEventListener('submit', this._functionForm(this._getInputValues()));

    }
    //закрытие попапа и сброс формы при закрытии попапа
    close(popup) {
        super.close(popup);
        this._popupElement.querySelector('form').reset();
    }
}