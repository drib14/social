const { Vonage } = require('@vonage/server-sdk');

const vonage = new Vonage({
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET,
});

exports.sendSMS = (to, text) => {
    vonage.sms.send({ to, from: process.env.VONAGE_PHONE_NUMBER, text })
        .then(resp => console.log("SMS sent", resp))
        .catch(err => console.error("SMS failed", err));
};
