import test from 'ava';
import { tableToSchema } from '../lib/table-to-schema';


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



test('Default value childrenName', t => {
  const config = [
    { distinctKey: 'manufact',
      keys: [ 'manufact', 'manufactId' ]
    },
    { distinctKey: 'car',
      keys: [ 'car', "carId" ]
    },
  ]

  const resultExepted = [
    {
      manufact: "VV(Skoda)",
      manufactId: 123,
      __childrens: [
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

  const resultFucntion = tableToSchema(config, resultSql)

  t.deepEqual(resultFucntion, resultExepted);
});
