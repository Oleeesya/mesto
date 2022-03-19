let popupElement = document.querySelector('.popup');
let navButton = document.querySelector('.profile__edit-button');
let closeButton = popupElement.querySelector('.popup__close-button');

// Находим форму в DOM
let formElement = document.querySelector('.popup__content');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__title_name_header');// Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__subtitle_name_paragraph');// Воспользуйтесь инструментом .querySelector()
let profile__title = document.querySelector('.profile__title');
let profile__subtitle = document.querySelector('.profile__subtitle');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function openPopup() {
  popupElement.classList.add('popup_opened');
  nameInput.value = profile__title.textContent;
  jobInput.value = profile__subtitle.textContent;
}

function closePopup() {
  popupElement.classList.remove('popup_opened');
}
  
navButton.addEventListener('click', openPopup);  

closeButton.addEventListener('click', closePopup);  

function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    profile__title.textContent = nameInput.value;// Получите значение полей jobInput и nameInput из свойства value
    profile__subtitle.textContent = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    closePopup()
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 