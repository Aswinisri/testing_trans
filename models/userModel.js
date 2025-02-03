const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    dob: {
      type: Date,
      required: false,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: false,
    },
    mobile: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ['customer', 'driver'],
      default: 'customer',
    },
    status: {
      type: Boolean,
      default: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isRegisteredBy: {
      type: String,
      enum: ['mobile', 'google'],
      default: 'mobile',
    },
    googleId: {
      type: String,
      required: false,
    },
    profileUrl: {
      type: String,
      required: false,
    },
    address: {
      doorNo: {
        type: String,
        required: false,
      },
      street: {
        type: String,
        required: false,
      },
      city: {
        type: String,
        required: false,
      },
      state: {
        type: String,
        required: false,
      },
      country: {
        type: String,
        required: false,
      },
      pincode: {
        type: String,
        required: false,
      },
      landmark: {
        type: String,
        required: false,
      },
      location: {
        lat: {
          type: String,
          required: false,
        },
        long: {
          type: String,
          required: false,
        }
      }
    },
    lastLoginTime: {
      type: Date,
      required: false
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', UserSchema);