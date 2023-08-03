import MonacoEditor from './components/MonacoEditor.tsx'
import css from './style/App.module.scss'
import demos from './demos'
import { SchemaForm } from '../lib/index'

// todo 在lib中导出
type Schema = any
type UISchema = any

const toJson = (data: any) => JSON.stringify(data, null, 2)

export default defineComponent({
  name: 'App',
  setup() {
    const selectedRef = ref(0)
    const demo = reactive<{
      schema: Schema | null
      data: any
      uiSchema: UISchema | null
      schemaCode: string
      dataCode: string
      uiScheamCode: string
    }>({
      schema: null,
      data: {},
      uiSchema: {},
      schemaCode: '',
      dataCode: '',
      uiScheamCode: '',
    })

    watchEffect(() => {
      const index = selectedRef.value
      const d = demos[index]
      demo.schema = d.schema
      demo.data = d.default
      demo.uiSchema = d.uiSchema
      demo.schemaCode = toJson(d.schema)
      demo.dataCode = toJson(d.default)
      demo.uiScheamCode = toJson(d.uiSchema)
    })

    // const methodRef = ref<any>()

    const handleChange = (data: string) => {
      try {
        demo.data = data
        demo.dataCode = toJson(data)
      } catch (e) {
        console.log(e)
      }
    }

    const handleCodeChange = (
      field: 'schema' | 'uiSchema' | 'data',
      value: string
    ) => {
      try {
        demo[field] = JSON.parse(value)
        ;(demo as any)[`${field}Code`] = value
      } catch (e) {
        console.log(e)
      }
    }

    const handleSchemaChange = (v: string) => handleCodeChange('schema', v)
    const handleUISchemaChange = (v: string) => handleCodeChange('uiSchema', v)
    const handleDataChange = (v: string) => handleCodeChange('data', v)

    return () => {
      return (
        <div class={css.appContainer}>
          <div class={css.editorContainer}>
            <MonacoEditor
              code={demo.schemaCode}
              onChange={handleSchemaChange}
              title="Schema"
            />
            <MonacoEditor
              code={demo.uiScheamCode}
              onChange={handleUISchemaChange}
              title="UISchema"
            />
            <MonacoEditor
              code={demo.dataCode}
              onChange={handleDataChange}
              title="Value"
            />
          </div>
          <div class={css.formContainer}>
            <SchemaForm
              schema={demo.schema}
              onChange={handleChange}
              value={demo.data}
            />
          </div>
        </div>
      )
    }
  },
})
