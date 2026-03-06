const prisma = require('../config/db');

// Get current user profile
exports.getProfile = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                email: true,
                name: true,
                bio: true,
                avatar: true,
                location: true,
                createdAt: true
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('[USER CONTROLLER] Error in getProfile:', error);
        res.status(500).json({ message: 'Server error while fetching profile' });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    const { name, bio, avatar, location } = req.body;

    try {
        const updatedUser = await prisma.user.update({
            where: { id: req.user.id },
            data: {
                name: name !== undefined ? name : undefined,
                bio: bio !== undefined ? bio : undefined,
                avatar: avatar !== undefined ? avatar : undefined,
                location: location !== undefined ? location : undefined
            },
            select: {
                id: true,
                email: true,
                name: true,
                bio: true,
                avatar: true,
                location: true
            }
        });

        res.status(200).json({
            message: 'Profile updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.error('[USER CONTROLLER] Error in updateProfile:', error);
        res.status(500).json({ message: 'Server error while updating profile' });
    }
};
