// auth.js
export const isAuthenticated = () => {
    return localStorage.getItem('authToken') ? true : false;
};

export const login = (token) => {
    localStorage.setItem('authToken', token);
};

export const logout = () => {
    localStorage.removeItem('authToken');
};
