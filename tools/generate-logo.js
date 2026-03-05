const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

async function run() {
  const src = path.resolve(__dirname, '..', 'public', 'logo.svg')
  const dest = path.resolve(__dirname, '..', 'public', 'logo.png')
  try {
    if (!fs.existsSync(src)) {
      console.error('logo.svg não encontrado em public/')
      process.exit(0)
    }
    await sharp(src).png({ quality: 92 }).resize({ height: 48 }).toFile(dest)
    console.log('logo.png gerado em', dest)
  } catch (e) {
    console.error('Falha ao gerar logo.png:', e.message)
    process.exit(0)
  }
}

run()
