import mockData from './mockData'



const twoDimToOneDim = (arrayOfObj, myKey) => (
  arrayOfObj.map((item,index) => (
    item[myKey]
  ))
)


const distincItems = (myArray) => (
  myArray.filter((value,index,self) => (
    self.indexOf(value) === index
  ))
)


const filterHistoryData = (actualItemName, historyData, key) => (
   historyData.filter( (oldData) => (
    actualItemName === oldData[key]
  ))
)


//vezem klíče podle parametru a vytvoří aktuální object podle configu
//https://egghead.io/lessons/javascript-introducing-reduce-reducing-an-array-into-an-object
const getFullObjectFromDataAndKeys = (myKeys, myHistoryItem) => {
  const initialValue = {}
  const reducer = (pre, itemKeyName) => {
    pre[itemKeyName]  = myHistoryItem[itemKeyName]
    return pre
  }
  return myKeys.reduce(reducer, initialValue)
}


const validateTabToJsInputs = (sequence, data) => {
  if(typeof(sequence) === 'undefined' || typeof(data) === 'undefined'
        || sequence === null  || data === null
        || sequence.length === 0  || data.length === 0 ){
      console.log('Error: U must define both parameters!')
      return false
  } else
    if(typeof(sequence[0].distinctKey) === 'undefined'
          || sequence[0].distinctKey === ''
          || sequence[0].distinctKey === null  ){
      console.log('Error: U must correct define distinctKey!')
      return false
  }else{
    return true
  }
}


const formatTabToJs = (sequence, data) => {

  //validatesInput
  if(!validateTabToJsInputs(sequence, data)){
    return null
  }

  //Actual sequence config
  const actSeqConf = {
    distinctKey: sequence[0].distinctKey.trim(),
    childrenName: sequence[0].childrenName ? sequence[0].childrenName : '__childrens',
    keys : sequence[0].keys ? sequence[0].keys : [],
  }

  // take array of object and by first ( main key ) create
  // array of all names with that key and filter duplicate
  // parent unique is unieq names of all names with key[actSeqConf.distinctKey]
  const parentsUnique = distincItems(twoDimToOneDim(data, actSeqConf.distinctKey))

  // delete first item from array
  const newPoorSequence = sequence.slice(1, sequence.length)

  // for every item add children and do recursion -> tree structure
  // projede všechny TYPY distinct potomků
  return parentsUnique.map((item) => {
    const myHistoryItem = filterHistoryData(item, data, actSeqConf.distinctKey)
    //první protože ty údaje jsou 1:N zduplikovaný doufám
    //j en parentí keys a ty jsou sharovaný protože 1:n:n:n...
    const newObj = getFullObjectFromDataAndKeys(actSeqConf.keys, myHistoryItem[0])

    //určí jeslti konec rekurze nebo se budu stromově rozšiřovat pro childy
    return newPoorSequence.length === 0
                ? {  ...newObj }
                : {  ...newObj,  //...item, nezajímá mě název podle čeho se to sortovalo ale jen to co chce vidět user
                    [actSeqConf.childrenName]: formatTabToJs( //rekursion
                                                 newPoorSequence,
                                                 myHistoryItem
                                               )}
  })
}


// configurace
//kontroluju vstupy na keys??? jestli jsou undefined null?
const config = [
  { distinctKey: 'manufact',
    childrenName: 'manufacts',
    keys: [ 'manufact', 'manufactId' ]
  },
  { distinctKey: 'car',
    childrenName: 'cars',
    keys: [ 'car', "carId" ]
  },
  { distinctKey: 'engine',
    childrenName: 'engines',
    keys: [ 'engine', "engineId" ]
  },
  { distinctKey: 'myFunction',
    keys: [ 'myFunction', "myFunctionId" ]
  },
]


const vysledek = formatTabToJs(config, mockData)


console.log('__________')
console.log('vysledek')
console.log(JSON.stringify(vysledek, null, 2))
console.log(vysledek)


export default vysledek





/*
+-


"use strict";
function _defineProperty(a, b, c) {
  return b in a ? Object.defineProperty(a, b, { value: c, enumerable: !0, configurable: !0, writable: !0 }) : a[b] = c, a;
}var a = function a(b, c) {
  return b.map(function (a, b) {
    return a[c];
  });
},
    b = function b(_b) {
  return _b.filter(function (a, b, c) {
    return c.indexOf(a) === b;
  });
},
    c = function c(b, _c, d) {
  return _c.filter(function (a) {
    return b === a[d];
  });
},
    d = function a(b, c) {
  var d = {},
      a = function a(b, d) {
    return b[d] = c[d], b;
  };return b.reduce(a, d);
},
    e = function e(b, c) {
  return "undefined" == typeof b || "undefined" == typeof c || null === b || null === c || 0 === b.length || 0 === c.length ? (console.log("Error: U must define both parameters!"), !1) : "undefined" != typeof b[0].distinctKey && "" !== b[0].distinctKey && null !== b[0].distinctKey || (console.log("Error: U must correct define distinctKey!"), !1);
},
    f = function f(g, h) {
  if (!e(g, h)) return null;var i = { distinctKey: g[0].distinctKey.trim(), childrenName: g[0].childrenName ? g[0].childrenName : "__childrens", keys: g[0].keys ? g[0].keys : [] },
      j = b(a(h, i.distinctKey)),
      k = g.slice(1, g.length);return j.map(function (a) {
    var b = c(a, h, i.distinctKey),
        e = d(i.keys, b[0]);return 0 === k.length ? { newObj: e } : _defineProperty({ newObj: e }, i.childrenName, f(k, b));
  });
};

*/
