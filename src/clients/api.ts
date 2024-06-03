import {GraphQLClient} from 'graphql-request'

const isClientSide=typeof window !=='undefined'


export const graphQLClient=new GraphQLClient(
    // process.env.NEXT_PUBLIC_API_URL as string ,{
    'http://localhost:8000/graphql',{
    headers:()=>({
        Authorization:isClientSide? `Bearer ${window.localStorage.getItem("__y_token")}` :'' 
    })
})