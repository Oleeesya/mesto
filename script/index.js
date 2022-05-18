import { Card } from './Card.js'
import { Section } from './Section.js'
import { Popup } from './Popup.js'
import { FormValidator } from './FormValidator.js'
import { validationConfig, initialCards } from './initial.js';

const popups = document.querySelectorAll('.popup');

const popup = new Popup('.popup');

popups.forEach((p) => {
  popup.setEventListeners(p);
})


// const popups = document.querySelectorAll('.popup');
// // Функция открытия попапов
// export const openPopup = (popup) => {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closeByEsc);
// };

// // Функция закрытия попапов 
// const closePopupByPopup = (popup) => {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closeByEsc);
// };

// // Обработчики событий для закрытия попапов
// popups.forEach((popup) => {
//   popup.addEventListener('click', (event) => {
//     if (event.target.classList.contains('popup__close-button') || event.target.classList.contains('popup')) {
//       closePopupByPopup(popup);
//     }
//   });
// });

// // Функция закрытия попапа нажатием на Esc
// const closeByEsc = (event) => {
//   if (event.key === "Escape") {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopupByPopup(openedPopup);
//   };
// };

// Попап редактирования профиля
const popupElementEdit = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const formElementEdit = popupElementEdit.querySelector('.popup__content_name_edit');
const inputEdit = document.querySelector('.popup__input_edit_header');
const jobEdit = document.querySelector('.popup__input_edit_paragraph');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

// Функция редактирования профиля
function openPopupEdit() {
  inputEdit.value = profileTitle.textContent;
  jobEdit.value = profileSubtitle.textContent;

  formProfileValidator.clearForm();
  popup.open(popupElementEdit);
  // openPopup(popupElementEdit);
};

// Обработчики событий открытие и закрытие попапа для профиля
editButton.addEventListener('click', openPopupEdit);

// Функция сохранения данных профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputEdit.value;
  profileSubtitle.textContent = jobEdit.value;

  popup.close(popupElementEdit)
  // closePopupByPopup(popupElementEdit);
};

// Прикрепляем обработчик к форме данных профиля
formElementEdit.addEventListener('submit', handleProfileFormSubmit);

// Попап новое место
const popupElementCreate = document.querySelector('.popup_type_create');
const formElementCreate = popupElementCreate.querySelector('.popup__content_name_create');
const createButton = document.querySelector('.profile__add-button');
const inputCreate = popupElementCreate.querySelector('.popup__input_create_header');
const imageCreate = popupElementCreate.querySelector('.popup__input_create_paragraph');

// Функция открытия попапа добавления новой карточки
function openPopupCreate() {
  formElementCreate.reset();

  formAddCreat.clearForm();

  popup.open(popupElementCreate);
  // openPopup(popupElementCreate);
};

// Обработчики событий открытие и закрытие попапа для новых карточек
createButton.addEventListener('click', openPopupCreate);

// Функция добавления новой карточки
const newCard = (name, link) => {
  const item = {
    name: name,
    link: link
  };
  cardSection.renderItem([item]);
};

// Функция генерации разметки карточки
const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#template-element');
    const cardElement = card.generateCard();
    return cardElement;
  }
},
  '.elements');

cardSection.renderItem(initialCards);

// Функция отправки данных для новой карточки
function handleCreateFormSubmit(evt) {
  evt.preventDefault();
  newCard(inputCreate.value, imageCreate.value);

  popup.close(popupElementCreate)
  // closePopupByPopup(popupElementCreate);
};

// Прикрепляем обработчик к форме создания новой карточки 
formElementCreate.addEventListener('submit', (evt) => {
  handleCreateFormSubmit(evt);
});

// Создание экземпляра валидатора редактирования профиля через класс FormValidator
const formProfileValidator = new FormValidator(validationConfig, formElementEdit);
formProfileValidator.enableValidation();

// Создание экземпляра валидатора добавления новой карточки через класс FormValidator
const formAddCreat = new FormValidator(validationConfig, formElementCreate);
formAddCreat.enableValidation();
