import hapi from 'hapi';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import stubTransfer from 'nodemailer-stub-transport';
import cleaner from "./cleaner";

dotenv.config();
const server = new hapi.Server();

let transporter = nodemailer.createTransport(stubTransfer());
if (process.env.NODE_ENV === "production") {
  transporter = nodemailer.createTransport(process.env.EMAIL_URL);
}

server.connection({
  host: process.env.HOST,
  port: process.env.PORT
});

server.route({
  method: 'GET',
  path: '/',
  handler(request, reply) {
    return reply('OK');
  }
});

server.route({
  method: 'POST',
  path: '/emails',
  handler(request, reply) {
    let { html, sender } = request.payload;

    let mailOptions = {
      from: process.env.SENDER,
      to: sender,
      subject: 'Html Code',
      html: cleaner(html)
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reply(error).code(500);
      };
      return reply('Sent');
    });
  }
})

server.start((err) => {
  if (err) { throw err; }
  console.log(`Server running at: ${server.info.uri}`);
});

module.exports = server;
