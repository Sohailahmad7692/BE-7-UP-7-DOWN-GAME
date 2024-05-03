const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/roll-dice', (req, res) => {
    // Generate random dice rolls (1 to 6)
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const total = dice1 + dice2;

    const { betAmount, selectedOption, points } = req.body;
    let result = 0;

    if (selectedOption === '7Up') {
        if (total > 7) {
            result = betAmount * 2;
        }
    } else if (selectedOption === '7Down') {
        if (total < 7) {
            result = betAmount * 2;
        }
    } else if (selectedOption === 'Lucky7') {
        if (total === 7) {
            result = betAmount * 5;
        }
    }

    // Update player's points based on game outcome
    const playerPoints = points - betAmount + result;

    res.json({
        dice1,
        dice2,
        total,
        result,
        playerPoints
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
