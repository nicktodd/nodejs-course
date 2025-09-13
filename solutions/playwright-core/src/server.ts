import express, { Request, Response } from 'express';
import { tvshows } from './tvshow.data';
import { TVShowSchema, TVShow } from './tvshow.schema';

const app = express();
app.use(express.json());

// GET /tvshows
app.get('/tvshows', (req: Request, res: Response) => {
  res.json(tvshows);
});

// GET /tvshows/:id
app.get('/tvshows/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const show = tvshows.find(tv => tv.id === id);
  if (!show) return res.status(404).json({ error: 'TV show not found' });
  res.json(show);
});

// POST /tvshows
app.post('/tvshows', (req: Request, res: Response) => {
  try {
    const parsed = TVShowSchema.parse({ ...req.body, id: Date.now() });
    tvshows.push(parsed);
    res.status(201).json(parsed);
  } catch (err: any) {
    res.status(400).json({ error: err.errors?.[0]?.message || 'Invalid data' });
  }
});

// PUT /tvshows/:id
app.put('/tvshows/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const idx = tvshows.findIndex(tv => tv.id === id);
  if (idx === -1) return res.status(404).json({ error: 'TV show not found' });
  try {
    const parsed = TVShowSchema.parse({ ...req.body, id });
    tvshows[idx] = parsed;
    res.json(parsed);
  } catch (err: any) {
    res.status(400).json({ error: err.errors?.[0]?.message || 'Invalid data' });
  }
});

// DELETE /tvshows/:id
app.delete('/tvshows/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const idx = tvshows.findIndex(tv => tv.id === id);
  if (idx === -1) return res.status(404).json({ error: 'TV show not found' });
  tvshows.splice(idx, 1);
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`TV Show API running on port ${PORT}`);
});
