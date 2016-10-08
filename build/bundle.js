/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _mockData = __webpack_require__(2);

	var _mockData2 = _interopRequireDefault(_mockData);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var twoDimToOneDim = function twoDimToOneDim(arrayOfObj, myKey) {
	  return arrayOfObj.map(function (item, index) {
	    return item[myKey];
	  });
	};

	var distincItems = function distincItems(myArray) {
	  return myArray.filter(function (value, index, self) {
	    return self.indexOf(value) === index;
	  });
	};

	var filterHistoryData = function filterHistoryData(actualItemName, historyData, key) {
	  return historyData.filter(function (oldData) {
	    return actualItemName === oldData[key];
	  });
	};

	//vezem klíče podle parametru a vytvoří aktuální object podle configu
	//https://egghead.io/lessons/javascript-introducing-reduce-reducing-an-array-into-an-object
	var getFullObjectFromDataAndKeys = function getFullObjectFromDataAndKeys(myKeys, myHistoryItem) {
	  var initialValue = {};
	  var reducer = function reducer(pre, itemKeyName) {
	    pre[itemKeyName] = myHistoryItem[itemKeyName];
	    return pre;
	  };
	  return myKeys.reduce(reducer, initialValue);
	};

	var validateTabToJsInputs = function validateTabToJsInputs(sequence, data) {
	  if (typeof sequence === 'undefined' || typeof data === 'undefined' || sequence === null || data === null || sequence.length === 0 || data.length === 0) {
	    console.log('Error: U must define both parameters!');
	    return false;
	  } else if (typeof sequence[0].distinctKey === 'undefined' || sequence[0].distinctKey === '' || sequence[0].distinctKey === null) {
	    console.log('Error: U must correct define distinctKey!');
	    return false;
	  } else {
	    return true;
	  }
	};

	var formatTabToJs = function formatTabToJs(sequence, data) {

	  //validatesInput
	  if (!validateTabToJsInputs(sequence, data)) {
	    return null;
	  }

	  //Actual sequence config
	  var actSeqConf = {
	    distinctKey: sequence[0].distinctKey.trim(),
	    childrenName: sequence[0].childrenName ? sequence[0].childrenName : '__childrens',
	    keys: sequence[0].keys ? sequence[0].keys : []
	  };

	  // take array of object and by first ( main key ) create
	  // array of all names with that key and filter duplicate
	  // parent unique is unieq names of all names with key[actSeqConf.distinctKey]
	  var parentsUnique = distincItems(twoDimToOneDim(data, actSeqConf.distinctKey));

	  // delete first item from array
	  var newPoorSequence = sequence.slice(1, sequence.length);

	  // for every item add children and do recursion -> tree structure
	  // projede všechny TYPY distinct potomků
	  return parentsUnique.map(function (item) {
	    var myHistoryItem = filterHistoryData(item, data, actSeqConf.distinctKey);
	    //první protože ty údaje jsou 1:N zduplikovaný doufám
	    //j en parentí keys a ty jsou sharovaný protože 1:n:n:n...
	    var newObj = getFullObjectFromDataAndKeys(actSeqConf.keys, myHistoryItem[0]);

	    //určí jeslti konec rekurze nebo se budu stromově rozšiřovat pro childy
	    return newPoorSequence.length === 0 ? _extends({}, newObj) : _extends({}, newObj, _defineProperty({}, actSeqConf.childrenName, formatTabToJs( //rekursion
	    newPoorSequence, myHistoryItem)));
	  });
	};

	// configurace
	//kontroluju vstupy na keys??? jestli jsou undefined null?
	var config = [{ distinctKey: 'manufact',
	  childrenName: 'manufacts',
	  keys: ['manufact', 'manufactId']
	}, { distinctKey: 'car',
	  childrenName: 'cars',
	  keys: ['car', "carId"]
	}, { distinctKey: 'engine',
	  childrenName: 'engines',
	  keys: ['engine', "engineId"]
	}, { distinctKey: 'myFunction',
	  keys: ['myFunction', "myFunctionId"]
	}];

	var vysledek = formatTabToJs(config, _mockData2.default);

	console.log('__________');
	console.log('vysledek');
	console.log(JSON.stringify(vysledek, null, 2));
	console.log(vysledek);

	exports.default = vysledek;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = [{ manufact: 'Skoda',
	  manufactId: 678,
	  car: 'Octavia',
	  carId: 67,
	  engine: 'motorovk23',
	  engineId: 678,
	  myFunction: 'Diagnostika',
	  myFunctionId: 689
	}, { manufact: 'Skoda',
	  manufactId: 678,
	  car: 'Octavia',
	  carId: 67,
	  engine: 'motorovk23',
	  engineId: 678,
	  myFunction: 'Diagnostika',
	  myFunctionId: 689
	}, { manufact: 'Skoda',
	  manufactId: 678,
	  car: 'Fabia',
	  carId: 67897,
	  engine: 'motorovka',
	  engineId: 111,
	  myFunction: 'novinka na fabii',
	  myFunctionId: 1689
	}, { manufact: 'Skoda',
	  manufactId: 678,
	  car: 'Fabia',
	  carId: 67897,
	  engine: 'motorovka',
	  engineId: 111,
	  myFunction: 'lol1',
	  myFunctionId: 123
	}, { manufact: 'Skoda',
	  manufactId: 678,
	  car: 'Fabia',
	  carId: 67897,
	  engine: 'motorovka',
	  engineId: 111,
	  myFunction: 'lol2',
	  myFunctionId: 111111111
	}, { manufact: 'Skoda',
	  manufactId: 678,
	  car: 'Fabia',
	  carId: 67897,
	  engine: 'motorovka123',
	  engineId: 111,
	  myFunction: 'lol2',
	  myFunctionId: 111111111
	}, { manufact: 'Skoda',
	  manufactId: 678,
	  car: 'Fabia',
	  carId: 67897,
	  engine: 'motorovka123',
	  engineId: 111,
	  myFunction: 'Fab-lul',
	  myFunctionId: 111111111
	}, { manufact: 'VV',
	  manufactId: 678,
	  car: 'Fabia',
	  carId: 67897,
	  engine: 'motorovka',
	  engineId: 111,
	  myFunction: 'lol2',
	  myFunctionId: 111111111
	}, { manufact: 'Skoda',
	  car: 'Octavia',
	  engine: 'motorovka',
	  myFunction: 'Bomw'
	}, { manufact: 'VV',
	  car: 'Pežot',
	  engine: 'motorovka',
	  myFunction: 'Diagnostika'
	}];

/***/ }
/******/ ]);