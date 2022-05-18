export class Section {
    constructor(data, selector) {
        this._cardContainer = document.querySelector(selector);
        this._items = data.items;
        this._renderer = data.renderer;
    }

    // Отрисовка элементов
    renderItem(Cards) {
        Cards.forEach((card) => {
            this.addItem(this._renderer(card));
        })
    }

    // Добавление DOM-элемента в контейнер
    addItem(item) {
        this._cardContainer.prepend(item);
    }
}
