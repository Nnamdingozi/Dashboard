
import { http, HttpResponse } from 'msw';
import { User, NewUserRequestBody, UpdatedUserRequestBody, DeleteUserResponseBody, UserParams} from '@/app/utilities/definitions';


const API_URL = process.env.NEXT_PUBLIC_API_URL;

const users: User[] = [
  { id: 1, user: { username: 'user1', email: 'user1@example.com', password: 'User1@password1', privacyPolicy: true, role: 'admin' } },
  { id: 2, user: { username: 'user2', email: 'user2@example.com', password: 'User2@password2', privacyPolicy: true, role: 'user' } },
  { id: 3, user: { username: 'user3', email: 'user3@example.com', password: 'User3@password3', privacyPolicy: false, role: 'user' } },
];


let lastAssignedUserId = 3;
let lastAssignedLogId = 103;

// Function to generate a new user ID
function generateNewUserId(): number {
  lastAssignedUserId += 1;
  return lastAssignedUserId;
}

// Function to generate a new log ID
function generateNewLogId(): number {
  lastAssignedLogId += 1;
  return lastAssignedLogId;
}

export const userHandlers = [


  // Mocking GET /users
  http.get<never, User[]>(`${API_URL}/users`, async ({ cookies }: { cookies: Record<string, string> }) => {
    const token = cookies.token;  // Extract token from cookies
    console.log('token in get handler', token)
    if (!token) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(users);  // Return the user data
  }),


  http.get<{ id: string }>(
    `${API_URL}/users/:id`,
    async ({ params, cookies }: { params: { id: string }; cookies: Record<string, string> }) => {
      const { id } = params;
      console.log('id from params in handler:', id)
      const token = cookies.token;


      if (!token) {
        return new HttpResponse(null, { status: 403 });
      }

    

      const user = users.find(user => user.id === Number(id));

      console.log('user data in handler:', user)

      if (!user) {
        return new HttpResponse(null, { status: 404 });
      }

      return HttpResponse.json(user);
    }
  ),


  // Mocking POST /users
  http.post<never, { user: NewUserRequestBody }>(`${API_URL}/users`, async ({ request }: { request: Request }) => {
    const newUser = await request.json() as NewUserRequestBody;


    const logId = generateNewLogId();
    const userId = generateNewUserId();
    const timestamp = new Date(Date.now()).toISOString();
    
   
    
    
    // Create user object with all fields
    const createdUser = {
      id: userId,
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
      privacyPolicy: newUser.privacyPolicy,
      role: newUser.role,
    };



//  create a mock token
    const token = `mocked-token-${createdUser.id}`;


    // Create a response user object omitting password and privacyPolicy
    const responseUser: User = {
      
      id: createdUser.id,
      user: {
        username: createdUser.username,
        email: createdUser.email,
        role: createdUser.role,
      }
    };

    users.push(responseUser); 

    
 // Create access log entry
 const accessLog = {
  id: logId,
  userId: responseUser.id,
  accesstime: timestamp,
  access_locate: `${responseUser.user.username}-${responseUser.id}-ipAddressr `
};


    return HttpResponse.json({ user: responseUser, updateUsers: users, token, accessLog }, { status: 201 });
  }),




  



  http.put<{ id: string }, { user: Partial<UpdatedUserRequestBody> }>(
    `${API_URL}/users/:id`,
    async ({ params, cookies, request }: { params: { id: string }; cookies: Record<string, string>; request: Request }) => {
      const { id } = params;
      const token = cookies.token;

      console.log('id from params in handler:', id);

      // If no token is provided in cookies, return Forbidden response
      if (!token) {
        return new HttpResponse(null, { status: 403 });
      }

      // // Sample users array (mock data)
      // const users = [
      //   { id: 1, user: { username: 'user1', email: 'user1@example.com', password: 'User1@password1', privacyPolicy: true, role: 'admin' } },
      //   { id: 2, user: { username: 'user2', email: 'user2@example.com', password: 'User2@password2', privacyPolicy: true, role: 'user' } },
      //   { id: 3, user: { username: 'user3', email: 'user3@example.com', password: 'User3@password3', privacyPolicy: false, role: 'user' } },
      // ];

      // // Find the user by id
      const userIndex = users.findIndex(user => user.id === Number(id));

      if (userIndex === -1) {
        return new HttpResponse(null, { status: 404 });
      }

      try {
        // Parse the updated data from the request
        const updatedData = await request.json() as Partial<User['user']>;
        console.log('Updated data from request:', updatedData);

        // Update the user object with the provided fields
        users[userIndex].user = {
          ...users[userIndex].user,
          ...updatedData,
        };

        console.log('Updated user in handler:', users[userIndex]);

        // Flatten the updated user object into the UserProfile type
        const updatedUserProfile: User = {
          id: users[userIndex].id,
          user: {
            username: users[userIndex].user.username ?? null,
            email: users[userIndex].user.email ?? null,
            role: users[userIndex].user.role ?? undefined,
          }

        };

        // Generate the new mocked token (based on updated user ID)
        const newToken = `mocked-token-${users[userIndex].id}-${users[userIndex].user.username}`;
        console.log('new user array in handler:', users)
        // Return the updated user profile, new token, and the updated users array
        return new HttpResponse(
          JSON.stringify({
            userProfile: updatedUserProfile,
            token: newToken,
            users: users,  // Return the updated users array
          }),
          { status: 200 }
        );

      } catch (error) {
        console.error('Error updating user:', error);
        return new HttpResponse(null, { status: 400 });
      }
    }
  ),



  // Mocking DELETE /users/:id
  http.delete<UserParams, DeleteUserResponseBody>(
    `${API_URL}/users/:id`,
    async ({ params, cookies }: { params: UserParams; cookies: Record<string, string> }) => {
      const { id } = params;
      const token = cookies.token;

      // If no token is provided in cookies, return Forbidden response
      if (!token) {
        return new HttpResponse(null, { status: 403 });
      }

      // Sample users array (this would typically come from your database)
      // const users = [
      //   { id: 1, user: { username: 'user1', email: 'user1@example.com', password: 'User1@password1', privacyPolicy: true, role: 'admin' } },
      //   { id: 2, user: { username: 'user2', email: 'user2@example.com', password: 'User2@password2', privacyPolicy: true, role: 'user' } },
      //   { id: 3, user: { username: 'user3', email: 'user3@example.com', password: 'User3@password3', privacyPolicy: false, role: 'user' } },
      // ];

      // Find the index of the user with the given id
      const userIndex = users.findIndex(user => user.id === Number(id));

      if (userIndex === -1) {
        // User not found
        return new HttpResponse(null, { status: 404 });
      }

      // Remove the user from the users array
      users.splice(userIndex, 1); // This removes the user at the found index


      // Return the updated users array after deletion
      return HttpResponse.json({
        message: `User with ID ${id} has been deleted.`,
        users,
      });
    }
  ),


];


