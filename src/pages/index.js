import { Card } from '../components/Card.js'
import { Section } from '../components/Section.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { UserInfo } from '../components/UserInfo.js'
import { FormValidator } from '../components/FormValidator.js'
import { validationConfig, jobEdit, inputEdit, initialCards } from '../components/initial.js';
import './index.css'; // добавьте импорт главного файла стилей 


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

// создание экземпляра класса PopupWithForm - popupWithFormCreate
const popupWithFormCreate = new PopupWithForm('.popup_type_create',
  {
    handleFormSubmit: (formData) => {
      newCard(formData);
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
const newCard = (formData) => {
  const item = {
    name: formData.title,
    link: formData.url
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

// --- Создание экземпляра валидатора редактирования профиля через класс FormValidator ---
const formProfileValidator = new FormValidator(validationConfig, formElementEdit);
formProfileValidator.enableValidation();

// --- Создание экземпляра валидатора добавления новой карточки через класс FormValidator ---
const formAddCreat = new FormValidator(validationConfig, formElementCreate);
formAddCreat.enableValidation();

// --- Создание экземпляра класса отображения информации на странице ---
const userInfo = new UserInfo({ name: ".profile__title", info: ".profile__subtitle" });
