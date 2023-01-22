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
const checkLinksStatus = (links) => __awaiter(void 0, void 0, void 0, function* () {
    const arrayStatus = yield Promise.all(links.map((url) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            return response.status;
        }
        catch (error) {
            return handleErrors(error);
        }
    })));
    return arrayStatus;
});
const handleErrors = (error) => {
    var _a;
    if (((_a = error === null || error === void 0 ? void 0 : error.cause) === null || _a === void 0 ? void 0 : _a.code) === "ENOTFOUND") {
        console.error(chalk.red("Link not found"));
        return "Link not found";
    }
    else {
        console.error(chalk.red("Something went wrong"));
        return "Something went wrong";
    }
};
export const validatedList = (listOfLink) => __awaiter(void 0, void 0, void 0, function* () {
    const links = listOfLink.map((linkObject) => linkObject.url);
    const statusOfAllLinks = yield checkLinksStatus(links);
    const linksWithValidation = listOfLink.map((linkObject, index) => (Object.assign(Object.assign({}, linkObject), { status: statusOfAllLinks[index] })));
    console.log(linksWithValidation);
});
