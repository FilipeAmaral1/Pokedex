import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = 3000;

app.use(express.static('public'));

const apiUrl = 'https://pokeapi.co/api/v2';

app.get('/pokemon', async (req, res) => {
    try {
        const response = await fetch(`${apiUrl}/pokemon?limit=151`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
        res.status(500).json({ error: 'Failed to fetch Pokémon data' });
    }
});

app.get('/pokemon/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await fetch(`${apiUrl}/pokemon/${id}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching Pokémon details:', error);
        res.status(500).json({ error: 'Failed to fetch Pokémon details' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
