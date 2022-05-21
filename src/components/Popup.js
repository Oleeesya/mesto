export class Popup {
    constructor(selectorPopup) {
        this._popupElement = document.querySelector(selectorPopup);
    }
    //открытие попапа
    open() {
        this._popupElement.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    //закрытие попапа
    close() {
        this._popupElement.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    //закрытие попапа клавишей esc
    _handleEscClose = (event) => {
        if (event.key === "Escape") {
            this.close(this._popupElement);
        };
    }
    //слушатели клика закрытия попапа
    setEventListeners() {
        this._popupElement.addEventListener('click', (event) => {
            if (event.target.classList.contains('popup__close-button') || event.target.classList.contains('popup')) {
                this.close(this._popupElement);
            }
        });
    }
}