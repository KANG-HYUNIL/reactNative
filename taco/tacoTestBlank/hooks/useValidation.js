import { useState, useEffect } from 'react';
import { validateId, validatePassword, validateEmail } from '../utils/validation';

export const useValidation = (initialState, validationType) => {
    const [value, setValue] = useState(initialState);
    const [validationStatus, setValidationStatus] = useState(null);

    useEffect(() => {
        if (value === '') {
            setValidationStatus(null);
        } else {
            switch (validationType) {
                case 'id':
                    setValidationStatus(validateId(value) ? "valid" : "invalid");
                    break;
                case 'password':
                    setValidationStatus(validatePassword(value) ? "valid" : "invalid");
                    break;
                case 'email':
                    setValidationStatus(validateEmail(value) ? "valid" : "invalid");
                    break;
                default:
                    setValidationStatus(null);
            }
        }
    }, [value, validationType]);

    return [value, setValue, validationStatus];
};