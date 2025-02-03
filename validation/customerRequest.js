const { z } = require('zod');

exports.updateCustomerProfileRequest = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  mobile: z.string().regex(/^\d+$/, "Mobile number must contain only digits").optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  dob: z.coerce.date().optional(),
  address: z.object({
    doorNo: z.string().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    pincode: z.string().optional(),
    landmark: z.string().optional(),
  }).optional(),
});

exports.updateCustomerAdminRequest = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  mobile: z.string().regex(/^\d+$/, "Mobile number must contain only digits").optional(),
  gender: z.enum(['male', 'female', 'other']).optional(),
  dob: z.coerce.date().optional(),
  address: z.object({
    doorNo: z.string().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    pincode: z.string().optional(),
    landmark: z.string().optional(),
    location: z.object({
      lat: z.string().optional(),
      long: z.string().optional(),
    }).optional(),
    lastLoginTime: z.coerce.date().optional(),
  }).optional(),
});
