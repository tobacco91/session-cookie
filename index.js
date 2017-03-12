'use strict';
let http = require ('http');
//console.log(http);

let get_cookie = require('./lib/cookie.js').get_cookie;
let get_session = require('./lib/session.js').get_session;
let set_cookie = require('./lib/cookie.js').set_cookie;
let set_session = require('./lib/session.js').set_session;
let server = http.createServer(function(req,res) {
		let info = JSON.stringify(get_cookie(req)) == '{}';
        if(1) {
        	let random = Math.random();
        	console.log(random);
            set_cookie(res,'id = '+ random + ';',300000);
            set_session({
                        from  : 'dzx',
                        type  : 'redis',
                        key   : random,
                        value : 'b',
                        time  : 300000
                    });
            console.log(req.headers.cookie)
        } else {
            let cookie = get_cookie(req);
            console.log(cookie);
            get_session({
            	from : 'dzx',
            	type : 'redis',
            	key : cookie.id
            }).then((body) => {
            	console.log(body);
            })
        }
        //res.write('lalla');
        res.end();
});
server.listen(8000)
console.log('success');
