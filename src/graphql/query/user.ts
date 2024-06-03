// import { graphql } from "graphql";

import { graphql } from "../../gql";

// export const verifyGoogleTokenQuery=`#graphql
// query VerifyUserGoogleToken($token:String!){
//    verifyGoogleToken(token:$token)
// }
// `;

export const verifyGoogleTokenQuery=graphql(`#graphql
query VerifyUserGoogleToken($token:String!){
   verifyGoogleToken(token:$token)
}
`);
export const getCurrentUserQuery=graphql(`#graphql
query GetCurrentUser{
   getCurrentUser {
    email
    id
    profileImageUrl
    firstName
    lastName
    followers{
      id
      firstName
      lastName
      profileImageUrl
    }
    following{
      id
      firstName
      lastName
      profileImageUrl
    }
    recommendedUsers{
      id
      firstName
      lastName
      profileImageUrl
    }
    tweets{
      id
      content
      imageUrl
      author{
         firstName
         lastName
         profileImageUrl
      }
    }
  }
}
`);


export const getUserByIdQuery=graphql(`#graphql

query GetUserById($id: ID!) {
  getUserById(id: $id) {
   id
    firstName
    lastName
    profileImageUrl
    followers{
      id
      firstName
      lastName
      profileImageUrl
    }
    following{
      id
      firstName
      lastName
      profileImageUrl
    }
    tweets{
      content
      id
      author {
        firstName
        lastName
        profileImageUrl
      }
    }
  }
}
  

`);


