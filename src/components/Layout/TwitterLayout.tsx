import React, { useCallback, useMemo } from 'react'
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from 'react-icons/bs'
import { BiHash, BiHomeCircle, BiImageAlt, BiUser } from 'react-icons/bi'
import { SlOptions } from 'react-icons/sl';
import { useCurrentUser } from '@/hooks/user';
import Image from 'next/image'
import toast from 'react-hot-toast';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { verifyGoogleTokenQuery } from '@/graphql/query/user';
import { graphQLClient } from '@/clients/api';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';


interface TwitterLayoutProps {
  children: React.ReactNode
}
interface TwitterSideBarButton {
  title: string;
  icon: React.ReactNode;
  link: string
}




const TwitterLayout: React.FC<TwitterLayoutProps> = (props) => {
  const { user } = useCurrentUser();

  const SideBarMenuItems: TwitterSideBarButton[] = useMemo(() => [
    {
      title: "Home",
      icon: <BiHomeCircle />,
      link: '/'
    },
    {
      title: "Explore",
      icon: <BiHash />,
      link: '/'
    },
    {
      title: "Notifications",
      icon: <BsBell />,
      link: '/'

    },
    {
      title: "Messages",
      icon: <BsEnvelope />,
      link: '/'
    },
    {
      title: "Bookmarks",
      icon: <BsBookmark />,
      link: '/'
    },
    {
      title: "Profile",
      icon: <BiUser />,
      link: `/${user?.id}`
    },
    {
      title: "More Options",
      icon: <SlOptions />,
      link: '/'
    },
  ], [user?.id])
  const queryClient = useQueryClient();



  const handleLoginWithGoogle = useCallback(async (cred: CredentialResponse) => {
    const googleToken = cred.credential
    if (!googleToken) return toast.error(`Google Token not found`)

    const { verifyGoogleToken } = await graphQLClient.request(verifyGoogleTokenQuery, { token: googleToken })
    toast.success(`Verified Successfully`)
    console.log(verifyGoogleToken)

    if (verifyGoogleToken)
      window.localStorage.setItem("__y_token", verifyGoogleToken)


    // await QueryClient.invalidateQueries({ queryKey: ['current-user'] });
  }, [QueryClient])




  return (
    <div className={`grid grid-cols-12 h-screen w-screen  pt-8 sm:px-24`} >
      <div className='col col-span-1 sm:col-span-3 flex flex-col  pr-4 relative '>

        <div className='flex justify-end pr-4 flex-col'>
          <div className='text-white text-[40px] h-fit w-fit p-2 hover:bg-gray-500 rounded-full transition-all'>
            <BsTwitter />
          </div>
          <div className='flex flex-col text-white font-semibold'>
            <ul>
              {
                SideBarMenuItems.map((items, index) => {
                  return (
                    <Link key={index} href={items.link} className='flex justify-start items-center text-[18px] gap-2 mt-3  hover:bg-gray-500 rounded-full px-5 py-2 w-fit cursor-pointer '>

                      <span>{items.icon}</span>
                      <span className='hidden sm:inline'>{items.title}</span>

                    </Link>
                  )
                })
              }
            </ul>
            <button className='hidden sm:block  bg-[#1d9bf0] py-2  px-4 rounded-full w-full mt-12'>
              Tweet
            </button>
            <button className='relative block sm:hidden  bg-[#1d9bf0] ml-1 w-10 h-10 rounded-full  '>
              <BsTwitter className='absolute top-2 left-2  text-2xl inline' />
            </button>
          </div>
        </div>

        <div className='hidden sm:block'>
          {
            (user && user.profileImageUrl) && (

              <div className='mt-5 absolute bottom-5 flex items-center justify-center gap-2 text-white p-1 px-3 ml-4 rounded-full bg-slate-500 '>
                <Image src={user?.profileImageUrl}
                  alt='profile'
                  height={40}
                  width={40}
                  className='rounded-full '
                ></Image>
                <h3>{user.firstName} {user.lastName}</h3>
              </div>
            )
          }
        </div>
        <div className='block sm:hidden  '>
          {
            (user && user.profileImageUrl) && (

              <div className='ml-1 mt-4 text-white p-1 rounded-full bg-slate-500 '>
                <Image src={user?.profileImageUrl}
                  alt='profile'
                  height={50}
                  width={50}
                  className='rounded-full '
                ></Image>
              </div>
            )
          }
        </div>
      </div>


      <div className='scroll-box col col-span-11 sm:col-span-5 border-r-[0.2px] border-l-[0.2px] border-l-slate-500 border-r-slate-500  h-screen overflow-auto' >
        {
          props.children
        }

      </div>


      <div className=' col col-span-3  0 p-5 flex h-[300px] w-[400px]'>
        {
          !user ? (
            <div className=' border-2 border-white py-5 bg-slate-800 rounded-lg flex flex-col justify-center items-center'>
              <h1 className='text-white my-2 '>New to Y?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle}></GoogleLogin>
            </div>
          ) : (
            <div className=' py-3 px-4 bg-slate-800 rounded-lg '>
              <h1 className='my-2 text-2xl mb-5 text-white'>People you may know</h1>
              {user?.recommendedUsers?.map(el => (
                <div key={el?.id} className='flex items-center gap-3 mt-2'>
                  {
                    el?.profileImageUrl && <Image
                      src={el?.profileImageUrl}
                      alt='user-image'
                      height={40}
                      width={40}
                      className='rounded-full '
                    ></Image>
                  }
                  <div>
                    <div className='text-[12px] text-white flex justify-between items-center  w-[200px]'>
                      <div>{el?.firstName} {el?.lastName}</div>
                      <Link href={`/${el?.id}`} className='bg-white text-black text-sm w-16 px-4 py-2  rounded-lg'>View</Link>
                    </div>
                  </div>
                </div>
              ))
              }
            </div>
          )
        }



      </div>

    </div>
  )
}

export default TwitterLayout
