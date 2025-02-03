const validateRequest = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      error_type: "validation_error",
      message: result.error.errors.map((error) => ({
        field: error.path.join('.'), 
        message: error.message.toLowerCase(), 
      })),
    });
  }
  req.validatedData = result.data; 
  next();
};

module.exports = validateRequest;
