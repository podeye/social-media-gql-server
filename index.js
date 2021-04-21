const {ApolloServer, PubSub} = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const {MONGODB} = require('./config')

// String! = param must be a string !=must return

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs:typeDefs,
  resolvers:resolvers,
  context:({req})=>({req, pubsub})
})

const PORT = process.env.PORT || 5000;

mongoose.connect(MONGODB, {useNewUrlParser:true, useUnifiedTopology: true}).then(()=>{
  console.log("Mongo connected")
  return server.listen({port:PORT})
}).then(res=>{
  console.log(`Server started at ${res.url}`)
}).catch(err=>{
  console.error(err);
})