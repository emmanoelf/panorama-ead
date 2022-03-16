import sgMail from "@sendgrid/mail";
import fs from "fs";
import handlebars from "handlebars";

import { IMailProvider } from "../IMailProvider";

class SendGridMailProvider implements IMailProvider {
    constructor() {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    }

    async sendMail(
        to: string,
        subject: string,
        variables: any,
        path: string
    ): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString("utf-8");
        const templateParse = handlebars.compile(templateFileContent);
        const templateHTML = templateParse(variables);

        try {
            await sgMail.send({
                to,
                from: process.env.EMAIL_FROM,
                subject,
                html: templateHTML,
            });
        } catch (error) {
            console.error(error);

            if (error.response) {
                console.error(error.response.body);
            }
        }
    }
}

export { SendGridMailProvider };
