// import { popupElementImage } from './initial.js';
// import { PopupWithImage } from './PopupWithImage.js';

// const popupWithImage = new PopupWithImage('.popup__image');
// popupWithImage.setEventListeners(popupElementImage);

export class Card {
    constructor(initialCards, cardSelector, handleCardClick) {
        this._title = initialCards.name;
        this._link = initialCards.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    };

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.elements__element').cloneNode(true);

        return cardElement;
    };

    generateCard() {
        this._element = this._getTemplate();
        this._img = this._element.querySelector('.elements__image');
        this._deleteBtn = this._element.querySelector('.elements__trash');
        this._likeBtn = this._element.querySelector('.elements__like');
        this._element.querySelector('.elements__title').textContent = this._title;
        this._img.src = this._link;
        this._img.alt = this._title;
        this._setEventListeners();

        return this._element;
    };

    _setEventListeners() {
        this._img.addEventListener('click', () => {
            this._handleCardClick(this._img);
        });

        // Удаление карточки
        this._deleteBtn.addEventListener('click', () => {
            this._element.closest('.elements__element').remove();
        })

        // Добавление лайка
        this._likeBtn.addEventListener('click', () => {
            this._likeBtn.classList.toggle('elements__like_active');
        })
    };
};