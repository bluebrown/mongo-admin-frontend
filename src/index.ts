import 'alpinejs';

import CodeMirror from 'codemirror';
import {baseConf} from './shared/mirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/selection/active-line';
import 'codemirror/theme/dracula.css';

import './shared/styles/tailwind.css';
import './index.css';

import {fetchLoad} from './shared/ts/fetch';
import queries from './shared/ts/dataqueries';
import {connector} from './shared/ts/apiconnection';

const parse = require('mongodb-query-parser') as any;
const {post} = connector();

// eslint-disable-next-line no-unused-vars
const app = () => ({
  gridview: true,
  headers: ['Name', 'Size', 'Collections'],
  items: [] as any[],
  versions: [] as any[],
  currentDb: null as string | null,
  currentCollection: null as string | null,
  collectionData: [] as any[],
  editor: null as CodeMirror.Editor | null,

  mounted() {
    this.baseView();
    this.editor = CodeMirror.fromTextArea(
      document.getElementById('documents') as HTMLTextAreaElement,
      {...baseConf, readOnly: true},
    );
  },

  baseView() {
    fetchLoad(queries.databases())
      .then(({result: {raw}}) => {
        this.items = parse(raw);
        this.headers[2] = 'Collections';
        this.currentDb = null;
        this.currentCollection = null;
      }).catch(console.log);
  },

  databaseView(dbname: string) {
    fetchLoad(queries.collections(dbname))
      .then(({result: {raw}}) => {
        this.items = parse(raw);
        this.currentCollection = null;
        this.currentDb = dbname;
        this.headers[2] = 'Documents';
      }).catch(console.log);
  },

  collectionView(dbName: string, collectionName: string) {
    post(`/${dbName}/${collectionName}`, {
      method: 'find',
      args: [],
    }).then((json) => {
      this.currentDb = dbName;
      this.currentCollection = collectionName;
      this.collectionData = json.result;
      setTimeout(() => {
        this.editor.setValue(JSON.stringify(this.collectionData, null, 2));
        this.editor.refreshCodeView();
      }, 0);
    }).catch(console.log);
  },

  itemClick(item: any) {
    console.log(item.name);
    if (this.currentDb && !this.currentCollection) {
      return this.collectionView(this.currentDb, item.name);
    }
    this.databaseView(item.name);
  },
});


(window as any).app = app;
