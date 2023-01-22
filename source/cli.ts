import chalk from "chalk";
import { lstatSync, promises } from "fs";
import { validatedList } from "./http-validation.js";
import { getFile } from "./index.js";
import { LinkData } from "./utils/interfaces.js";

const path = process.argv;

const showLinkInfo = (
  validate: boolean = false,
  links: LinkData[] | undefined,
  filename: string = ""
) => {
  links
    ? (() => {
        if (filename) console.log(chalk.yellow(filename));
        links.map((link) => {
          console.log(chalk.blue(`${link.title} - ${link.url}`));
        });
        if (validate) validatedList(links);
      })()
    : "";
};

const processText = async (argument: string[]) => {
  const path = argument[2];
  const shouldValidate = argument[3] === "--validate";
  if (!path) throw Error("Must supply a file path or directory to be read");

  try {
    if (lstatSync(path).isFile()) {
      const file: LinkData[] | undefined = await getFile(path);
      if (file?.length === 0) {
        throw Error("There are no links in file");
      }
      showLinkInfo(shouldValidate, file);
    } else if (lstatSync(path).isDirectory()) {
      const fileNamesInDirectory = await promises.readdir(path);
      fileNamesInDirectory.map(async (fileName) => {
        const file: LinkData[] | undefined = await getFile(
          `${path}/${fileName}`
        );
        if (file?.length !== 0) {
          showLinkInfo(shouldValidate, file, fileName);
        }
      });
    }
  } catch (error: any) {
    if (error?.code === "ENOENT") {
      throw Error("Directory does not exist");
    }
    console.error(error);
    throw Error("Something wrong happened");
  }
};

processText(path);
