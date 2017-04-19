//
// 'use strict';
//
// const MNS = require('aliyun-mns');
// const mns = new MNS({
//     accessKeyId: 'LTAIJZ7C6LtTAcVY',
//     secretAccessKey: '2dDkdCJeigK0c9xGybrePzOBb0mymc',
//     endpoint: 'https://1514525356599872.mns.cn-beijing.aliyuncs.com/',
//     apiVersion: '2015-06-06' // 调用MNS接口的版本号，当前版本为2015-06-06
// });
//
//
// // <Cloud>
// //     <Endpoint>https://1514525356599872.mns.cn-beijing.aliyuncs.com/</Endpoint>
// //     <AccessKeySecret>2dDkdCJeigK0c9xGybrePzOBb0mymc</AccessKeySecret>
// //     <AccessKey>LTAIJZ7C6LtTAcVY</AccessKey>
// //     <Queue_Name>toll-open</Queue_Name>
// //     <DecryptKey>LTAIJZ7C6LtTAcVY</DecryptKey>
// // </Cloud>
//
//
//
//
//
//
// const queue = mns.queue('xjsf');
//
// queue.get()
//     .then(res => console.log('promise:', res))
//     .catch(err => console.error('promise:', err));
//
//
// // const headers = {
// //     'x-mns-ret-number': 2,
// //     'x-mns-prefix': 'xjsf'
// // };
// //
// // queue.list(headers)
// //     .then(res => {
// //         console.log('promise:', res);
// //         const nextMarker = res.nextMarker;
// //         if (nextMarker) {
// //             headers['x-mns-marker'] = nextMarker;
// //             queue.list(headers)
// //                 .then(res => console.log('promise2:', res))
// //                 .catch(err => console.error('promise2:', err))
// //         }
// //     })
// //     .catch(err => console.error('promise:', err));


// 'use strict';
// var moment = require('moment');
// console.log(moment('2017-03-18 15:44:54').format('YYYY-MM-DD HH:mm:ss'));
// console.log(moment().set('minute',20).format('YYYY-MM-DD HH:mm:ss'));
// console.log(moment('2017-03-18 15:44:54')-moment('2017-03-18 15:44:58'));
// let now = moment();
// let start = moment(now).subtract(3, 'm');
// let end = now;
// console.log(now.format('YYYY-MM-DD HH:mm:ss'));
// console.log(start.format('YYYY-MM-DD HH:mm:ss'));
// console.log(end.format('YYYY-MM-DD HH:mm:ss'));
// console.log(end-start);
// console.log(typeof now);
// console.log(moment('2017-03-18 15:44:54').isBetween())
// console.log(moment('2017-03-18 15:45:51')-moment('2017-03-18 15:40:51')===5*60*1000);

//814861
//814850
// let time1 = moment('2017-03-28 19:00');
// let addNum = Math.floor((now - time1) / (5 * 60 * 1000));
// console.log(814850 + addNum);
// console.log(moment(time1+5*60*1000).format('YYYY-MM-DD HH:mm:ss'));
// console.log(Math.floor(5.9));


// var utf8 = require('utf8');
var cron = require('node-cron');
var AliMNS = require("ali-mns");
var account = new AliMNS.Account("1514525356599872", "LTAIJZ7C6LtTAcVY", "2dDkdCJeigK0c9xGybrePzOBb0mymc");
var mq = new AliMNS.MQ("xjsf", account, "beijing");
var mqBatch = new AliMNS.MQBatch("xjsf", account, "beijing");



mq.recvP(5).then(function(data){
    console.log(data.Message.MessageBody);
    // console.log(utf8.decode(data.Message.MessageBody));
    return mq.deleteP(data.Message.ReceiptHandle);
}).then(function(data){
    console.log(data);
}).catch(err=>{
    console.log(err);
});




// console.log(utf8.decode(utf8.encode('你好')));
// → '\uD800\uDC01'


// cron.schedule('*/2 * * * * *', function () {
//     var rhsToDel = [];
//
//     mqBatch.recvP(5, 16).then(function (dataRecv) {
//         for (var i = 0; i < dataRecv.Messages.Message.length; i++) {
//             console.log(dataRecv.Messages.Message[i].MessageBody);
//             rhsToDel.push(dataRecv.Messages.Message[i].ReceiptHandle);
//         }
//     }).then(function () {
//         return mqBatch.deleteP(rhsToDel);
//     }).then(function (data) {
//         console.log(data);
//     }).catch(err=> {
//         console.log(err);
//     });
// });