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

var ref2 = db.ref("/items");
var itemsArray;
ref2.once('value',(data)=>{
    var dat = data.val();
    console.log(Object.keys(dat).length);
    var datArray = [];
    var profitArray = [];
    for(var i in dat){
        var item = dat[i];
        var listPrice = item.price.sells.unit_price *.05;
        var sellPrice = item.price.sells.unit_price *.10;
        datArray.push(item);
        if(item.price.sells.quantity > 5) profitArray.push([item.item.name,((item.price.sells.unit_price-item.price.buys.unit_price-listPrice-sellPrice)/100/100).toFixed(),item.item.id,item.price.buys.unit_price/100/100]);
    }
    // console.log(datArray[0]);
    profitArray.sort(function(a,b){
        return b[1]-a[1];
    });
    console.log(profitArray);
    // for(var i in dat){
        // itemsArray.p
    // }
});