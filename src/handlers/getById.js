import { UsersModel } from '../Models/user'

/*
    This lambda function is going to take id from path params and fetch user with that id.
    Id is partition key so I have used getItem to fetch that record.
*/

async function getById(event, context) {

  let { id } = event.pathParameters;
  id = parseInt(id)

  let user;

  try {

    const user = await UsersModel.get({id})
    
  } catch (error) {

    console.error(error);
    throw new Error(`Something went wrong while fetching record!`);
  
  }

  if(!user){
    return {
      statusCode: 200,
      body: JSON.stringify({"message": `User with Id ${id} not found!`})
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(user)
  };

}


export const handler = getById;