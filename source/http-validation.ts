import { LinkData } from "./utils/interfaces";
import chalk from "chalk";

const checkLinksStatus = async (links: string[]) => {
  const arrayStatus = await Promise.all(
    links.map(async (url) => {
      try {
        const response = await fetch(url);
        return response.status;
      } catch (error: any) {
        return handleErrors(error);
      }
    })
  );
  return arrayStatus;
};

const handleErrors = (error: any) => {
  if (error?.cause?.code === "ENOTFOUND") {
    console.error(chalk.red("Link not found"));
    return "Link not found";
  } else {
    console.error(chalk.red("Something went wrong"));
    return "Something went wrong";
  }
};

export const validatedList = async (listOfLink: LinkData[]) => {
  const links = listOfLink.map((linkObject) => linkObject.url);
  const statusOfAllLinks = await checkLinksStatus(links);
  const linksWithValidation = listOfLink.map((linkObject, index) => ({
    ...linkObject,
    status: statusOfAllLinks[index],
  }));
  console.log(linksWithValidation);
};
