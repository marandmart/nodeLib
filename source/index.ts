import chalk from "chalk";
import { readFile } from "fs/promises";
import { LinkData } from "./utils/interfaces";

const errorTreatment = (error: NodeJS.ErrnoException) => {
  throw new Error(chalk.red(error.message));
};

const linkExtractor = (text: string) => {
  const regex = /\[([^[\]]*?)]\((https?:\/\/[^\s?#.]*[^\s]*)\)/gm;
  const matches: LinkData[] = [...text.matchAll(regex)].map((link) => ({
    title: link[1],
    url: link[2],
  }));
  return matches;
};

export const getFile = async (path: string) => {
  const encoding = "utf-8";
  try {
    const text = await readFile(path, encoding);
    const links: LinkData[] = linkExtractor(text);
    return links;
  } catch (error: any) {
    errorTreatment(error);
  }
};
