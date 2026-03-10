import express from 'express';
import multer from 'multer';
import cors from 'cors';
import {v4 as uuidv4} from 'uuid';
import path from 'path';
import {promises as fs} from 'fs';
import {fileURLToPath} from 'url';
import {exec} from 'node:child_process';
import {promisify} from 'node:util';

const execPromise = promisify(exec);

const app = express();

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

const DYNAMIC_DIR = path.resolve(__dirname, '..', 'public', 'dynamic');
const IMAGES_UPLOAD_DIR = path.join(DYNAMIC_DIR, 'images');
const CONFIG_DIR = DYNAMIC_DIR;
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');
const CONFIG_FILE_LOCAl = path.join(CONFIG_DIR, 'config_local.json');

const corsOptions = {
  origin: 'http://localhost:3010',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(express.json());
app.use(cors(corsOptions));

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {fileSize: 35 * 1024 * 1024}, // 35MB limit
  fileFilter: (_, file, cb) => {
    if (file.mimetype && file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  },
});

async function ensureDirs() {
  await fs.mkdir(IMAGES_UPLOAD_DIR, {recursive: true});
  await fs.mkdir(CONFIG_DIR, {recursive: true});
}

async function fileExists(path: string) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

ensureDirs().catch((err) => {
  console.error('Failed to create required directories:', err);
  process.exit(1);
});

async function clearOrphanImages() {
  const config = await fs.readFile(CONFIG_FILE, 'utf8');

  const images = fs.readdir(IMAGES_UPLOAD_DIR);

  for (const file in images) {
    if (config.indexOf(file) === -1) {
      await fs.unlink(path.join(IMAGES_UPLOAD_DIR, file));
    }
  }
}

app.post('/add-image', upload.single('image'), async (req, res) => {
  try {
    // multer puts a file on req.file when using .single()
    const file = req.file as Express.Multer.File | undefined;
    if (!file) {
      return res.status(400).json({error: 'No file uploaded. Use field name "image".'});
    }

    const id = uuidv4();
    const ext = path.extname(file.originalname);
    const filename = `${id}${ext}`;
    const dest = path.join(IMAGES_UPLOAD_DIR, filename);

    await fs.writeFile(dest, file.buffer);

    await new Promise(r => setTimeout(r, 3000))

    return res.status(201).json({id, filename});
  } catch (err: unknown) {
    console.error('Error in /add-image:', err);

    let message: string;
    if (err instanceof Error) {
      message = err.message;
    } else {
      message = 'Internal server error';
    }

    return res.status(500).json({error: message});
  }
});

app.delete('/delete-image/:id', async (req, res) => {
  try {
    // Accept id either in JSON body or as a query param
    const id = req.params.id;
    if (!id || typeof id !== 'string') {
      return res.status(400).json({error: 'Missing image id (body.id or ?id=)'});
    }

    const files = await fs.readdir(IMAGES_UPLOAD_DIR);
    const match = files.find((f) => f.startsWith(id));
    if (!match) return res.status(404).json({error: 'Image not found'});

    await fs.unlink(path.join(IMAGES_UPLOAD_DIR, match));
    return res.json({success: true, message: 'Deleted'});
  } catch (err: unknown) {
    console.error('Error in /delete-image:', err);

    let message: string;
    if (err instanceof Error) {
      message = err.message;
    } else {
      message = 'Internal server error';
    }

    return res.status(500).json({error: message});
  }
});

app.delete('/get-all-images', async (_req, res) => {
  try {
    const files = await fs.readdir(IMAGES_UPLOAD_DIR);

    return res.json({images: files});
  } catch (err: unknown) {
    console.error('Error in /get-all-images:', err);

    let message: string;
    if (err instanceof Error) {
      message = err.message;
    } else {
      message = 'Internal server error';
    }

    return res.status(500).json({error: message});
  }
});

app.patch('/update-config', async (req, res) => {
  try {
    const body = req.body;
    if (typeof body !== 'object' || body === null) {
      return res.status(400).json({error: 'Invalid JSON body'});
    }

    await fs.writeFile(CONFIG_FILE_LOCAl, JSON.stringify(body, null, 2), 'utf8');

    return res.json({success: true, config: body});
  } catch (err: unknown) {
    console.error('Error in /update-config:', err);

    let message: string;
    if (err instanceof Error) {
      message = err.message;
    } else {
      message = 'Internal server error';
    }

    return res.status(500).json({error: message});
  }
});

app.post('/publish', async (_, res) => {
  try {
    console.log('Friss server: Started publishing process');

    if (await fileExists(CONFIG_FILE_LOCAl)) {
      console.log('Friss server: Removing old config file');
      await fs.rm(CONFIG_FILE);
      console.log('Friss server: Replacing ');
      await fs.rename(CONFIG_FILE_LOCAl, CONFIG_FILE);
    } else {
      console.log('Friss server: No new config file found');
    }

    console.log('Friss server: Clearing orphan images');
    await clearOrphanImages();

    console.log('Friss server: Assembling app');
    await execPromise('npm run build');

    console.log('Friss server: Removing old docs folder');
    await fs.rm(path.resolve(__dirname, '..', 'docs'), {recursive: true})
    console.log('Friss server: Copying new build to docs folder');
    await fs.cp(path.resolve(__dirname, '..', 'dist'), path.resolve(__dirname, '..', 'docs'), {recursive: true})

    console.log('Friss server: Git marking files as changed');
    await execPromise('git add --all');
    console.log('Friss server: Git committing changes');
    await execPromise('git commit -m "Publish"');
    console.log('Friss server: Git pushing changes');
    await execPromise('git push -u origin main');

    console.log('Friss server: Publishing complete');
    return res.status(200).send();
  } catch (err: unknown) {
    return res.status(500).json({error: `Internal server error: ${err}`});
  }
});


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, _req: unknown, _res: unknown, _next: unknown) => {
  console.error('Global error handler:', err);
  server.close(() => {
    console.log('HTTP server closed. Exiting process.');
    process.exit(1); // Exit with a 'failure' code
  });
});
