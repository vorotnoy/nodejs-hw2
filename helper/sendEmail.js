const sendgrid = require("@sendgrid/mail");
require("dotenv").config();

const { SENGRID_API_KEY, SENDGRID_FROM } = process.env;
sendgrid.setApiKey(SENGRID_API_KEY);

const sendEmail = async (data, from = SENDGRID_FROM) => {
  try {
    const email = { ...data, from };
    await sendgrid.send(email);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = sendEmail;
