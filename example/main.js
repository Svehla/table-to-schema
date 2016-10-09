import mockData from './mockData';

import { tableToSchema } from '../lib/table-to-schema';

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

document.write(`
  <table style="padding: 0px 50px; width: 100%">
    <tr>
      <td><h2>Table data</h2></td>
      <td><h2>New schema data</h2></td>
    </tr>
    <tr>
      <td></br>`)
document.write('<pre>'+JSON.stringify(mockData, null, 2)+'</pre>');
document.write(`</td><td>`)


const results = tableToSchema(config, mockData);
document.getElementsByTagName("BODY").innerHTML = JSON.stringify(results)
//console.log(results)
document.write('<pre>'+JSON.stringify(results, null, 2)+'</pre>');
//console.log(tableToSchema)

document.write(`</td><tr></table>`)
