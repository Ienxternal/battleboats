// models/User.js
const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: 'Username is required',
        unique: true,
        minlength: 3,
        maxlength: 26,
    },
    email: {
        type: String,
        required: 'Email is required',
        unique: true,
    },
    password: {
        type: String,
        required: 'Password is required',
        minlength: 8, // Increase the minimum length for enhanced security
        maxlength: 26,
    },
});

userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        return next();
    } catch (error) {
        return next(error);
    }
});

const User = model('User', userSchema);

module.exports = User;
