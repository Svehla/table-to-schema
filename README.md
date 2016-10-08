

Super tiny fast library for convert sql result to json schema

[[website repo](https://github.com/Svehla/table-to-schema)]

# Motivation

Library table-to-schema solves problem with converting 2 dimensional data from sql select
to structure json schema.

With simple configuration you can set parameters witch split 2 dimensional arrays
by 1:N → 1:N → .. → 1:N and return new generated json schema.



# Getting started

## Installation

Using npm:

`npm install table-to-schema --save`


## Import

ES5

`var tableToSchema = require('table-to-schema')`

ES6

`import tableToSchema from 'table-to-schema'`


## Example
```js
`import tableToSchema from 'table-to-schema'`

const resultSql = [
  { manufact: 'VV(Skoda)',
    manufactId: 123,
    car: 'Octavia',
    carId: 67,
  },
  { manufact: 'VV(Skoda)',
    manufactId: 123,
    car: 'Fabia',
    carId: 68,
  }
]


const config = [
  { distinctKey: 'manufact',     
    childrenName: 'manufacts',
    keys: [ 'manufact', 'manufactId' ]
  },
  { distinctKey: 'car',
    keys: [ 'car', "carId" ]
  },
]

`const results = tableToSchema(config, resultSql); `

//RESULT (return json schema by config)
/*
[
  {
    manufact: "VV(Skoda)",
    manufactId: 123,
    manufacts: [
      {
        "car": "Octavia",
        "carId": 67,
      },
      {
        "car": "Fabia",
        "carId": 68,
      }
    ]
  }
]
*/

```



## Konfiguration function
default export function tableToSchema()
`const results = tableToSchema(config, sqlTableData);`

2 params
* config
* source data



### Configuration config's parameter
For every dimension of your structure you define new item of config array.

#### Config object
* DistinctKey → Name of column (unique key for new structure)
* ChildrenName → Name of key value witch serve children (relation 1:N) (defualt value is `__childrens`)
* Keys → List of visible column name


```js
const config = [
  { distinctKey: 'manufact',
    childrenName: 'manufacts',
    keys: [ 'manufact', 'manufactId' ]
  },
  { distinctKey: 'car',
    childrenName: 'cars',
    keys: [ 'car', "carId" ]
  },
]
 ```
