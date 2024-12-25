const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Routes
app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    try {
        const user = await prisma.user.create({
            data: { name, email },
        });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: 'Email must be unique' });
    }
});

// Start server
app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
});