var express = require('express')
var graphqlHTTP = require('express-graphql').graphqlHTTP
var { buildSchema } = require('graphql')

var schema = buildSchema(`
  input UserInput {
    name: String
    type: String
    creater: String
  }
  type User{
    id: ID!
    name:String
    type:String
    creater:String
  }
  type Query{
    me: [User]
    User(id:ID):[User]
  }
  type Mutation{
    createUser(name: String, type: String, creater: String):User
    updateUser(id: ID!, name: String, type: String, creater: String): [User]
  }
`)

var arr = [
  { id: 1, name: 'kita', type: 'mp3', creater: 'A' },
  { id: 2, name: 'mio', type: 'mp4', creater: 'B' },
  { id: 3, name: 'yui', type: 'avi', creater: 'C' },
  { id: 4, name: 'ritus', type: 'rmvb', creater: 'D' }
]

var root = {
  me: () => arr,
  User: val => arr.filter(item => item.id === val.id),
  createUser: ({ ...arg }) => {
    const id = arr[arr.length - 1].id
    const obj = arg
    obj.id = id + 1
    arr.push(obj)
  },
  updateUser: ({ id, ...arg }) => {
    for (let i = 0; i < arr.length; i++) {
      // console.log(arr[i].id)
      if (arr[i].id == id) {
        arr[i] = Object.assign({}, arr[i], arg)
        console.log(arr[i])
        return
      }
    }
    throw new Error('id:' + id + '不存在')
  }
}

var app = express()
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'))
