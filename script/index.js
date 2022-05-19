import { Card } from './Card.js'
import { Section } from './Section.js'
import { Popup } from './Popup.js'
import { PopupWithForm } from './PopupWithForm.js'
import { PopupWithImage } from './PopupWithImage.js'
import { UserInfo } from './UserInfo.js'
import { FormValidator } from './FormValidator.js'
import { validationConfig, initialCards, profileTitle, profileSubtitle, popupElementImage } from './initial.js';

// const popups = document.querySelectorAll('.popup');

// const popup = new Popup('.popup');

// popups.forEach((p) => {
//   popup.setEventListeners(p);
// })


// --- Попап редактирования профиля ---
const popupElementEdit = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const formElementEdit = popupElementEdit.querySelector('.popup__content_name_edit');

const popupWithFormEdit = new PopupWithForm('.popup_type_edit', (evt) => {
  evt.preventDefault();
  const user = userInfo.getUserInfo();
  console.log(user)
  profileTitle.textContent = user.name;
  profileSubtitle.textContent = user.info;
  popupWithFormEdit.close(popupElementEdit);
});

popupWithFormEdit.setEventListeners(popupElementEdit);

// Функция редактирования профиля
function openPopupEdit() {
  userInfo.setUserInfo(profileTitle.textContent, profileSubtitle.textContent);
  formProfileValidator.clearForm();
  popupWithFormEdit.open(popupElementEdit);
};

// Обработчики событий открытие и закрытие попапа для профиля
editButton.addEventListener('click', openPopupEdit);

// --- Попап новое место ---
const popupElementCreate = document.querySelector('.popup_type_create');
const formElementCreate = popupElementCreate.querySelector('.popup__content_name_create');
const createButton = document.querySelector('.profile__add-button');
const inputCreate = popupElementCreate.querySelector('.popup__input_create_header');
const imageCreate = popupElementCreate.querySelector('.popup__input_create_paragraph');

const popupWithFormCreate = new PopupWithForm('.popup_type_create', (evt) => {
  evt.preventDefault();
  popupWithFormCreate.close(popupElementCreate);
});

popupWithFormCreate.setEventListeners(popupElementCreate);

// Функция открытия попапа добавления новой карточки
function openPopupCreate() {
  formAddCreat.clearForm();
  popupWithFormCreate.open(popupElementCreate);
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

const popupWithImage = new PopupWithImage('.popup__image');
popupWithImage.setEventListeners(popupElementImage);


// Функция генерации разметки карточки
const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#template-element', popupWithImage.open);
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
};

// Прикрепляем обработчик к форме создания новой карточки 
formElementCreate.addEventListener('submit', (evt) => {
  handleCreateFormSubmit(evt);
});

// --- Создание экземпляра валидатора редактирования профиля через класс FormValidator ---
const formProfileValidator = new FormValidator(validationConfig, formElementEdit);
formProfileValidator.enableValidation();

// --- Создание экземпляра валидатора добавления новой карточки через класс FormValidator ---
const formAddCreat = new FormValidator(validationConfig, formElementCreate);
formAddCreat.enableValidation();

// --- Создание экземпляра класса отображения информации на странице --- 
const userInfo = new UserInfo({ name: ".popup__input_edit_header", info: ".popup__input_edit_paragraph" });
