"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedData = exports.initialize = void 0;
const ormconfig_1 = __importDefault(require("./ormconfig"));
const create_inital_data_1 = require("./create-inital-data");
const initialize = () => ormconfig_1.default.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Data source has been initialized");
    yield (0, create_inital_data_1.seed)(ormconfig_1.default).then(() => {
        console.log("Initial seed completed.");
    }).catch((err) => { console.log("Error during initial seed", err); });
}))
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
exports.initialize = initialize;
const seedData = () => __awaiter(void 0, void 0, void 0, function* () { return yield (0, create_inital_data_1.seed)(ormconfig_1.default); });
exports.seedData = seedData;
