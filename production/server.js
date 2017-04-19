/**
 * Created by zhubg on 2017/4/14.
 */

'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _graphqlServerExpress = require('graphql-server-express');

var _schema = require('./schema/schema');

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// import path from 'path';
// app.use('/download',express.static(path.join(__dirname, '../dist')));

//WsServer
// var WsServer = require('http').createServer(app);
// export const io = require('socket.io')(WsServer);
//
// require('socketio-auth')(io, {
//     authenticate: function (socket, data, callback) {
//         //get credentials sent by the client
//         let params = {};
//         console.log(arguments[1]);
//         if(data.accountName && data.token){
//             params.accountName = data.accountName;
//             return baseDao('user', 'getUserByAccountName', params)
//                 .then(obj=> {
//                     if (obj[0] && (obj[0].token === data.token)) {
//                         console.log("authenticate： " + (obj[0].token === data.token));
//                         socket.join("room1");
//                         return callback(null, true);
//                     } else {
//                         console.log("非法连接，用户名口令不正确");
//                         return callback(new Error("非法连接，用户名口令不正确"));
//                     }
//                 }).catch(function (e) {
//                     console.log(e);
//                     return callback(new Error("数据库连接失败"));
//                 });
//         } else {
//             console.log("非法连接，用户名口令为空");
//             return callback(new Error("非法连接，用户名口令为空"));
//         }
//     }
// });


// io.on('connection', function (socket) {
//     console.log('a user connected');
//     console.log(socket.id);
//     // socket.disconnect();
//     //接受消息
//     socket.on('message', function (msg) {
//         console.log('receive messge : ' + msg);
//     });
//
//     //断开连接回调
//     socket.on('disconnect', function () {
//         console.log('socket disconnect');
//     });
// });

//数据库dao
// import {baseDao} from './dao/base_dao';
var corsOptions = {
    // origin: 'http://192.168.0.104:8989', 
    origin: function origin(_origin, callback) {
        // var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        var originIsWhitelisted = true;
        callback(originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted);
    },
    credentials: true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//test


app.get('/tokentest', function (req, res, next) {
    (0, _nodeFetch2.default)('http://localhost:3000/graphql', {
        method: 'POST',
        body: JSON.stringify({
            "query": 'query {\n                              getToken(id:"1234") {\n                                __typename\n                                ... on Token {\n                                  token\n                                }\n                                ... on Message {\n                                  code\n                                  type\n                                  content\n                                }\n                              }\n                            }'
        }),
        headers: { 'Content-Type': 'application/json' }
    }).then(function (res) {
        return res.json();
    }).then(function (json) {
        console.log(json);
        res.send(json);
    });
});

app.get('/test1', function (req, res, next) {
    var Test_Query = 'query  getDeviceListResultFunc($offset: Int!, $count: Int!) {\n                             getDeviceListResult(offset:$offset,count:$count) {\n                                __typename\n                                ... on Message {\n                                  code\n                                  type\n                                  content\n                                }\n                                ... on DeviceList {\n                                    totalCount\n                                    deviceList {\n                                        id\n                                        title\n                                        role\n                                        department\n                                        content_type\n                                        content_type_name\n                                        username\n                                        password\n                                        description\n                                        brand\n                                        model_number\n                                        cpu\n                                        mem\n                                        disk\n                                        ip\n                                        operate_system\n                                        up_time\n                                        ping_status\n                                        software_list { \n                                            version\n                                            title\n                                        }\n                                        monitors {\n                                            error_limited\n                                            monitor_status\n                                            update_time\n                                            title\n                                            monitor_class\n                                            monitor_value\n                                            alert_limited\n                                        }\n                                    }\n                                    pageInfo {\n                                        endCursor\n                                        hasNextPage\n                                    } \n                                }\n                             }\n                             }';
    (0, _nodeFetch2.default)('http://localhost:3000/graphql', {
        method: 'POST',
        body: JSON.stringify({
            "query": Test_Query,
            "variables": {
                "offset": 0,
                "count": 10
            }
        }),
        headers: { 'Content-Type': 'application/json' }
    }).then(function (res) {
        return res.json();
    }).then(function (json) {
        console.dir(json);
        res.send(json);
    });
});

app.use('/graphql', (0, _cors2.default)(corsOptions), _bodyParser2.default.json(), (0, _graphqlServerExpress.graphqlExpress)({ schema: _schema.schema }));

app.listen(3000, function () {
    console.log('Running a GraphQL API server at localhost:3000/graphql');
});

// WsServer.listen(3001, () => {
//     console.log('Running a WS server at localhost:3001');
// });