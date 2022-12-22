
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            trim: true,
            minLength: [2, 'Username is too short!'],
            maxLength: 12,
            validate: {
                validator: function (v) {
                    return /^[0-9a-zA-Z]+$/.test(v);
                },
                message: "Usernames must be only alphanumeric characters."
            },
        },
        notices: [String]
    }, {
    versionKey: false,
    timestamps: true
}
);

const UserModel = mongoose.model("User", UserSchema, "users");
module.exports = UserModel;