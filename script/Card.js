import { popupImage, popupElementImage, popupImageName } from './initial.js';
import { openPopup } from './index.js';

export class Card {
    constructor(initialCards, cardSelector) {
        this._title = initialCards.name;
        this._link = initialCards.link;
        this._cardSelector = cardSelector;
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

    //открытие попапа
    _handleOpenPopup() {
        popupImageName.textContent = this._title;
        popupImage.setAttribute('src', this._link);
        popupImage.setAttribute('alt', this._title);
        openPopup(popupElementImage);
    };

    _setEventListeners() {
        this._img.addEventListener('click', () => {
            this._handleOpenPopup();
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