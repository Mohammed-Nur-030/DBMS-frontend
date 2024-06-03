/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n#graphql\n    mutation CreateTweet($payload:CreateTweetData!){\n        createTweet(payload:$payload){\n            id\n        }\n    }\n\n": types.CreateTweetDocument,
    "#graphql \n    \nmutation FollowUser($to: ID!) {\n  followUser(to: $to)\n}\n": types.FollowUserDocument,
    "#graphql \n    \nmutation UnFollowUser($to: ID!) {\n  unFollowUser(to: $to)\n}\n": types.UnFollowUserDocument,
    "#graphql \nquery GetAllTweets{\n    getAllTweets {\n            id\n            content\n            imageUrl\n            author{\n                id\n                firstName\n                lastName\n                profileImageUrl\n               \n            }\n    }\n}\n ": types.GetAllTweetsDocument,
    "#graphql \n query GetSignedUrl($imageName: String!, $imageType: String!) {\n  getSignedUrlForTweet(imageName: $imageName, imageType: $imageType)\n}\n ": types.GetSignedUrlDocument,
    "#graphql\nquery VerifyUserGoogleToken($token:String!){\n   verifyGoogleToken(token:$token)\n}\n": types.VerifyUserGoogleTokenDocument,
    "#graphql\nquery GetCurrentUser{\n   getCurrentUser {\n    email\n    id\n    profileImageUrl\n    firstName\n    lastName\n    followers{\n      id\n      firstName\n      lastName\n      profileImageUrl\n    }\n    following{\n      id\n      firstName\n      lastName\n      profileImageUrl\n    }\n    recommendedUsers{\n      id\n      firstName\n      lastName\n      profileImageUrl\n    }\n    tweets{\n      id\n      content\n      imageUrl\n      author{\n         firstName\n         lastName\n         profileImageUrl\n      }\n    }\n  }\n}\n": types.GetCurrentUserDocument,
    "#graphql\n\nquery GetUserById($id: ID!) {\n  getUserById(id: $id) {\n   id\n    firstName\n    lastName\n    profileImageUrl\n    followers{\n      id\n      firstName\n      lastName\n      profileImageUrl\n    }\n    following{\n      id\n      firstName\n      lastName\n      profileImageUrl\n    }\n    tweets{\n      content\n      id\n      author {\n        firstName\n        lastName\n        profileImageUrl\n      }\n    }\n  }\n}\n  \n\n": types.GetUserByIdDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n#graphql\n    mutation CreateTweet($payload:CreateTweetData!){\n        createTweet(payload:$payload){\n            id\n        }\n    }\n\n"): (typeof documents)["\n#graphql\n    mutation CreateTweet($payload:CreateTweetData!){\n        createTweet(payload:$payload){\n            id\n        }\n    }\n\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql \n    \nmutation FollowUser($to: ID!) {\n  followUser(to: $to)\n}\n"): (typeof documents)["#graphql \n    \nmutation FollowUser($to: ID!) {\n  followUser(to: $to)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql \n    \nmutation UnFollowUser($to: ID!) {\n  unFollowUser(to: $to)\n}\n"): (typeof documents)["#graphql \n    \nmutation UnFollowUser($to: ID!) {\n  unFollowUser(to: $to)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql \nquery GetAllTweets{\n    getAllTweets {\n            id\n            content\n            imageUrl\n            author{\n                id\n                firstName\n                lastName\n                profileImageUrl\n               \n            }\n    }\n}\n "): (typeof documents)["#graphql \nquery GetAllTweets{\n    getAllTweets {\n            id\n            content\n            imageUrl\n            author{\n                id\n                firstName\n                lastName\n                profileImageUrl\n               \n            }\n    }\n}\n "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql \n query GetSignedUrl($imageName: String!, $imageType: String!) {\n  getSignedUrlForTweet(imageName: $imageName, imageType: $imageType)\n}\n "): (typeof documents)["#graphql \n query GetSignedUrl($imageName: String!, $imageType: String!) {\n  getSignedUrlForTweet(imageName: $imageName, imageType: $imageType)\n}\n "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\nquery VerifyUserGoogleToken($token:String!){\n   verifyGoogleToken(token:$token)\n}\n"): (typeof documents)["#graphql\nquery VerifyUserGoogleToken($token:String!){\n   verifyGoogleToken(token:$token)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\nquery GetCurrentUser{\n   getCurrentUser {\n    email\n    id\n    profileImageUrl\n    firstName\n    lastName\n    followers{\n      id\n      firstName\n      lastName\n      profileImageUrl\n    }\n    following{\n      id\n      firstName\n      lastName\n      profileImageUrl\n    }\n    recommendedUsers{\n      id\n      firstName\n      lastName\n      profileImageUrl\n    }\n    tweets{\n      id\n      content\n      imageUrl\n      author{\n         firstName\n         lastName\n         profileImageUrl\n      }\n    }\n  }\n}\n"): (typeof documents)["#graphql\nquery GetCurrentUser{\n   getCurrentUser {\n    email\n    id\n    profileImageUrl\n    firstName\n    lastName\n    followers{\n      id\n      firstName\n      lastName\n      profileImageUrl\n    }\n    following{\n      id\n      firstName\n      lastName\n      profileImageUrl\n    }\n    recommendedUsers{\n      id\n      firstName\n      lastName\n      profileImageUrl\n    }\n    tweets{\n      id\n      content\n      imageUrl\n      author{\n         firstName\n         lastName\n         profileImageUrl\n      }\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n\nquery GetUserById($id: ID!) {\n  getUserById(id: $id) {\n   id\n    firstName\n    lastName\n    profileImageUrl\n    followers{\n      id\n      firstName\n      lastName\n      profileImageUrl\n    }\n    following{\n      id\n      firstName\n      lastName\n      profileImageUrl\n    }\n    tweets{\n      content\n      id\n      author {\n        firstName\n        lastName\n        profileImageUrl\n      }\n    }\n  }\n}\n  \n\n"): (typeof documents)["#graphql\n\nquery GetUserById($id: ID!) {\n  getUserById(id: $id) {\n   id\n    firstName\n    lastName\n    profileImageUrl\n    followers{\n      id\n      firstName\n      lastName\n      profileImageUrl\n    }\n    following{\n      id\n      firstName\n      lastName\n      profileImageUrl\n    }\n    tweets{\n      content\n      id\n      author {\n        firstName\n        lastName\n        profileImageUrl\n      }\n    }\n  }\n}\n  \n\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;