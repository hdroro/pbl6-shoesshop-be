export const AccountStatus = Object.freeze({
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    DELETED: 'DELETED'
});

export const UserRole = Object.freeze({
    ADMIN: 'ADMIN',
    STAFF: 'STAFF',
    CUSTOMER: 'CUSTOMER'
});

export const Gender = Object.freeze({
    MALE: false,
    FEMALE: true
});

export const tokenTypes = Object.freeze({
    ACCESS: 'access',
    REFRESH: 'refresh',
    RESET_PASSWORD: 'resetPassword',
    VERIFY_EMAIL: 'verifyEmail',
});
    
export const requestType = Object.freeze({
    PENDING: 'PENDING',
    ACCEPTED: 'ACCEPTED',
    REJECTED: 'REJECTED',
});

export const passwordDefault = "shoesshop";

export const VoucherType = Object.freeze({
    PERCENTAGE: 'PERCENTAGE',
    PRICE: 'PRICE',
});

export const VoucherStatus = Object.freeze({
    UPCOMING: 'UPCOMING',
    ACTIVE: 'ACTIVE',
    EXPIRED: 'EXPIRED',
    DELETED: 'DELETED',
});

export const ProductTarget = Object.freeze({
    WOMEN: 'WOMEN',
    MEN: 'MEN'
});