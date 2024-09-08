const User = require('../modes/user_model');
// Get Profile Controller
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('email username'); // ดึงเฉพาะ email และ username
        if (!user) return res.status(404).send('User not found');

        res.json(user);
    } catch (err) {
        res.status(500).send('Error fetching profile');
    }
};