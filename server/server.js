import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';  // Import the CORS package

const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());  // This will allow cross-origin requests from any domain


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get('/data', async (req, res) => {
  try {
    const response = await fetch('https://api.jsonserve.com/Uw5CrX');
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching questions' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
