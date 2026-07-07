import fs from 'fs';

export class JsonReader {
  static read<T>(filePath: string): T {
    const file = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(file) as T;
  }
}