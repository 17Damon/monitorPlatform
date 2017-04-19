/**
 * Created by zhubg on 2017/3/6.
 */

'use strict';

import {makeExecutableSchema,addResolveFunctionsToSchema} from 'graphql-tools';
import {typeDefs} from './typeDefs';
import {resolvers} from './resolvers';
import {resolverMap} from './resolverMap';

// import {io} from './server';
// import moment from 'moment';

// Use graphql-tools to make a GraphQL.js schema
export const schema = makeExecutableSchema({typeDefs, resolvers});

//增加接口和联合类型resolverMap
addResolveFunctionsToSchema(schema, resolverMap);