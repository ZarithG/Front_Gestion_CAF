export const USER_TYPE = {
    USER: 'ROLE_USER',
    ADMIN: 'ROLE_ADMIN',
    COORDINATOR: 'ROLE_CAF_COORDINATOR',
    DIRECTOR: 'ROLE_WELLBEING_DIRECTOR',
    
};

export const SERVICES_BACK = {
    GOOGLELOGIN: "http://localhost:9091/auth/google/login",
    LOGINAUTH: 'http://localhost:9091/auth/login',
    LOGOUTAUTH: 'http://localhost:9091/auth/logout ',
    USERAUTH: 'http://localhost:9091/verify/user',
    PASSWORDAUTH: 'http://localhost:9091/auth/change/password',
    CREATEAUTH: 'http://localhost:9091/auth/create',
    VALIDATEAUTH: 'http://localhost:9091/auth/validate',
    SAVEUSER: 'http://localhost:9093/user/save',
    GETALLQUESTIONS: 'http://localhost:9093/caf/question/all',
}

export const STATUS = {
    NORMAL: '',
    REVIEW: '',
    ACCEPTED: '',
}