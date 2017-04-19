/**
 * Created by zhubg on 2017/3/6.
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = undefined;

var _graphqlTools = require('graphql-tools');

var _typeDefs = require('./typeDefs');

var _resolvers = require('./resolvers');

var _resolverMap = require('./resolverMap');

// import {io} from './server';
// import moment from 'moment';

// Use graphql-tools to make a GraphQL.js schema
var schema = exports.schema = (0, _graphqlTools.makeExecutableSchema)({ typeDefs: _typeDefs.typeDefs, resolvers: _resolvers.resolvers });

//增加接口和联合类型resolverMap
(0, _graphqlTools.addResolveFunctionsToSchema)(schema, _resolverMap.resolverMap);