import test from 'ava';
import { tableToSchema } from '../lib/table-to-schema';


const sqlExampleData = [
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




test('distinctKey error params', t => {
  const confUndefinedParam = [
    { distinctKey: undefined,
      keys: [ 'manufact', 'manufactId' ]
    },
    { distinctKey: '',
      keys: [ 'car', "carId" ]
    },
  ]
  const confEmptyString = [
    { distinctKey: '',
      keys: [ 'manufact', 'manufactId' ]
    },
    { distinctKey: '',
      keys: [ 'car', "carId" ]
    },
  ]
  const confNullValue = [
    { distinctKey: '',
      keys: [ 'manufact', 'manufactId' ]
    },
    { distinctKey: '',
      keys: [ 'car', "carId" ]
    },
  ]

  const resultExepted = null


  const resultUndefinedParam = tableToSchema(confUndefinedParam, sqlExampleData)
  const resultEmptyString = tableToSchema(confEmptyString, sqlExampleData)
  const resultNullValue = tableToSchema(confNullValue, sqlExampleData)

  t.deepEqual(resultUndefinedParam, resultExepted);
  t.deepEqual(resultNullValue, resultExepted);
  t.deepEqual(resultNullValue, resultExepted);
});
