export class Card {
    constructor({ initialCards, handleCardClick, handleDeleteClick, handleLikeClick },
        cardSelector
    ) {
        this._title = initialCards.name;
        this._link = initialCards.link;
        this._cardSelector = cardSelector;
        this._id = initialCards._id;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
        this._userId = initialCards.owner._id;
        this._likes = initialCards.likes;
        this._amountLikes = this._likes.length;
        this.liked = false;
    };

    upLike() {
        if (this.liked) {
            this._likeBtn.classList.remove('elements__like_active');
            this._amountLikes.textContent = parseInt(this._amountLikes.textContent) - 1;
            this.liked = false;
        } else {
            this._likeBtn.classList.add('elements__like_active');
            this._amountLikes.textContent = parseInt(this._amountLikes.textContent) + 1;
            this.liked = true;
        }
    }

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
        this._element.querySelector('.elements__title').textContent = this._title;
        this._img.src = this._link;
        this._img.alt = this._title;

        for (let i = 0; i < this._likes.length; i++) {
            if (this._likes[i]._id == myId) {
                this._likeBtn.classList.toggle('elements__like_active');
                this.liked = true
            }
        }
        if (this._userId !== myId && this._userId !== 0) {
            this._deleteBtn.classList.add('elements__trash_hidden');
        }

        this._setEventListeners();
        return this._element;
    };

    removeCard() {
        this._element.remove();
    }



    _setEventListeners() {
        this._img.addEventListener('click', () => {
            this._handleCardClick(this._img);
        })

        this._deleteBtn.addEventListener('click', () => {
            this._handleDeleteClick(this);
        })

        this._likeBtn.addEventListener('click', () => {
            this._handleLikeClick(this);
        })
    };
};