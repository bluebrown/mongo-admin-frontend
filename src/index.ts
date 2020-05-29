import './shared/styles/tailwind.css';
import './index.css';

import { fetchLoad } from './shared/ts/fetch';
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

// three level view
// databaselist / single databases collectionlist / single collections document crud


// ist all databases
const allStats = () => {
  fetchLoad(`printjson({
  versions: db.getSiblingDB('admin').system.version.find({_id: 'featureCompatibilityVersion'}).toArray(),
  databases: db.adminCommand({ listDatabases: 1 }).databases.map(({ name, ...rest }) => ({
    name,
    ...rest,
    collections: db.getSiblingDB(name).getCollectionNames()
  }))
})`).then(({ result: { raw } }) => {
    const data = parse(raw);
    const { databases } = data;
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
}

// list all collection of given db
const dbStats = (dbname: string) => {

  fetchLoad(`db = db.getSiblingDB('${dbname}')
  let colls = db.getCollectionNames()
  printjson(colls.map((cname) => {
    let c = db[cname]
    return {
      name: cname,
      size: c.storageSize(),
      documents: c.countDocuments({}),
      keys: c.aggregate([
        { "$project": { "arrayofkeyvalue": { "$objectToArray":"$$ROOT" }}},
        { "$unwind": "$arrayofkeyvalue" },
        { "$group": { "_id": null, "allkeys": { "$addToSet": "$arrayofkeyvalue.k" }}}
      ]).toArray()[0].allkeys,
    }
  }))`).then(({ result: { raw } }) => {
    const collections = parse(raw);
    for (const c of collections) {
      console.log(c);
      const clone = content.cloneNode(true) as HTMLElement;
      clone.querySelector('.name').textContent = c.name;
      clone.querySelector('.size').textContent = c.size + ' bytes';
      clone.querySelector('.collections').textContent = c.documents + ' documents';
      dataBody.append(clone);
    }
  }).catch(console.warn);

}

dataBody.onclick = ((event) => {
  if (!event.target) return
  let target = event.target as HTMLElement
  if (target.classList.contains('name')) {
    dataBody.innerHTML = '';
    dbStats(target.textContent);
  }
})



allStats()