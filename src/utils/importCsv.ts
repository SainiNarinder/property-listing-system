import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';
import mongoose from 'mongoose';
import Property from '../models/Property';
import dotenv from 'dotenv';

dotenv.config();

const importCSV = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);

  const csvFilePath = path.join(__dirname, '../../data/properties.csv');

  const properties: any[] = [];

  fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on('data', (row) => {
      properties.push({
        title: row.title,
        description: row.description,
        price: parseFloat(row.price),
        location: row.location,
        bedrooms: parseInt(row.bedrooms, 10),
        bathrooms: parseInt(row.bathrooms, 10),
        area: parseFloat(row.area),
        createdBy: new mongoose.Types.ObjectId(row.createdBy),
      });
    })
    .on('end', async () => {
      await Property.insertMany(properties);
      console.log('CSV data imported successfully.');
      mongoose.disconnect();
    });
};

importCSV();
