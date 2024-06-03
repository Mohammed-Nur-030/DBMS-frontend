import { graphql } from "../../gql";

export const getAllTweetsQuery=graphql(`#graphql 
query GetAllTweets{
    getAllTweets {
            id
            content
            imageUrl
            author{
                id
                firstName
                lastName
                profileImageUrl
               
            }
    }
}
 `)

 export const getSignedUrlForTweetQuery=graphql(`#graphql 
 query GetSignedUrl($imageName: String!, $imageType: String!) {
  getSignedUrlForTweet(imageName: $imageName, imageType: $imageType)
}
 `)