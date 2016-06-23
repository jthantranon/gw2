/**
 * Created by john.thantranon on 3/18/2016.
 */
var MOD_NAME;
var TestMode;
setTimeout(() => {
    if(!MOD_NAME){
        TestMode = true; console.log('running as test module');
        require('../lib/loader').getInstance('',true);
    }
},300);

var State   = require('./state').getInstance();
var Helpers = require('./helpers').getInstance();
var fs = require('fs');

module.exports = (function () {
    var instance;
    function init(modName) {
        State.modStatus[modName] = true;
        var api = {
            // createCompound: createCompound
            /// end of API
        };

        var https = require('https');
// var State = require('./state.js').getInstance();

        function getSimple(url,callback){
            https.get(url, function(res){
                var body = '';
                res.on('data', function(chunk){
                    body += chunk;
                });
                res.on('end', function(){
                    var dat;
                    try {
                        dat = JSON.parse(body);
                    } catch (err){}
                    setTimeout(() => {
                        callback(dat);
                    },1);
                    return dat;
                });
            }).on('error', function(e){
                console.log("Got an error: ", e);
            });
        }

        var items = getSimple('https://api.guildwars2.com/v2/commerce/prices',(items) => {
            // State.private.itemNumbers = items;

            // var splitItems = [], size = 200;
            //
            // while (items.length > 0)
            //     splitItems.push(items.splice(0, size));
            //
            // console.log(splitItems);

            var i,j,temparray,chunk = 199, chunkArray = [], itemGroups = [];
            for (i=0,j=items.length; i<j; i+=chunk) {
                temparray = items.slice(i,i+chunk);
                chunkArray.push(temparray);
                // do whatever
            }


            for(var k in chunkArray){
                var itemGroup = '';
                for(var l in chunkArray[k]){
                    var item = chunkArray[k][l];
                    itemGroup += (item + ',');
                }
                // console.log(url);
                itemGroups.push(itemGroup);
            }
            // console.log(itemGroups);

            // console.log(priceUrls);
            // for(var m in priceUrls){
            //     getSimple(priceUrls[m],(price)=>{
            //         State.private.items[price.id] = price;
            //     });
            // }

            for(var a in itemGroups){
            //     var group = itemGroups[0];
                var group = itemGroups[a];
                getSimple('https://api.guildwars2.com/v2/items?ids=' + group,(itemArray)=>{
                    // console.log(priceArray);
                    for(var n in itemArray){
                        var item = itemArray[n];
                        State.private.items[item.id] = State.private.items[item.id] || {};
                        State.private.items[item.id].item = item;
                    }


                });
                getSimple('https://api.guildwars2.com/v2/commerce/prices?ids=' + group,(priceArray)=>{
                    // console.log(priceArray);
                    for(var n in priceArray){
                        var price = priceArray[n];
                        State.private.items[price.id] = State.private.items[price.id] || {};
                        State.private.items[price.id].price = price;
                    }

                    State.fullUpdate();

                });
            }

            State.private.rawItemNumbers = items;
            State.private.chunkedItemNumbers = chunkArray;
            State.private.itemGroups = itemGroups;




            // return dat;
            // console.log(dat);
            var ii = 0;

            function loopDat(){
                var itemID = items[ii];
                // console.log(dat[ii]);
                ii++;
                getSimple('https://api.guildwars2.com/v2/items/'+itemID,(dat) => {
                    // console.log(,itemID);
                    // getSimple('https://api.guildwars2.com/v2/commerce/prices/'+itemID,(price) => {
                    //     var sellMinusBuy = price.sells.unit_price-price.buys.unit_price;
                    //     var listFee = price.sells.unit_price * .05;
                    //     var sellFee = price.sells.unit_price * .10;
                    //     var resellProfitWithTax = sellMinusBuy - listFee - sellFee;
                    //     console.log(itemID,dat.name,price.buys,price.sells,parseInt(resellProfitWithTax).toFixed(2));
                    //     State.private.items[itemID] = {
                    //         name: dat.name,
                    //         prices: price
                    //     }
                    //
                    // });

                });
                setTimeout(loopDat,25);
            }

            // loopDat();

            // for(var i in dat){
            //     var itemID = dat[i];
            //     console.log(itemID);
            // }
        });

        function tests(){
            console.log('===================================================');
            console.log('   START TEST');
            console.log('==================================================');

            console.log('wee');
            // loopDat();

            console.log('===================================================');
            console.log('   END TEST');
            console.log('===================================================');
        }

        if(TestMode) setTimeout(tests,750);

        return {
            api: api
        };
    }

    return {
        getInstance: function (modName) {
            MOD_NAME = modName || false;
            if ( !instance ) { instance = init(modName); }
            return instance;
        }
    };
})();