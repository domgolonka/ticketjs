define(["../core","../var/rnotwhite","./accepts"],function(jQuery,rnotwhite){function Data(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=jQuery.expando+Math.random()}return Data.uid=1,Data.accepts=jQuery.acceptData,Data.prototype={key:function(owner){if(!Data.accepts(owner))return 0;var descriptor={},unlock=owner[this.expando];if(!unlock){unlock=Data.uid++;try{descriptor[this.expando]={value:unlock},Object.defineProperties(owner,descriptor)}catch(e){descriptor[this.expando]=unlock,jQuery.extend(owner,descriptor)}}return this.cache[unlock]||(this.cache[unlock]={}),unlock},set:function(owner,data,value){var prop,unlock=this.key(owner),cache=this.cache[unlock];if("string"==typeof data)cache[data]=value;else if(jQuery.isEmptyObject(cache))jQuery.extend(this.cache[unlock],data);else for(prop in data)cache[prop]=data[prop];return cache},get:function(owner,key){var cache=this.cache[this.key(owner)];return void 0===key?cache:cache[key]},access:function(owner,key,value){var stored;return void 0===key||key&&"string"==typeof key&&void 0===value?(stored=this.get(owner,key),void 0!==stored?stored:this.get(owner,jQuery.camelCase(key))):(this.set(owner,key,value),void 0!==value?value:key)},remove:function(owner,key){var i,name,camel,unlock=this.key(owner),cache=this.cache[unlock];if(void 0===key)this.cache[unlock]={};else{jQuery.isArray(key)?name=key.concat(key.map(jQuery.camelCase)):(camel=jQuery.camelCase(key),key in cache?name=[key,camel]:(name=camel,name=name in cache?[name]:name.match(rnotwhite)||[])),i=name.length;for(;i--;)delete cache[name[i]]}},hasData:function(owner){return!jQuery.isEmptyObject(this.cache[owner[this.expando]]||{})},discard:function(owner){owner[this.expando]&&delete this.cache[owner[this.expando]]}},Data});