import fs from 'fs';
import { PackageDownloader } from './downloader.mjs';
import { WebpackPackager } from './packager.mjs';


// Download the required packages with their corresponding versions
const { dependencies } = JSON.parse(fs.readFileSync("package.json", 'utf-8'));

for (const [packageName, version] of Object.entries(dependencies)) {
    const cleanVersion = version.replace('^', '');
    const downloader = new PackageDownloader(packageName, cleanVersion);
    if (downloader.is_downloaded()) {
        console.log(`[Skipped] ${packageName} as is already downloaded`);
        continue;
    }
    downloader.download();
    console.log(`[Downloaded] ${packageName}@${cleanVersion}`);

}


// Compile the main script
new WebpackPackager('ui/index.jsx', 'viavai/static/bundle.js').pack();


// Compile the components
new WebpackPackager('ui/core/Test.jsx', 'viavai/static/ui/test.js').pack();
// TODO: Add more components here