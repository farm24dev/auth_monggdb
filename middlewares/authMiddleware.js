
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // ตรวจสอบว่ามี header Authorization และเป็น Bearer token หรือไม่
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).send('Token is required');
    }

    // ดึง token จาก header
    const token = authHeader.split(' ')[1];

    // ตรวจสอบ token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).send('Invalid token');

        // เก็บข้อมูล decoded ID ใน req.userId
        req.userId = decoded.id;
        next();
    });
};

module.exports = verifyToken;