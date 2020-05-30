import './shared/styles/tailwind.css';
import './index.css';

// import 'alpinejs'
import Vue from 'vue'

import { fetchLoad } from './shared/ts/fetch';
const parse = require('mongodb-query-parser') as any;

const queries = {
  databases() {
    return `printjson(db.adminCommand({ listDatabases: 1 }).databases.map(({ name, sizeOnDisk }) => ({
      name: name, 
      size: sizeOnDisk,
      collections: db.getSiblingDB(name).getCollectionNames()
    })))
  `
  },
  collections(dbname: string) {
    return `db = db.getSiblingDB('${dbname}')
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
    }))`
  }
}

var app = new Vue({
  el: '#app',
  data: {
    gridview: true,
    breadcrumbs: [],
    headers: [
      'Name',
      'Size',
      'Collections',
    ],
    items: [],
    versions: [],
    currentDb: null,
  },
  mounted() {
    this.baseView()
  },
  methods: {
    baseView() {
      fetchLoad(queries.databases())
      .then(({ result: { raw } }) => {
        this.items = parse(raw);
        this.breadcrumbs = []
      }).catch(console.log)
    },
    databaseView(dbname: string) {
      fetchLoad(queries.collections(dbname))
      .then(({ result: { raw } }) => {
        this.breadcrumbs[0] = `Collections (${dbname})`
        this.items = parse(raw);
        this.headers[2] = 'Documents'
      }).catch(console.log)
    },
    itemClick(item: any) {
      this.currentDb = item.name
      this.databaseView(this.currentDb)
    },
  }
})

// const gb = document.getElementById('gridbutton');
// const lb = document.getElementById('listbutton');
// const t = document.getElementById('datatable');
// const crudT = document.getElementById('crudtemplate') as HTMLTemplateElement;
// const caption = document.getElementById('caption');

// lb.onclick = () => {
//   lb.classList.add('active');
//   gb.classList.remove('active');
//   t.classList.remove('gridview');
// };

// gb.onclick = () => {
//   gb.classList.add('active');
//   lb.classList.remove('active');
//   t.classList.add('gridview');
// };

// const rowTempl = document.getElementById('rowtemplate') as HTMLTemplateElement;
// const content = rowTempl.content;
// const dataBody = document.getElementById('databody');





// // three level view
// // databaselist / single databases collectionlist / single collections document crud

// const collectionCrud = (name: string) => {
//   t.parentElement.replaceChild(crudT.content.cloneNode(true), t)
// }

// // ist all databases
// const allStats = () => {
//   fetchLoad(queries.databases())
//     .then(({ result: { raw } }) => {
//       const data = parse(raw);
//       const { databases } = data;
//       document.getElementById('databody').innerHTML = ''
//       for (const db of databases) {
//         console.log(db);
//         const clone = content.cloneNode(true) as HTMLElement;
//         clone.querySelector('.name').textContent = db.name;
//         clone.querySelector('.size').textContent = db.sizeOnDisk + ' bytes';
//         clone.querySelector('.collections').textContent = db.collections.length + ' collections';
//         // TODO: load async
//         const ul = clone.querySelector('ul');
//         db.collections.forEach((col: string) => {
//           ul.append(Object.assign(document.createElement('li'), {
//             className: 'py-1 px-3 cursor-pointer hover:bg-blue-100 hover:text-blue-800',
//             textContent: col,
//           }));
//         });
//         dataBody.append(clone);

//         dataBody.onclick = ((event) => {
//           if (!event.target) return
//           let target = event.target as HTMLElement
//           if (target.classList.contains('name')) {
//             dbStats(target.textContent);
//           }
//         })

//       }
//     }).catch(console.warn);
// }

// // list all collection of given db
// const dbStats = (dbname: string) => {

//   fetchLoad(queries.collections(dbname)).then(({ result: { raw } }) => {
//     const collections = parse(raw);
//     document.getElementById('databody').innerHTML = ''
//     for (const c of collections) {
//       console.log(c);
//       const clone = content.cloneNode(true) as HTMLElement;
//       Object.assign(clone.querySelector('.name')).textContent = c.name;
//       Object.assign(clone.querySelector('.name')).classList.add = 'db';
//       clone.querySelector('.size').textContent = c.size + ' bytes';
//       clone.querySelector('.collections').textContent = c.documents + ' documents';
//       dataBody.append(clone);

//       dataBody.onclick = ((event) => {
//         if (!event.target) return
//         let target = event.target as HTMLElement
//         if (target.classList.contains('name')) {
//           collectionCrud(target.textContent);
//           dataBody.innerHTML = ''
//         }
//       })

//     }
//   }).catch(console.warn);
// }

// caption.onclick = () => {
//   console.log(t.parentElement)
//   const ca = document.getElementById('crudarea')
//   if (ca) ca.parentElement.replaceChild(t, ca)
//   allStats()
// }


// // allStats()

// interface IPageState {
//   gridview: boolean,
//   items: any[]
// };


// (window as any).state = function() {
//   return {
//     gridview: true,
//     items: [],
//   } as IPageState
// };

// (window as any).init = function() {
//   items = ['a', 'b', 'c']
// }
