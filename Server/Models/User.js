
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
             type: String, 
             require: true,
             trim : true,
             minLength: [2,'Username is too short!'],
             maxLength: 12,
             validate: {
                validator: /^[0-9a-zA-Z]+$/, 
                message: "Usernames must be only alphanumeric characters."
            },
            }
    }, {
    versionKey: false,
    timestamps: true
}
);

const UserModel = mongoose.model("User", UserSchema, "users");
module.exports = UserModel;