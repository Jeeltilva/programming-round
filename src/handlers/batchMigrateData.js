const users = require('../Data/data.json')
import { UsersModel } from '../Models/user'

/* 
    Using this lambda function we can migrate or upload data to DynamoDB using Json file.
    This function is going to use batchput dynamoose call which will upload records in 25 items batch. 
    We can invoke this lambda function manually to upload data.
*/


async function migrate(){

  try{

    for (let i = 0; i < users.length; i += 25) {
        const upperLimit = Math.min(i + 25, users.length);
        const newItems = users.slice(i, upperLimit);

        if(!newItems){
            break;
        }

        const result = await UsersModel.batchPut([...newItems])
        console.log(`Batch number ${i+1} with items ${upperLimit} uploaded successfully.`);

    }

  } catch(error){

    console.error(error);
    throw new Error(`Something went wrong while uploading data.`)

  }

  return;
}

export const handler = migrate;