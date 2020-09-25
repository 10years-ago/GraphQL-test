const _ = require('lodash')
let i = 0

const generateUUID = (prefix = '00000000') => () => {
  const suffix = `${++i}`.padStart(12, '0')
  return `${prefix}-0000-0000-0000-${suffix}`
}
const uuid = generateUUID('20000000')
// const random = parseInt(Math.random() * data.length)
module.exports = async function (knex, ctx) {
  //1.找出作業對應的班級
  const cls =
  //2.在班級中隨機找個學生
  const addHomework = [{
    id: uuid(),
    homework_id: ctx.addHomework.seq_id['7'].id,
    schooluser_id
  }]

  // 資料庫操作
  await knex('homework').insert([...addHomework])

  // 讀取資料
  const docs = await knex.select().table('homework')

  // 返回
  ctx.addHomework = {
    docs,
    obj: _.keyBy(docs, (o) => {
      return o.seq_id
    })
  }
}
