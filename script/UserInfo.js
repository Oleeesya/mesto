export class UserInfo {
    constructor(userItems) {
        this._nameUser = document.querySelector(userItems.name);
        this._infoUser = document.querySelector(userItems.info);
    }

    // возвращает объект с данными пользователя
    getUserInfo() {
        return { name: this._nameUser.textContent, info: this._infoUser.textContent };
    }

    // принимает новые данные пользователя и добавляет их на страницу
    setUserInfo(formData) {
        this._nameUser.textContent = formData.title;
        this._infoUser.textContent = formData.subtitle;
    }
}