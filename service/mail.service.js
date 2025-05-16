const nodemailer = require("nodemailer");
const config = require("config");

class AuthMailService {
  constructor() {
    this.transport = nodemailer.createTransport({
      service: "gmail",
      host: config.get("smtp_host"),
      port: config.get("smtp_port"),
      secure: false,
      auth: {
        user: config.get("smtp_user"),
        pass: config.get("smtp_password"),
      },
    });
  }

  async Sendmail(toMail, link) {
    await this.transport.sendMail({
      from: config.get("smtp_user"),
      to: toMail,
      subject: "ITTERM activate",
      text: "",
      html: `
    <div>
        <h2>Go from this link below</h2>
        <a href="${link}">activate</a>
    </div>
    `,
    });
  }
}

class UserMailService {
  constructor() {
    this.transport = nodemailer.createTransport({
      service: "gmail",
      host: config.get("user_smtp_host"),
      port: config.get("user_smtp_port"),
      secure: false,
      auth: {
        user: config.get("user_smtp_user"),
        pass: config.get("user_smtp_password"),
      },
    });
  }

  async Sendmail(toMail, link) {
    await this.transport.sendMail({
      from: config.get("user_smtp_user"),
      to: toMail,
      subject: "ITTERM activate User",
      text: "",
      html: `
    <div>
        <h2>Go from this link below</h2>
        <a href="${link}">activate</a>
    </div>
    `,
    });
  }
}

class AdminMailService {
  constructor() {
    this.transport = nodemailer.createTransport({
      service: "gmail",
      host: config.get("smtp_host"),
      port: config.get("smtp_port"),
      secure: false,
      auth: {
        user: config.get("smtp_user"),
        pass: config.get("smtp_password"),
      },
    });
  }

  async Sendmail(toMail, link) {
    await this.transport.sendMail({
      from: config.get("smtp_user"),
      to: toMail,
      subject: "ITTERM activate",
      text: "",
      html: `
    <div>
        <h2>Go from this link below</h2>
        <a href="${link}">activate</a>
    </div>
    `,
    });
  }
}

const AuthMailServicee = new AuthMailService();
const UserMailServicee = new UserMailService();
const AdminMailServicee = new AdminMailService()

module.exports = {
  AuthMailServicee,
  UserMailServicee,
  AdminMailServicee,
}
