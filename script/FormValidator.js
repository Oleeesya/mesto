export class FormValidator {
    constructor(validationConfig, formElement) {
        this._validationConfig = validationConfig;
        this._formElement = formElement;
    }
    // Добавление сообщения об ошибке
    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._validationConfig.errorClass);
        inputElement.classList.add(this._validationConfig.inputSelectorError);
    };

    // Удаление сообщения об ошибке
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        errorElement.classList.remove(this._validationConfig.errorClass);
        errorElement.textContent = '';
        inputElement.classList.remove(this._validationConfig.inputSelectorError);
    };

    // Проверка валидации input
    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        }
        else {
            this._hideInputError(inputElement);
        }
    };

    // Обработчик событий input
    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
        const buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    };

    // Функция поиска форм и добавления обработчиков событий
    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    };

    //  Функция проверки форм
    _hasInvalidInput(inputList) {
        return inputList.some(function (inputElement) {
            return !inputElement.validity.valid;
        });
    };

    // Функция стилизации кнопки 
    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList) === true) {
            buttonElement.setAttribute('disabled', 'disabled');
        }
        else {
            buttonElement.removeAttribute('disabled');
        }
    };

    // Отчистка формы при открытии попапа
    clearForm() {
        const inputsForm = this._formElement.querySelectorAll(this._validationConfig.inputSelector);
        const inputList = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
        const buttonElement = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
        inputsForm.forEach((inputForm) => {
            this._hideInputError(inputForm);
        });
        this._toggleButtonState(inputList, buttonElement);
    };

};
