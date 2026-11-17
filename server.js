import express from 'express'
import pool from './db.js';
import 'dotenv/config'

const app = express();

const PORT = process.env.PORT;

app.get('/api/jatekok', async (req, res) => {
  try {
    const [response] = await pool.query('SELECT * FROM jatekok WHERE raktaron = TRUE ORDER BY ar ASC');
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
});

app.get('/api/jatekok/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [response] = await pool.query('SELECT * FROM jatekok WHERE id = ?', [id]);

    if (response.length === 0) {
      return res.status(404).json({ 'error': 'A keresett játék nem található.' })
    }

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
})