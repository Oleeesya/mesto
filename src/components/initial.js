// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
const arkhyz = new URL('../img/arkhyz.jpg', import.meta.url);
const moscow = new URL('../img/Moscow.jpg', import.meta.url);
const rostov = new URL('../img/Rostov-region.jpg', import.meta.url)

const saintpetersburg = new URL('../img/Saint-Petersburg.jpg', import.meta.url);
const chelyabinskoblast = new URL('../img/chelyabinsk-oblast.jpg', import.meta.url);
const baikal = new URL('../img/baikal.jpg', import.meta.url)

export const initialCards = [
    {
        name: 'Архыз',
        link: arkhyz
    },
    {
        name: 'Москва',
        link: moscow
    },
    {
        name: 'Ростовская область',
        link: rostov
    },
    {
        name: 'Санкт-Петербург',
        link: saintpetersburg
    },
    {
        name: 'Челябинская область',
        link: chelyabinskoblast
    },
    {
        name: 'Байкал',
        link: baikal
    }
];

export const inputEdit = document.querySelector('.popup__input_edit_header');
export const jobEdit = document.querySelector('.popup__input_edit_paragraph');
export const avatarEdit = document.querySelector('.profile__avatar');

export const validationConfig = {
    formSelector: '.popup__content',
    inputSelector: '.popup__input',
    inputSelectorError: 'popup__input_error',
    submitButtonSelector: '.popup__submit',
    errorClass: 'popup__input-error_active'
};