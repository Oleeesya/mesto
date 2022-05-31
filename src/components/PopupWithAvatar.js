import { Popup } from './Popup.js'

export class PopupWithAvatar extends Popup {
    constructor(selectorPopup, { handleFormSubmit }) {
        super(selectorPopup);
        this._handleFormSubmit = handleFormSubmit;
        this._popupElement = document.querySelector(selectorPopup);
        this._inputList = this._popupElement.querySelectorAll('.popup__input');
        this._popupForm = this._popupElement.querySelector('.popup__content');
    }
    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        })
        return this._formValues;

    }
    //слушатели клика закрытия попапа и обработчик создания новой формы
    setEventListeners() {
        super.setEventListeners();
        this._popupElement.addEventListener('submit', (event) => {
            event.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });

    }
    //закрытие попапа и сброс формы при закрытии попапа
    close() {
        super.close(this._popupElement);
        this._popupForm.reset();
    }
}