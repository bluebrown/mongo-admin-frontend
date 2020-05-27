import './shared/styles/tailwind.css';
import './index.css';

import {fetchLoad} from './shared/ts/fetch';
const parse = require('mongodb-query-parser') as any;


const gb = document.getElementById('gridbutton');
const lb = document.getElementById('listbutton');
const t = document.getElementById('datatable');

lb.onclick = () => {
  lb.classList.add('active');
  gb.classList.remove('active');
  t.classList.remove('gridview');
};

gb.onclick = () => {
  gb.classList.add('active');
  lb.classList.remove('active');
  t.classList.add('gridview');
};

const rowTempl = document.getElementById('rowtemplate') as HTMLTemplateElement;
const content = rowTempl.content;
const dataBody = document.getElementById('databody');

fetchLoad(`printjson({
  versions: db.getSiblingDB('admin').system.version.find({_id: 'featureCompatibilityVersion'}).toArray(),
  databases: db.adminCommand({ listDatabases: 1 }).databases.map(({ name, ...rest }) => ({
    name,
    ...rest,
    collections: db.getSiblingDB(name).getCollectionNames()
  }))
})`).then(({result: {raw}}) => {
  const data = parse(raw);
  const {databases} = data;
  for (const db of databases) {
    console.log(db);
    const clone = content.cloneNode(true) as HTMLElement;
    clone.querySelector('.name').textContent = db.name;
    clone.querySelector('.size').textContent = db.sizeOnDisk + ' bytes';
    clone.querySelector('.collections').textContent = db.collections.length + ' collections';
    // TODO: load async
    const ul = clone.querySelector('ul');
    db.collections.forEach((col: string) => {
      ul.append(Object.assign(document.createElement('li'), {
        className: 'py-1 px-3 cursor-pointer hover:bg-blue-100 hover:text-blue-800',
        textContent: col,
      }));
    });
    dataBody.append(clone);
  }
}).catch(console.warn);
