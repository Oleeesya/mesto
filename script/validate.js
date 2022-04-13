// Валидация форм
const validationConfig = {
  formSelector: '.popup__content',
  inputSelector: '.popup__input',
  inputSelectorError: 'popup__input_error',
  submitButtonSelector: '.popup__submit',
  errorClass: 'popup__input-error_active'
};

// Добавление сообщения об ошибке
const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
  inputElement.classList.add(validationConfig.inputSelectorError);
};

// Удаление сообщения об ошибке
const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(validationConfig.inputSelectorError);
};

// Проверка валидации input
const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  }
  else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

// Обработчик событий input
const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

// Функция поиска форм и добавления обработчиков событий
function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
};

enableValidation(validationConfig);

//  Функция проверки форм
function hasInvalidInput(inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
};

// Функция стилизации кнопки 
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList) === true) {
    buttonElement.setAttribute('disabled', 'disabled');
  }
  else {
    buttonElement.removeAttribute('disabled', 'disabled');
  }
};