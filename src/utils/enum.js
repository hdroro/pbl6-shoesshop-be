export const AccountStatus = Object.freeze({
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    DELETED: 'DELETED'
})

export const UserRole = Object.freeze({
    ADMIN: 'ADMIN',
    STAFF: 'STAFF',
    CUSTOMER: 'CUSTOMER'
})

export const Gender = Object.freeze({
    MALE: false,
    FEMALE: true
})

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