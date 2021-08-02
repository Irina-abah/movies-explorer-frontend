import { React, useCallback } from 'react';

export function useForm() {
    const [values, setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid] = React.useState(false);
    // const [validity, setValidity] = React.useState({});

    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setValues({ ...values, [name]: value });
        setErrors({ ...errors, [name]: target.validationMessage });
        // setValidity({ ...validity, [name]: target.validity.valid })
        setIsValid(target.closest("form").checkValidity());
    };

    const resetForm = useCallback(
      (newValues = {}, newErrors = {}, newIsValid = false) => {
        setValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
        // setValidity
      },
      [setValues, setErrors, setIsValid]
    );

    return { values, setValues, setIsValid, setErrors, handleChange, resetForm, errors, isValid };
}