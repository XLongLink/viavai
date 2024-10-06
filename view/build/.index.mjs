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
new WebpackPackager('view/index.jsx', 'viavai/static/bundle.js').pack();


// Compile the components
new WebpackPackager('view/ui/VLayout.jsx', 'viavai/static/ui/VLayout.js').pack();
new WebpackPackager('view/ui/HLayout.jsx', 'viavai/static/ui/HLayout.js').pack();
new WebpackPackager('view/ui/Button.jsx', 'viavai/static/ui/Button.js').pack();
new WebpackPackager('view/ui/Text.jsx', 'viavai/static/ui/Text.js').pack();
new WebpackPackager('view/ui/Space.jsx', 'viavai/static/ui/Space.js').pack();
new WebpackPackager('view/ui/Input.jsx', 'viavai/static/ui/Input.js').pack();
// TODO: Add more components here