export const validationPassword = (password: string): boolean => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/.test(password);
