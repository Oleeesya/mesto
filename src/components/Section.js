export class Section {
    constructor(data, selectorCard) {
        this._cardContainer = document.querySelector(selectorCard);
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
