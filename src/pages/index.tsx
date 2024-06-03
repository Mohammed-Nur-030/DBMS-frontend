import FeedCard from '@/components/FeedCard'
import { SlOptions } from 'react-icons/sl'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { graphQLClient } from '@/clients/api'
import { verifyGoogleTokenQuery } from '@/graphql/query/user'
import { useCurrentUser } from '@/hooks/user'
import { useQueryClient } from '@tanstack/react-query'

import TwitterLayout from '@/components/Layout/TwitterLayout'
import { BiImageAlt } from 'react-icons/bi'
import Image from 'next/image'
import { useCreateTweet, useGetAllTweets } from '@/hooks/tweet'
import { Tweet } from '@/gql/graphql'
import { GetServerSideProps } from 'next'
import { getAllTweetsQuery, getSignedUrlForTweetQuery } from '@/graphql/query/tweet'
import axios from 'axios'



interface HomeProps {
  tweets?: Tweet[]
}

export default function Home(props: HomeProps) {
  const { user } = useCurrentUser();
  const { tweets=props.tweets as Tweet[] } = useGetAllTweets();
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');


  const { mutateAsync } = useCreateTweet();


  // console.log(user?.profileImageUrl)
  const queryClient = useQueryClient();

  const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
    return async (event: Event) => {
      event.preventDefault();
      console.log(input.files)
      const file: File | null | undefined = input.files?.item(0)
      if (!file) return
      const { getSignedUrlForTweet } = await graphQLClient.request(getSignedUrlForTweetQuery, {
        imageName: file.name,
        imageType: file.type
      })

      if (getSignedUrlForTweet) {
        toast.loading('Uploading..', { id: '2' })
        await axios.put(getSignedUrlForTweet, file, {
          headers: {
            'Content-Type': file.type
          }
        })
        toast.success('Upload Complete', { id: '2' })
        const url = new URL(getSignedUrlForTweet)
        const myFilePath = `${url.origin}${url.pathname}`
        setImageUrl(myFilePath)
      }
    }
  }, [])


  const handleSelectImage = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*')

    const handlerFn = handleInputChangeFile(input)

    input.addEventListener('change', handlerFn)
    input.click();
  }, [])

  const handleCreateTweet = useCallback(async() => {
   await mutateAsync({
      content,
      imageUrl
    })
    setContent("");
    setImageUrl("")
   
  }, [content, mutateAsync,imageUrl])


  return (

    // <div className={`grid grid-cols-12 h-screen w-screen px-32 pt-8`} >
    //   <div className='col col-span-3 flex flex-col border-4 border-red-400 pr-4 relative '>
    //     <div className='text-white text-[40px] h-fit w-fit p-2 hover:bg-gray-500 rounded-full transition-all'>
    //       <BsTwitter />
    //     </div>
    //     <div className='flex flex-col text-white font-semibold'>
    //       <ul>
    //         {
    //           SideBarMenuItems.map((items, index) => {
    //             return (
    //               <li key={index} className='flex justify-start items-center text-[18px] gap-2 mt-3  hover:bg-gray-500 rounded-full px-5 py-2 w-fit cursor-pointer '>
    //                 <span>{items.icon}</span>
    //                 <span>{items.title}</span>
    //               </li>
    //             )
    //           })
    //         }
    //       </ul>
    //       <button className='bg-[#1d9bf0] py-2  px-4 rounded-full w-full mt-12'>
    //         Tweet
    //       </button>
    //     </div>
    //     <div>
    //       {
    //         (user && user.profileImageUrl) && (

    //           <div className='mt-5 absolute bottom-5 flex items-center justify-center gap-2 text-white p-1 px-3 ml-4 rounded-full bg-slate-500 '>
    //             <Image src={user?.profileImageUrl}
    //               alt='profile'
    //               height={40}
    //               width={40}
    //               className='rounded-full '
    //             ></Image>
    //             <h3>{user.firstName} {user.lastName}</h3>
    //           </div>
    //         )
    //       }
    //     </div>
    //   </div>


    //   <div className='scroll-box col border-r-[0.2px] border-l-[0.2px] border-l-slate-500 border-r-slate-500 col-span-6 h-screen ' >

    //     <div className='  grid-cols-12  flex-col border-t border-gray-300 p-5 text-white gap-2 '>
    //       <div className='grid col-span-1'>
    //         {
    //           user?.profileImageUrl && <Image
    //             src={user?.profileImageUrl}
    //             alt='User Image'
    //             height={40}
    //             width={40}
    //             className='rounded-full '
    //           />
    //         }
    //       </div>
    //       <div className='grid col-span-11 text-[15px]'>
    //         <textarea rows={3}
    //         value={content}
    //         onChange={e=>setContent(e.target.value)}
    //           placeholder="What's happening?"
    //           className='w-full bg-transparent text-xl px-3 border-b border-slate-700'>
    //         </textarea>
    //         <div className='mt-2 flex justify-between items-center '>
    //           <BiImageAlt className='text-xl cursor-pointer '
    //             onClick={handleSelectImage}

    //           />
    //           <button
    //             className='bg-[#1d9bf0] py-2  px-4 rounded-full  text-sm'
    //             onClick={handleCreateTweet}
    //             >
    //             Tweet
    //           </button>
    //         </div>

    //       </div>

    //     </div>
    //     {
    //       tweets?.map(tweet => tweet ? <FeedCard key={tweet.id} data={tweet as Tweet} /> : null)
    //     }

    //   </div>

    //   <div className='col  col-span-3  border-2 border-red-400 p-5'>
    //     {
    //       !user && (
    //         <div className=' border-2 border-white py-5 bg-slate-800 rounded-lg flex flex-col justify-center items-center'>
    //           <h1 className='text-white my-2 '>New to Y?</h1>
    //           <GoogleLogin onSuccess={handleLoginWithGoogle}></GoogleLogin>
    //         </div>
    //       )
    //     }


    //   </div>

    // </div>
    <TwitterLayout>

      <div className='  grid-cols-12  flex-col border-t border-gray-300 p-5 text-white gap-2 '>
        <div className='grid col-span-1'>
          {
            user?.profileImageUrl && <Image
              src={user?.profileImageUrl}
              alt='User Image'
              height={40}
              width={40}
              className='rounded-full '
            />
          }
        </div>
        <div className='grid col-span-11 text-[15px]'>
          <textarea rows={3}
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="What's happening?"
            className='w-full bg-transparent text-xl px-3 border-b border-slate-700'>
          </textarea>
          {
            imageUrl && <Image
              src={imageUrl}
              alt='tweet-image'
              height={300}
              width={300}

            />
          }
          <div className='mt-2 flex justify-between items-center '>
            <BiImageAlt className='text-xl cursor-pointer '
              onClick={handleSelectImage}

            />
            <button
              className='bg-[#1d9bf0] py-2  px-4 rounded-full  text-sm'
              onClick={handleCreateTweet}
            >
              Tweet
            </button>
          </div>

        </div>

      </div>
      {
        tweets?.map(tweet => tweet ? <FeedCard key={tweet.id} data={tweet as Tweet} /> : null)
      }

    </TwitterLayout>
  )
}
export const getServerSideProps: GetServerSideProps<HomeProps> = async (content) => {
  const allTweets = graphQLClient.request(getAllTweetsQuery);
  return {
    props: {
      tweets: (await allTweets).getAllTweets as Tweet[]
    }
  }
}

