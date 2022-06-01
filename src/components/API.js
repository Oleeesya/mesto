const handelResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
}


export class Api {
    constructor(options) {
        this._url = options.url;
        this._header = options.header;
    }

    //загрузка информации о пользователе
    getUserInfo() {
        return fetch(this._url + '/users/me', {
            headers: this._header
        })
            .then(handelResponse)

            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    //загрузка карточек с сервера
    getInitialCards() {
        return fetch(this._url + '/cards', {
            headers: this._header
        })
            .then(handelResponse)

            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    //редактирование профиля
    editUserInfo(userInfo, submit) {
        submit.textContent = 'Сохранение...';
        return fetch(this._url + '/users/me', {
            method: 'PATCH',
            headers: this._header,
            body: JSON.stringify({
                name: userInfo.name,
                about: userInfo.about
            })
        })
            .then(handelResponse)
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            })
            .finally(() => {
                submit.textContent = 'Сохранить';
            })
    }

    //добавление новой карточки
    postCards(cardInfo, submit) {
        submit.textContent = 'Сохранение...';;
        return fetch(this._url + '/cards', {
            method: 'POST',
            body: JSON.stringify({
                link: cardInfo.link,
                name: cardInfo.name
            }),
            headers: this._header,
        })
            .then(handelResponse)
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            })
            .finally(() => {
                submit.textContent = 'Создать';
            })
    }

    //удаление карточки
    deleteCard(cardInfo) {
        return fetch(this._url + '/cards/' + cardInfo._id, {
            method: 'DELETE',
            headers: this._header,
        })
            .then(handelResponse)
            .catch((err) => {
                console.log(err);
            });
    }

    //постановка лайка
    likeCards = (cardInfo) => {
        return fetch(this._url + '/cards/' + cardInfo._id + '/likes', {
            method: 'PUT',
            headers: this._header,
        })
            .then(handelResponse)
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    // снятие лайка
    deleteLikeCards = (cardInfo) => {
        return fetch(this._url + '/cards/' + cardInfo._id + '/likes', {
            method: 'DELETE',
            headers: this._header,
        })
            .then(handelResponse)
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }

    // обновление аватара пользователя
    editAvatarUser(avatarInfo, submit) {
        submit.textContent = 'Сохранение...';;
        return fetch(this._url + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._header,
            body: JSON.stringify({
                avatar: avatarInfo.url
            })
        })
            .then(handelResponse)
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            })
            .finally(() => {
                submit.textContent = 'Сохранить';
            })
    }
}