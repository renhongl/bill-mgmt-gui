

const server = localStorage.getItem('bill-server');

export const SERVER = server || 'http://47.244.173.138';

export default {
    AUTH_LOGIN: SERVER + '/auth/login',
    AUTH_MAIL: SERVER + '/auth/mail',
    AUTH_REGISTER: SERVER + '/auth/register',
    UNIVERSITY: SERVER + '/university',
    UNIVERSITY_SEARCH: SERVER + '/university/search',
    TEACHER_SEARCH_UNI: SERVER + '/teacher/search/uni',
    TEACHER: SERVER + '/teacher',
    TEACHER_SEARCH: SERVER + '/teacher/search',
    FILE: SERVER + '/file',
    USER: SERVER + '/user',
    USER_SEARCH: SERVER + '/user/search',
    USER_DELETE: SERVER + '/user/delete',
    STUDENT: SERVER + '/student',
    STUDENT_SEARCH: SERVER + '/student/search',
    MATERIAL: SERVER + '/material',
    MATERIAL_SEARCH: SERVER + '/material/search',
    MATERIAL_GET: SERVER + '/material',
    MATERIAL_TOTAL: SERVER + '/material/total',
    MATERIAL_TOP_STUDENT: SERVER + '/material/top/student',
    MATERIAL_TOP_TEACHER: SERVER + '/material/top/teacher',
    MATERIAL_TOP_UNI: SERVER + '/material/top/university',
    MATERIAL_TREND_UNI: SERVER + '/material/trend/university'
};

