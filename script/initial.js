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

export const popupElement = document.querySelector('.popup');
export const popupImage = document.querySelector('.popup__image');
export const popupElementImage = document.querySelector('.popup_type_image');
export const popupCloseButton = popupElementImage.querySelector('.popup__close-button');
export const popupImageName = popupElementImage.querySelector('.popup__paragraph-image');