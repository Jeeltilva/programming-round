import { UsersModel } from '../Models/user' 
/*
    This lambda function is going to take dateJoined(epoch value) from path params and fetch users
    which matches that dateJoined time
    nameAndDateJoined is Globale secondary key so I have used query to fetch that record.
*/

async function getByDateJoined(event, context) {

    let { dateJoined } = event.pathParameters;
    dateJoined = parseInt(dateJoined)
    
    let users;

    try {

        users = await UsersModel.query("dateJoined").eq(dateJoined).using("nameAndDateJoined").exec()
        users = users.toJSON()
        
    } catch (error) {

        console.error(error);
        throw new Error(`Something went wrong while fetching record!`);

    }

    if(!users) {
        return {
            statusCode: 200,
            body: JSON.stringify({"message": `User with date joined ${dateJoined} not found!`})
          };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(users),
    };
  }
  
  export const handler = getByDateJoined;
  
  
  