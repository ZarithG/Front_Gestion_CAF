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

    GET_IS_USER_VERIFIED: 'http://localhost:9093/auth/isUserVerified/',
    GET_DEPARTMETS: 'http://localhost:9093/user/departments',
    GET_PROGRAMS: 'http://localhost:9093/user/programs' ,
    GET__ALL_CAF: 'http://localhost:9093/caf/all' ,
    GET_USET_ALL_CAF: 'http://localhost:9093/caf/inscription/all/' ,
    GET_IS_USER_OLD_MAYOR: 'http://localhost:9093/user/isUserOldMayor/',
    GET_SHIFT_LIST: 'http://localhost:9093/shift/allDayAssignments/',
    GET_USER_ALL: 'http://localhost:9093/auth/user/all',
    GET_USER_INSTANCE_SHIFT: 'http://localhost:9093/shift/reserve/shift-instances-caf/',
    

    POST_CAF_INSCRIPTION: 'http://localhost:9093/caf/inscription/inscribe-user/',
    POST_CONSENT_FILE: "http://localhost:9093/caf/files/upload/",
    POST_SAVE_SHIFT: "http://localhost:9093/shift/saveShift",
    POST_INSTANCE_SHIFT: "http://localhost:9093/shift/reserve/create-shift-instances/",
    PUT_DELETE_SHIFT: "http://localhost:9093/shift/deleteShift",

}

export const STATUS = {
    NORMAL: '',
    REVIEW: '',
    ACCEPTED: '',
}