const templateElement = document.querySelector('#template-element');

const popups = document.querySelectorAll('.popup');

// Функция открытия попапов
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

// Функция закрытия попапов 
const closePopup = (event) => {
  event.target.closest('.popup').classList.remove('popup_opened');
};

// Функция обрабатывания кликов по кнопкам крестиков
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(evt);
    };
  });
});

const initialCards = [
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
// Контейнер с карточками
const container = document.querySelector('.elements');

// Функция для преобразования объекта карточки в html
const createItem = (item) => {
  const element = templateElement.content.querySelector('.elements__element').cloneNode(true);
  const image = element.querySelector('.elements__image');
  const cardName = element.querySelector('.elements__title');
  const deleteBtn = element.querySelector('.elements__trash');
  const likeCard = element.querySelector('.elements__like');
  image.setAttribute('src', item.link);
  image.setAttribute('name', item.name);
  cardName.textContent = item.name;
  // Прикрепляем обработчик для удаления карточки 
  deleteBtn.addEventListener('click', deleteCard);
  // Прикрепляем обработчик для лайка карточки
  likeCard.addEventListener('click', likeBtn);
  // Прикрепляем обработчик на открытие картинки
  image.addEventListener('click', openPopupImage);

  return element;
};

// Функция удаление карточки 
const deleteCard = (event) => {
  event.target.closest('.elements__element').remove();
};

// Функция добавления лайка 
const likeBtn = (event) => {
  event.target.classList.toggle('elements__like_active');
  console.log(event);
};

// Попап открытие изображения 
const popupElementImage = document.querySelector('.popup_type_image');
const popupImage = popupElementImage.querySelector('.popup__image');
const popupImageName = popupElementImage.querySelector('.popup__paragraph-image');

// Функция открытия попапа
function openPopupImage(event) {
  const selectPicture = event.target;
  const imagePath = selectPicture.getAttribute('src')
  const name = selectPicture.getAttribute('name');
  popupImageName.textContent = name;
  popupImage.setAttribute('src', imagePath);
  openPopup(popupElementImage);
};

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
  openPopup(popupElementEdit);
  inputEdit.value = profileTitle.textContent;
  jobEdit.value = profileSubtitle.textContent;
};

// Обработчики событий открытие и закрытие попапа для профиля
editButton.addEventListener('click', openPopupEdit);

// Функция сохранения данных профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.                                          
  profileTitle.textContent = inputEdit.value;// Получите значение полей jobInput и nameInput из свойства value
  profileSubtitle.textContent = jobEdit.value;
  closePopup(evt);
  console.log(evt);
};

// Прикрепляем обработчик к форме данных профиля
formElementEdit.addEventListener('submit', handleProfileFormSubmit);

// Попап новое место
const popupElementCreate = document.querySelector('.popup_type_create');
const formElementCreate = popupElementCreate.querySelector('.popup__content_name_create');
const createButton = document.querySelector('.profile__add-button');
const inputCreate = popupElementCreate.querySelector('.popup__input_create_header');
const imageCreate = popupElementCreate.querySelector('.popup__input_create_paragraph');

// Функция открытия попапа
function openPopupCreate() {
  openPopup(popupElementCreate);
};

// Обработчики событий открытие и закрытие попапа для новых карточек
createButton.addEventListener('click', openPopupCreate);

// Функция добавления новой карточки
const newCard = (name, link, container) => {
  const card = {
    name: name,
    link: link
  };
  container.prepend(createItem(card));
};

// Функция отправки данных для новой карточки
function handleCreateFormSubmit(evt) {
  evt.preventDefault();
  newCard(inputCreate.value, imageCreate.value, container);
  closePopup(evt);
};

// Прикрепляем обработчик к форме создания новой карточки 
formElementCreate.addEventListener('submit', handleCreateFormSubmit);

// Отрисовка карточек из массива объектов
const elements = initialCards.map(createItem);
// Добавление элементов карточек в контейнер
container.append(...elements);
