const express = require("express");
const User = require('../model/User')
const Router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let jwtSecretKey = "gfg_jwt_secret_key";
let TOKEN_HEADER_KEY = "gfg_token_header_key";
let auth = require('../auth/auth');
const Company = require("../model/Company");
const Review = require("../model/Review");
const validation = require("../middelware/validation.middelware");
const nodemailer = require("nodemailer");
const fs = require('fs/promises');
const ResetPassword = require("../model/ResetPassword");

Router.get('/', async (req, res) => {
  console.log("fgdd")
  await res.send("Hi!!!!!!!!1")
})

Router.post('/', validation, async (req, res) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 10);

    let data = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      emailId: req.body.emailId,
      password: hash
    }


    let result = await User.create(data)

    let token = await jwt.sign({
      firstName: result?.firstName,
      lastName: result?.lastName,
      emailId: result?.emailId,
      id: result?._id
    }, jwtSecretKey, { expiresIn: "60m" });

    res.json({
      msg: "User is saved successfully",
      data: result,
      token: token
    })



  } catch (err) {
    res.send(err)
  }

})

Router.post('/signUPWithGoogel',async(req,res)=>{
  let data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailId: req.body.emailId,
  }
  let token = await jwt.sign(data, jwtSecretKey, { expiresIn: "60m" });

  res.json({
    msg: "User is saved successfully",
    token: token
  })
 


})


Router.post('/login', async (req, res) => {

  try {
    let data = await User.findOne({ emailId: req.body.emailId });

    let password = await bcrypt.compare(req.body.password, data.password)
    if (password) {
      let token = await jwt.sign({
        firstName: data?.firstName,
        lastName: data?.lastName,
        emailId: data?.emailId,
        id: data?._id
      }, jwtSecretKey, { expiresIn: "3660m" });

      res.status(200).json({
        err: false,
        data: "log in successful",
        token: token
      })
    }
    else {
      res.status(402).json({
        err: false,
        data: "invalid details"
      })
    }

  }
  catch (err) {
    res.status(500).json({
      err: true,
      data: err
    })
  }
})

Router.post('/sendMail', async (req, res) => {
  try {
    console.log(req.body, "ui")

    if (!req.body.emailId) {
      // res.send("Plese send emailId")
      console.log("Please send emailId")
    }
   
      let Token = await jwt.sign({
        emailId: req.body.emailId,
      }, jwtSecretKey);
   


    let resetToken = await ResetPassword.create({ email: req.body.emailId, resetToken: Token })


    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: 'shweta@thoughtwin.com',
        pass: 'pcec busn cbad vbcf'
      }
    });

    async function main() {
      let output = `<b>Hi! Lets reset your password.</b><br>
      <a  href=http://localhost:3000/resetPassword/${resetToken?.resetToken}>Reset Password</a>`

      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: '"Bite Ecommerse APP 👻" <shweta@thoughtwin.com>', // sender address
        to: req.body.emailId,// list of receivers
        subject: "Bite Reset Password", // Subject line
        text: "Reset Password", // plain text body
        html: output, // html body,
        // refeerance shoude be unique
        headers: {
          References: '09'
        }
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      //
      // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
      //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
      //       <https://github.com/forwardemail/preview-email>
      //
      return
    }

    main().catch((err) => {
      res.send(err)
    });


    res.status(200).json({
      err: false,
      msg: `Mail has  send to ${req.body.emailId}`,
    })
  }
  catch (err) {
    res.status(200).json({
      err: true,
      msg: err,
    })
  }

})

Router.put('/updatePassword/:token', async (req, res) => {
  try {
    let getEmail= await ResetPassword.findOne({resetToken:req.params.token})
    let user=await User.findOne({emailId:getEmail.email});
     
    const hash = bcrypt.hashSync(req.body.newPassword, 10);
    const updateUser = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      emailId: user.emailId,
      password: hash
    }
    const updatedUser = await User.findByIdAndUpdate({ _id: user._id }, updateUser, { new: true })
   
    let token = await jwt.sign({
      firstName: updatedUser?.firstName,
      lastName: updatedUser?.lastName,
      emailId: updatedUser?.emailId,
      id: updatedUser?._id
    }, jwtSecretKey, { expiresIn: "3660m" });

    res.status(200).json({
      err: false,
      msg: "Password is reset sucessfully!!!!",
      token:token
    })
  } catch (err) {
    res.status(500).json({
      err: true,
      msg: err
    })
  }
})



Router.post('/addCompany', auth, async (req, res) => {


  let user = req.decodedToken

  let isAdmin = await User.findOne({ emailId: user?.emailId })
  if (isAdmin.role === 'Admin') {
    let data = {
      companyName: req.body.companyName,
      location: req.body.location,
      city: req.body.city,
      foundedOn: req.body.foundedOn
    }

    await Company.create(data).then(() => {
      res.send("Company is saved successfully")
    }).catch((err) => {
      res.send(err)
    })

  }
  else {
    res.send("he is not admin")
  }

})





3000

module.exports = Router;