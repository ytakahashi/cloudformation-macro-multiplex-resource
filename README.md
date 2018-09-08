# cloudformation-macro-multiplex-resource

Macro for cloudformation to multiplex resources to be created by a cloudformation template.

## Getting started

### Create Lambda Function

```shell
git clone https://github.com/ytakahashi/cloudformation-macro-multiplex-resource.git

cd cloudformation-macro-multiplex-resource/macro

npm run package --s3-bucket <S3_BUCKET_NAME>
// or yarn package --s3-bucket <S3_BUCKET_NAME>

npm run deploy --stack-name <STACK_NAME>
// or yarn deploy --stack-name <STACK_NAME>
```

### Use Macro

#### Sample Template

```yaml
AWSTemplateFormatVersion: "2010-09-09"
Transform: [MultiplexResourceMacro]

Parameters:
  NumberOfRepeats:
    Type: Number
    Default: 1

Resources:
  Resource:
    Type: AWS::SNS::Topic
    Properties:
      DisplayName: test topic
      TopicName: TestTopic
```

#### Run

```shell
aws cloudformation deploy --template-file create-sns.yml --stack-name <STACK_NAME> --parameter-overrides NumberOfRepeats=<NUMBER_OF_RESOURCES_TO_BE_CREATED>
```

### Supported Resource Type

- SNS (AWS::SNS::Topic)
