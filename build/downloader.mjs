import fs from 'fs';
import https from 'https';
import path from 'path';
import { PATH_DIST } from './constants.mjs';


export class PackageDownloader {
    /* Download a specific package and a given version from unpkg.com */

    constructor(packageName, version) {
        this.packageName = packageName;
        this.version = version;
    }

    getDownloadUrl() {
        return `https://unpkg.com/${this.packageName}@${this.version}/umd/${this.packageName}.production.min.js`;
    }

    downloadFileSync(url, dest) {
        const file = fs.createWriteStream(dest);

        https.get(url, (response) => {
            if (response.statusCode === 302) {
                const redirectUrl = new URL(response.headers.location, url).href;
                file.close();
                console.log(`Redirecting to ${redirectUrl}`);
                this.downloadFileSync(redirectUrl, dest);
                return;
            }

            response.pipe(file);

            file.on('finish', () => {
                file.close();
            });

        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            console.error(`Error downloading file: ${err.message}`);
        });
    }

    download() {
        /* Download the package and save it to the dist directory */

        const fileUrl = this.getDownloadUrl();
        const fileName = `${this.packageName}.production.min.js`;
        const destDir = path.join(PATH_DIST, '/libs');
        const dest = path.join(destDir, fileName);

        // Ensure the directory exists
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }

        this.downloadFileSync(fileUrl, dest);
    }

    is_downloaded() {
        /* Check if the package is already downloaded */

        const fileName = `${this.packageName}.production.min.js`;
        const dest = path.join(PATH_DIST, '/libs', fileName);
        return fs.existsSync(dest);
    }
}