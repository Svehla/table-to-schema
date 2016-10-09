
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
    //j en parentí keys a ty jsou sharovaný protože 1:n:n:n
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

export {
  formatTabToJs as tableToSchema
}
