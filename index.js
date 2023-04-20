const NonKycSocketClient = require('./wsapiClass.js');

const yourApiKey = "";
const yourApiSecret = "";

var nonkycApi = new NonKycSocketClient(yourApiKey, yourApiSecret);

// events

nonkycApi.on( "notification", ( message ) => {

	console.log("Type: " + message.method)

	console.log(JSON.stringify(message, null, 4));

});


(async () => {

	let isconnected = await nonkycApi.waitConnect();
	
	console.log('connected');


	try {
	
		let assetinfo = await nonkycApi.getasset('BTC');
		
		console.log(assetinfo);
	
	} catch (e) {
	
		console.log(e);
	
	}
	
	
	try {
	
		let assetsinfo = await nonkycApi.getassets();
		
		console.log(assetsinfo);
	
	} catch (e) {
	
		console.log(e);
	
	}


	try {
	
		let marketinfo = await nonkycApi.getmarket('BTC/USDT');
		
		console.log(marketinfo);
	
	} catch (e) {
	
		console.log(e);
	
	}


	try {
	
		let marketsinfo = await nonkycApi.getmarkets();
		
		console.log(marketsinfo);
	
	} catch (e) {
	
		console.log(e);
	
	}


	try {
	
		let balanceinfo = await nonkycApi.getbalances();
		
		console.log(balanceinfo);
	
	} catch (e) {
	
		console.log(e);
	
	}


	try {
	
		let tradeinfo = await nonkycApi.gettrades('BTC/USDT');
		
		console.log(JSON.stringify(tradeinfo, null, 4));
	
	} catch (e) {
	
		console.log(e);
	
	}


	try {
	
		let subticker = await nonkycApi.subscribeticker('BMB/USDT');
		
		console.log(JSON.stringify(subticker, null, 4));
	
	} catch (e) {
	
		console.log(e);
	
	}
	
	
	try {
	
		let unsubticker = await nonkycApi.unsubscribeticker('BMB/USDT');
		
		console.log(JSON.stringify(unsubticker, null, 4));
	
	} catch (e) {
	
		console.log(e);
	
	}


	try {
	
		let suborderbook = await nonkycApi.subscribeorderbook('BMB/USDT', 30);
		
		console.log(JSON.stringify(suborderbook, null, 4));
	
	} catch (e) {
	
		console.log(e);
	
	}
	
	
	try {
	
		let unsuborderbook = await nonkycApi.unsubscribeorderbook('BMB/USDT');
		
		console.log(JSON.stringify(unsuborderbook, null, 4));
	
	} catch (e) {
	
		console.log(e);
	
	}


	try {
	
		let subtrades = await nonkycApi.subscribetrades('BMB/USDT');
		
		console.log(JSON.stringify(subtrades, null, 4));
	
	} catch (e) {
	
		console.log(e);
	
	}
	

	try {
	
		let unsubtrades = await nonkycApi.unsubscribetrades('BMB/USDT');
		
		console.log(JSON.stringify(unsubtrades, null, 4));
	
	} catch (e) {
	
		console.log(e);
	
	}
	

	try {
	
		let getorders = await nonkycApi.getorders("USDC/USDT"); 
		
		console.log(JSON.stringify(getorders, null, 4));
	
	} catch (e) {
	
		console.log(e);
	
	}


	try {
	
		let subreports = await nonkycApi.subscribereports();
		
		console.log(JSON.stringify(subreports, null, 4));
	
	} catch (e) {
	
		console.log(e);
	
	}
	

	let createorder;
	
	try {
	
		createorder = await nonkycApi.createorder('BMB/USDT', 'buy', '0.007', '50');
		
		console.log(JSON.stringify(createorder, null, 4));
	
	} catch (e) {
	
		console.log(e);
	
	}
	
	let cancelorder;
	
	try {
	
		if (createorder && createorder.result)
		{
			cancelorder = await nonkycApi.cancelorder(createorder.result.id);
			console.log(JSON.stringify(cancelorder, null, 4));
		}
		
	} catch (e) {
	
		console.log(e);
	
	}

	
})();