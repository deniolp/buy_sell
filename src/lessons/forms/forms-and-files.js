'use strict';

const express = require(`express`);
const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, `savings`);
const UPLOAD_DIR = path.join(__dirname, `savings/images`);

const MimeTypeExtension = {
  'image/png': `png`,
  'image/jpeg': `jpg`,
  'image/jpg': `jpg`,
};

const app = express();
app.use(express.static(PUBLIC_DIR));
app.set(`views`, `src/lessons/pug/templates`);
app.set(`view engine`, `pug`);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const fileExtention = MimeTypeExtension[file.mimetype];
    cb(null, `${nanoid()}.${fileExtention}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowTypes = Object.keys(MimeTypeExtension);
  const isValid = allowTypes.includes(file.mimetype);
  cb(null, isValid);
};

const upload = multer({storage, fileFilter, limits: {
  fileSize: 5 * 1024 * 1024
}
});

app.get(`/`, (req, res) => {
  res.render(`index`, {
    title: `Главная страница`,
    header: `Шаблонизатор в действии`,
    description: `Страница сформирована при помощи шаблонизатора Pug`
  });
});

app.get(`/form`, (req, res) => {
  res.render(`form-file`, {
    title: `Форма`,
    header: `Express и формы`,
  });
});

app.post(`/form`, upload.single(`photo`), (req, res) => {
  const {file} = req;
  console.log(file);
  res.redirect(`/`);
});

app.listen(PORT);
