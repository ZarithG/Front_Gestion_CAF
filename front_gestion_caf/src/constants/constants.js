export const USER_TYPE = {
    USER: 'ROLE_USER',
    ADMIN: 'ROLE_ADMIN',
    COORDINATOR: 'ROLE_CAF_COORDINATOR',
    DIRECTOR: 'ROLE_WELLBEING_DIRECTOR',
    SPORTSMAN: 'ROLE_SPORTSMAN'
};

export const SERVICES_BACK = {
    GOOGLELOGIN: "http://localhost:9093/auth/google/login",
    LOGINAUTH: 'http://localhost:9093/auth/login',
    LOGOUTAUTH: 'http://localhost:9093/auth/logout ',
    USERAUTH: 'http://localhost:9093/auth/verify/user',
    PASSWORDAUTH: 'http://localhost:9093/auth/change/password',
    CREATEAUTH: 'http://localhost:9093/auth/create',
    VALIDATEAUTH: 'http://localhost:9093/auth/validate',
    
    GET__ALL_CAF: 'http://localhost:9093/caf/all' ,
    GETALLQUESTIONS: 'http://localhost:9093/caf/question/all',
    GET_USER_ACTIVE_INSCRIPTION: 'http://localhost:9093/caf/inscription/all-active/',
    GET_USET_ALL_CAF: 'http://localhost:9093/caf/inscription/all/' ,
    
    GET_IS_USER_VERIFIED: 'http://localhost:9093/auth/isUserVerified/',
    GET_USER_ALL: 'http://localhost:9093/auth/user/all',
    
    GET_SHIFT_LIST: 'http://localhost:9093/shift/allDayAssignments/',
    GET_USER_INSTANCE_SHIFT: 'http://localhost:9093/shift/reserve/shift-instances-caf/',
    GET_RESERVE_ALL: 'http://localhost:9093/shift/reserve/shift-instances-caf/',
    GET_RESERVE_BY_SHIFT: 'http://localhost:9093/shift/reserve/all-reservations-by-shift-instance/',
    
    SAVEUSER: 'http://localhost:9093/user/save',
    GET_DEPARTMETS: 'http://localhost:9093/user/departments',
    GET_PROGRAMS: 'http://localhost:9093/user/programs' ,
    GET_IS_USER_OLD_MAYOR: 'http://localhost:9093/user/isUserOldMayor/',
    GET_ONE_USER: 'http://localhost:9093/user/basic/',
    GET_ONE_USER_ID: 'http://localhost:9093/user/basic/user-id/',
    GET_IDCAF_BY_USER_EMAIL: 'http://localhost:9093/caf/',
    
    POST_CAF_INSCRIPTION: 'http://localhost:9093/caf/inscription/inscribe-user/',
    POST_CONSENT_FILE: "http://localhost:9093/caf/files/upload/",
    POST_SAVE_SHIFT: "http://localhost:9093/shift/saveShift",
    POST_INSTANCE_SHIFT: "http://localhost:9093/shift/reserve/create-shift-instances/",
    POST_SHIFT_RESERVE: 'http://localhost:9093/shift/reserve/reserve-shift-user',
    POST_REGISTRY_ATTENDED_RESERVE: 'http://localhost:9093/shift/reserve/registry-attended-reserve',
    GET_SHIFT_INTANCE_ACT: 'http://localhost:9093/shift/shift-instances/actShift/',
    POST_FINISH_INSTANCE_ACT: 'http://localhost:9093/shift/shift-instances/finishShift/',
    PUT_DELETE_SHIFT: "http://localhost:9093/shift/deleteShift",

}

export const STATUS = {
    NORMAL: '',
    REVIEW: '',
    ACCEPTED: '',
}