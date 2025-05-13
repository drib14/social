const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/emailService");
const { sendSMS } = require("../utils/smsService");

const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.register = async (req, res) => {
    const { name, email, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const emailCode = generateCode();
    const phoneCode = generateCode();

    const user = await User.create({ name, email, phone, password: hashedPassword, emailCode, phoneCode });

    sendEmail(email, "Email Verification Code", `Your code: ${emailCode}`);
    sendSMS(phone, `Your phone verification code is: ${phoneCode}`);

    res.status(201).json({ msg: "User registered, verify codes sent." });
};

exports.verifyCodes = async (req, res) => {
    const { email, emailCode, phoneCode } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.emailCode !== emailCode || user.phoneCode !== phoneCode)
        return res.status(400).json({ msg: "Invalid codes" });

    user.isVerified = true;
    await user.save();

    res.json({ msg: "Verification successful" });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !await bcrypt.compare(password, user.password))
        return res.status(400).json({ msg: "Invalid credentials" });

    if (!user.isVerified)
        return res.status(403).json({ msg: "Please verify your email and phone" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ token });
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const code = generateCode();
    user.emailCode = code;
    await user.save();

    sendEmail(email, "Reset Password Code", `Your code: ${code}`);
    res.json({ msg: "Reset code sent to email" });
};

exports.resetPassword = async (req, res) => {
    const { email, code, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.emailCode !== code)
        return res.status(400).json({ msg: "Invalid code" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ msg: "Password reset successful" });
};
