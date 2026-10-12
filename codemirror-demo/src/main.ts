import { basicSetup } from 'codemirror'
import { EditorState, Compartment, type Extension } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { javascript } from '@codemirror/lang-javascript'
import { python } from '@codemirror/lang-python'
import { oneDark } from '@codemirror/theme-one-dark'
import './style.css'

type LanguageId = 'javascript' | 'python'

const samples: Record<LanguageId, string> = {
  javascript: `// Welcome to CodeMirror 6
function greet(name) {
  const message = \`Hello, \${name}!\`
  console.log(message)
  return message
}

const users = ['Ada', 'Grace', 'Lin']
users.forEach((user) => greet(user))

export async function fetchStatus(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(\`Request failed: \${response.status}\`)
  }
  return response.json()
}
`,
  python: `# Welcome to CodeMirror 6
from dataclasses import dataclass


@dataclass
class User:
    name: str
    active: bool = True


def greet(user: User) -> str:
    message = f"Hello, {user.name}!"
    print(message)
    return message


users = [User("Ada"), User("Grace"), User("Lin", active=False)]
for user in users:
    if user.active:
        greet(user)
`,
}

const languageSupport: Record<LanguageId, () => Extension> = {
  javascript: () => javascript(),
  python: () => python(),
}

const languageSelect = document.querySelector<HTMLSelectElement>('#language')
const resetButton = document.querySelector<HTMLButtonElement>('#reset')
const editorHost = document.querySelector<HTMLDivElement>('#editor')

if (!languageSelect || !resetButton || !editorHost) {
  throw new Error('Demo markup is missing required elements.')
}

const languageConf = new Compartment()

function createState(language: LanguageId): EditorState {
  return EditorState.create({
    doc: samples[language],
    extensions: [
      basicSetup,
      oneDark,
      languageConf.of(languageSupport[language]()),
      EditorView.lineWrapping,
      EditorView.theme({
        '&': { height: '100%' },
        '.cm-scroller': { overflow: 'auto' },
        '.cm-content': { paddingTop: '12px', paddingBottom: '18px' },
        '.cm-gutters': { borderRight: '1px solid #2e3a48' },
      }),
    ],
  })
}

const view = new EditorView({
  state: createState('javascript'),
  parent: editorHost,
})

languageSelect.addEventListener('change', () => {
  const language = languageSelect.value as LanguageId
  view.setState(createState(language))
})

resetButton.addEventListener('click', () => {
  const language = languageSelect.value as LanguageId
  view.dispatch({
    changes: {
      from: 0,
      to: view.state.doc.length,
      insert: samples[language],
    },
  })
  view.focus()
})

view.focus()
