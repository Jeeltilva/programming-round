import * as dynamoose from 'dynamoose';

if (process.env.IS_OFFLINE) {
  dynamoose.aws.sdk.config.update({
    "accessKeyId": "S3RVER",
    "secretAccessKey": "S3RVER",
    "region": "us-east-2"
  });
  
  dynamoose.aws.ddb.local();
}

const schema = new dynamoose.Schema({
  id: {
    type: Number,
    hashKey: true,
  },
  firstName: String,
  lastName: String,
  email: String,
  gender: String,
  ipAddress: String,
  dateJoined: {
    "type": Number,
    "index": {
        "name": "nameAndDateJoined",
        "global": true,
        "rangeKey": "firstName"
    } // creates a global secondary index with the name `nameAndDateJoined` and hashKey `dateJoined`
  }
}, {
  timestamps: false
})

export const UsersModel = dynamoose.model(process.env.USERS_TABLE_NAME, schema);