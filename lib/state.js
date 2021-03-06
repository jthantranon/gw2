/**
 * Created by john.thantranon on 3/18/2016.
 */

var Helpers = require('./helpers').getInstance();
// var Maps =    require('./maps'   ).getInstance();
module.exports = (function () {
    var instance;
    function init() {
        return {
            public: {
                meta: {
                    package: Helpers.tools.getFile('package','./'),
                    node: {
                        versions: process.versions
                    },
                    eden: {
                        uptime: Date.now()
                    },
                    test: {

                    }
                }
            },
            private: {
                // custom: Helpers.tools.getFile('custom'),
                items: {},
                fbinit: Helpers.tools.getFile('edenoverwatch-43b4eeff33a6')
            },
            tools: Helpers.tools,
            modStatus: {},
            mods: {},
            fullUpdate: () => {
                if(this.mods && this.mods.socks) State.mods.socks.fullStateUpdate();
            }
        };
    }

    return {
        getInstance: function () {
            if ( !instance ) { instance = init(); }
            return instance;
        }
    };
})();