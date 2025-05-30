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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const Property_1 = __importDefault(require("../models/Property"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const importCSV = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(process.env.MONGO_URI);
    const csvFilePath = path_1.default.join(__dirname, '../../data/properties.csv');
    const properties = [];
    fs_1.default.createReadStream(csvFilePath)
        .pipe((0, csv_parser_1.default)())
        .on('data', (row) => {
        properties.push({
            title: row.title,
            description: row.description,
            price: parseFloat(row.price),
            location: row.location,
            bedrooms: parseInt(row.bedrooms, 10),
            bathrooms: parseInt(row.bathrooms, 10),
            area: parseFloat(row.area),
            createdBy: new mongoose_1.default.Types.ObjectId(row.createdBy),
        });
    })
        .on('end', () => __awaiter(void 0, void 0, void 0, function* () {
        yield Property_1.default.insertMany(properties);
        console.log('CSV data imported successfully.');
        mongoose_1.default.disconnect();
    }));
});
importCSV();
