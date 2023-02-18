const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLINT_SECRET
);
OAuth2_client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});
const sendEamil = async (options) => {
  const accessToken = await OAuth2_client.getAccessToken();

  //1- create transporter(service that send email "gmail")
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLINT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });
  //2- fiend mail options like from to subject and text

  const mailOption = {
    from: `EcommerceiTi APP <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.html
  };
  await transporter.sendMail(mailOption);
};


module.exports = sendEamil;
