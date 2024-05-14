class UserVerify{
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    static verifyStrongPassword(password) {
        // Minimum length requirement
        const minLength = 8;
        
        // Regular expressions to check for presence of different character types
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);
        
        // Check if password meets all criteria
        const isStrong =
            password.length >= minLength &&
            hasUpperCase &&
            hasLowerCase &&
            hasNumbers &&
            hasSpecialChars;
    
        return isStrong;
    }
    static verifyId(idNo){

   return idNo.length===16;
    }
    
}
export default UserVerify