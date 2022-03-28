const initialCards  = [
  {
    name:'Карачаевск',
    link:'./img/karachaevsk.jpg'
  },
  {
    name:'Гора Эльбрус',
    link:'./img/elbrus.jpg'
  },
  {
    name:'Домбай',
    link:'./img/dombai.jpg'
  },
  {
    name:'Гора Эльбрус',
    link:'./img/elbrus.jpg'
  },
  {
    name:'Домбай',
    link:'./img/dombai.jpg'
  },
  {
    name:'Карачаевск',
    link:'./img/karachaevsk.jpg'
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
  image.setAttribute('src', item.link);
  cardName.textContent = item.name;
  return element;
};

// Отрисовка карточек из массива объектов
const elements = initialCards.map(createItem);
container.append(...elements);

// Попап редактирования профиля
let popupElementEdit = document.querySelector('.popup_type_edit');
let editButton = document.querySelector('.profile__edit-button');
let closeButtonEdit = popupElementEdit.querySelector('.popup__close-button');
let formElementEdit = popupElementEdit.querySelector('.popup__content_name_edit');
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
let popupElementCreate = document.querySelector('.popup_type_create');
let formElementCreate = popupElementCreate.querySelector('.popup__content_name_create');
let createButton = document.querySelector('.profile__add-button');
let inputCreate = popupElementCreate.querySelector('.popup__input_create_header');
let imageCreate = popupElementCreate.querySelector('.popup__input_create_paragraph');
let closeButtonCreate = popupElementCreate.querySelector('.popup__close-button');

// Функцция открытия попапа
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
}

// Функция отправки данных для новой карточки
function formSubmitCreate (evt) {
  evt.preventDefault();
  newCard(inputCreate.value, imageCreate.value, container);
  closePopup();
};

// Прикрепляем обработчик к форме создания новой карточки 
formElementCreate.addEventListener('submit', formSubmitCreate); 
