import os
import requests
from urllib.parse import urljoin
import json

# Function to download a file with redirects
def download_file(url, dest):
    if os.path.exists(dest):
        print(f"{dest} already exists, skipping download.")
        return

    try:
        print(f"Downloading {url}...")
        response = requests.get(url, stream=True)
        if response.status_code == 302:
            # Handle redirect
            redirect_url = urljoin(url, response.headers['Location'])
            print(f"Redirecting to {redirect_url}...")
            return download_file(redirect_url, dest)
        
        # Ensure we got a proper response
        response.raise_for_status()
        
        # Write the content to the file
        with open(dest, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        print(f"Saved to {dest}")
    except requests.exceptions.RequestException as e:
        print(f"Failed to download {url}: {e}")

# Function to get the UMD URL for a package
def get_umd_url(package_name, version):
    return f"https://unpkg.com/{package_name}@{version}/umd/{package_name}.production.min.js"

# Main function to download all files
def download_all():
    dist_dir = os.path.join(".dist", "libs")
    os.makedirs(dist_dir, exist_ok=True)

    # Load package.json
    with open('package.json', 'r') as f:
        package_json = json.load(f)

    # Get dependencies
    dependencies = package_json.get('dependencies', {})

    for package_name, version in dependencies.items():
        filename = f"{package_name}.production.min.js"
        dest_path = os.path.join(dist_dir, filename)
        url = get_umd_url(package_name, version)
        download_file(url, dest_path)

# Execute the download process
if __name__ == "__main__":
    download_all()
