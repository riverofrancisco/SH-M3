'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ://arg == function arg (resolve,reject)=>{blablabla}
function $Promise(executor){
if(typeof executor !== 'function') throw TypeError('executor function');

this._state = 'pending';
this._internalResolve = (data)=>{
    if(this._state === 'pending'){
        this._state = 'fulfilled';
        this._value = data;}
    this.callHandlers();
};
this._internalReject = (data)=>{
    if(this._state === 'pending'){
        this._state = 'rejected';
        this._value = data;}
    this.callHandlers();
};

this._handlerGroups = [];

this.then = (sH, eH) => {
    if (typeof sH !== 'function') sH = false;
    if (typeof eH !== 'function') eH = false; 
    this._handlerGroups.push({successCb: sH, errorCb: eH});
    if (this._state !== 'pending') this.callHandlers();
}

executor(this._internalResolve, this._internalReject);



}
     
$Promise.prototype.callHandlers = function(){
    while(this._handlerGroups.length > 0){
        let current = this._handlerGroups.shift() //tengo mi primer elemento.
        if(this._state === 'fulfilled'){
            current.successCb && current.successCb(this._value);
        } else if (this._state === 'rejected') {
            current.errorCb && current.errorCb(this._value);
        }
/*         if(this._state !== 'pending'){
            if(this._state === 'fulfilled') {
                if(this._handlerGroups.length > 0 && this._handlerGroups[0].successCb !== false)
                executor(this._handlerGroups[0].successCb)
            }
            if(this._state === 'rejected') {
                if(this._handlerGroups.length > 0 && this._handlerGroups[0].errorCb !== false)
                executor(this._handlerGroups[0].errorCb)
            }
        } */
    }
}

$Promise.prototype.catch = function(errorCb){
    return this.then(null, errorCb);
}


module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
