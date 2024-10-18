const { mailtrapClient, sender } = require("./mailtrap.config.js");
const { VERIFICATION_EMAIL_TEMPLATE } = require("./emailTemplates.js");

const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "verificationCode",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error(`Error sending verification`, error);
    throw new Error(`Error sending verification email: ${error}`);
  }
};
const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "3e3ec8a6-284b-4ff8-b983-dbcb9874b7b4",
      template_variables: {
        company_info_name: "DriveNgo",
        name: name,
      },
    });

    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error(`Error sending welcome email`, error);

    throw new Error(`Error sending welcome email: ${error}`);
  }
};
module.exports = { sendVerificationEmail, sendWelcomeEmail };
