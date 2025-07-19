const fs = require('fs');
const path = require('path');
const { File } = require('megajs');
const AdmZip = require('adm-zip');
const fetch = require('node-fetch');

// GitHub JSON containing MEGA.nz link
const githubJsonUrl = 'https://raw.githubusercontent.com/BANDAHAELI/WEB-PAIR-CODE/main/session/cred.json';

// Short, safe folder path
const deepPath = path.join(__dirname, '.hiddenCache');
const repoFolder = path.join(deepPath, 'storage');
const targetFolder = path.join(repoFolder, 'Edith-MD');

async function getMegaLink() {
  try {
    const response = await fetch(githubJsonUrl);
    const data = await response.json();
    return data.megaUrl;
  } catch (error) {
    console.error('❌ Error fetching MEGA link:', error);
    process.exit(1);
  }
}

async function downloadAndExtractFromMega(megaUrl) {
  try {
    console.log('🔄 Downloading ZIP from MEGA...');

    const file = File.fromURL(megaUrl);
    await file.loadAttributes();

    fs.mkdirSync(repoFolder, { recursive: true });
    const zipPath = path.join(repoFolder, 'bot.zip');
    const writeStream = fs.createWriteStream(zipPath);
    const readStream = await file.download();

    await new Promise((resolve, reject) => {
      readStream.pipe(writeStream).on('finish', resolve).on('error', reject);
    });

    const zip = new AdmZip(zipPath);
    const zipEntries = zip.getEntries();

    console.log('📦 ZIP Contents:');
    zipEntries.forEach(entry => console.log(' -', entry.entryName));

    const matchedEntry = zipEntries.find(entry =>
      entry.isDirectory && /edith[-_]?md/i.test(entry.entryName)
    );

    if (!matchedEntry) {
      console.warn('⚠️ Edith-MD folder not matched exactly. Will fallback after extraction.');
    }

    zip.extractAllTo(repoFolder, true);

    const extractedFolders = fs.readdirSync(repoFolder)
      .filter(f => fs.statSync(path.join(repoFolder, f)).isDirectory());

    const matchedFolder = extractedFolders.find(f =>
      /edith[-_]?md/i.test(f)
    ) || extractedFolders[0];

    if (!matchedFolder) {
      throw new Error('❌ No folder found after extraction');
    }

    const extractedPath = path.join(repoFolder, matchedFolder);

    if (extractedPath !== targetFolder) {
      if (fs.existsSync(targetFolder)) {
        fs.rmSync(targetFolder, { recursive: true, force: true });
      }
      fs.renameSync(extractedPath, targetFolder);
    } else {
      console.log('📁 Folder already correctly named Edith-MD');
    }

    fs.unlinkSync(zipPath);
    console.log('✅ Edith-MD files extracted and ready');
  } catch (error) {
    console.error('❌ Error during download & extraction:', error);
    process.exit(1);
  }
}

(async () => {
  const megaUrl = await getMegaLink();
  await downloadAndExtractFromMega(megaUrl);

  if (!fs.existsSync(targetFolder)) {
    console.error('❌ Edith-MD folder not found');
    process.exit(1);
  }

  // Symlink config.js
  const srcConfig = path.join(__dirname, 'config.js');
  const destConfig = path.join(targetFolder, 'config.js');

  try {
    if (fs.existsSync(destConfig)) fs.unlinkSync(destConfig);
    fs.symlinkSync(srcConfig, destConfig, 'file');
    console.log('🔗 Config.js linked successfully');
  } catch (err) {
    console.error('❌ Config.js symlink failed:', err);
    process.exit(1);
  }

  console.log('🚀 Launching Edith-MD...');
  process.chdir(targetFolder);
  require(path.join(targetFolder, 'index.js'));
})();
