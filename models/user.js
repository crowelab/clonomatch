const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        firstName: String,
        lastName: String
    },
    email: String,
    accessToken: String,
    refreshToken: String,
    permissions: [String]
});
const User = mongoose.model('User', UserSchema);

module.exports = {
    User: User
}