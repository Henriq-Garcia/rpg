export interface SignInPayload {
    email: string;
    password: string;
}

export interface SignInResponse {
    token: string;
    refreshToken: string;
}

export interface RefreshTokenResponse {
    token: string;
}