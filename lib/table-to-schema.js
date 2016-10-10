
/**
 * function twoDimToOneDim create array of string from arrayOfObj (array of object)
 * it takes value from object with keyValue key and reduce array
 * with duplicated items
 * @param {array} arrayOfObj - contains array of object which we'll modificate
 * @param {string} keyValue - target key value from every object in array
 * @return {array} return array of string
 */
const twoDimToOneDim = (arrayOfObj, keyValue) => (
  arrayOfObj.map((item,index) => (
    item[keyValue]
  ))
)

/**
 * function distincItems filter duplicated items
 * @param {array} myArray - array of string ( it can contains duplicated items )
 * @return {array} return array of string without duplicated items
 */
const distincItems = (myArray) => (
  myArray.filter((value,index,self) => (
    self.indexOf(value) === index
  ))
)


/**
 * function filterHistoryData takes array of object and return filter value
 * by key => filter only these items witch have same actualItemName
 * @param {string} actualItemName - value of @key witch must contains returned items
 * @param {array}  historyData - all data witch will be filtered
 * @param {string} key - name of key value
 * @return {array} return array of object contains items where [@key] === @actualItemName
 */
const filterHistoryData = (actualItemName, historyData, key) => (
   historyData.filter( (oldData) => (
    actualItemName === oldData[key]
  ))
)



/**
 * function getFullObjectFromDataAndKeys takes keys from parametr and created
 * new object which will contains only that keys with value from objectDataItem
 * objectDataItem is source of true correct data
 * @param {array} myKeys - array of keys witch will contain new object (filter by keys)
 * @param {array}  myHistoryItem - all data witch will be filtered by @myKeys
 * @return {object} return object with
 * inspiration from https://egghead.io/lessons/javascript-introducing-reduce-reducing-an-array-into-an-object
 */
const getFullObjectFromDataAndKeys = (myKeys, objectDataItem) => {
  const initialValue = {}
  const reducer = (pre, itemKeyName) => {
    pre[itemKeyName] = objectDataItem[itemKeyName]
    return pre
  }
  return myKeys.reduce(reducer, initialValue)
}


/**
 * function validateTabToJsInputs takes data and config from formatTabToJs function
 * and return null if sequence or data are not valid (undefined, null...)
 * @param {array} sequence - array of config from formatTabToJs (must contain key[distsinctKey])
 * @param {array}  data - data to filter from formatTabToJs function
 * @return {bool} return true if everything is valid and false if its invalid
 */
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




/**
 * function witch takes data and by first item in sequence config param
 * split data to json and add 1 dimensional
 * for every new array of obj call formatTabToJs (if its possible)
 * @param {array} sequence - array of config from formatTabToJs
 * @param {array}  data - data to filter from formatTabToJs function
 * @return {bool} return true if everything is valid and false if its invalid
 */
const formatTabToJs = (sequence, data) => {

  //validates input value
  if(!validateTabToJsInputs(sequence, data)){
    return null
  }

  //Actual sequence config in object with basic validates
  //I only work with first value
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
  return parentsUnique.map((item) => {
    const myHistoryItem = filterHistoryData(item, data, actSeqConf.distinctKey)

    // [0] has enought information becouse if we have 1:N in table, N childrens have
    // have same parents item same key value
    const newChildObj = getFullObjectFromDataAndKeys(actSeqConf.keys, myHistoryItem[0])

    // if length === 0 its end of tree
    // if length > 0 i'll call recursion and call with smaller sequence (newPoorSequence)
    return newPoorSequence.length === 0
                ? {  ...newChildObj }
                : {  ...newChildObj,  //show only keys by param in sequence
                    [actSeqConf.childrenName]: formatTabToJs( //rekursion
                                                 newPoorSequence,
                                                 myHistoryItem
                                               )}
  })
}



export {
  formatTabToJs as tableToSchema
}
