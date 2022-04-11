const templateElement = document.querySelector('#template-element');

const popups = document.querySelectorAll('.popup');

// Функция открытия попапов
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
  document.addEventListener('click', closeByClick);
};

// Функция закрытия попапов 
const closePopupByPopup = (popup) => {
  popup.classList.remove('popup_opened');
  clearValidation();
  clearValidationBtn();
}

const closePopup = (event) => {
  closePopupByPopup(event.target.closest('.popup'));
};

// Функция обрабатывания кликов по кнопкам крестиков
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close-button')) {
      closePopup(evt);
      const inputsForm = document.querySelectorAll('.popup__input')
      clearForms(inputsForm);
    }
  });
});

// Функция закрытия попапа нажатием на Esc
const closeByEsc = (event) => {
  if (event.key === "Escape") {
    const popup = document.querySelector('.popup_opened');
    closePopupByPopup(popup);
    const inputsForm = document.querySelectorAll('.popup__input')
    clearForms(inputsForm);
    document.removeEventListener('keydown', closeByEsc);
  };
};

// Функция закрытия попапа кликом на оверлей
const closeByClick = (event) => {
  if (!event.target.classList.contains('popup')) {
    event.stopPropagation();
  }
  else {
    const popup = document.querySelector('.popup_opened');
    closePopupByPopup(popup);
    const inputsForm = document.querySelectorAll('.popup__input')
    clearForms(inputsForm);
    document.removeEventListener('keydown', closeByEsc);
  }
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
  image.addEventListener('click', openPopupImage);

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

// Функция открытия попапа
function openPopupImage(event) {
  const selectPicture = event.target;
  const imagePath = selectPicture.getAttribute('src')
  const altImage = selectPicture.getAttribute('alt');
  popupImageName.textContent = altImage;
  popupImage.setAttribute('src', imagePath);
  popupImage.setAttribute('alt', altImage);
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

// Функция очистки строк input
const clearForms = (inputsForm) => {
  inputsForm.forEach(function (element) {
    element.value = '';
  });
}

// Функция очистки валидации 
const clearValidation = () => {
  const spans = Array.from(document.querySelectorAll('.popup__input-error'));
  spans.forEach(function (span) {
    console.log(spans);
    span.textContent = '';
  })
};

// Функция очистки валидации для кнопки
const clearValidationBtn = () => {
  const ValidationBtns = Array.from(document.querySelectorAll('.popup__submit'));
  ValidationBtns.forEach(function (ValidationBtn) {
    ValidationBtn.classList.remove('popup__submit_invalid');
    console.log(ValidationBtn);
  })
};

// Прикрепляем обработчик к форме создания новой карточки 
formElementCreate.addEventListener('submit', (evt) => {
  handleCreateFormSubmit(evt);
  const inputsForm = document.querySelectorAll('.popup__input')
  clearForms(inputsForm);
});

// Отрисовка карточек из массива объектов
const elements = initialCards.map(createItem);

// Добавление элементов карточек в контейнер
container.append(...elements);
