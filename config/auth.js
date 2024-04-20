// require("dotenv").config();
// const jwt = require("jsonwebtoken");
// const Admin = require("../models/Admin");

// const signInToken = (user) => {
//   return jwt.sign(
//     {
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       address: user.address,
//       phone: user.phone,
//       image: user.image,
//     },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: "2d",
//     }
//   );
// };

// const tokenForVerify = (user) => {
//   return jwt.sign(
//     {
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       password: user.password,
//     },
//     process.env.JWT_SECRET_FOR_VERIFY,
//     { expiresIn: "15h" }
//   );
// };

// const isAuth = async (req, res, next) => {
//   const { authorization } = req.headers;
//   console.log('authorization', authorization)
//   try {
//     const token = authorization.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).send({
//       message: err.message,
//     });
//   }
// };

// const isAdmin = async (req, res, next) => {
//   const admin = await Admin.findOne({ role: "Admin" });
//   if (admin) {
//     next();
//   } else {
//     res.status(401).send({
//       message: "User is not Admin",
//     });
//   }
// };

// module.exports = {
//   signInToken,
//   tokenForVerify,
//   isAuth,
//   isAdmin,
// };


require("dotenv").config();
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const signInToken = (user) => {
  try {
    // Logging user information before generating token
    console.log("Generating token for user:", user);
const signInToken = (user) => {
  try {
    console.log("Generating token for user:", user);
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        image: user.image,
      },
      process.env.JWT_SECRET, // This is where the JWT secret key is used
      {
        expiresIn: "2d",
      }
    );
    console.log("Token generated successfully:", token);
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw error;
  }
};

//     // Generating token using jwt.sign
//     const token = jwt.sign(
//       {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         address: user.address,
//         phone: user.phone,
//         image: user.image,
//       },
//       process.env.JWT_SECRET, // JWT secret key from environment variables
//       {
//         expiresIn: "2d",
//       }
//     );

//     // Logging the generated token
//     console.log("Token generated successfully:", token);

//     // Returning the generated token
//     return token;
//   } catch (error) {
//     // Handling errors during token generation
//     console.error("Error generating token:", error);
//     throw error;
//   }
// };

// const signInToken = (user) => {
//   try {
//     console.log("Generating token for user:", user);
//     const token = jwt.sign(
//       {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         address: user.address,
//         phone: user.phone,
//         image: user.image,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "2d",
//       }
//     );
//     console.log("Token generated successfully:", token);
//     return token;
//   } catch (error) {
//     console.error("Error generating token:", error);
//     throw error;
//   }
// };

const tokenForVerify = (user) => {
  try {
    console.log("Generating token for verification:", user);
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
      },
      process.env.JWT_SECRET_FOR_VERIFY,
      { expiresIn: "15h" }
    );
    console.log("Verification token generated successfully:", token);
    return token;
  } catch (error) {
    console.error("Error generating verification token:", error);
    throw error;
  }
};

const isAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log('Authorization header:', authorization);
  try {
    const token = authorization.split(" ")[1];
    console.log('Token extracted from header:', token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Error verifying token:", err);
    res.status(401).send({
      message: err.message,
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({ role: "Admin" });
    if (admin) {
      next();
    } else {
      res.status(401).send({
        message: "User is not Admin",
      });
    }
  } catch (error) {
    console.error("Error checking admin role:", error);
    res.status(500).send({
      message: "Internal server error",
    });
  }
};

module.exports = {
  signInToken,
  tokenForVerify,
  isAuth,
  isAdmin,
};

