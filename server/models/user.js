var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local: {
        nickname: {
            type: String,
            unique: true
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String
        },
        // active: {
        //     type: Boolean,
        //     default: false
        // },
        createdAt: {
            type: Date,
            default: Date.now()
        },
        lastActive: {
            type: Date,
            default: Date.now()
        },
        avatar: {
            data: {type: Buffer, default: ''},
            contentType: String,
            url: {
                type: String
            }
        },
        loggedCount: {
            type: Number,
            default: 0
        }
    },

    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    vk: {
        id: String,
        token: String,
        email: String,
        name: String
    }

});

// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
