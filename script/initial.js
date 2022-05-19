export const initialCards = [
    {
        name: 'Архыз',
        link: './img/arkhyz.jpg'
    },
    {
        name: 'Москва',
        link: './img/Moscow.jpg'
    },
    {
        name: 'Ростовская область',
        link: './img/Rostov-region.jpg'
    },
    {
        name: 'Санкт-Петербург',
        link: './img/Saint-Petersburg.jpg'
    },
    {
        name: 'Челябинская область',
        link: './img/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Байкал',
        link: './img/baikal.jpg'
    }
];

export const popupImage = document.querySelector('.popup__image');
export const popupElementImage = document.querySelector('.popup_type_image');
export const popupImageName = popupElementImage.querySelector('.popup__paragraph-image');
export const inputEdit = document.querySelector('.popup__input_edit_header');
export const jobEdit = document.querySelector('.popup__input_edit_paragraph');
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');

export const validationConfig = {
    formSelector: '.popup__content',
    inputSelector: '.popup__input',
    inputSelectorError: 'popup__input_error',
    submitButtonSelector: '.popup__submit',
    errorClass: 'popup__input-error_active'
};