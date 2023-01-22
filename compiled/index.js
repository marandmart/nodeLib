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
import { readFile } from "fs/promises";
const errorTreatment = (error) => {
    throw new Error(chalk.red(error.message));
};
const linkExtractor = (text) => {
    const regex = /\[([^[\]]*?)]\((https?:\/\/[^\s?#.]*[^\s]*)\)/gm;
    const matches = [...text.matchAll(regex)].map((link) => ({
        title: link[1],
        url: link[2],
    }));
    return matches;
};
export const getFile = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const encoding = "utf-8";
    try {
        const text = yield readFile(path, encoding);
        const links = linkExtractor(text);
        return links;
    }
    catch (error) {
        errorTreatment(error);
    }
});
