let popupElement = document.querySelector('.popup');
let navButton = document.querySelector('.edit-button');
let closeButton = popupElement.querySelector('.popup__close-button');

function openPopup() {
  popupElement.classList.add('popup_opened');
}

function closePopup() {
  popupElement.classList.remove('popup_opened');
}
  
navButton.addEventListener('click', openPopup);  

closeButton.addEventListener('click', closePopup);  


// Находим форму в DOM
let formElement = document.querySelector('.popup__content');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__title');// Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__subtitle');// Воспользуйтесь инструментом .querySelector()
let profile__title = document.querySelector('.profile__title');
let profile__subtitle = document.querySelector('.profile__subtitle');
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
    profile__title.textContent = nameInput.value;// Получите значение полей jobInput и nameInput из свойства value
    profile__subtitle.textContent = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 
formElement.addEventListener('submit', closePopup); 