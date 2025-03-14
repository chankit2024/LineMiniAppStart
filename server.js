const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
// const corsOptions = {
//     origin: ['https://94c4-2403-6200-8851-81f-9d18-18ab-c522-813f.ngrok-free.app', 'http://localhost:3000'],
//     methods: ['GET', 'POST'],
// };
// app.use(cors(corsOptions));

require('dotenv').config();

const PORT = '8888';

const LINE_BOT_API = 'https://api.line.me/v2/bot';

const LINE_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${LINE_ACCESS_TOKEN}`,
}

app.post('/send-message', async (req, res) => {

    const {userId , messages} = req.body;
    console.log(userId);
    console.log(messages);

    const body = {
        to: userId,
        messages:[
            {
                type: 'text',
                text: messages
            }
        ]
    }

    try {
        const response = await axios.post(`${LINE_BOT_API}/message/push`, body, { headers });
        console.log(response.data);
        res.json({
            messages: 'Send message successfully',
            responseData: response.data
        })
    }
    catch (error) {
        console.log(error.response);
    }
});

app.listen(PORT, (req, pes) => {
  console.log(`Server is running on port ${PORT}`);
});