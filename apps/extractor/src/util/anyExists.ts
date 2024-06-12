import {stat} from "fs/promises";

export default async function anyExists(files: string[]) {
  try {
    return await Promise.any(
      files.map(async (file) => {
        await stat(file);
        return file;
      }),
    );
  } catch {
    return false;
  }
}
