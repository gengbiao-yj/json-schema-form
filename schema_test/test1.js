// https://ajv.js.org/json-schema.html#keywords-for-numbers (schema 校验插件)
import Ajv from 'ajv'
// https://github.com/ajv-validator/ajv-formats (预设的校验格式)
import addFormats from 'ajv-formats'
// https://github.com/ajv-validator/ajv-i18n (错误信息的语言包)
// import localize from 'ajv-i18n'
// https://github.com/ajv-validator/ajv-errors (自定义错误信息, 不支持对自定义关键字定义错误信息，只能设置原生属性的错误信息)
import ajvErrors from 'ajv-errors'

const ajv = new Ajv({ allErrors: true })
ajvErrors(ajv)

// 自定义校验 format
ajv.addFormat('test', (data) => {
  console.log('-----------------')
  return data === 'haha'
})
// 自定义关键字 keywords
ajv.addKeyword({
  keyword: 'testKeyword',
  /* type3 */
  macro() {
    return {
      minLength: 10,
    }
  },

  /* type2 */
  // compile: (schema, parentSchema) => {
  //   console.log(schema)
  //   console.log(parentSchema)
  //   return () => true
  // },
  // // 关键字值的schema定义
  // metaSchema: {
  //   type: 'string'
  // }

  /* type1 */
  // validate: (schema, data) => {
  //   console.log('schema', schema)
  //   console.log('data', data)
  //   return false
  // },
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
      // testKeyword: 'there is testKeyword value',
      errorMessage: '这是错误的！',
      minLength: 10,
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
  // localize.zh(validate.errors)
  console.log(validate.errors)
}
