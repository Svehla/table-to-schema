Introduction

# Motivation

  You're web developer and you have SQL smelly table from 1:N → 1:N → 1:N query

  well... u love schematic structure and mongodb?

  WE HAVE SOLUTION

  use table-to-schema library to convert table to schema



  ♥♥♥ realy tiny library full of functional code ♥♥♥

  ♥♥♥ well tested ♥♥♥

# Installation

download:
`npm install webpack --save-dev`

# Getting Started
es6
`import tableToSchema from 'table-to-schema'`

## Konfiguration
1:N → 1:N → 1:N

konfiguration is for every table
parametr of 1 layer in array
* DistinctKey → join data (same for one dimension)
* ChildrenName → name of key with childrens (defualt is `__childrens`)
* Keys → array of all visible columns

` const config = [

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
  
] `

## call default function with 2 parametr
 * configuration
 * dataFromSql
`const results = tableToSchema(config, sqlTableData);`
