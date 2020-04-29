import path from "path";

export const join = (baseDir, dir): string => {
  return path.join(baseDir, dir);
};

export const userRootDir = (dir: string = "") => {
  return path.join(process.cwd(), dir);
};
export const rootDir = (dir: string = "") => {
  return path.join(__dirname, "../", dir);
};
