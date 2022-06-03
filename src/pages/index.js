import { Card } from '../components/Card.js'
import { Section } from '../components/Section.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js'
import { UserInfo } from '../components/UserInfo.js'
import { FormValidator } from '../components/FormValidator.js'
import { validationConfig, jobEdit, inputEdit } from '../utils/initial.js';
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

// Передаём массив с промисами методу Promise.all
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData),
      userInfo.setAvatar(userData),
      cardSection.renderItem(cards),
      formProfileValidator.enableValidation(),
      formAddCreat.enableValidation(),
      formAvatarValidator.enableValidation(),
      profileAvatar.addEventListener('click', openPopupAvatar),
      createButton.addEventListener('click', openPopupCreate),
      editButton.addEventListener('click', openPopupEdit);

    // Функция редактирования профиля
    function openPopupEdit() {
      inputEdit.value = userInfo.getUserInfo().name;
      jobEdit.value = userInfo.getUserInfo().about;

      formProfileValidator.clearForm();
      popupWithFormEdit.open();
    };

    // создание экземпляра класса PopupWithForm - popupWithFormEdit
    const popupWithFormEdit = new PopupWithForm('.popup_type_edit',
      {
        handleFormSubmit: (formData) => {
          userInfo.setUserInfo(formData);
          popupWithFormEdit.btn.textContent = 'Сохранение...';
          api.editUserInfo(formData)
            .then(() => {
              popupWithFormEdit.close();

            })
            .finally(() => {
              popupWithFormEdit.btn.textContent = 'Сохранить';
            });
        }
      }
    );

    popupWithFormEdit.setEventListeners();

    // --- Функция открытия попапа добавления новой карточки ---
    function openPopupCreate() {
      formAddCreat.clearForm();
      popupWithFormCreate.open(popupElementCreate);
    };


    // создание экземпляра класса PopupWithForm - popupWithFormCreate
    const popupWithFormCreate = new PopupWithForm('.popup_type_create',
      {
        handleFormSubmit: (formData) => {
          popupWithFormCreate.btn.textContent = 'Сохранение...';
          api.postCards(formData)
            .then((res) => {
              newCard(res);
              popupWithFormCreate.close();
            })
            .finally(() => {
              popupWithFormCreate.btn.textContent = 'Создать';
            })
        }
      }
    );

    popupWithFormCreate.setEventListeners();

    // --- Попап редактирования аватара --- 
    const popupWithFormAvatar = new PopupWithForm('.popup_type_edit-avatar',
      {
        handleFormSubmit: (avatarInfo) => {
          popupWithFormAvatar.btn.textContent = 'Сохранение...';
          api.editAvatarUser(avatarInfo)
            .then(() => {
              userInfo.setAvatar({ avatar: avatarInfo.url }),
                popupWithFormAvatar.close();
            })
            .finally(() => {
              popupWithFormAvatar.btn.textContent = 'Сохранить';
            })
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

    const popupWithImage = new PopupWithImage('.popup_type_image');
    popupWithImage.setEventListeners();

  })

  .catch(err => {
    console.log(err); // выведем ошибку в консоль
  });

// --- Попап редактирования профиля ---
const popupElementEdit = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const formElementEdit = popupElementEdit.querySelector('.popup__content_name_edit');

// --- Попап новое место ---
const popupElementCreate = document.querySelector('.popup_type_create');
const formElementCreate = popupElementCreate.querySelector('.popup__content_name_create');
const createButton = document.querySelector('.profile__add-button');

// Функция добавления новой карточки
const newCard = (formData) => {
  cardSection.renderItem([formData]);
};

const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();

// --- Попап удаление карточки ---
const popupWithFormRemove = new PopupWithConfirmation('.popup_type_remove-card',
  {
    handleFormSubmit: (card) => {
      api.deleteCard(card)
        .then(() => {
          card.removeCard();
          popupWithFormRemove.close();
        })
    }
  }
);

popupWithFormRemove.setEventListeners();

// --- Попап редактирования аватара --- 
const profileAvatar = document.querySelector('.profile__avatar')
const popupElementAvatar = document.querySelector('.popup_type_edit-avatar');
const formElementAvatar = popupElementAvatar.querySelector('.popup__content_name_avatar');

// Функция генерации разметки карточки
const cardSection = new Section({
  items: [],

  renderer: (item) => {

    const card = new Card(
      {
        initialCards: item,

        // открытие попапа с изображением
        handleCardClick: popupWithImage.open,

        //удаление карточки
        handleDeleteClick: (card) => {
          popupWithFormRemove.open(card)
        },

        // добавление лайка
        handleLikeClick: (card) => {
          if (!card.liked) {
            api.likeCards(card)
              .then(() => {
                card.upLike()
              })
          } else {
            api.deleteLikeCards(card)
              .then(() => {
                card.upLike()
              })
          }

        }
      },

      '#template-element'
    );
    const cardElement = card.generateCard(userInfo.myId);

    return cardElement;
  }
},
  '.elements');

// --- Создание экземпляра валидатора редактирования профиля через класс FormValidator ---
const formProfileValidator = new FormValidator(validationConfig, formElementEdit);

// --- Создание экземпляра валидатора добавления новой карточки через класс FormValidator ---
const formAddCreat = new FormValidator(validationConfig, formElementCreate);

// --- Создание экземпляра валидатора редактирования avatar через класс FormValidator ---
const formAvatarValidator = new FormValidator(validationConfig, formElementAvatar);

// --- Создание экземпляра класса отображения информации на странице ---
const userInfo = new UserInfo({ name: ".profile__title", about: ".profile__subtitle", avatar: ".profile__img" });
