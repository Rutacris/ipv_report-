const fs = require("fs");
const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const router = jsonServer.router("./database.json");
const userdb = JSON.parse(fs.readFileSync("./users.json", "UTF-8"));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "123456789";

const expiresIn = "1h";

// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// Check if the user exists in database
function isAuthenticated({ email, password }) {
  return (
    userdb.users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
}

// Register New User
server.post("/auth/register", (req, res) => {
  const { email, password } = req.body;

  if (isAuthenticated({ email, password }) === true) {
    const status = 401;
    const message = "Email and Password already exist";
    res.status(status).json({ status, message });
    return;
  }

  fs.readFile("./users.json", (err, data) => {
    if (err) {
      const status = 401;
      const message = err;
      res.status(status).json({ status, message });
      return;
    }

    // Get current users data
    var data = JSON.parse(data.toString());

    // Get the id of last user
    var last_item_id = data.users[data.users.length - 1].id;

    //Add new user
    data.users.push({ id: last_item_id + 1, email: email, password: password }); //add some data
    var writeData = fs.writeFile(
      "./users.json",
      JSON.stringify(data),
      (err, result) => {
        // WRITE
        if (err) {
          const status = 401;
          const message = err;
          res.status(status).json({ status, message });
          return;
        }
      }
    );
  });

  // Create token for new user
  const access_token = createToken({ email, password });
  console.log("Access Token:" + access_token);
  res.status(200).json({ access_token });
});

// Login to one of the users from ./users.json
server.post("/auth/login", (req, res) => {
  console.log("login endpoint called; request body:");
  const { email, password } = req.body;

  if (isAuthenticated({ email, password }) === false) {
    const status = 401;
    const message = "Incorrect email or password";
    res.status(status).json({ status, message });
    return;
  }
  const access_token = createToken({ email, password });
  res.status(200).json({ access_token });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (req.query.guest === "true") {
    next();
  } else {
    if (
      req.headers.authorization === undefined ||
      req.headers.authorization.split(" ")[0] !== "Bearer"
    ) {
      const status = 401;
      const message = "Error in authorization format";
      res.status(status).json({ status, message });
      return;
    }
    try {
      let verifyTokenResult;
      verifyTokenResult = verifyToken(req.headers.authorization.split(" ")[1]);

      if (verifyTokenResult instanceof Error) {
        const status = 401;
        const message = "Access token not provided";
        res.status(status).json({ status, message });
        return;
      }
      next();
    } catch (err) {
      const status = 401;
      const message = "Error access_token is revoked";
      res.status(status).json({ status, message });
    }
  }
});

// Login to one of the users from ./users.json
server.post("/mail/send", (req, res) => {
  const { to, subject, body } = req.body;

  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "4231986a0e0cb7",
      pass: "d57350ee803fc0",
    },
  });
  try {
    // verify connection configuration
    transport.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages", success);
      }
    });
  } catch (err) {
    const status = 500;
    const message = "Error with mail server " + err.message;
    res.status(status).json({ status, message });
  }
  try {
    // send mail with defined transport object
    const info = transport.sendMail({
      from: "info@schoolproject.com", // sender address
      to: to, // list of receivers
      subject: subject, // Subject line
      text: body, // plain text body
      html: body, // html body
    });
    const status = 200;
    const m = "Message sent!";
    res.status(200).json({ status, m});
  } catch (err) {
    const status = 500;
    const message = "Failed to send email" + err.message;
    res.status(status).json({ status, message });
  }
});

server.use(router);

server.listen(3000, () => {
  console.log("Run Auth API Server");
});
