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
            // console.log(b);
            var isLastItems = Object.keys(chunkArrayItemsComplete).length === chunkArray.length;
            var isLastPrice = Object.keys(chunkArrayPriceComplete).length === chunkArray.length;
            // var isLast = isLastItems && isLastPrice;
            if(isLastItems && isLastPrice){
                console.log(isLastItems,isLastPrice,Object.keys(State.private.items).length);
                // setTimeout(()=>{
                //     console.log('timeout',Object.keys(State.private.items).length);
                // },2000)
            } else {
                console.log(Object.keys(chunkArrayItemsComplete).length,Object.keys(chunkArrayPriceComplete).length);
                setTimeout(()=>{
                    onLast()
                },1000)
            }
        }


        getSimple('https://api.guildwars2.com/v2/items?ids=' + group,(itemArray,a)=>{
            // console.log(priceArray);
            for(var n in itemArray){
                var item = itemArray[n];
                State.private.items[item.id] = State.private.items[item.id] || {};
                State.private.items[item.id].item = item;
            }
            // console.log(a);
            // gotItem = true;
            chunkArrayItemsComplete[a] = true;
            // onLast();


        },a);
        getSimple('https://api.guildwars2.com/v2/commerce/prices?ids=' + group,(priceArray,a)=>{
            // console.log(priceArray);
            for(var n in priceArray){
                var price = priceArray[n];
                State.private.items[price.id] = State.private.items[price.id] || {};
                State.private.items[price.id].price = price;
            }
            // gotPrice = true;
            chunkArrayPriceComplete[a] = true;
            // console.log('wee',a,chunkArray.length);
            if(a == chunkArray.length-1) onLast();

            // console.log(Object.keys(State.private.items).length);

            // fs.writeFileSync('./state.json', JSON.stringify(State, null, 2), 'utf-8');

            // State.fullUpdate();

        },a);
        // console.log(a,chunkArray.length-1);
        // console.log(a==chunkArray.length-1);
        // if(a == chunkArray.length-1){ // can't be '===' without converting a into an integer i think
        //     console.log('end');
        // }
    }

    State.private.rawItemNumbers = items;
    State.private.chunkedItemNumbers = chunkArray;
    State.private.itemGroups = itemGroups;

    var ii = 0;

    function loopDat(){
        var itemID = items[ii];
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
});