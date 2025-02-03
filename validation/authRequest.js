const { z } = require('zod');

exports.registerRequest = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  mobile: z.string().regex(/^\d+$/, "Mobile number must contain only digits"),
  gender: z.enum(['male', 'female', 'other']),
  dob: z.coerce.date(),
  sourceBy: z.enum(['customer', 'driver'])
});

exports.loginRequest = z.object({
  mobile: z.string().regex(/^\d+$/, "Mobile number must contain only digits"),
})

exports.verifyOtpRequest = z.object({
  type: z.enum(['login', 'register']),
  token: z.string(),
  otp: z.number()
});

