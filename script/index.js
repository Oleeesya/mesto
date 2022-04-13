const templateElement = document.querySelector('#template-element');

const popups = document.querySelectorAll('.popup');

// Функция открытия попапов
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
};

// Функция закрытия попапов 
const closePopupByPopup = (popup) => {
  if (popup.lastElementChild.className === 'popup__container') {
    const form = popup.querySelector('.popup__content');
    clearForm(form);
    popup.classList.remove('popup_opened');
  }
  else {
    popup.classList.remove('popup_opened');
  }
  document.removeEventListener('keydown', closeByEsc);
};

// Функция закрытия попапа кликом на оверлей
const closeByClick = (event) => {
  if (!event.target.classList.contains('popup')) {
    event.stopPropagation();
  }
  else if (event.target.classList.contains('popup_opened')) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopupByPopup(openedPopup);
  }
};

// Функция отчистки формы
const clearForm = (form) => {
  form.reset();
  const inputsForm = form.querySelectorAll('.popup__input');
  inputsForm.forEach((inputForm) => {
    inputForm.classList.remove('popup__input_error');
  });
  const spans = form.querySelectorAll('.popup__input-error');
  spans.forEach((span) => {
    span.textContent = '';
  });
  const btnSubmit = form.querySelector('.popup__submit');
  if (btnSubmit.getAttribute('default_state') == 'enabled') {
    btnSubmit.removeAttribute('disabled', 'disabled');
  }
  else if (btnSubmit.getAttribute('default_state') == 'disabled') {
    btnSubmit.setAttribute('disabled', 'disabled');
  }
};

// Функция обрабатывания кликов по кнопкам крестиков
const closePopup = (event) => {
  closePopupByPopup(event.target.closest('.popup'));
};

popups.forEach((popup) => {
  const closeBtn = popup.querySelector('.popup__close-button');
  closeBtn.addEventListener('click', closePopup);
  popup.addEventListener('click', closeByClick);
});

// Функция закрытия попапа нажатием на Esc
const closeByEsc = (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopupByPopup(openedPopup);
  };
};

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
  image.setAttribute('alt', item.name);
  cardName.textContent = item.name;
  // Прикрепляем обработчик для удаления карточки 
  deleteBtn.addEventListener('click', deleteCard);
  // Прикрепляем обработчик для лайка карточки
  likeCard.addEventListener('click', likeBtn);
  // Прикрепляем обработчик на открытие картинки
  image.addEventListener('click', () => openPopupImage(item));

  return element;
};

// Функция удаления карточки 
const deleteCard = (event) => {
  event.target.closest('.elements__element').remove();
};

// Функция добавления лайка 
const likeBtn = (event) => {
  event.target.classList.toggle('elements__like_active');
};

// Попап открытия изображения 
const popupElementImage = document.querySelector('.popup_type_image');
const popupImage = popupElementImage.querySelector('.popup__image');
const popupImageName = popupElementImage.querySelector('.popup__paragraph-image');

// Функция открытия попапа изображения
function openPopupImage(item) {
  popupImageName.textContent = item.name;
  popupImage.setAttribute('src', item.link);
  popupImage.setAttribute('alt', item.name);
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
  inputEdit.value = profileTitle.textContent;
  jobEdit.value = profileSubtitle.textContent;
  openPopup(popupElementEdit);
};

// Обработчики событий открытие и закрытие попапа для профиля
editButton.addEventListener('click', openPopupEdit);

// Функция сохранения данных профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputEdit.value;
  profileSubtitle.textContent = jobEdit.value;
  closePopup(evt);
  formElementEdit.reset();
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
formElementCreate.addEventListener('submit', (evt) => {
  handleCreateFormSubmit(evt);
  formElementCreate.reset();
});

// Отрисовка карточек из массива объектов
const elements = initialCards.map(createItem);

// Добавление элементов карточек в контейнер
container.append(...elements);
