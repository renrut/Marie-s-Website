let md5 = require('md5');

class User
{
    constructor(username, hashedPassword) {
        this.username = username;
        this.hashedPassword = hashedPassword;
    }

    /**
     * Takes an unhashed password and compares to hashed password for user.
     * @param password
     * @returns {boolean}
     */
    validPassword(password) {
        let hash = md5(password);
        return (hash === this.hashedPassword);
    }

}

module.exports = User;