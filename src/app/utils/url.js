

const server = localStorage.getItem('bill-server');

export const SERVER = server || 'http://localhost:3000';

export default {
    AUTH_LOGIN: SERVER + '/auth/login',
    AUTH_MAIL: SERVER + '/auth/mail',
    AUTH_REGISTER: SERVER + '/auth/register',
    UNIVERSITY: SERVER + '/university',
    UNIVERSITY_SEARCH: SERVER + '/university/search',
    TEACHER: SERVER + '/teacher',
    TEACHER_SEARCH: SERVER + '/teacher/search',
    FILE: SERVER + '/file',
    USER: SERVER + '/user',
};

