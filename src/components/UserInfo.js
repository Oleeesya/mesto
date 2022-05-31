export class UserInfo {
    constructor(userItems) {
        this._nameUser = document.querySelector(userItems.name);
        this._infoUser = document.querySelector(userItems.about);
        this._avatarUser = document.querySelector(userItems.avatar);
    }

    // возвращает объект с данными пользователя
    getUserInfo() {
        return { name: this._nameUser.textContent, about: this._infoUser.textContent };
    }

    // принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(formData) {
        this._nameUser.textContent = formData.name;
        this._infoUser.textContent = formData.about;
        this.myId = formData._id;
    }

    setAvatar(formData){
        this._avatarUser.setAttribute('src', formData.avatar);
    }
}