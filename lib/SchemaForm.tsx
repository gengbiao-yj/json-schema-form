import { Schema, SchemaTypes } from './types.ts'
import type { PropType } from 'vue'
export default defineComponent({
  name: 'SchemaForm',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
  },
  setup(props) {
    return () => {
      const schema = props.schema
      const type = schema.type
      switch (type) {
        case SchemaTypes.STRING: {
          return <input type="text" />
        }
      }
    }
  },
})
