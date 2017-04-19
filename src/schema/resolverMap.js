/**
 * Created by zhubg on 2017/4/17.
 */

'use strict';

export const resolverMap = {
    GetTokenResult: {
        __resolveType(obj, context, info){
            if(obj.content){
                return 'Message';
            }

            if(obj.token){
                return 'Token';
            }

            return null;
        }
    },
    GetDeviceListResult: {
        __resolveType(obj, context, info){
            if(obj.content){
                return 'Message';
            }

            if(obj.deviceList){
                return 'DeviceList';
            }

            return null;
        }
    }
};