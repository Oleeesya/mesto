export class Popup {
    constructor(selectorPopup) {
        this._popupElement = document.querySelector(selectorPopup);
    }
    //открытие попапа
    open(popup) {
        console.log(popup)
        popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    //закрытие попапа
    close(popup) {
        console.log(popup)
        popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    //закрытие попапа клавишей esc
    _handleEscClose = (event) => {
        if (event.key === "Escape") {
            const openedPopup = document.querySelector('.popup_opened');
            this.close(openedPopup);
        };
    }
    //слушатели клика закрытия попапа
    setEventListeners(popup) {
        popup.addEventListener('click', (event) => {
            if (event.target.classList.contains('popup__close-button') || event.target.classList.contains('popup')) {
                this.close(popup);
            }
        });
    }
}