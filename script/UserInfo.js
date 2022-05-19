export class UserInfo {
    constructor(userItems) {
        this._nameUser = document.querySelector(userItems.name);
        this._infoUser = document.querySelector(userItems.info);
    }
    getUserInfo() {
        return { name: this._nameUser.value, info: this._infoUser.value };
    }
    setUserInfo(name, info) {
        this._nameUser.value = name;
        this._infoUser.value = info;
    }
}