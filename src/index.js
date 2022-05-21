import { Card } from './Card.js'
import { Section } from './Section.js'
import { PopupWithForm } from './PopupWithForm.js'
import { PopupWithImage } from './PopupWithImage.js'
import { UserInfo } from './UserInfo.js'
import { FormValidator } from './FormValidator.js'
import { validationConfig, jobEdit, inputEdit, initialCards } from './initial.js';
import './pages/index.css'; // добавьте импорт главного файла стилей 


// --- Попап редактирования профиля ---
const popupElementEdit = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const formElementEdit = popupElementEdit.querySelector('.popup__content_name_edit');

// создание экземпляра класса PopupWithForm - popupWithFormEdit
const popupWithFormEdit = new PopupWithForm('.popup_type_edit',
  {
    handleFormSubmit: (formData) => {
      userInfo.setUserInfo(formData);
      popupWithFormEdit.close();
    }
  }
);

popupWithFormEdit.setEventListeners();

// Функция редактирования профиля
function openPopupEdit() {
  inputEdit.value = userInfo.getUserInfo().name;
  jobEdit.value = userInfo.getUserInfo().info;
  formProfileValidator.clearForm();
  popupWithFormEdit.open();
};

// Обработчики событий открытие и закрытие попапа для профиля
editButton.addEventListener('click', openPopupEdit);

// --- Попап новое место ---
const popupElementCreate = document.querySelector('.popup_type_create');
const formElementCreate = popupElementCreate.querySelector('.popup__content_name_create');
const createButton = document.querySelector('.profile__add-button');
const inputCreate = popupElementCreate.querySelector('.popup__input_create_header');
const imageCreate = popupElementCreate.querySelector('.popup__input_create_paragraph');

// создание экземпляра класса PopupWithForm - popupWithFormCreate
const popupWithFormCreate = new PopupWithForm('.popup_type_create',
  {
    handleFormSubmit: () => {
      popupWithFormCreate.close();
    }
  }
);

popupWithFormCreate.setEventListeners();

// --- Функция открытия попапа добавления новой карточки ---
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

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();


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
const userInfo = new UserInfo({ name: ".profile__title", info: ".profile__subtitle" });
