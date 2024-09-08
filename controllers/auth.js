const User = require('../modes/user_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;
// Register Controller
exports.register = async (req, res) => {
    try {
        console.log(`register`);
        console.log(req.body);
        const { email, username, password } = req.body;

        // ตรวจสอบว่าอีเมลมีอยู่หรือยัง
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).send('Email already exists');

        // เข้ารหัสรหัสผ่าน
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, username, password: hashedPassword });

        // บันทึกผู้ใช้ใหม่ลงในฐานข้อมูล
        await newUser.save();

        // สร้าง JWT token
        const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: '1h' });

        // ส่ง token กลับไปยัง client
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (err) {
        res.status(500).send('Error registering user');
    }
};
// Login Controller
exports.login = async (req, res) => {
    console.log(`login`);
    console.log(req.body);
    try {
        const { email, password } = req.body;

        // ตรวจสอบว่าผู้ใช้มีอยู่หรือไม่
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send('User not found');

        // ตรวจสอบรหัสผ่าน
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid credentials');

        // สร้าง JWT token
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });

        res.json({
            user: user,
            token: token,
        });
    } catch (err) {
        console.log(`login catch ${err}`)
        res.status(500).send('Error logging in');
    }
};
