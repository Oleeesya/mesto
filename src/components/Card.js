export class Card {
    constructor(initialCards, cardSelector, handleCardClick, handletrashClick, handleLikeClick,
        handleRemoveLikeClick) {
        this._title = initialCards.name;
        this._link = initialCards.link;
        this._cardSelector = cardSelector;
        this._id = initialCards._id;
        this._likes = initialCards.likes;
        this._handleCardClick = handleCardClick;
        this._handleTrashClick = handletrashClick;
        this._handleLikeClick = handleLikeClick;
        this._handleRemoveLikeClick = handleRemoveLikeClick;

        if (initialCards.owner) {
            this._userId = initialCards.owner._id;
        } else {
            this._userId = 0;
        }
        if (initialCards.likes) {
            this._likes = initialCards.likes;
        } else {
            this._likes = [];
        }
    };

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.elements__element').cloneNode(true);

        return cardElement;
    };

    generateCard(myId) {
        this._element = this._getTemplate();
        this._img = this._element.querySelector('.elements__image');
        this._deleteBtn = this._element.querySelector('.elements__trash');
        this._likeBtn = this._element.querySelector('.elements__like');
        this._amountLikes = this._element.querySelector('.elements__amount');
        this._amountLikes.textContent = this._likes.length;
        for (let i = 0; i < this._likes.length; i++) {
            if (this._likes[i]._id == myId) {
                this._likeBtn.classList.toggle('elements__like_active');
            }
        }
        if (this._userId !== myId && this._userId !== 0) {
            this._deleteBtn.classList.add('elements__trash_hidden');
        }
        this._element.querySelector('.elements__title').textContent = this._title;
        this._img.src = this._link;
        this._img.alt = this._title;
        this._setEventListeners();
        return this._element;
    };

    _setEventListeners() {
        // Открытие попапа с картинкой при клике на карточку
        this._img.addEventListener('click', () => {
            this._handleCardClick(this._img);
        });

        // Удаление карточки
        this._deleteBtn.addEventListener('click', () => {
            this._handleTrashClick(this._id, this._element);
        })

        // Нажатие на лайк
        this._likeBtn.addEventListener('click', () => {
            if (this._likeBtn.classList.contains('elements__like_active')) {
                // удаление активного лайка
                this._handleRemoveLikeClick({ _id: this._id });
                this._likeBtn.classList.remove('elements__like_active');
                this._amountLikes.textContent = parseInt(this._amountLikes.textContent) - 1;
            } else {
                // добавление активного лайка
                this._handleLikeClick({ _id: this._id });
                this._likeBtn.classList.add('elements__like_active');
                this._amountLikes.textContent = parseInt(this._amountLikes.textContent) + 1;
                this._handleRemoveLikeClick({ _id: this._id });
            }
        })
    };
};