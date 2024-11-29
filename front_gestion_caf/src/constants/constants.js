export const USER_TYPE = {
    USER: 'ROLE_USER',
    ADMIN: 'ROLE_ADMIN',
    COORDINATOR: 'ROLE_CAF_COORDINATOR',
    DIRECTOR: 'ROLE_WELLBEING_DIRECTOR',
    SPORTSMAN: 'ROLE_SPORTSMAN'
};

export const SERVICES_BACK = {
    GOOGLELOGIN: "http://localhost:9091/auth/google/login",
    LOGINAUTH: 'https://bienestar-caf-app.online/auth/login',
    LOGOUTAUTH: 'https://bienestar-caf-app.online/auth/logout ',
    LOGOUTAUTH_2: 'https://localhost:9091/auth/logout ',
    USERAUTH: 'https://bienestar-caf-app.online/auth/verify/user',
    PASSWORDAUTH: 'https://bienestar-caf-app.online/auth/change/password',
    CREATEAUTH: 'https://bienestar-caf-app.online/auth/create',
    VALIDATEAUTH: 'https://bienestar-caf-app.online/auth/validate',
    
    GET__ALL_CAF: 'https://bienestar-caf-app.online/caf/all' ,
    GETALLQUESTIONS: 'https://bienestar-caf-app.online/caf/question/all',
    GET_USER_ACTIVE_INSCRIPTION: 'https://bienestar-caf-app.online/caf/inscription/all-active/',
    GET_USET_ALL_CAF: 'https://bienestar-caf-app.online/caf/inscription/all/',
    GET_USER_ACTIVE_PENDING_INACTIVE_INSCRIPTION: 'https://bienestar-caf-app.online/caf/inscription/user-caf/',
    GET_COMPLETE_USER_BY_EMAIL: 'https://bienestar-caf-app.online/user/email/',
    
    GET_IS_USER_VERIFIED: 'https://bienestar-caf-app.online/auth/isUserVerified/',
    GET_USER_ALL: 'https://bienestar-caf-app.online/auth/user/all',
    GET_USER_RESPONSES_BY_INSCRIPTION: 'https://bienestar-caf-app.online/caf/inscription/user-responses/',
    GET_USER_CONSENTS_BY_INSCRIPTION: 'https://bienestar-caf-app.online/caf/files/obtain/',
    GET_USER_INSCRIPTION_FILE: 'https://bienestar-caf-app.online/caf/files/load',
    
    GET_SHIFT_LIST: 'https://bienestar-caf-app.online/shift/allDayAssignments/',
    GET_USER_INSTANCE_SHIFT: 'https://bienestar-caf-app.online/shift/reserve/shift-instances-caf/',
    GET_RESERVE_ALL: 'https://bienestar-caf-app.online/shift/reserve/shift-instances-caf/',
    GET_RESERVE_BY_SHIFT: 'https://bienestar-caf-app.online/shift/reserve/all-reservations-by-shift-instance/',
    GET_RESERBE_BY_USER: 'https://bienestar-caf-app.online/shift/reserve//allReservationForUser/',
    
    SAVEUSER: 'https://bienestar-caf-app.online/user/save',
    GET_DEPARTMETS: 'https://bienestar-caf-app.online/user/departments',
    GET_PROGRAMS: 'https://bienestar-caf-app.online/user/programs' ,
    GET_IS_USER_OLD_MAYOR: 'https://bienestar-caf-app.online/user/isUserOldMayor/',
    GET_ONE_USER: 'https://bienestar-caf-app.online/user/basic/',
    GET_ONE_USER_ID: 'https://bienestar-caf-app.online/user/basic/user-id/',
    GET_IDCAF_BY_USER_EMAIL: 'https://bienestar-caf-app.online/caf/',
    
    POST_CAF_INSCRIPTION: 'https://bienestar-caf-app.online/caf/inscription/inscribe-user/',
    POST_CAF_ACCEPT_INSCRIPTION: 'https://bienestar-caf-app.online/caf/inscription/accept-inscription/',
    POST_CAF_REJECT_INSCRIPTION: 'https://bienestar-caf-app.online/caf/inscription/reject-inscription/',
    POST_CAF_INACTIVE_INSCRIPTION: 'https://bienestar-caf-app.online/caf/inscription/inactive-inscription/',
    POST_CAF_ACTIVE_INSCRIPTION: 'https://bienestar-caf-app.online/caf/inscription/active-inscription/',
    POST_CONSENT_FILE: "https://bienestar-caf-app.online/caf/files/upload/",
    POST_SAVE_SHIFT: "https://bienestar-caf-app.online/shift/saveShift",
    POST_INSTANCE_SHIFT: "https://bienestar-caf-app.online/shift/reserve/create-shift-instances/",
    POST_SHIFT_RESERVE: 'https://bienestar-caf-app.online/shift/reserve/reserve-shift-user',
    POST_REGISTRY_ATTENDED_RESERVE: 'https://bienestar-caf-app.online/shift/reserve/registry-attended-reserve',
    POST_SHIFTS_REPORTS_ATTENDED: "https://bienestar-caf-app.online/shift/shiftsReportAttended",
    POST_SHIFTS_CANCEL: "https://bienestar-caf-app.online/shift/reserve/cancelReservationForUser",
    POST_FINISH_INSTANCE_ACT: 'https://bienestar-caf-app.online/shift/shift-instances/finishShift/',
    
    PUT_DELETE_SHIFT: "https://bienestar-caf-app.online/shift/deleteShift",
    PUT_EDIT_SHIFT: "https://bienestar-caf-app.online/shift/editShift",

    GET_CAF_INFO:"https://bienestar-caf-app.online/caf/id/",
    GET_ALL_CAF_INSCRIPTIONS: "https://bienestar-caf-app.online/caf/inscription/all/coordinator-email/",
    GET_ALL_CAF_ACTIVE_INSCRIPTIONS: "https://bienestar-caf-app.online/caf/inscription/all-active/coordinator-email/",
    GET_SHIFT_INTANCE_ACT: 'https://bienestar-caf-app.online/shift/shift-instances/actShift/',

    POST_CHANGE_DIRECTOR: "https://bienestar-caf-app.online/auth/change-wellbeing-director",

    ACTIVE_USER: "https://bienestar-caf-app.online/auth/active-user/",
    INACTIVE_USER: "https://bienestar-caf-app.online/auth/inactive-user/",
    CREATE_NEW_AUTH_USER: 'https://bienestar-caf-app.online/auth/create',
    IS_USER_REGISTERED: 'https://bienestar-caf-app.online/auth/user/is-registered/',
    GET_ALL_CAF_COORDINATORS: 'https://bienestar-caf-app.online/auth/user/caf/all',
    COUNT_INSCRIPTIONS_CAF_ID: 'https://bienestar-caf-app.online/caf/count-inscriptions/',

}

export const STATUS = {
    NORMAL: '',
    REVIEW: '',
    ACCEPTED: '',
}