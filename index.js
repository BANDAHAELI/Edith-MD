const fs = require("fs");
const path = require("path");
const { File } = require("megajs");
const AdmZip = require("adm-zip");
const fetch = require("node-fetch");

// GitHub JSON containing MEGA.nz link
const githubJsonUrl =
  "https://raw.githubusercontent.com/BANDAHAELI/WEB-PAIR-CODE/main/session/cred.json";

// Safe short directory path (avoid long .cache nesting)
const deepPath = path.join(__dirname, ".hiddenCache");
const repoFolder = path.join(deepPath, "storage");
const targetFolder = path.join(repoFolder, "Edith-MD");

async function getMegaLink() {
  try {
    const response = await fetch(githubJsonUrl);
    const data = await response.json();
    return data.megaUrl;
  } catch (error) {
    console.error("❌ Error fetching MEGA link:", error);
    process.exit(1);
  }
}

async function downloadAndExtractFromMega(megaUrl) {
  try {
    console.log("🔄 Loading Edith-MD files...");

    const file = File.fromURL(megaUrl);
    await file.loadAttributes();

    fs.mkdirSync(repoFolder, { recursive: true });

    const zipPath = path.join(repoFolder, "bot.zip");
    const writeStream = fs.createWriteStream(zipPath);
    const readStream = await file.download();

    await new Promise((resolve, reject) => {
      readStream.pipe(writeStream).on("finish", resolve).on("error", reject);
    });

    const zip = new AdmZip(zipPath);
    const zipEntries = zip.getEntries();

    console.log("📁 ZIP contents:");
    zipEntries.forEach((entry) => console.log(" -", entry.entryName));

    const matchedEntry = zipEntries.find(
      (entry) => entry.isDirectory && /edith[-_]?md/i.test(entry.entryName),
    );

    if (!matchedEntry) {
      console.warn(
        "⚠️ Edith-MD folder not matched exactly. Will fallback after extraction.",
      );
    }

    // Extract entire ZIP
    zip.extractAllTo(repoFolder, true);

    // Look for a folder named like edith-md, or fallback to first folder
    const extractedFolders = fs
      .readdirSync(repoFolder)
      .filter((f) => fs.statSync(path.join(repoFolder, f)).isDirectory());

    const matchedFolder =
      extractedFolders.find((f) => /edith[-_]?md/i.test(f)) ||
      extractedFolders[0];

    if (!matchedFolder) {
      throw new Error("❌ No folder found after extraction");
    }

    const extractedPath = path.join(repoFolder, matchedFolder);

    // Only rename if needed
    if (extractedPath !== targetFolder) {
      if (fs.existsSync(targetFolder)) {
        fs.rmSync(targetFolder, { recursive: true, force: true });
      }
      fs.renameSync(extractedPath, targetFolder);
    } else {
      console.log("📁 No need to rename — folder already named Edith-MD");
    }

    fs.unlinkSync(zipPath);
    console.log("✅ Edith-MD files successfully extracted");
  } catch (error) {
    console.error("❌ Error processing download:", error);
    process.exit(1);
  }
}

(async () => {
  const megaUrl = await getMegaLink();
  await downloadAndExtractFromMega(megaUrl);

  if (!fs.existsSync(targetFolder)) {
    console.error("❌ Edith-MD folder not found after extraction");
    process.exit(1);
  }

  // Symlink config.js
  const srcConfig = path.join(__dirname, "config.js");
  const destConfig = path.join(targetFolder, "config.js");

  try {
    if (fs.existsSync(destConfig)) fs.unlinkSync(destConfig);
    fs.symlinkSync(srcConfig, destConfig, "file");
    console.log("🔗 Config.js symlink created");
  } catch (err) {
    console.error("❌ Failed to symlink config.js:", err);
    process.exit(1);
  }

  console.log("🚀 Starting Edith-MD Bot...");
  process.chdir(targetFolder);
  require(path.join(targetFolder, "index.js"));
})();
