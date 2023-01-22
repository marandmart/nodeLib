var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import chalk from "chalk";
import { lstatSync, promises } from "fs";
import { validatedList } from "./http-validation.js";
import { getFile } from "./index.js";
const path = process.argv;
const showLinkInfo = (validate = false, links, filename = "") => {
    links
        ? (() => {
            if (filename)
                console.log(chalk.yellow(filename));
            links.map((link) => {
                console.log(chalk.blue(`${link.title} - ${link.url}`));
            });
            if (validate)
                validatedList(links);
        })()
        : "";
};
const processText = (argument) => __awaiter(void 0, void 0, void 0, function* () {
    const path = argument[2];
    const shouldValidate = argument[3] === "--validate";
    if (!path)
        throw Error("Must supply a file path or directory to be read");
    try {
        if (lstatSync(path).isFile()) {
            const file = yield getFile(path);
            if ((file === null || file === void 0 ? void 0 : file.length) === 0) {
                throw Error("There are no links in file");
            }
            showLinkInfo(shouldValidate, file);
        }
        else if (lstatSync(path).isDirectory()) {
            const fileNamesInDirectory = yield promises.readdir(path);
            fileNamesInDirectory.map((fileName) => __awaiter(void 0, void 0, void 0, function* () {
                const file = yield getFile(`${path}/${fileName}`);
                if ((file === null || file === void 0 ? void 0 : file.length) !== 0) {
                    showLinkInfo(shouldValidate, file, fileName);
                }
            }));
        }
    }
    catch (error) {
        if ((error === null || error === void 0 ? void 0 : error.code) === "ENOENT") {
            throw Error("Directory does not exist");
        }
        console.error(error);
        throw Error("Something wrong happened");
    }
});
processText(path);
