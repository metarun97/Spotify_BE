import { subscribeToQueue } from "./rabbit.js";
import sendEmail from "../utils/email.js";


/* Start listener for RabbitMq message */
function startListener() {
  subscribeToQueue("user_created", async (msg) => {

    const { email, fullname: { firstName, lastName }, role } = msg;

    const template = `
    <h1>Welcome to Spotify Application</h1>
    <p>Dear ${firstName} ${lastName},</p>
    <p>Thank you for registering with Spotify Application.We are excited to have you on board!</p>
    <p>Your role is: ${role}.</p>
    <p>We hope you enjoy our services!</p>
    <br />
    <p>Best regards,</p>
    <p>The Spotify Application Team</p>
  `;

    await sendEmail(email, "Welcome to Spotify Application", "Thank you for registering with Spotify Application!", template);
  })
}

export default startListener;
