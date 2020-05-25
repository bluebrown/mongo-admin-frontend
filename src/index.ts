import CodeMirror, {Editor} from 'codemirror';
import { codeCompletion } from './ts/mongohints';
import { baseConf, initText } from './ts/cmrc';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/selection/active-line'
import 'codemirror/theme/dracula.css';
import './styles/index.css';
import './ts/shell'
import './ts/query'

const resultArea = document.getElementById('result') as HTMLTextAreaElement | undefined;
const result = CodeMirror.fromTextArea(resultArea, { ...baseConf, readOnly: true });

const textArea = document.getElementById('editor') as HTMLTextAreaElement | undefined;
const editor = CodeMirror.fromTextArea(textArea, {
  ...baseConf,
  extraKeys: {
    'Ctrl-Space': codeCompletion,
  },
});

editor.getDoc().setValue(initText);

const queryButton = document.getElementById('query');
queryButton.onclick = async () => {
  try {
    const res = await fetch('http://localhost:7020/api/v0/load', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: Buffer.from(editor.getDoc().getValue()),
    })

    const results = await res.json()

    result.getDoc().setValue(
      results.error || results.result?.raw ||
      JSON.stringify(results.result, null, 4).replace(/":/g, '" :'),
    );
  } catch (err) {
    console.warn(err)
  }
};

queryButton.click();

