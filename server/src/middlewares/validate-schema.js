export const validateSchema = (schema) => (req, res, next) => {
   const result = schema.safeParse(req.body);
   if (!result.success) {
      const errors = result.error.issues.map((error) => ({
         message: error.message,
         path: error.path[0],
      }));
      return res.status(400).json(errors);
   }
   next();
};
