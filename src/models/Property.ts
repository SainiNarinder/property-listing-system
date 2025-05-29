import mongoose, { Document, Schema } from 'mongoose';

export interface IProperty extends Document {
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  createdBy: mongoose.Types.ObjectId;
}

const PropertySchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  area: { type: Number },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model<IProperty>('Property', PropertySchema);
