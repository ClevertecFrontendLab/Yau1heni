export enum Paths {
    MAIN = '/main',

    AUTH = '/auth',
    REGISTRATION = '/auth/registration',
    CONFIRM_EMAIL = '/auth/confirm-email',
    CHANGE_PASSWORD = '/auth/change-password',

    RESULT = '/result',
    ERROR_LOGIN = '/result/error-login',
    ERROR_REGISTRATION = '/result/error',
    ERROR_USER_EXIST = '/result/error-user-exist',
    ERROR_CHANGE_PASSWORD = '/result/error-change-password',
    SUCCESS = '/result/success',
    SUCCESS_CHANGE_PASSWORD = '/result/success-change-password',

    ERROR_CHECK_EMAIL_NO_EXIST = '/result/error-check-email-no-exist',
    ERROR_CHECK_EMAIL = '/result/error-check-email',

    FEEDBACKS = '/feedbacks',

    NOT_FOUND = '/not-found',
}
