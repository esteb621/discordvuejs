const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage()
  });
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/register",upload.single('picture'),
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/login", controller.signin);
};
