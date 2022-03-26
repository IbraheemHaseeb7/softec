export default function handler(req, res) {
  const accountSid = "AC26083b4326ea184ca1e0d85e978f3f41";
  const authToken = "59745279ba177a1e5d4be2706db57b11";
  const client = require("twilio")(accountSid, authToken);

  const data = JSON.parse(req.body);

  client.messages
    .create({
      to: data.number,
      messagingServiceSid: data.key,
      body: `Your Verification Code = ${data.sms}`,
    })
    .then((message) => console.log(message.sid))
    .done();
}
