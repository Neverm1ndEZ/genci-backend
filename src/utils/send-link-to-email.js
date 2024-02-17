import { createTransport } from "nodemailer";
import getText from "./lang/get-text.js";
import errorHelper from "./helpers/error-helper.js";
import { emailHost , emailFrom ,emailPassword , emailPort, EmailUser ,reactBaseUrl
} from "../config/index.js";

export default async (email, name, token, type, req, res) => {
  new Promise(async (resolve, reject) => {
    if (!email || !token) {
      return res.status(400).send(errorHelper("00005", req)).end();
    }
    const emailTransfer = createTransport({
      host: emailHost,
      port: emailPort,
      secure: true,
      auth: {
        user: EmailUser,
        pass: emailPassword,
      },
    });

    let body = "";
    //NOTE: You can customize the message that will be sent to the newly registered users according to your pleasure.
    if (type == "register") {
      body = `${getText("welcomeCode")} ${name}!\r\n\r\n${getText(
        "verificationCodeBody"
      )} ${reactBaseUrl}/verify-email/emailverifiedpage?token=${token}`;
    } else if(type == "resetPassword") {
      body = `${name}!\r\n\r\n${getText(
        "resetPasswordBody"
      )} ${reactBaseUrl}/reset-password?token=${token}`;
    }

    const emailInfo = {
      from: emailFrom,
      to: email,
      subject: getText("verificationCodeTitle"),
      text: body,
    };
    try {
      await emailTransfer.sendMail(emailInfo);

      return resolve("Success");
    } catch (err) {
      console.log(err)
      return reject(err);
    }
  });
};