"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    password: {
        type: String
    },
    isBlocked: {
        type: Boolean,
    },
    isVerified: {
        type: Boolean,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    location: {
        type: mongoose_1.Types.ObjectId
    },
    profile: {
        type: String
    },
    role: {
        type: String,
        enum: ["user", "owner"]
    }
});
const userModel = (0, mongoose_1.model)("users", userSchema);
exports.default = userModel;
