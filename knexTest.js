// 打開數據庫
var knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: '',
    password: '',
    database: 'test'
  }
})

const insert = async () => { // 這裡面不能用立即執行函數
  var abc = await knex('kita').insert([
    { id: 3, name: 'mio' },
    { id: 4, name: 'ritus' }
  ])
  console.log(abc)
}
insert()

// const select = knex('kita').select()
// console.log(select)

// const select = async () => {
//   var abc = await knex.column('id').select().from('kita')
//   console.log(abc)
// }
// select()
// const select = async () => { // 這裡面不能用立即執行函數
//   var abc = await knex('kita').select()
//   console.log(abc[0].name.length)
// }
// select()
