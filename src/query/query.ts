import '../shared/tailwind.css'
import { baseConf } from '../shared/mirror';

const parse = require('mongodb-query-parser')
import CodeMirror from 'codemirror';

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

import '../shared/styles/mirror.css'

const templ = document.getElementById('querytemplate') as HTMLTemplateElement

document.querySelector('main').append(templ.content.cloneNode(true))

const baseURL = 'http://localhost:7020/api/v0/query'

const db = document
  .getElementById('section-query-database') as HTMLInputElement;
const col = document
  .getElementById('section-query-collection') as HTMLInputElement;
const mth = document
  .getElementById('section-query-method') as HTMLInputElement;
const qry = CodeMirror.fromTextArea(document
  .getElementById('section-query-query') as HTMLTextAreaElement, 
  { ...baseConf}
);
const opt = CodeMirror.fromTextArea(
  document.getElementById('section-query-options') as HTMLTextAreaElement,
  { ...baseConf}
);
const run = document
  .getElementById('section-query-run') as HTMLButtonElement;
const res = CodeMirror.fromTextArea(
    document.getElementById('section-query-result') as HTMLTextAreaElement,
    { ...baseConf, readOnly: true }
  )

export const mongoQuery = async () => {
    try {
        const database = db.value;
        const collection = col.value;
        const method = mth.value;
        let query, options
        const qryVal = qry.getValue()
        const optVal = opt.getValue()
        try {
          query = parse(qryVal);
          options = parse(optVal);
        } catch (error) {
            console.log(error.message)  
        }

        const payload = {
            method: method,
            args: query ? options ? [query, options] : [query] : [],
        };

        const url = `${baseURL}${database ? '/' + database : ''}${collection ? '/' + collection : ''}`;
        const bin = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const data = await bin.json()
        console.log(data)
        res.setValue(JSON.stringify(data.result, null, 2));
    } catch (err) {
        alert(err.message);
    }
};

run.onclick = mongoQuery;
qry.setValue(`[
  {
    $lookup: {
      from: 'food',
      localField: 'foodtype',
      foreignField: 'type',
      as: 'food'
    }
  },
  {
    $project: {
      name: true,
      food: '$food.label'
    }
  }
]
`)
run.click();

// opt.setValue(`{
//   projection: {
//     name: true,
//     capacity: true,
//     phone: true
//   }
// }`);

// const parseCustom = (text: string) => text === '' ? false : JSON.parse(
//   text
//       // quote keys
//       .replace(
//           /(\w+:)|(\w+ :)/g,
//           (s) => '"' + s.substring(0, s.length - 1) + '":',
//       )
//       // remove trailing commas
//       .replace(/,\n? *}/gm, '}')
//       // swap quotes
//       .replace(/'/g, '"'),
// );

