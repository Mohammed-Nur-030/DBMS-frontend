import { graphQLClient } from "@/clients/api"
import { CreateTweetData } from "@/gql/graphql"
import { getAllTweetsQuery } from "@/graphql/query/tweet"
import { createTweetMutation } from "@/graphql/mutation/tweet"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

export const useCreateTweet = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload: CreateTweetData) => graphQLClient.request(createTweetMutation, { payload }),
    onMutate:()=>toast.loading('Creating Tweet',{id:'1'}),
      onSuccess: async() => {
        await queryClient.invalidateQueries({ queryKey: ['all-tweets'] })
        toast.success('Successfully Tweeted',{id:'1'})
      }
  })
  return mutation
  }


export const useGetAllTweets = () => {
  const query = useQuery({
    queryKey: ['all-tweets'],
    queryFn: () => graphQLClient.request(getAllTweetsQuery)
  })
  return { ...query, tweets: query.data?.getAllTweets }
}