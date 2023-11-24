// The GraphQL schema
export const typeDefs = `#graphql #Solo pone colores
  type Pet { 
    id: ID! # Simbolo que significa obligatorio
    name: String!
    breed: String!
  }
  type Query { # Endpoints
    hello: String!
    pets: [Pet!]! # Todos elem Pet! debe ser Pet y []! dice que no puede devolver null
    pet(id: ID!): Pet!
    filterBreed(breed: String!): [Pet!]!
  }
  type Mutation { # Endpoints
    addPet(name: String!, breed: String!): Pet!
    deletePet(id: ID!): Pet!
    updatePet(id: ID!, name: String, breed: String): Pet!
  }
`;