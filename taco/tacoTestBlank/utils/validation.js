
// ID 규칙 준수 검증 함수
export const validateId = (id) => {
    const idRegex = /^[a-zA-Z0-9]{5,20}$/;
    return idRegex.test(id);
};

// 비밀번호 규칙 준수 검증 함수
export const validatePassword = (password) => {
    const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
    return pwRegex.test(password);
};

// 이메일 규칙 준수 검증 함수
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};