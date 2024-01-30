const Joi = require('joi')

const validation = (req, res, next) => {

    let UserSchema = Joi.object().keys({
        firstName: Joi.string().min(3).max(30).required(),
        lastName: Joi.string().min(3).max(30).required(),
        emailId: Joi.string().min(3).max(30).required(),
        password: Joi.string().min(3).max(30).required(),
    })

    let result = UserSchema.validate(req.body)
    // console.log(result?.value,"jk")
    const  data = result.error;
    // console.log("error", data);
      if(result.error=== undefined)
      {
        next()
      }
       else
       {
        res.status(422).json({ error: result.error })
       }
}

module.exports = validation;