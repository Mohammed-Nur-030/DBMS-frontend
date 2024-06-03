const fs = require('fs');
const path = require('path');
const formidable = require('formidable');

const uploadDir = path.join(process.cwd(), 'public/uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = (req, res) => {
  const form = new formidable.IncomingForm({
    uploadDir,
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to upload file' });
    }

    const file = files.file;
    const filePath = path.join(uploadDir, file.newFilename);
    const relativeFilePath = path.relative(process.cwd(), filePath);

    res.status(200).json({ url: `/uploads/${file.newFilename}` });
  });
};

module.exports = handler;
