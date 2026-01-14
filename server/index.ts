import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

const DYNAMIC_DIR = path.resolve(__dirname, '..', 'public', 'dynamic');
const IMAGES_UPLOAD_DIR = path.join(DYNAMIC_DIR, 'images');
const CONFIG_DIR = DYNAMIC_DIR;
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

const corsOptions = {
  origin: 'http://localhost:3010',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(express.json());
app.use(cors(corsOptions))

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 35 * 1024 * 1024 }, // 35MB limit
  fileFilter: (_, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  },
});

async function ensureDirs() {
  await fs.mkdir(IMAGES_UPLOAD_DIR, { recursive: true });
  await fs.mkdir(CONFIG_DIR, { recursive: true });
}

ensureDirs().catch((err) => {
  console.error('Failed to create required directories:', err);
  process.exit(1);
});

app.post('/add-image', upload.single('image'), async (req, res) => {
  try {
    // multer puts a file on req.file when using .single()
    const file = req.file as Express.Multer.File | undefined;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded. Use field name "image".' });
    }

    const id = uuidv4();
    const ext = path.extname(file.originalname);
    const filename = `${id}${ext}`;
    const dest = path.join(IMAGES_UPLOAD_DIR, filename);

    await fs.writeFile(dest, file.buffer);

    await new Promise(r => setTimeout(r, 3000))

    return res.status(201).json({ id, filename });
  } catch (err: unknown) {
    console.error('Error in /add-image:', err);

    let message: string;
    if (err instanceof Error) {
      message = err.message;
    } else {
      message = 'Internal server error';
    }

    return res.status(500).json({ error: message });
  }
});

app.delete('/delete-image/:id', async (req, res) => {
  try {
    // Accept id either in JSON body or as a query param
    const id = req.params.id;
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Missing image id (body.id or ?id=)' });
    }

    const files = await fs.readdir(IMAGES_UPLOAD_DIR);
    const match = files.find((f) => f.startsWith(id));
    if (!match) return res.status(404).json({ error: 'Image not found' });

    await fs.unlink(path.join(IMAGES_UPLOAD_DIR, match));
    return res.json({ success: true, message: 'Deleted' });
  } catch (err: unknown) {
    console.error('Error in /delete-image:', err);

    let message: string;
    if (err instanceof Error) {
      message = err.message;
    } else {
      message = 'Internal server error';
    }

    return res.status(500).json({ error: message });
  }
});

app.delete('/get-all-images', async (_req, res) => {
  try {
    const files = await fs.readdir(IMAGES_UPLOAD_DIR);

    return res.json({ images: files });
  } catch (err: unknown) {
    console.error('Error in /get-all-images:', err);

    let message: string;
    if (err instanceof Error) {
      message = err.message;
    } else {
      message = 'Internal server error';
    }

    return res.status(500).json({ error: message });
  }
});

app.patch('/update-config', async (req, res) => {
  try {
    const body = req.body;
    if (typeof body !== 'object' || body === null) {
      return res.status(400).json({ error: 'Invalid JSON body' });
    }

    await fs.writeFile(CONFIG_FILE, JSON.stringify(body, null, 2), 'utf8');

    return res.json({ success: true, config: body });
  } catch (err: unknown) {
    console.error('Error in /update-config:', err);

    let message: string;
    if (err instanceof Error) {
      message = err.message;
    } else {
      message = 'Internal server error';
    }

    return res.status(500).json({ error: message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
