import { Card } from '../components/Card.js'
import { Section } from '../components/Section.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithAvatar } from '../components/PopupWithAvatar.js'
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js'
import { UserInfo } from '../components/UserInfo.js'
import { FormValidator } from '../components/FormValidator.js'
import { validationConfig, jobEdit, inputEdit } from '../components/initial.js';
import './index.css';
import { Api } from '../components/API.js'

const config = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-42',
  header: {
    authorization: 'b4769460-c207-4cd1-a9d9-ca6bcf7522ce',
    'Content-Type': 'application/json'
  }
}

const api = new Api(config);

api.getUserInfo().then((users) => {
  userInfo.setUserInfo(users),
    userInfo.setAvatar(users)
})

api.getInitialCards().then((initialCards) => {
  cardSection.renderItem(initialCards);
});

const initialCards = [];

// --- Попап редактирования профиля ---
const popupElementEdit = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const formElementEdit = popupElementEdit.querySelector('.popup__content_name_edit');

// создание экземпляра класса PopupWithForm - popupWithFormEdit
const popupWithFormEdit = new PopupWithForm('.popup_type_edit',
  {
    handleFormSubmit: (formData) => {
      userInfo.setUserInfo(formData);

      api.editUserInfo(formData, popupWithFormEdit.btn);
      popupWithFormEdit.close();
    }
  }
);

popupWithFormEdit.setEventListeners();

// Функция редактирования профиля
function openPopupEdit() {
  inputEdit.value = userInfo.getUserInfo().name;
  jobEdit.value = userInfo.getUserInfo().about;

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
      newCard(formData, popupWithFormCreate);
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
const newCard = (formData, popupWithFormCreate) => {
  const item = {
    name: formData.title,
    link: formData.url
  };
  cardSection.renderItem([item]);
  api.postCards(item, popupWithFormCreate.btn);
};

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();


// --- Попап удаление карточки ---
const popupWithFormRemove = new PopupWithConfirmation('.popup_type_remove-card',
  {
    handleFormSubmit: (id) => {
      api.deleteCard({ _id: id });
      popupWithFormRemove.close();
    }
  }
);

popupWithFormRemove.setEventListeners();

// --- Попап редактирования аватара --- 
const profileAvatar = document.querySelector('.profile__avatar')
const popupElementAvatar = document.querySelector('.popup_type_edit-avatar');
const formElementAvatar = popupElementAvatar.querySelector('.popup__content_name_avatar');
const popupWithFormAvatar = new PopupWithAvatar('.popup_type_edit-avatar',
  {
    handleFormSubmit: (avatarInfo) => {
      api.editAvatarUser(avatarInfo, popupWithFormAvatar.btn);
      popupWithFormAvatar.close();
    }
  }
);

popupWithFormAvatar.setEventListeners();

// Функция редактирования аватара
function openPopupAvatar() {
  formAddCreat.clearForm();
  formAvatarValidator.clearForm();
  popupWithFormAvatar.open();
};

profileAvatar.addEventListener('click', openPopupAvatar)

// Функция генерации разметки карточки
const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#template-element', popupWithImage.open, popupWithFormRemove.open,
      api.likeCards, api.deleteLikeCards);
    const cardElement = card.generateCard(userInfo.myId);

    return cardElement;
  }
},
  '.elements');


// --- Создание экземпляра валидатора редактирования профиля через класс FormValidator ---
const formProfileValidator = new FormValidator(validationConfig, formElementEdit);
formProfileValidator.enableValidation();

// --- Создание экземпляра валидатора добавления новой карточки через класс FormValidator ---
const formAddCreat = new FormValidator(validationConfig, formElementCreate);
formAddCreat.enableValidation();

// --- Создание экземпляра валидатора редактирования avatar через класс FormValidator ---
const formAvatarValidator = new FormValidator(validationConfig, formElementAvatar);
formAvatarValidator.enableValidation();

// --- Создание экземпляра класса отображения информации на странице ---
const userInfo = new UserInfo({ name: ".profile__title", about: ".profile__subtitle", avatar: ".profile__avatar_img" });
