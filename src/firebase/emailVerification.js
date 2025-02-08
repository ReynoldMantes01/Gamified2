import { auth } from './config';

// Check if email is verified
export const checkEmailVerified = async () => {
    try {
        // Reload the user to get the latest email verification status
        await auth.currentUser?.reload();
        return auth.currentUser?.emailVerified || false;
    } catch (error) {
        console.error('Error checking email verification:', error);
        return false;
    }
};

// Handle email verification success
export const handleEmailVerificationSuccess = () => {
    const user = auth.currentUser;
    if (user && !user.emailVerified) {
        // Reload the user to update the emailVerified property
        return user.reload().then(() => {
            return user.emailVerified;
        });
    }
    return Promise.resolve(user?.emailVerified || false);
};
