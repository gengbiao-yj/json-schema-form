// https://ajv.js.org/json-schema.html#keywords-for-numbers (schema 校验插件)
import Ajv from 'ajv'
// https://github.com/ajv-validator/ajv-formats (预设的校验格式)
import addFormats from 'ajv-formats'

const ajv = new Ajv()
// 自定义校验 format
ajv.addFormat('test', (data) => {
  console.log('-----------------')
  return data === 'haha'
})
// 自定义关键字 keywords
ajv.addKeyword({
  keyword: 'testKeyword',
  validate: (schema, data) => {
    console.log('schema', schema)
    console.log('data', data)
    return true
  },
})
addFormats(ajv)

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    age: {
      type: 'number',
    },
    pets: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
    isWorker: {
      type: 'boolean',
    },
    ip: {
      type: 'string',
      format: 'ipv4',
    },
    test: {
      type: 'string',
      format: 'test',
    },
    test2: {
      type: 'string',
      testKeyword: 'there is testKeyword value',
    },
  },
  required: ['name', 'age', 'isWorker'],
}
const validate = ajv.compile(schema)
const valid = validate({
  name: 'gengbiao',
  age: 28,
  pets: ['猫咪', '旺旺'],
  isWorker: true,
  ip: '192.168.1.0',
  test: 'haha',
  test2: 'gaga',
})
if (!valid) {
  console.log(validate.errors)
}
