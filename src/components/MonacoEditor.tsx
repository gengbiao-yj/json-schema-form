import * as Monaco from 'monaco-editor'
import css from '../style/componentas/MonacoEditor.module.scss'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'

export default defineComponent({
  props: {
    code: {
      type: String as PropType<string>,
      required: true,
    },
    onChange: {
      type: Function as PropType<
        (value: string, event: Monaco.editor.IModelContentChangedEvent) => void
      >,
      required: true,
    },
    title: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props) {
    // @ts-ignore
    self.MonacoEnvironment = {
      getWorker(_: string, label: string) {
        if (label === 'json') {
          return new jsonWorker()
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
          return new cssWorker()
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
          return new htmlWorker()
        }
        if (['typescript', 'javascript'].includes(label)) {
          return new tsWorker()
        }
        return new EditorWorker()
      },
    }

    // must be shallowRef, if not, editor.getValue() won't work
    const editorRef = shallowRef()

    const containerRef = ref()

    let _subscription: Monaco.IDisposable | undefined
    let __prevent_trigger_change_event = false

    onMounted(() => {
      const editor = (editorRef.value = Monaco.editor.create(
        containerRef.value,
        {
          value: props.code,
          language: 'json',
          formatOnPaste: true,
          tabSize: 2,
          minimap: {
            enabled: false,
          },
        }
      ))

      _subscription = editor.onDidChangeModelContent((event) => {
        if (!__prevent_trigger_change_event) {
          props.onChange(editor.getValue(), event)
        }
      })
    })

    onBeforeUnmount(() => {
      if (_subscription) _subscription.dispose()
    })

    watch(
      () => props.code,
      (v) => {
        const editor = editorRef.value
        const model = editor.getModel()
        if (v !== model.getValue()) {
          editor.pushUndoStop()
          __prevent_trigger_change_event = true
          model.pushEditOperations(
            [],
            [
              {
                range: model.getFullModelRange(),
                text: v,
              },
            ]
          )
          editor.pushUndoStop()
          __prevent_trigger_change_event = false
        }
      }
    )

    return () => (
      <div class={css.container}>
        <div class={css.title}>
          <span>{props.title}</span>
        </div>
        <div class={css.code} ref={containerRef}></div>
      </div>
    )
  },
})
