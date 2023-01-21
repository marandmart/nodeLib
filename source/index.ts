// antigamente -> const chalk = require('chalk')
import chalk from "chalk";
import { readFile } from "fs/promises";

interface LinkInfoObject {
  title: string;
  url: string;
}

const errorTreatment = (error: NodeJS.ErrnoException) => {
  throw new Error(chalk.red(error.message));
};

const showsContent = (content: string) => {
  console.log(chalk.green(content));
};

const linkExtractor = (text: string) => {
  const regex = /\[([^[\]]*?)]\((https?:\/\/[^\s?#.]*[^\s]*)\)/gm;
  const matches: Array<LinkInfoObject> = [...text.matchAll(regex)].map(
    (link) => ({
      title: link[1],
      url: link[2],
    })
  );
  return matches;
};

// const getFile = (path: string) => {
//   const encoding = "utf-8";
//   readFile(path, encoding).then(showsContent).catch(errorTreatment);
// };

const getFile = async (path: string) => {
  const encoding = "utf-8";
  try {
    const text = await readFile(path, encoding);
    showsContent(text);
    const links = linkExtractor(text);
    links.map((item) => console.log(chalk.blue(`${item.title} - ${item.url}`)));
  } catch (error: any) {
    if (typeof error === "object") {
      errorTreatment(error);
    } else {
      console.error(error);
    }
  }
};

getFile("./files/texto.md");
