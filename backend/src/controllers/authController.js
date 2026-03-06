const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const prisma = require('../config/db');

// Register User (Email + Password + Name + Phone)
exports.register = async (req, res) => {
    const { email, password, name, phone } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                phone
            }
        });

        // Generate JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '30d'
        });

        res.status(201).json({
            token,
            user: { id: user.id, email: user.email, name: user.name, phone: user.phone },
            message: 'User registered successfully'
        });
    } catch (error) {
        console.error('[AUTH] Error in register:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Login User (Email + Password)
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', {
            expiresIn: '30d'
        });

        res.status(200).json({
            token,
            user: { id: user.id, email: user.email, name: user.name, phone: user.phone },
            message: 'Login successful'
        });
    } catch (error) {
        console.error('[AUTH] Error in login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
