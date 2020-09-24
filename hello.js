// var express = require('express')
// var graphqlHTTP = require('express-graphql').graphqlHTTP
// var { buildSchema } = require('graphql')

// var knex = require('knex')({
//   client: 'pg',
//   connection: {
//     host: '127.0.0.1',
//     user: '',
//     password: '',
//     database: 'test'
//   }
// })

// var schema = buildSchema(`
//   input UserInput {
//     name: String
//     type: String
//     creater: String
//   }
//   type kita{
//     id: ID!
//     name:String
//   }
//   type Query{
//     me: [kita]
//     cc(id:ID):[kita]
//   }
//   type Mutation{
//     createUser(id:ID!, name: String):[kita]
//     updateUser(id: ID!, name: String): [kita]
//     delete(id:ID!):[kita]
//   }
// `)

// var root = {
//   me: () => knex('kita').select(),
//   cc: (val) => knex('kita').where('id', val.id),
//   createUser: async ({ ...arg }) => {
//     await knex('kita').insert({ id: arg.id, name: arg.name })
//   },
//   updateUser: async ({ id, ...arg }) => {
//     await knex('kita')
//       .where('id', '=', id)
//       .update({
//         name: arg.name
//       })
//   },
//   delete: async (arg) => {
//     console.log(arg.id)
//     await knex('kita')
//       .where('id', arg.id)
//       .del()
//   }
// }

// var app = express()
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true
// }))
// app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'))

const { ApolloServer, gql } = require('apollo-server')

var knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: '',
    password: '',
    database: 'test'
  }
})

const typeDefs = gql`
  input UserInput {
    id: ID!
    name:String
  }
  type kita{
    id: ID!
    name:String
  }
  type Query{
    me: [kita]
    cc(id:ID):[kita]
  }
  type Mutation{
    createUser(input:UserInput):[kita]
    updateUser(id: ID!, name:String): [kita]
    delete(id:ID!):[kita]
  }
`

const resolvers = {
  Query: {
    me: () => knex('kita').select(),
    cc: (arg) => knex('kita').where('id', arg.id)
  },
  Mutation: {
    createUser: async (root, args, context) => {
      const { id, name } = args.input
      return await knex('kita')
        .insert({ id, name }).returning('*')
    },
    updateUser: async (root, args, context) => {
      return await knex('kita').where('id', '=', args.id)
        .update({
          name: args.name
        }).returning('*')
    },
    delete: async (root, args, context) => {
      return await knex('kita')
        .where('id', args.id)
        .del().returning('*')
    }
  }
}
const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(` Server ready at ${url}`)
})
