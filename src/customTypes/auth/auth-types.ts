export type AuthPayload = {
    email: string;
    password: string;
};

export type LoginResponse = {
    accessToken: string;
};

export type CheckEmailPayload = Pick<AuthPayload, 'email'>;

export type EmailResponse = {
    email: string;
    message: string;
};

export type ConfirmEmailPayload = {
    email: string;
    code: string;
};

export type ChangePasswordPayload = {
    password: string;
    confirmPassword: string;
};

export type ChangePasswordResponse = {
    message: string;
};

export enum StatusCode {
    NOT_FOUND_404 = 404,
    USER_EXISTS = 409,
}

export type AuthInitialState = {
    isLoading: boolean;
    isRememberMe: boolean;
    isLoggedIn: boolean;
    registrationData: AuthData;
    checkEmail: CheckEmail;
    confirmCode: string;
    changePasswordData: ChangePasswordData;
    isErrorConfirmEmail: boolean;
};

type Nullable<T> = T | null;

export type AuthData = Nullable<AuthPayload & { pathname: string }>;
export type CheckEmail = Nullable<CheckEmailPayload & { pathname: string }>;
export type ChangePasswordData = Nullable<ChangePasswordPayload & { pathname: string }>;
