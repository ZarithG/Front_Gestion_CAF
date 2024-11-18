export const USER_TYPE = {
    USER: 'ROLE_USER',
    ADMIN: 'ROLE_ADMIN',
    COORDINATOR: 'ROLE_CAF_COORDINATOR',
    DIRECTOR: 'ROLE_WELLBEING_DIRECTOR',
    
};

export const SERVICES_BACK = {
    GOOGLELOGIN: "https://api-gateway-caf.onrender.com/auth/google/login",
    LOGINAUTH: 'https://api-gateway-caf.onrender.com/auth/login',
    LOGOUTAUTH: 'https://api-gateway-caf.onrender.com/auth/logout ',
    USERAUTH: 'https://api-gateway-caf.onrender.com/auth/verify/user',
    PASSWORDAUTH: 'https://api-gateway-caf.onrender.com/auth/change/password',
    CREATEAUTH: 'https://api-gateway-caf.onrender.com/auth/create',
    VALIDATEAUTH: 'https://api-gateway-caf.onrender.com/auth/validate',
    SAVEUSER: 'https://api-gateway-caf.onrender.com/user/save',
    GETALLQUESTIONS: 'https://api-gateway-caf.onrender.com/caf/question/all',
    GET_USER_ACTIVE_INSCRIPTION: 'https://api-gateway-caf.onrender.com/caf/inscription/all/',

    GET_IS_USER_VERIFIED: 'https://api-gateway-caf.onrender.com/auth/isUserVerified/',
    GET_DEPARTMETS: 'https://api-gateway-caf.onrender.com/user/departments',
    GET_PROGRAMS: 'https://api-gateway-caf.onrender.com/user/programs' ,
    GET__ALL_CAF: 'https://api-gateway-caf.onrender.com/caf/all' ,
    GET_USET_ALL_CAF: 'https://api-gateway-caf.onrender.com/caf/inscription/all/' ,
    GET_IS_USER_OLD_MAYOR: 'https://api-gateway-caf.onrender.com/user/isUserOldMayor/',
    GET_SHIFT_LIST: 'https://api-gateway-caf.onrender.com/shift/allDayAssignments/',
    GET_USER_ALL: 'https://api-gateway-caf.onrender.com/auth/user/all',
    GET_USER_INSTANCE_SHIFT: 'https://api-gateway-caf.onrender.com/shift/reserve/shift-instances-caf/',
    

    POST_CAF_INSCRIPTION: 'https://api-gateway-caf.onrender.com/caf/inscription/inscribe-user/',
    POST_CONSENT_FILE: "https://api-gateway-caf.onrender.com/caf/files/upload/",
    POST_SAVE_SHIFT: "https://api-gateway-caf.onrender.com/shift/saveShift",
    POST_INSTANCE_SHIFT: "https://api-gateway-caf.onrender.com/shift/reserve/create-shift-instances/",
    PUT_DELETE_SHIFT: "https://api-gateway-caf.onrender.com/shift/deleteShift",

}

export const STATUS = {
    NORMAL: '',
    REVIEW: '',
    ACCEPTED: '',
}