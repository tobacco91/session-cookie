'use strict';
let redis  = require('redis');
let createRedisClient = function() {
    let _redis = redis.createClient();
    _redis.on('error', function(err) {
        console.log(err);
    });
    return _redis;
}
/**
session = {
    from : user/track
    type : redis,
    key : random,
    value : uerinfo
    time : 
}
*/
let set_session = function(session) {
    session.time = session.time || 1*1000*3600;
    switch (session.type) {
        case 'redis' :
            createRedisClient().hset(session.from, session.key, session.value);
            setTimeout(() => {
                createRedisClient().hdel(session.from, session.key);
            },session.time);
            break;
        case 'file' :
            break;
    }
}
/**
session = {
    from : user/track
    type : redis,
    key : random
}
*/
let get_session = function(session) {
    return new Promise((resolve, reject) => {
        switch (session.type) {
            case 'redis' :
                createRedisClient().hget(session.from, session.key, (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(data);
                        resolve(data);
                    }
                });
                break;
            case 'file' :
                break;
        }
    });
}

//export {set_session,get_session};
exports.set_session = set_session;
exports.get_session = get_session;