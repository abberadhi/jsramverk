class Auth {
    constructor() {
        this.authenticated = false;
    }

    login() {
        this.authenticated = true;
    }

    logout() {
        this.authenticated = false;
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

module.exports = new Auth();