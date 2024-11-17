const crypto = require( "crypto" );
const EventEmitter = require( "events" );
const emitter = new EventEmitter();
const WebSocket = require( 'ws' );


module.exports = class NonKycSocketClient extends EventEmitter {

    constructor( apiKey, secretKey, wssHost = "wss://api.nonkyc.io") {
    
    	super();
    	
        this._apiKey = apiKey;
        this._secretKey = secretKey;
        this._wssHost = wssHost || "wss://api.nonkyc.io";

        this._wss = null;
        this._pingTimeout = null;
        this._wssOpened = false;
        this._messageId = 0;
        
        this._initWss();
 
    }
    
    waitConnect = () => {

    	return new Promise((resolve, reject) => {

        	emitter.on( "connected", () => {
        	
        		resolve(true);
        		
        	});
    	
    	});
    	 
    }

    setWssHost = ( wssHost ) => {
    
        this._wssHost = wssHost;
        
    }

    login = () => {
    
    	var nonce = crypto.randomBytes(10).toString("hex");
		var hmac = crypto.createHmac('sha256', this._secretKey);
		hmac.update(nonce);
		var signature = hmac.digest('hex');
		
		let messageId = ++this._messageId;
		
		let message = {
		  "method": "login",
		  "params": {
			"algo": "HS256",
			"pKey": this._apiKey,
			"nonce": nonce,
			"signature": signature
		  },
		  "id": messageId
		};
		
		this._sendrequest(message, messageId).then((reply) => {
		
			if (reply.result == true)
				console.log("Login Success...")
			
		});
    
    }
    
    getasset = (ticker) => {
    
    	return new Promise((resolve, reject) => {
    	
    		(async () => {

				let messageId = ++this._messageId;
		
				let message = {
				  "method": "getAsset",
				  "params": {
					"ticker": ticker
				  },
				  "id": messageId
				};
		
				this._sendrequest(message, messageId).then((reply) => {
		
					if (reply.error)
						reject(reply);
					else
						resolve(reply);
			
				});
			
			})();
    	
    	});

    }

    getassets = () => {
    
    	return new Promise((resolve, reject) => {
    	
    		(async () => {

				let messageId = ++this._messageId;
		
				let message = {
				  "method": "getAssets",
				  "params": {},
				  "id": messageId
				};
		
				this._sendrequest(message, messageId).then((reply) => {
		
					if (reply.error)
						reject(reply);
					else
						resolve(reply);
			
				});
			
			})();
    	
    	});

    }

    getmarket = (symbol) => {
    
    	return new Promise((resolve, reject) => {
    	
    		(async () => {

				let messageId = ++this._messageId;
		
				let message = {
				  "method": "getMarket",
				  "params": {
					"symbol": symbol
				  },
				  "id": messageId
				};
		
				this._sendrequest(message, messageId).then((reply) => {
		
					if (reply.error)
						reject(reply);
					else
						resolve(reply);
			
				});
			
			})();
    	
    	});

    }

    getmarkets = () => {
    
    	return new Promise((resolve, reject) => {
    	
    		(async () => {

				let messageId = ++this._messageId;
		
				let message = {
				  "method": "getMarkets",
				  "params": {},
				  "id": messageId
				};
		
				this._sendrequest(message, messageId).then((reply) => {
		
					if (reply.error)
						reject(reply);
					else
						resolve(reply);
			
				});
			
			})();
    	
    	});

    }

    getbalances = () => {
    
    	return new Promise((resolve, reject) => {
    	
    		(async () => {

				let messageId = ++this._messageId;
		
				let message = {
				  "method": "getTradingBalance",
				  "params": {},
				  "id": messageId
				};
		
				this._sendrequest(message, messageId).then((reply) => {
		
					if (reply.error)
						reject(reply);
					else
						resolve(reply);
			
				});
			
			})();
    	
    	});

    }

    gettrades = (symbol = '', limit = 100, offset = 0, sort = null, from = null, till = null) => {
    
    	return new Promise((resolve, reject) => {
    	
    		(async () => {

				let messageId = ++this._messageId;
		
				let message = {
				  "method": "getTrades",
				  "params": {
					"symbol": symbol,
					"limit": limit,
					"offset": offset,
					"sort": sort,
					"from": from,
					"till": till
				  },
				  "id": messageId
				};
		
				this._sendrequest(message, messageId).then((reply) => {
		
					if (reply.error)
						reject(reply);
					else
						resolve(reply);
			
				});
			
			})();
    	
    	});

    }

    subscribeticker = (symbol) => {
    
    	return new Promise((resolve, reject) => {
    	
    		(async () => {

				let messageId = ++this._messageId;
		
				let message = {
				  "method": "subscribeTicker",
				  "params": {
					"symbol": symbol
				  },
				  "id": messageId
				};
		
				this._sendrequest(message, messageId).then((reply) => {
		
					if (reply.error)
						reject(reply);
					else
						resolve(reply);
			
				});
			
			})();
    	
    	});

    }

    unsubscribeticker = (symbol) => {
    
    	return new Promise((resolve, reject) => {
    	
    		(async () => {

				let messageId = ++this._messageId;
		
				let message = {
				  "method": "unsubscribeTicker",
				  "params": {
					"symbol": symbol
				  },
				  "id": messageId
				};
		
				this._sendrequest(message, messageId).then((reply) => {
		
					if (reply.error)
						reject(reply);
					else
						resolve(reply);
			
				});
			
			})();
    	
    	});

    }

    subscribeorderbook = (symbol, limit = 100) => {
    
    	return new Promise((resolve, reject) => {
    	
    		(async () => {

				let messageId = ++this._messageId;
		
				let message = {
				  "method": "subscribeOrderbook",
				  "params": {
					"symbol": symbol,
					"limit": limit
				  },
				  "id": messageId
				};
		
				this._sendrequest(message, messageId).then((reply) => {
		
					if (reply.error)
						reject(reply);
					else
						resolve(reply);
			
				});
			
			})();
    	
    	});

    }

    unsubscribeorderbook = (symbol) => {
    
    	return new Promise((resolve, reject) => {
    	
    		(async () => {

				let messageId = ++this._messageId;
		
				let message = {
				  "method": "unsubscribeOrderbook",
				  "params": {
					"symbol": symbol
				  },
				  "id": messageId
				};
		
				this._sendrequest(message, messageId).then((reply) => {
		
					if (reply.error)
						reject(reply);
					else
						resolve(reply);
			
				});
			
			})();
    	
    	});

    }

    subscribetrades = (symbol) => {
    
    	return new Promise((resolve, reject) => {
    	
    		(async () => {

				let messageId = ++this._messageId;
		
				let message = {
				  "method": "subscribeTrades",
				  "params": {
					"symbol": symbol
				  },
				  "id": messageId
				};
		
				this._sendrequest(message, messageId).then((reply) => {
		
					if (reply.error)
						reject(reply);
					else
						resolve(reply);
			
				});
			
			})();
    	
    	});

    }

    unsubscribetrades = (symbol) => {
    
    	return new Promise((resolve, reject) => {
    	
    		(async () => {

				let messageId = ++this._messageId;
		
				let message = {
				  "method": "unsubscribeTrades",
				  "params": {
					"symbol": symbol
				  },
				  "id": messageId
				};
		
				this._sendrequest(message, messageId).then((reply) => {
		
					if (reply.error)
						reject(reply);
					else
						resolve(reply);
			
				});
			
			})();
    	
    	});

    }

    getorders = (symbol) => {
    
    	return new Promise((resolve, reject) => {
    	
    		(async () => {

				let messageId = ++this._messageId;
		
				let message = {
				  "method": "getOrders",
				  "params": {
				  	"symbol": symbol
				  },
				  "id": messageId
				};
		
				this._sendrequest(message, messageId).then((reply) => {
		
					if (reply.error)
						reject(reply);
					else
						resolve(reply);
			
				});
			
			})();
    	
    	});

    }

    subscribereports = () => {
    
    	return new Promise((resolve, reject) => {
    	
    		(async () => {

				let messageId = ++this._messageId;
		
				let message = {
				  "method": "subscribeReports",
				  "params": {},
				  "id": messageId
				};
		
				this._sendrequest(message, messageId).then((reply) => {
		
					if (reply.error)
						reject(reply);
					else
						resolve(reply);
			
				});
			
			})();
    	
    	});

    }

    createorder = (symbol, side, price, quantity, type = 'limit', userProvidedId = null, strictValidate = false) => {
    
    	return new Promise((resolve, reject) => {
    	
    		(async () => {

				let messageId = ++this._messageId;
		
				let message = {
				  "method": "newOrder",
				  "params": {
					"userProvidedId": userProvidedId,
					"symbol": symbol,
					"side": side,
					"type": type,
					"price": price,
					"quantity": quantity,
					"strictValidate": strictValidate
				  },
				  "id": messageId
				};
		
				this._sendrequest(message, messageId).then((reply) => {
		
					if (reply.error)
						reject(reply);
					else
						resolve(reply);
			
				});
			
			})();
    	
    	});

    }

    cancelorder = (orderId = null, userProvidedId = null) => {
    
    	return new Promise((resolve, reject) => {
    	
    		(async () => {

				let messageId = ++this._messageId;
		
				let message = {
				  "method": "cancelOrder",
				  "params": {
				  	"orderId": orderId,
					"userProvidedId": userProvidedId
				  },
				  "id": messageId
				};

				this._sendrequest(message, messageId).then((reply) => {
		
					if (reply.error)
						reject(reply);
					else
						resolve(reply);
			
				});
			
			})();
    	
    	});

    }
    
    _sendrequest = ( request, messageId ) => {

        return new Promise((resolve, reject) => {

    		this._wss.send( JSON.stringify(request) );
    		
    		if (messageId)
    		{

				emitter.on( "reply_" + messageId, ( message ) => {
			
					resolve(message);
			
				});
    		
    		}
    		else
    		{
    		
    			resolve(true);
    		
    		}

        });

    }
    
    _onWebSocketOpen = () => {

        this._wssOpened = true;
        
    }
    
    _heartbeat = () => {
    
        if ( this._pingTimeout ) {
            clearTimeout( this._pingTimeout );
        }

        this._pingTimeout = setTimeout( () => {
            this._wss.terminate();
            this._wss = null;
            this._initWss();
        }, 70000 );
        
    };

    _loopPing = () => {
    
        if ( this._keepLive ) {
            clearTimeout( this._keepLive );
        }

        this._keepLive = setTimeout( () => {
            this._wss.ping( new Date().getTime() );
            this._loopPing();
        }, 20000 );
        
    };

    _decodeBytes = ( array ) => {
    
    	return array.toString( 'utf-8' );
    	
    }
    
    _initWss = () => {
    
        if ( !this._wss ) {
        
            this._wss = new WebSocket( this._wssHost );
            
            this._wss.on( "open", () => {
            
                this._onWebSocketOpen();

                this._loopPing();
                
				if (this._apiKey && this._secretKey)
					this.login();
					
				emitter.emit( "connected" );

            } );

            this._wss.on( "close", () => {
                clearTimeout( this._pingTimeout );
            } );

            this._wss.on( "error", ( err ) => {
                console.log( "error", err );
            } );

            // eslint-disable-next-line no-unused-vars
            this._wss.on( "ping", ( message ) => {
                // console.log( "ping", message.toString() );
                this._heartbeat();
            } );

            // eslint-disable-next-line no-unused-vars
            this._wss.on( "pong", ( message ) => {
                // console.log( "pong", message.toString() );
            } );

            this._wss.on( "message", ( message ) => {
            
            	message = this._decodeBytes( message );

				let parsedMessage = JSON.parse(message);

				if (parsedMessage.id)
            		emitter.emit( "reply_" + parsedMessage.id, parsedMessage );
            	else // subscription notification
            		this.emit( "notification", parsedMessage );
         	
            });

        }
        
    };
    
}
