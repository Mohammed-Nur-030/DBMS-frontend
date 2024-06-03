import React, { useCallback, useMemo } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import TwitterLayout from '@/components/Layout/TwitterLayout'
import { BsArrowLeftShort } from 'react-icons/bs'
import Image from 'next/image'
import { useCurrentUser } from '@/hooks/user'
import FeedCard from '@/components/FeedCard'
import { Tweet, User } from '@/gql/graphql'
import { useRouter } from 'next/router'
import { graphQLClient } from '@/clients/api'
import { getUserByIdQuery } from '@/graphql/query/user'
import { Server } from 'http'
import { followUserMutation, unFollowUserMutation } from '@/graphql/mutation/user'
import { useQueryClient } from '@tanstack/react-query'

interface ServerProps {
    userInfo?: User
}


const UserPage: NextPage<ServerProps> = (props) => {
    const router = useRouter();
    const { user: currentUser } = useCurrentUser();
    const queryClient = useQueryClient();
    // console.log(router.query)
    // console.log(props)
    const amIFolowing = useMemo(() => {
        if (!props.userInfo) return false;
        return (
            (currentUser?.following?.findIndex(
                (el) => el?.id === props.userInfo?.id
            ) ?? -1) >= 0 /* >= */
        )
    }, [currentUser?.following, props.userInfo])
    console.log("amIFollowing", amIFolowing)

    const handleFollow = useCallback(async () => {
        if (!props.userInfo?.id) return;
        await graphQLClient.request(followUserMutation, { to: props.userInfo?.id })
        await queryClient.invalidateQueries({ queryKey: ['current-user'] })

    }, [props.userInfo?.id, queryClient])
    
    const handleUnFollow = useCallback(async () => {
        if (!props.userInfo?.id) return;
        await graphQLClient.request(unFollowUserMutation, { to: props.userInfo?.id })
        await queryClient.invalidateQueries({ queryKey: ['current-user'] })

    }, [props.userInfo?.id, queryClient])
    return (
        <div>
            <TwitterLayout>
                <div>
                    <nav className=' flex items-center gap-3 py-3 px-3 text-white'>
                        <BsArrowLeftShort className='text-4xl' />
                        <div>
                            <h1 className='text-2xl font-bold'>{props.userInfo?.firstName} {props.userInfo?.lastName}</h1>
                            <h1 className='text-md font-bold text-slate-500'>{props.userInfo?.tweets?.length} tweets</h1>
                        </div>


                    </nav>

                    <div className='p-4 border-b border-slate-500  text-white'>
                        {
                            props.userInfo?.profileImageUrl && <Image
                                src={props.userInfo?.profileImageUrl}
                                alt='user profile'
                                height={100}
                                width={100}
                                className='rounded-full'
                            ></Image>
                        }
                        <h1 className='text-2xl font-bold mt-5'>{props.userInfo?.firstName} {props.userInfo?.lastName}</h1>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-4 mt-2 text-sm text-gray-400'>
                                <span> {props.userInfo?.followers?.length} followers</span>
                                <span> {props.userInfo?.following?.length} followings</span>
                            </div>
                            {
                                currentUser && currentUser?.id !== props.userInfo?.id && (
                                    <>
                                        {
                                            amIFolowing ? (
                                                <button className='bg-white text-black px-3 py-2 text-sm rounded-full font-semibold' onClick={handleUnFollow}>
                                                    Unfollow
                                                </button>
                                            ) : (
                                                <button className='bg-white text-black px-3 py-2 text-sm rounded-full font-semibold' onClick={handleFollow}>
                                                Follow
                                                </button>
                                            )
                                        }
                                    </>
                                )
                            }


                        </div>
                    </div>

                    <div>
                        {
                            props.userInfo?.tweets?.map(tweet => tweet ? <FeedCard key={tweet.id} data={tweet as Tweet} /> : null)
                        }
                    </div>
                </div>
            </TwitterLayout>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async (context) => {
    const id = context.query.id as string | undefined;
    if (!id) return { notFound: true, props: { userInfo: undefined } }

    const userInfo = await graphQLClient.request(getUserByIdQuery, { id });

    if (!userInfo.getUserById) return { notFound: true }

    return {
        props: {
            userInfo: userInfo.getUserById as User
        }
    }

}


export default UserPage
