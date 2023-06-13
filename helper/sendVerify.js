const { PORT, BASE_URL } = process.env;
require("dotenv").config();

const sendVerify = (email, verificationToken) => {
  const verifyLink = `http://${BASE_URL}:${PORT}/users/verify/${verificationToken}`;

  return {
    to: email,
    subject: "verification",
    html: `<a href="${verifyLink}">Click to verify your email</a>`,
  };
};

module.exports = sendVerify;
