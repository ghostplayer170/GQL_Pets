import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./typeDefs.ts";
import { resolvers } from "./resolvers/resolvers.ts";
import mongoose from "npm:mongoose@7.6.3";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts"; // Leer variables de entorno
const env = await load(); // Carga Variables de entorno

// Variables de entorno.
const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL") ;
const PORT = env.PORT || Deno.env.get("PORT") ;

// Verifica variables de entorno.
if (!MONGO_URL || !PORT) {
  console.log("No mongo URL or Port found");
  Deno.exit(1);
}

// Conexión a la base de datos MongoDB.
try{
  await mongoose.connect(MONGO_URL);
  console.info("Mongo Connected");
}catch(e){
  console.error(e);
}

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server,{
  listen: {
    port: PORT,
  }
});

console.log(`🚀 Server ready at ${url}`);