// import { http, HttpResponse } from 'msw';
// import {
//   User,
//   NewUserRequestBody,
//   UpdatedUserRequestBody,
//   DeleteUserResponseBody,
//   UserParams,
// } from '@/app/utilities/definitions';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// // Global users array shared across all handlers
// const users: User[] = [
//   { id: 1, user: { username: 'user1', email: 'user1@example.com', password: 'User1@password1', privacyPolicy: true, role: 'admin' } },
//   { id: 2, user: { username: 'user2', email: 'user2@example.com', password: 'User2@password2', privacyPolicy: true, role: 'user' } },
//   { id: 3, user: { username: 'user3', email: 'user3@example.com', password: 'User3@password3', privacyPolicy: false, role: 'user' } },
// ];

// let lastAssignedUserId = 3;
// let lastAssignedLogId = 103;

// // Function to generate a new user ID
// function generateNewUserId(): number {
//   lastAssignedUserId += 1;
//   return lastAssignedUserId;
// }

// // Function to generate a new log ID
// function generateNewLogId(): number {
//   lastAssignedLogId += 1;
//   return lastAssignedLogId;
// }

// export const userHandlers = [
//   // Mocking GET /users
//   http.get<never, User[]>(`${API_URL}/users`, async ({ cookies }) => {
//     const token = cookies.token; // Extract token from cookies
//     if (!token) {
//       return new HttpResponse(null, { status: 403 });
//     }
//     return HttpResponse.json(users); // Return the global users array
//   }),

//   // Mocking GET /users/:id
//   http.get<{ id: string }>(`${API_URL}/users/:id`, async ({ params, cookies }) => {
//     const { id } = params;
//     const token = cookies.token;

//     if (!token) {
//       return new HttpResponse(null, { status: 403 });
//     }

//     const user = users.find((user) => user.id === Number(id));

//     if (!user) {
//       return new HttpResponse(null, { status: 404 });
//     }

//     return HttpResponse.json(user);
//   }),

//   // Mocking POST /users
//   http.post<never, NewUserRequestBody>(`${API_URL}/users`, async ({ request }: { request: Request }) => {
//     // Parse the JSON request body
//     const newUser = (await request.json()) as NewUserRequestBody;
  

//     const userId = generateNewUserId();
//     const logId = generateNewLogId();

//     const createdUser: User = {
//       id: userId,
//       user: {
//         username: newUser.username,
//         email: newUser.email,
//         password: newUser.password,
//         privacyPolicy: newUser.privacyPolicy,
//         role: newUser.role,
//       },
//     };

//     users.push(createdUser);

//     const token = `mocked-token-${createdUser.id}`;

//     const accessLog = {
//       id: logId,
//       userId: createdUser.id,
//       accesstime: new Date().toISOString(),
//       access_locate: `${createdUser.user.username}-${createdUser.id}-ipAddress`,
//     };

//     return HttpResponse.json({ user: createdUser, users, token, accessLog }, { status: 201 });
//   }),

//   // Mocking PUT /users/:id
//   http.put<{ id: string }, { user: Partial<UpdatedUserRequestBody> }>(
//     `${API_URL}/users/:id`,
//     async ({ params, cookies, request }) => {
//       const { id } = params;
//       const token = cookies.token;

//       if (!token) {
//         return new HttpResponse(null, { status: 403 });
//       }

//       const userIndex = users.findIndex((user) => user.id === Number(id));

//       if (userIndex === -1) {
//         return new HttpResponse(null, { status: 404 });
//       }

//       const updatedData = await request.json() as Partial<User['user']>;
//       users[userIndex].user = { ...users[userIndex].user, ...updatedData };

//       const updatedUser = users[userIndex];
//       const newToken = `mocked-token-${updatedUser.id}`;

//       return HttpResponse.json({ user: updatedUser, token: newToken, users }, { status: 200 });
//     }
//   ),

//   // Mocking DELETE /users/:id
//   http.delete<UserParams, DeleteUserResponseBody>(
//     `${API_URL}/users/:id`,
//     async ({ params, cookies }) => {
//       const { id } = params;
//       const token = cookies.token;

//       if (!token) {
//         return new HttpResponse(null, { status: 403 });
//       }

//       const userIndex = users.findIndex((user) => user.id === Number(id));

//       if (userIndex === -1) {
//         return new HttpResponse(null, { status: 404 });
//       }

//       users.splice(userIndex, 1);

//       return HttpResponse.json({ message: `User with ID ${id} has been deleted.`, users }, { status: 200 });
//     }
//   ),
// ];
