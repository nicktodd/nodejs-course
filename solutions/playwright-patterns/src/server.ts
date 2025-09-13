import express, { Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import * as fs from 'fs';
import { tvshows } from './tvshow.data';
import { TVShowSchema, TVShow } from './tvshow.schema';
import { login, verifyToken, requireAdmin, AuthRequest } from './auth.middleware';

const app = express();
app.use(express.json());
app.use(fileUpload({
  createParentPath: true,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
}));

// Enable CORS for testing
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Auth routes
app.post('/auth/login', login);

// GET /tvshows (public)
app.get('/tvshows', (req: Request, res: Response) => {
  res.json(tvshows);
});

// GET /tvshows/:id (public)
app.get('/tvshows/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const show = tvshows.find(tv => tv.id === id);
  if (!show) return res.status(404).json({ error: 'TV show not found' });
  res.json(show);
});

// Protected routes (require authentication)
// POST /tvshows
app.post('/tvshows', verifyToken, (req: AuthRequest, res: Response) => {
  try {
    const parsed = TVShowSchema.parse({ ...req.body, id: Date.now() });
    tvshows.push(parsed);
    res.status(201).json(parsed);
  } catch (err: any) {
    res.status(400).json({ error: err.errors?.[0]?.message || 'Invalid data' });
  }
});

// PUT /tvshows/:id
app.put('/tvshows/:id', verifyToken, (req: AuthRequest, res: Response) => {
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

// DELETE /tvshows/:id - Admin only
app.delete('/tvshows/:id', verifyToken, requireAdmin, (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);
  const idx = tvshows.findIndex(tv => tv.id === id);
  
  if (idx === -1) return res.status(404).json({ error: 'TV show not found' });
  
  tvshows.splice(idx, 1);
  res.status(204).send();
});

// File upload for TV show images - Admin only
app.post('/tvshows/:id/image', verifyToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
    const show = tvshows.find(tv => tv.id === id);
    
    if (!show) {
      return res.status(404).json({ error: 'TV show not found' });
    }
    
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: 'No files were uploaded' });
    }
    
    const image = req.files.image as fileUpload.UploadedFile;
    const fileExtension = path.extname(image.name).toLowerCase();
    
    if (!['.jpg', '.jpeg', '.png', '.gif'].includes(fileExtension)) {
      return res.status(400).json({ error: 'Only image files are allowed' });
    }
    
    const fileName = `${id}-${Date.now()}${fileExtension}`;
    const filePath = path.join(uploadsDir, fileName);
    
    await image.mv(filePath);
    
    // Update imageUrl in database
    const serverUrl = `http://localhost:${PORT}`;
    const imageUrl = `${serverUrl}/uploads/${fileName}`;
    
    const showIndex = tvshows.findIndex(tv => tv.id === id);
    tvshows[showIndex] = { ...show, imageUrl };
    
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// Serve uploaded files
app.use('/uploads', express.static(uploadsDir));

// Download image endpoint
app.get('/tvshows/:id/image/download', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const show = tvshows.find(tv => tv.id === id);
    
    if (!show || !show.imageUrl) {
      return res.status(404).json({ error: 'Image not found' });
    }
    
    const fileName = path.basename(show.imageUrl);
    const filePath = path.join(uploadsDir, fileName);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Image file not found' });
    }
    
    res.download(filePath, fileName);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Failed to download image' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`TV Show API running on port ${PORT}`);
});

export default app;
