'use strict'

const getPropertyGenerator = (type) => {
  switch (type) {
    case 'AWS::SNS::Topic':
      return createSNSTopic
  }
}

const createSNSTopic = (properties, count) => {
  return {
    DisplayName: properties.DisplayName,
    TopicName: `${properties.TopicName}-${count}`
  }
}

exports.handler = async (event, context, callback) => {
  const numberOfRepeats = event.templateParameterValues.NumberOfRepeats
  const resources = event.fragment.Resources

  const keys = Object.keys(resources)
  if (keys.length > 1) {
    throw Error('Number of resources shouud be 1')
  }

  const resource = resources[keys[0]]

  const resourceType = resource.Type
  const properties = resource.Properties

  for (let i = 0; i < numberOfRepeats; i++) {
    const ret = {
      Type: resourceType,
      Properties: getPropertyGenerator(resourceType)(properties, i)
    }
    resources[`${keys[0]}${i}`] = ret
  }

  delete resources[keys[0]]
  return {
    'requestId': event['requestId'],
    'status': 'success',
    'fragment': event['fragment']
  }
}
