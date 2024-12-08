const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: function() {
            return !this.googleId; // Password is required only if not using Google auth
        }
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true
    },
    name: {
        type: String,
        trim: true
    },
    profilePicture: {
        type: String
    },
    username: {
        type: String,
        trim: true
    },
    age: {
        type: Number,
        min: 0
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
