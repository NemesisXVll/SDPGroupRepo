
import emailjs from 'emailjs-com';


function EmailSender() {
  const serviceID = 'service_3ojecjd'; //  service ID
  const templateID = 'template_sgrb5ri'; //  template ID
  const userID = '6igdyzCgketnFP148'; //  public key

  

  const handleSendEmail = async () => {
    // try {
    //   // Fetch the file from the server
    //   const response = await fetch('../../prisma/dev.db'); 
    //   const fileContentBase64 = await response.text();

    //   // Send the email with the attachment
    //   await emailjs.send(serviceID, templateID, {
    //     to_email: 'khalifa.alsidiq@gmail.com', // with the recipient's email
    //     file_content: fileContentBase64, // Base64-encoded file content
    //   }, userID);

    //   console.log('Email sent successfully!');
    // } catch (error) {
    //   console.error('Error sending email:', error);
    // }
  };

  return (
    <div>
      <h1>Email Sender</h1>
      <button onClick={handleSendEmail}>Send Email</button>
    </div>
  );
}

export default EmailSender;