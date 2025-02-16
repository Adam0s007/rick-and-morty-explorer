export const ROUTES = {
    HOME: '/',
    CHARACTERS: '/characters',
    CHARACTER_DETAILS: (id = ':id') => `/characters/${id}`,
};