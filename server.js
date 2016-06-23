var Common = require('./public/js/common').getInstance();
    var dedent = Common.dedent;
var Data = require('./public/js/data');
var State = require('./lib/state').getInstance();

var Loader = require('./lib/loader').getInstance(launchReadout);

function launchReadout(){
    console.log(dedent`.
        . ${Data.breaker.equal}
        .   ${State.public.meta.package.name} Server v${State.public.meta.package.version}
        .   Created & Maintained By: John.Thantranon
        .   Running on NodeJS ${process.version}
        . ${Data.breaker.equal}
        . 
        .   "Hello, Dave. You're looking well today..."
        . 
        . ${Data.breaker.equal}
            Initializing Module Loader. Standby...
        . ${Data.breaker.equal}
    `);
    // State.mods = Loader.mods;
    start();
}

function start(){
    setTimeout(() => {
        State.mods.socks.emit('FullState',State);
    },1000);
}



