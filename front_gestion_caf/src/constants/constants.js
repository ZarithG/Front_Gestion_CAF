export const USER_TYPE = {
    USER: 'ROLE_USER',
    ADMIN: 'ROLE_ADMIN',
    COORDINATOR: 'ROLE_CAF_COORDINATOR',
    DIRECTOR: 'ROLE_WELLBEING_DIRECTOR',
    
};

const BASE_URL = "https://api-gateway-caf.onrender.com"

export const SERVICES_BACK = {
    GOOGLELOGIN: BASE_URL + "/auth/google/login",
    LOGINAUTH: BASE_URL + '/auth/login',
    LOGOUTAUTH: BASE_URL + '/auth/logout ',
    USERAUTH: BASE_URL + '/auth/verify/user',
    PASSWORDAUTH: BASE_URL + '/auth/change/password',
    CREATEAUTH: BASE_URL + '/auth/create',
    VALIDATEAUTH: BASE_URL + '/auth/validate',
    SAVEUSER: BASE_URL + '/user/save',
    GETALLQUESTIONS: BASE_URL + '/caf/question/all',
    GET_USER_ACTIVE_INSCRIPTION: BASE_URL + '/caf/inscription/all/',

    GET_IS_USER_VERIFIED: BASE_URL + '/auth/isUserVerified/',
    GET_DEPARTMETS: BASE_URL + '/user/departments',
    GET_PROGRAMS: BASE_URL + '/user/programs' ,
    GET__ALL_CAF: BASE_URL + '/caf/all' ,
    GET_IS_USER_OLD_MAYOR: BASE_URL + '/user/isUserOldMayor/',
    GET_SHIFT_LIST: BASE_URL + '/shift/allDayAssignments/',


    POST_CAF_INSCRIPTION: BASE_URL + '/caf/inscription/inscribe-user/',
    POST_CONSENT_FILE: BASE_URL + '/caf/files/upload/',
    POST_SAVE_SHIFT: BASE_URL + '/shift/saveShift'
}

export const STATUS = {
    NORMAL: '',
    REVIEW: '',
    ACCEPTED: '',
}