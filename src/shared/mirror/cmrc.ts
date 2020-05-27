export const baseConf = {
  theme: 'dracula',
  styleActiveLine: true,
  lineNumbers: true,
  indentWithTabs: false,
  indentUnit: 2,
  smartIndent: true,
  autoCloseBrackets: true,
  matchBrackets: true,
  foldGutter: true,
  foldCode: true,
  gutters: [
    'CodeMirror-linenumbers',
    'CodeMirror-foldgutter',
  ],
  mode: {
    name: 'javascript',
    json: true,
  },
} as CodeMirror.EditorConfiguration;


export const initText = `// edit this script and/or hit run
printjson({
  versions: db.getSiblingDB('admin').system.version.find().toArray(),
  databases: db.adminCommand({ listDatabases: 1 }).databases.map(({ name, ...rest }) => ({
    name,
    ...rest,
    collections: db.getSiblingDB(name).getCollectionNames()
  }))
})
`;
