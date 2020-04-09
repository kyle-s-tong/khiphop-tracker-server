import fs from 'fs';

export default class FileSystemWriter {
  async writeFile(file, data) {
    await fs.writeFileSync(file, data)
  }

  async readFile(file, isJson = false) {
    const fileContents = await fs.readFileSync(file);

    if (isJson) {
      return JSON.parse(fileContents);
    }

    return fileContents;
  }

  async readFileKey(file, fileKey) {
    const fileContents = await this.readFile(file);

    const parsedContents = JSON.parse(fileContents);

    if (!parsedContents[fileKey]) {
      return null;
    }

    return parsedContents[fileKey];
  }

  async updateFileKey(file, fileKey, data, isJson = false) {
    const fileExists = fs.existsSync(file);

    if (!fileExists) {
      throw new Error(`File with path ${file} does not exist.`)
    }

    const fileContents = await this.readFile(file, isJson);
    if (!fileContents[fileKey]) {
      throw new Error(`Key ${fileKey} is not present in the file with path ${file}`);
    }

    fileContents[fileKey].push(data);

    await this.writeFile(file, JSON.stringify(fileContents));
  }
}
