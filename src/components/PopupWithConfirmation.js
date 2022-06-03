import { Popup } from './Popup.js'

export class PopupWithConfirmation extends Popup {
    constructor(selector, { handleFormSubmit }) {
        super(selector);
        this._handleSubmit = handleFormSubmit;
        this._popupElement = document.querySelector(selector);
    }
    //слушатели клика закрытия попапа
    setEventListeners() {
        super.setEventListeners();

        this._popupElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleSubmit(this._card);
        });
    }

    open = (card) => {
        super.open();
         this._card = card;
    }

}