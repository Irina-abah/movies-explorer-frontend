import { React, useCallback } from 'react';

export function useForm() {
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isFormValid, setIsFormValid] = React.useState(false);
    const [validity, setValidity] = React.useState({});

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: target.validationMessage });
        setValidity({ ...validity, [name]: target.validity.valid })
        setIsFormValid(target.closest('form').checkValidity());
    };

    const resetForm = useCallback(
      (newValues = {}, newErrors = {}, newValidity = {}, newIsFormValid = false) => {
        setValues(newValues);
        setErrors(newErrors);
        setIsFormValid(newIsFormValid);
        setValidity(newValidity)
      },
      [setValues, setErrors, setValidity, setIsFormValid]
    );

    return { values, setValues, setIsFormValid, errors, setErrors, handleChange, resetForm, validity, setValidity, isFormValid };
}


// function checkInputValidity (input) {
//     if (input.name === 'email') {
//         const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//         return regex.test(String(input.value).toLowerCase());  
//     } else if (input.name === 'name') {
//         if (input.value.length < 2) {
//             return false
//         }
//         const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/g;
//         return regex.test(String(input.value)); 
//     }
//     return input.validity.valid
// }

// function makeVlidationMessage (input) {
//     if (!input.value) {
//         return 'Заполните это поле'
//     }
//     if (input.name === 'email') {
//         return 'Невалидный адрес электронной почты'
//     } else if (input.name === 'name') {
//         if (input.value.length < 2) {
//             return 'Имя должно быть не короче 2-ух символов'
//         }
//         return 'Имя может содержать только латинские буквы, кириллицу, пробел или дефис'
//     }
//     return input.validationMessage
// }