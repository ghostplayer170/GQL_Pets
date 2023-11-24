import mongoose from "npm:mongoose@7.6.3";
import { Pet } from "../types.ts";

const Schema = mongoose.Schema; //Que campos tiene doc en la coleccion

const PetSchema = new Schema(
  {
    name: { type: String, required: true },
    breed: { type: String, required: true },
  },
  // { timestamps: true } //Añade dos campos creado y modificado
);

export type PetModelType = mongoose.Document & Omit<Pet, "id">; //Modelo sirve para comunicar con la db

export default mongoose.model<PetModelType>("Pet", PetSchema);

