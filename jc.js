const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/sistemaPontos', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    name: String,
    points: Number,
    actions: [String]
});

const User = mongoose.model('User', userSchema);

app.use(express.json());

app.post('/addPoints', async (req, res) => {
    const { name, action } = req.body;
    let points = 0;
    switch(action) {
        case 'voluntariado':
            points = 10;
            break;
        case 'doacao':
            points = 5;
            break;
        case 'reciclagem':
            points = 2;
            break;
    }
    let user = await User.findOne({ name });
    if (!user) {
        user = new User({ name, points, actions: [action] });
    } else {
        user.points += points;
        user.actions.push(action);
    }
    await user.save();
    res.send(user);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
