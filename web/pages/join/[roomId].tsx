import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userProfileState } from '@/atoms/userProfileState';
import SelfCamera from '@/components/Camera/SelfCamera';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { preparedState } from '@/atoms/prepeardState';

const Join = () => {
  const router = useRouter();
  const setPrepared = useSetRecoilState(preparedState);
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);
  const [userName, setUserName] = useState(userProfile.username || '');

  const joinRoom = async () => {
    if (userName === '' || userName.length > 20) {
      setUserName('ゲスト')
      setUserProfile({...userProfile, username: 'ゲスト'})
    } else {
      setUserProfile({...userProfile, username: userName})
    }

    setPrepared(true)
    router.push(`/room/${router.query.roomId}`)
  }

  useEffect(() => {
    if (router.query.roomId == undefined) return

    axios.get(`/api/rooms/${router.query.roomId}`)
      .catch((error) => {
        if (error.response) {
          switch (error.response.status) {
            case 200:
              break;
            default:
              router.push('/')
              break;
          }
        }
      })
  }, [router, router.isReady, router.query.roomId]);

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex justify-evenly items-center w-full max-w-[1400px] flex-wrap p-2'>
        <SelfCamera
          width={740}
          height={416}
          withControlls={true}
        />
        <div className='w-full max-w-sm my-6 md:mx-4'>
          <article className="prose">
            <h2 className='p-2 text-center'>Are you READY?</h2>
          </article>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">表示名</span>
            </div>
            <input
              value={userName}
              onChange={(e) => {setUserName(e.target.value)}}
              placeholder="ゲスト"
              className="input input-bordered w-full"
            />
          </label>
          <button
            onClick={joinRoom}
            className="btn w-full btn-neutral mt-4"
          >
            参加する
          </button>
          <div className='flex justify-center'>
            <Link href="/" className='mt-6 text-xs hover:text-primary hover:underline'>
              参加せずに、トップページに戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Join;