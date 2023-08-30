import { Schema, SchemaTypes } from './types.ts'
import type { PropType } from 'vue'
import StringField from './fields/StringField'
import NumberField from './fields/NumberField'

export default defineComponent({
  name: 'SchemaItem',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
      type: Object,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
  },
  setup(props) {
    return () => {
      const { schema } = props
      // TODO: 如果type没有指定，需要猜测type类型
      const type = schema.type
      let Component: any
      console.log(type)

      switch (type) {
        case SchemaTypes.STRING: {
          Component = StringField
          break
        }
        case SchemaTypes.NUMBER: {
          Component = NumberField
          break
        }
        default: {
          console.warn(`${type} is not supported!`)
        }
      }
      return <Component {...props} />
    }
  },
})
