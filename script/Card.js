import {
    initialCards, popupImage, popupCloseButton, popupElementImage, popupImageName
} from './initial.js';

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
        this._setEventListeners();

        return this._element;
    };

    //метод закрытия по кнопке esc
    _closeByEsc = (event) => {
        if (event.key === "Escape") {
            this._handleClosePopup();
        }
    };

    // закрытие оверлей
    _closeByOverlay = (event) => {
        if (!event.target.classList.contains('popup_opened')) {
            event.stopPropagation();
        }
        else {
            this._handleClosePopup();
        }
    };

    //открытие попапа
    _handleOpenPopup() {
        popupImageName.textContent = this._title;
        popupImage.setAttribute('src', this._link);
        popupImage.setAttribute('alt', this._title);
        popupElementImage.classList.add('popup_opened');
        document.addEventListener('keydown', this._closeByEsc);
    };

    // закрытие попапа
    _handleClosePopup() {
        if (popupElementImage.classList.contains('popup_opened')) {
            popupImageName.textContent = '';
            popupImage.removeAttribute('src');
            popupImage.removeAttribute('alt');
            popupElementImage.classList.remove('popup_opened');
            document.removeEventListener('keydown', this._closeByEsc);
        }
    };

    _setEventListeners() {
        this._img.addEventListener('click', () => {
            this._handleOpenPopup();
        });

        // Закрытие на кнопку
        popupCloseButton.addEventListener('click', () => {
            this._handleClosePopup();
        });

        // Закрытие на оверлей
        popupElementImage.addEventListener('click', this._closeByOverlay)

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

initialCards.forEach((item) => {
    const card = new Card(item, '#template-element');
    const cardElement = card.generateCard();
    document.querySelector('.elements').append(cardElement);
});
