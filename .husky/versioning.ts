import fs from 'fs';

const packageJsonPath = './package.json';

function incrementVersion() {
  // Load the package.json file
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

  // Increment the version
  const [major, minor, patch] = packageJson.version.split('.');
  const newVersion = `${major}.${minor}.${parseInt(patch, 10) + 1}`;

  // Update the package.json with the new version
  packageJson.version = newVersion;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

incrementVersion();
