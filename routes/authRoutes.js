import express from "express";
import passport from "passport";
import bcrypt from "bcrypt";
const router = express.Router();

// IMPORT MODELS
import User from "../models/User.js";


// Signup
router
  .get("/signup", (req, res) => res.render(`app/signup`))
  .post("/signup", (req, res) => {
    let { firstname, lastname, email, tel, password, password2 } = req.body;

    //  Create a unique customerid

    User.find()
      .sort({ customerId: -1 })
      .then((users) => {
        
         // CREATE A NEW USER
        // let customerId = 5555000;
        // let customerId = users[0].customerId + 1;
        let customerId = Math.floor(Math.random() * 10000000);

        bcrypt.genSalt(10).then((salt) => {
          bcrypt
            .hash(password, salt)
            .then((hash) => {
              password = hash;

              User.create({
                customerId,
                firstname,
                lastname,
                email,
                tel,
                password,
                wallet: 0,
              })
                .then((user) => res.redirect("/"))
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        });

        // User.create({
        //   customerId,
        //   firstname,
        //   lastname,
        //   email,
        //   tel,
        //   password,
        //   wallet: 0,
        // })
        //   .then((user) => res.redirect("/test"))
        //   .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });

// Signin
router
  .get("/signin", (req, res) => res.render(`app/signin`))
  .post( "/signin",
    passport.authenticate("local", { failureRedirect: "/signin" }),
    (req, res) => res.redirect("/dashboard"));

// signout
router.get('/logout', (req, res) => {
   req.logout()
   res.redirect('/')
})

// test
router.get("/test", (req, res) => {
  User.find()
    .sort({ customerId: -1 })
    .then((users) => res.json(users))
    .catch((err) => console.log(err));
});

// Reset Password
// router
  // .get('/', (req, res) => res.render('reset_password'))

// module.exports = router;
export default router;
