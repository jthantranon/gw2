var https = require('https');
var State   = require('../lib/state').getInstance();

function getSimple(url,callback,a){
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
                callback(dat,a);
            },1);
            return dat;
        });
    }).on('error', function(e){
        console.log("Got an error: ", e);
    });
}

var items = getSimple('https://api.guildwars2.com/v2/commerce/prices',(items) => {
    console.log(items.length);
    var i,j,temparray,chunk = 199, chunkArray = [], itemGroups = [];

    var chunkArrayItemsComplete = {};
    var chunkArrayPriceComplete = {};

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
        itemGroups.push(itemGroup);
    }
    console.log(itemGroups.length);
    for(var a in itemGroups){
        //     var group = itemGroups[0];
        var group = itemGroups[a];

        function onLast(){
            var isLastItems = Object.keys(chunkArrayItemsComplete).length === chunkArray.length;
            var isLastPrice = Object.keys(chunkArrayPriceComplete).length === chunkArray.length;
            if(isLastItems && isLastPrice){
                console.log('All Data recieved:',Object.keys(State.private.items).length);
            } else {
                console.log(Object.keys(chunkArrayItemsComplete).length,Object.keys(chunkArrayPriceComplete).length);
                setTimeout(()=>{
                    onLast()
                },250)
            }
        }


        getSimple('https://api.guildwars2.com/v2/items?ids=' + group,(itemArray,a)=>{
            for(var n in itemArray){
                var item = itemArray[n];
                State.private.items[item.id] = State.private.items[item.id] || {};
                State.private.items[item.id].item = item;
            }
            chunkArrayItemsComplete[a] = true;
        },a);
        getSimple('https://api.guildwars2.com/v2/commerce/prices?ids=' + group,(priceArray,a)=>{
            for(var n in priceArray){
                var price = priceArray[n];
                State.private.items[price.id] = State.private.items[price.id] || {};
                State.private.items[price.id].price = price;
            }
            chunkArrayPriceComplete[a] = true;
            if(a == chunkArray.length-1) onLast();
        },a);
    }

    State.private.rawItemNumbers = items;
    State.private.chunkedItemNumbers = chunkArray;
    State.private.itemGroups = itemGroups;
});