export const queries = {
  databases() {
    return `printjson(db.adminCommand({ listDatabases: 1 }).databases.map(({ name, sizeOnDisk }) => ({
      name: name, 
      size: sizeOnDisk,
      collections: db.getSiblingDB(name).getCollectionNames()
    })))
  `;
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
    }))`;
  },
};

export default queries;
