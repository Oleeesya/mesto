const initialCards  = [
  {
    name:'Архыз',
    link:'./img/arkhyz.jpg'
  },
  {
    name:'Москва',
    link:'./img/Moscow.jpg'
  },
  {
    name:'Ростовская область',
    link:'./img/Rostov-region.jpg'
  },
  {
    name:'Санкт-Петербург',
    link:'./img/Saint-Petersburg.jpg'
  },
  {
    name:'Челябинская область',
    link:'./img/chelyabinsk-oblast.jpg'
  },
  {
    name:'Байкал',
    link:'./img/baikal.jpg'
  }
];
// Контейнер с карточками
const container = document.querySelector('.elements');

// Функция для преобразования объекта карточки в html
const createItem = (item) => {
  const templateElement = document.querySelector('#template-element');
  const element = templateElement.content.querySelector('.elements__element').cloneNode(true);
  const image = element.querySelector('.elements__image');
  const cardName = element.querySelector('.elements__title');
  const deleteCard = element.querySelector('.elements__trash');
  const likeCard = element.querySelector('.elements__like');
  image.setAttribute('src', item.link);
  image.setAttribute('name', item.name);
  cardName.textContent = item.name;
  // Прикрепляем обработчик для удаления карточки 
  deleteCard.addEventListener('click', Delete);
  // Прикрепляем обработчик для лайка карточки
  likeCard.addEventListener('click', likeBtn);
  // Прикрепляем обработчик на открытие картинки
  image.addEventListener('click', openPopupImage);

  return element;
};

// Функция удаление карточки 
const Delete = (event) => {
  event.target.closest('.elements__element').remove();
};

// Функция добавления лайка 
const likeBtn = (event) => {
  event.target.classList.toggle('elements__like_active');
};

// Попап открытие изображения 
const popupElementImage = document.querySelector('.popup_type_image');
const popupCloseButtonImage = popupElementImage.querySelector('.popup__close-button');
const popupImage = popupElementImage.querySelector('.popup__image');
const popupImageName = popupElementImage.querySelector('.popup__paragraph-image');


// Функция открытия попапа
function openPopupImage(event) {
  const selectPicture = event.target;
  const imagePath = selectPicture.getAttribute('src')
  const name = selectPicture.getAttribute('name');
  popupImageName.textContent = name;
  popupImage.setAttribute('src', imagePath);
  
  // popupImage.append(image);

  popupElementImage.classList.add('popup_opened');

};

// Обработчики событий открытие и закрытия картинок
popupCloseButtonImage.addEventListener('click', closePopup);

// Попап редактирования профиля
const popupElementEdit = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const closeButtonEdit = popupElementEdit.querySelector('.popup__close-button');
const formElementEdit = popupElementEdit.querySelector('.popup__content_name_edit');
let inputEdit = document.querySelector('.popup__input_edit_header');
let jobEdit = document.querySelector('.popup__input_edit_paragraph');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');

// Обработчик «отправки» формы 
function openPopupEdit() {
  popupElementEdit.classList.add('popup_opened');
  inputEdit.value = profileTitle.textContent;
  jobEdit.value = profileSubtitle.textContent;
}

// Функция закрытия попапов 
function closePopup() {
  popupElementEdit.classList.remove('popup_opened');
  popupElementCreate.classList.remove('popup_opened');
  popupElementImage.classList.remove('popup_opened');
}

// Обработчики событий открытие и закрытие попапа для профиля
editButton.addEventListener('click', openPopupEdit);  
closeButtonEdit.addEventListener('click', closePopup);  

// Функция сохранения данных профиля
function formSubmitEdit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.                                          
  profileTitle.textContent = inputEdit.value;// Получите значение полей jobInput и nameInput из свойства value
  profileSubtitle.textContent = jobEdit.value;
  closePopup();
}

// Прикрепляем обработчик к форме данных профиля
formElementEdit.addEventListener('submit', formSubmitEdit); 

// Попап новое место
const popupElementCreate = document.querySelector('.popup_type_create');
const formElementCreate = popupElementCreate.querySelector('.popup__content_name_create');
const createButton = document.querySelector('.profile__add-button');
const closeButtonCreate = popupElementCreate.querySelector('.popup__close-button');
let inputCreate = popupElementCreate.querySelector('.popup__input_create_header');
let imageCreate = popupElementCreate.querySelector('.popup__input_create_paragraph');

// Функция открытия попапа
function openPopupCreate() {
  popupElementCreate.classList.add('popup_opened');
};

// Обработчики событий открытие и закрытие попапа для новых карточек
createButton.addEventListener('click', openPopupCreate);
closeButtonCreate.addEventListener('click', closePopup);

// Функция добавления новой карточки
const newCard = (name, link, container) => {
  const card = {
    name: name,
    link: link
  };
  container.prepend(createItem(card));
};

// Функция отправки данных для новой карточки
function formSubmitCreate (evt) {
  evt.preventDefault();
  newCard(inputCreate.value, imageCreate.value, container);
  closePopup();
};

// Прикрепляем обработчик к форме создания новой карточки 
formElementCreate.addEventListener('submit', formSubmitCreate); 

// Отрисовка карточек из массива объектов
const elements = initialCards.map(createItem);
// Добавление элементов карточек в контейнер
container.append(...elements);
