import './shared/styles/tailwind.css';
import './index.css';
import queries from './shared/ts/dataqueries';

// import 'alpinejs';
import Vue from 'vue';

import {fetchLoad} from './shared/ts/fetch';
const parse = require('mongodb-query-parser') as any;

// eslint-disable-next-line no-unused-vars
const app = new Vue({
  el: '#app',
  data: {
    gridview: true,
    breadcrumbs: [],
    headers: ['Name', 'Size', 'Collections'],
    items: [],
    versions: [],
    currentDb: null,
    currentCollection: null,
  },
  mounted() {
    this.baseView();
  },
  methods: {
    baseView() {
      this.breadcrumbs = [];
      this.headers[2] = 'Collections';
      this.currentDb = null;
      this.currentCollection = null;
      fetchLoad(queries.databases())
          .then(({result: {raw}}) => {
            this.items = parse(raw);
          }).catch(console.log);
    },
    databaseView(dbname: string) {
      fetchLoad(queries.collections(dbname))
          .then(({result: {raw}}) => {
            this.items = parse(raw);
            this.headers[2] = 'Documents';
          }).catch(console.log);
    },
    itemClick(item: any) {
      if (this.currentDb) {
        this.breadcrumbs.push(`Documents (${item.name})`);
        this.currentCollection = item.name;
        // render crud view
        return;
      }
      this.breadcrumbs.push(`Collections (${item.name})`);
      this.currentDb = item.name;
      this.databaseView(this.currentDb);
    },
  },
});

// interface AlpineApp {
//   gridview: boolean,
//   breadcrumbs: string[]
//   headers: string[]
//   items: object[],
//   versions: object[],
//   currentDb?: string,
//   currentCollection?: string,
// };


// (window as any).state = function() {
//   return {
//     gridview: true,
//     breadcrumbs: [],
//     headers: ['Name', 'Size', 'Collections'],
//     items: [],
//     versions: [],
//     currentDb: null,
//     currentCollection: null,
//     init() {
//       this.baseView();
//     },
//     baseView() {
//       this.breadcrumbs = [];
//       this.headers[2] = 'Collections';
//       this.currentDb = null;
//       this.currentCollection = null;
//       fetchLoad(queries.databases())
//           .then(({result: {raw}}) => {
//             this.items = parse(raw);
//           }).catch(console.log);
//     },
//     databaseView(dbname: string) {
//       fetchLoad(queries.collections(dbname))
//           .then(({result: {raw}}) => {
//             this.items = parse(raw);
//             this.headers[2] = 'Documents';
//           }).catch(console.log);
//     },
//     itemClick(item: any) {
//       if (this.currentDb) {
//         this.breadcrumbs.push(`Documents (${item.name})`);
//         this.currentCollection = item.name;
//         // render crud view
//         return;
//       }
//       this.breadcrumbs.push(`Collections (${item.name})`);
//       this.currentDb = item.name;
//       this.databaseView(this.currentDb);
//     },
//   } as AlpineApp;
// };
