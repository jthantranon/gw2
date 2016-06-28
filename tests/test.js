var firebase = require('firebase');

var config = {
    serviceAccount: {
        "type": "service_account",
        "project_id": "edengw2-7b2b8",
        "private_key_id": "7d5acdb939cbcf0e19f8ee5136810a73b0ba1fd9",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDYlVpemC5iepHe\nKVt408K5UtKlxt3OgBQ8GAvu9QW+tv9T70zyfdKupM40V2GsN6JmFx48Eafpi4mB\neqsZBmBZ4Vfz95gV54sW8h/6yytQoHGkW2gEZ/j3zh/IUMfRzxVrhSeffVLJpuKp\nZDUQ+MJSb5ed2PsIWndjTitOUaGTPajTOCfiQfTCsLqZRPSQ/xAFLc0DUuWMjuvx\nRNB4j0OR+zMmgujlA4sZEsD7JTfrCsDiX2bI7eDnnsBLNx0xNmAMIcLftSYofZn5\nQEIF+Zm9/3syImdqyqNJ//mfgfkXTmDelad3dS3+SsKm9+Psb4VyqHw+42RHj8Yw\nu64YP/YJAgMBAAECggEBAICCLfrOxUb9fyuY0oOg8ntP31kp5FYwvNDjW8FPdTcy\nEdHVvYxsh+PEOe3oozWyVRPKR9BQkZcLim1fQcI5fFYYVT2W/ZCRsH/O7pa6klrm\nuEdTTSbAIoO2tDkBZW7iNs1zVo1VqRepg/gKU0pcr8CGIiowotLUCt7LdPqliP95\nkRESingd65ieROApmcKZLv6481xLo5y0UKrTEjAzrohYSGd4bL4xxMFF0n8eLYR5\n6HthaEJbL6A4qfdIgGdhi5WQsFDPD77Seo0yUc4tjtf0u2HQUszEYafxH4v2VOET\naETGxshJmGRk3kThsbp5lBndkM/qL234cEcziKgKQAECgYEA7MK1xdIpi+F3lU5p\nL9kPGvQD63oyNP8l+S26twCx0EjKyplVOEgSqaH5FIRwcZRXdB8+ucBIqX5yxcSR\noT0B87EYJ103LeaLACAfuA/vt4MM+CgsbgzXhqYTTXQKpjmGN0JCNN0+pAaRMuY4\nzB44771LRfIVcJU2kA0Z1s7afAECgYEA6i7mjure3CaPVpKPpvyfK00gBMLzAHjR\nVoU1xfhH2HVlwUHR7ggWjrtnwPHjqDw9NvMe93QW2Fno4UJp3hKo4FVtPZhTmH88\ntQ18PQL8VBX6YHJIUIX397SkHUBZaqY3cEZrafihABYNd++ewGdmKlnU2nc782fu\nY3K5ysf5mgkCgYAUFSQEBqKdid9x27fSZjAA0kfu1muh0S6wZy+aTEXI7BO/gagX\n4Q0sNGADXISJLdMJN4lDikrfjalAmz7bFWiv+gqZdC+1BgQuW4s1OqzTvRsBha7X\nGuHBOx8SB9DLbr+yuj0RbN7eXOw+DAcvUTT1KPJUmYc2CIIbT/EsJlmkAQKBgQCj\nw6SLsQekIHsAaYF3nxWX7FlFuya/371UqdcO2C812fMMkIDD2ngb3EYUEZPIZEfS\nk3XGSjJnnYhTbmQmXhomttarykg7Tk8ftYx6Bgp6qtvqckDLvsPHP1W89vEQuafv\nJe+brbi5HLLSeokjt6skVqmZFOShtL5qYSI4Alw0MQKBgQDmDqwwe+IKTKJxWybn\nAfEvqx4n0TbBeIuK1Xo4fSQAKpb2yBZRCQWc+YJEARR65cxNynrVpssaoiU8aQ8z\n02TcfjV9l1NAwv5KiM33xrMADVDuzFMxsB0GIPT5n4ildluZdGGGOqcf94yzOLF6\ni5PipllzlufNQlQTkIm4ReiPqA==\n-----END PRIVATE KEY-----\n",
        "client_email": "egw2server@edengw2-7b2b8.iam.gserviceaccount.com",
        "client_id": "107846159801861697347",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/egw2server%40edengw2-7b2b8.iam.gserviceaccount.com"
    },
    databaseURL: "https://edengw2-7b2b8.firebaseio.com",
};
firebase.initializeApp(config);

var db = firebase.database();
var ref = db.ref("/items");
// ref.orderByKey().startAt('63850').limitToFirst(5).on('value',(data)=>{
// ref.orderByKey().startAt("69").endAt("74").on('value',(data)=>{
// ref.limitToFirst(10).on('value',(data)=>{
// ref.limitToLast(10).on('value',(data)=>{
ref.on('value',(data)=>{
    var dat = data.val();
    // console.log(dat);
    console.log(Object.keys(dat).length);
    // console.log(dat['78780']);
});

var ref2 = db.ref("/items");
// ref2.on('value',(data)=>{
//    var dat = data.val();
//     console.log('ref2');
// });

// ref2.set('');

ref2.on('child_added',(data)=>{
    var dat = data.val();
    console.log(dat.item.id, dat.item.name);
});


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
                // for(var itemNumber in State.private.items){
                //     var item = State.private.items[itemNumber];
                //     console.log(itemNumber);
                //     ref2.child(itemNumber).set(item);
                // }
                State.private.itemsArray = [];
                for(var itemNumber in State.private.items){
                    var item = State.private.items[itemNumber];
                    State.private.itemsArray.push(item);
                    // console.log(itemNumber);
                    // ref2.child(itemNumber).set(item);
                }
                console.log('iarray',State.private.itemsArray.length);
                var iii = 0;
                function writeLoop(){
                    if(State.private.itemsArray[iii] && State.private.itemsArray[iii].item) ref2.child(State.private.itemsArray[iii].item.id).set(State.private.itemsArray[iii]);
                    iii++;
                    setTimeout(writeLoop,3);
                }
                writeLoop();

            } else {
                console.log(Object.keys(chunkArrayItemsComplete).length,Object.keys(chunkArrayPriceComplete).length);
                setTimeout(()=>{
                    onLast()
                },500)
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