const { z } = require('zod');

exports.updateUserInfoByGoogleRequest = z.object({
  mobile: z.string().regex(/^\d+$/, "Mobile number must contain only digits"),
  gender: z.enum(['male', 'female', 'other']),
  dob: z.coerce.date(),
  sourceBy: z.enum(['customer', 'driver'])
});