import { PetModelType } from "../db/pets.ts";
import { Pet } from "../types.ts";

export function mapToPetObject(elem: PetModelType): Pet {
    return {
        id: elem._id.toString(),
        name: elem.name,
        breed: elem.breed,
    };
}
