import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv";

dotenv.config();


const client = SibApiV3Sdk.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVOAPIKEY as string;
const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendEmail = async (to: string, subject: string, content: string) => {
    try {
        const sender = { email: process.env.MYEMAIL, name: "سفر کو" };
        const receivers = [{ email: to }];

        const response = await emailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject,
            htmlContent: content,
        });

        console.log("Email sent successfully:", response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
