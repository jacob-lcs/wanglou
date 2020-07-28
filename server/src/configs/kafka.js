import env from '~/src/configs/env'

const production = {
  'group.id': 'test',
  'metadata.broker.list': 'localhost:9092',
}

const testing = production

const development = testing

let config = {
  development,
  testing,
  production
}

export default config[env]
