const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const { randomUUID } =require('crypto');
const { Schema, model, SchemaTypes } = mongoose
const { Roles } = require('../lib/constants')

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: 'Guest',
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: [Roles.STARTER, Roles.PRO, Roles.BUSINESS],
      default: Roles.STARTER,
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: 250 }, true)
      },
    },
    verify: {
      type: Boolean,
      required: true,
      default: false,
    },
    verificationToken: {
      type: String,
      default: randomUUID,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id
        return ret
      },
    },
    toObject: { virtuals: true },
  },
)
userSchema.pre('save', async function (next) {
  if (this.isModified) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  }
  next()
})

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = model('user', userSchema)

module.exports = User
