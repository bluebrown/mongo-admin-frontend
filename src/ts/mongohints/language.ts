import {Hint} from 'codemirror'

export const baseHints: Hint[] = [
    { text: 'db' },
    { text: 'printjson()', displayText: 'printjson' },
];

export const commandHints: Hint[] = [
    { text: 'listDatabases: 1' },
];

export const databaseHints: Hint[] = [
    { text: 'runCommand({})', displayText: 'runCommand' },
    { text: 'adminCommand({})', displayText: 'adminCommand' },
    { text: 'getSiblingDB(\'\')', displayText: 'getSiblingDB' },
    { text: 'getCollectionNames()', displayText: 'getCollectionNames' },
    { text: 'createCollection()', displayText: 'createCollection' },
    { text: 'dropDatabase()', displayText: 'dropDatabase' },
]

export const collectionHints: Hint[] = [
    { text: 'aggregate()', displayText: 'aggreaggregate' },
    { text: 'bulkWrite()', displayText: 'bulkWrite' },
    { text: 'copyTo()', displayText: 'copyTo' },
    { text: 'count()', displayText: 'count' },
    { text: 'countDocuments()', displayText: 'countDocuments' },
    { text: 'estimatedDocumentCount()', displayText: 'estimatedDocumentCount' },
    { text: 'createIndex()', displayText: 'createIndex' },
    { text: 'createIndexes()', displayText: 'createIndexes' },
    { text: 'dataSize()', displayText: 'dataSize' },
    { text: 'deleteOne()', displayText: 'deleteOne' },
    { text: 'deleteMany()', displayText: 'deleteMany' },
    { text: 'distinct()', displayText: 'distinct' },
    { text: 'drop()', displayText: 'drop' },
    { text: 'dropIndex()', displayText: 'dropIndex' },
    { text: 'dropIndexes()', displayText: 'dropIndexes' },
    { text: 'ensureIndex()', displayText: 'ensureIndex' },
    { text: 'explain()', displayText: 'explain' },
    { text: 'find()', displayText: 'find' },
    { text: 'findAndModify()', displayText: 'findAndModify' },
    { text: 'findOne()', displayText: 'findOne' },
    { text: 'findOneAndDelete()', displayText: 'findOneAndDelete' },
    { text: 'findOneAndReplace()', displayText: 'findOneAndReplace' },
    { text: 'findOneAndUpdate()', displayText: 'findOneAndUpdate' },
    { text: 'getIndexes()', displayText: 'getIndexes' },
    { text: 'getShardDistribution()', displayText: 'getShardDistribution' },
    { text: 'getShardVersion()', displayText: 'getShardVersion' },
    { text: 'insert()', displayText: 'insert' },
    { text: 'insertOne()', displayText: 'insertOne' },
    { text: 'insertMany()', displayText: 'insertMany' },
    { text: 'isCapped()', displayText: 'isCapped' },
    { text: 'latencyStats()', displayText: 'latencyStats' },
    { text: 'mapReduce()', displayText: 'mapReduce' },
    { text: 'reIndex()', displayText: 'reIndex' },
    { text: 'remove()', displayText: 'remove' },
    { text: 'renameCollection()', displayText: 'renameCollection' },
    { text: 'replaceOne()', displayText: 'replaceOne' },
    { text: 'save()', displayText: 'save' },
    { text: 'stats()', displayText: 'stats' },
    { text: 'storageSize()', displayText: 'storageSize' },
    { text: 'totalIndexSize()', displayText: 'totalIndexSize' },
    { text: 'totalSize()', displayText: 'totalSize' },
    { text: 'update()', displayText: 'update' },
    { text: 'updateOne()', displayText: 'updateOne' },
    { text: 'updateMany()', displayText: 'updateMany' },
    { text: 'watch()', displayText: 'watch' },
    { text: 'validate()', displayText: 'validate' },
]

export const cursorHints: Hint[] = [
    { text: 'hasNext()', displayText: 'hasNext' },
    { text: 'next()', displayText: 'next' },
    { text: 'forEach()', displayText: 'forEach' },
    { text: 'map()', displayText: 'map' },
    { text: 'toArray()', displayText: 'toArray' },
    { text: 'objsLeftInBatch()', displayText: 'objsLeftInBatch' },
    { text: 'itcount()', displayText: 'itcount' },
    { text: 'pretty()', displayText: 'pretty' },
]

export const logicHints: Hint[] = [
    { text: '$gte' },
    { text: '$gt' },
    { text: '$lte' },
    { text: '$lt' },
    { text: '$eq' },
    { text: '$ne' },
    { text: '$not' },
    { text: '$type' },
    { text: '$size' },
    { text: '$exists' },
    { text: '$in' },
    { text: '$nin' },
    { text: '$all' },
]


export const keywordHints: Hint[] = [
    { text: 'let' },
    { text: 'function myFunction(){\n\t\n}', displayText: 'function' },
]

export const valueHints: Hint[] = [
    { text: 'true' },
    { text: 'false' },
]