import { Tweet } from '@/gql/graphql'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai'
import { BiMessageRounded } from 'react-icons/bi'
import { BsUpload } from 'react-icons/bs'
import { FaRetweet } from 'react-icons/fa'

interface FeedCardProps{
    data:Tweet
}


const FeedCard:React.FC<FeedCardProps> = (props) => {
    const {data}=props;
  return (
    <div className='grid grid-cols-12  flex-col border-t border-gray-300 p-5 text-white hover:bg-slate-600 gap-2 '>
     <div className='grid col-span-2'>
       {
        data.author?.profileImageUrl &&  <Image 
        src={data.author?.profileImageUrl}
        alt='User Image'
        height={40}
        width={40}
        className='rounded-full '
        /> 
       }
     </div>
     <div className='grid col-span-10 text-[15px] '>
        <Link href={`/${data.author?.id}`}>
        <h5>{data.author?.firstName} {data.author?.lastName}</h5>
        </Link>

        <pre></pre>
        <p>
           {data.content}
            </p>
            {
                data.imageUrl && (<Image
                src={data.imageUrl}
                alt='tweet-image'
                height={300}
                width={300}
              />)
            }

        <div className='flex justify-between mt-5 text-[20px] items-center  w-[75%] mx-auto '>
            <div>
                <BiMessageRounded/>
            </div>
            <div>
                <FaRetweet/>
            </div>
            <div>
                <AiOutlineHeart/>
            </div>
            <div>
                <BsUpload/>
            </div>
        </div>
     </div>

    </div>
  )
}

export default FeedCard
