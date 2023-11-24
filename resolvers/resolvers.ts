import { GraphQLError } from "graphql";
import { Pet } from "../types.ts";
import PetModel from "../db/pets.ts";
import { mapToPetObject } from "../controllers/getPetFromModel.ts"

export const resolvers = {
  Query: {
    pets: async (): Promise<Pet[]> => {
        const pets = await PetModel.find({}).exec();
        const mappedPets: Pet[] = pets.map((elem) => mapToPetObject(elem));
        return mappedPets;
    },
    pet: async (_: unknown, args: { id: string }): Promise<Pet> => { 
      const pet = await PetModel.findOne({_id: args.id}).exec();
      if (!pet) {
        throw new GraphQLError(`No pet found with id ${args.id}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return mapToPetObject(pet);
    },
    filterBreed: async (_: unknown, args: { breed: string }): Promise<Pet[]> => {
        const pets = await PetModel.find( { breed: args.breed } ).exec();
        const mappedPets: Pet[] = pets.map((elem) => mapToPetObject(elem));
        return mappedPets;
      },
  },
  Mutation: {
    addPet: async (_: unknown, args: { name: string; breed: string }): Promise<Pet> => {
      const newPet = new PetModel({ name: args.name, breed: args.breed });
      await newPet.save();
      return mapToPetObject(newPet);
    },
    deletePet: async (_: unknown, args: { id: string }): Promise<Pet> => {
      const pet = await PetModel.findOne({_id: args.id}).exec();
      if (!pet) {
        throw new GraphQLError(`No pet found with id ${args.id}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
      const deletedPet = mapToPetObject(pet);
      return deletedPet;
    },
    updatePet: async (_: unknown,args: { id: string; name: string; breed: string }): Promise<Pet> => {
      const pet = await PetModel.findOneAndUpdate(
        { _id: args.id },
        { name: args.name, breed: args.breed },
        { new: true }
      ).exec();   
      if (!pet) {
        throw new GraphQLError(`No pet found with id ${args.id}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
      const updatedPet = mapToPetObject(pet);
      return updatedPet;
    },
  },
};