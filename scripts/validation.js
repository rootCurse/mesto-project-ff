const textReg = /^[a-zA-Zа-яА-ЯёЁ\-\s]*$/

export const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
    
    document.querySelectorAll(formSelector).forEach((form) => {
        const inputs = form.querySelectorAll(inputSelector);
        const submitButton = form.querySelector(submitButtonSelector);                               
        const checkInputsValidity = () => {
            let isValid = true;
            inputs.forEach((input) => {
                let validReg = (input.type === "text" && !textReg.test(input.value));
                if (!input.validity.valid || validReg) {
                    isValid = false;
                }
            });
            if (isValid) {
                submitButton.classList.remove(inactiveButtonClass);
                submitButton.removeAttribute('disabled');
            } else {
                submitButton.classList.add(inactiveButtonClass);
                submitButton.setAttribute('disabled', true);
            }
        };
        inputs.forEach((input) => {
            input.addEventListener("input", () => {
                let validReg = (input.type === "text" && !textReg.test(input.value));
                if(validReg)
                    input.dataset.error = 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.'
                if (!input.validity.valid || validReg) {
                    input.classList.add(inputErrorClass);
                    const errorSpan = input.parentNode.querySelector(errorClass);
                    errorSpan.style.display = "block";
                    errorSpan.textContent = validReg ?
                        'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.' :
                        input.validationMessage;
                } else {
                    input.classList.remove(inputErrorClass);
                    input.parentNode.querySelector(errorClass).textContent = '';
                }
                checkInputsValidity();
            });
        });
        checkInputsValidity();
    })
}

export const clearValidation = (formElement, config) => {
    const { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass } = config;
    formElement.querySelectorAll(inputSelector).forEach((input) => {
        input.classList.remove(inputErrorClass)
        input.parentNode.querySelector(errorClass).textContent = ''
        formElement.querySelector(submitButtonSelector).classList.remove(inactiveButtonClass)
        input.value = '';
    });
    formElement.querySelector(submitButtonSelector).setAttribute('disabled', true)
};
