const { madalenaTeachersUsers } = require('../data/madalena/madalenaTeachers')
const _ = require('lodash')
let i = 0

const generateUUID = (prefix = '00000000') => () => {
  const suffix = `${++i}`.padStart(12, '0')
  return `${prefix}-0000-0000-0000-${suffix}`
}
const uuid = generateUUID('19000000')

module.exports = async function (knex, ctx) {
  // 1. 首先拿到學校老師的id（1）
  const teacherID = madalenaTeachersUsers.filter(item => item.name === '黃嵐萍')
  // 2. 拿到班級的id （2）
  // 3.添加
  const files = { a: '1', b: '1' }
  const filesTest = JSON.stringify(files)
  const addHomework = [{
    id: uuid(),
    title: '高二3班(美術)',
    end_at: new Date(new Date().getTime() - 2 * 60 * 60 * 1000),
    work_content: '關於本次作畫的內容：XXXXXXXXXXXXXXXXXXXXXX',
    fraction: 100,
    created_at: new Date(),
    cls_id: ctx.classes.obj['19-k1a'].id,
    schooluser_id: teacherID[0].id,
    files: filesTest
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
