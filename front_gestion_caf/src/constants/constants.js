export const USER_TYPE = {
    USER: 'ROLE_USER',
    ADMIN: 'ROLE_ADMIN',
    COORDINATOR: 'ROLE_CAF_COORDINATOR',
    DIRECTOR: 'ROLE_WELLBEING_DIRECTOR',
    
};

export const SERVICES_BACK = {
    GOOGLELOGIN: "http://localhost:9093/auth/google/login",
    LOGINAUTH: 'http://localhost:9093/auth/login',
    LOGOUTAUTH: 'http://localhost:9093/auth/logout ',
    USERAUTH: 'http://localhost:9093/auth/verify/user',
    PASSWORDAUTH: 'http://localhost:9093/auth/change/password',
    CREATEAUTH: 'http://localhost:9093/auth/create',
    VALIDATEAUTH: 'http://localhost:9093/auth/validate',
    SAVEUSER: 'http://localhost:9093/user/save',
    GETALLQUESTIONS: 'http://localhost:9093/caf/question/all',
    GET_USER_ACTIVE_INSCRIPTION: 'http://localhost:9093/caf/inscription/all/',

    GET_IS_USER_VERIFIED: 'http://localhost:9093/auth/isUserVerified/',
    GET_DEPARTMETS: 'http://localhost:9093/user/departments',
    GET_PROGRAMS: 'http://localhost:9093/user/programs' ,
    GET__ALL_CAF: 'http://localhost:9093/caf/all' ,
    GET_IS_USER_OLD_MAYOR: 'http://localhost:9093/user/isUserOldMayor/',
    GET_SHIFT_LIST: 'http://localhost:9093/shift/allDayAssignments/',


    POST_CAF_INSCRIPTION: 'http://localhost:9093/caf/inscription/inscribe-user/',
    POST_CONSENT_FILE: "http://localhost:9093/caf/files/upload/",
    POST_SAVE_SHIFT: "http://localhost:9093/shift/saveShift"
}

export const STATUS = {
    NORMAL: '',
    REVIEW: '',
    ACCEPTED: '',
}