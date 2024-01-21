import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userState } from '@/atoms/userState';
import { originalStreamState, localStreamState, screenStreamState } from '@/atoms/streamState';
import { videoConstraints } from '@/utils/static';
import SelfCamera from '@/components/Camera/SelfCamera';
import Link from 'next/link';

const Join = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [user, setUser] = useRecoilState(userState);
  const [userName, setUserName] = useState(user.username || '');
  // TODO: add message when camera and microphone was rejected.
  const [isRejected, setIsRejected] = useState(false);
  const setOriginStream = useSetRecoilState(originalStreamState);
  const setLocalStream = useSetRecoilState(localStreamState);
  const setScreenStream = useSetRecoilState(screenStreamState);
  
  const requestMediaStream = useCallback(async () => {
    if (!navigator.mediaDevices.getUserMedia || !videoRef.current) return;

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia(videoConstraints);
      setOriginStream(mediaStream);
      const stream = new MediaStream(mediaStream);
      setLocalStream(stream);
      const screenStream = new MediaStream(stream);
      videoRef.current.srcObject = screenStream;
      setScreenStream(screenStream);
    } catch (e) {
      setIsRejected(false);
    }
  }, [setLocalStream, setOriginStream, setScreenStream])

  const joinRoom = () => {
    if (userName === '' || userName.length > 20) {
      return setUser({...user, username: 'ゲスト'})
    }

    requestMediaStream();

    setUser({...user, username: userName})
  }

  useEffect(() => {
    requestMediaStream();
  }, [requestMediaStream])

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex justify-evenly items-center w-full max-w-[1400px] flex-wrap p-2'>
        <SelfCamera
          width={740}
          height={416}
          ref={videoRef}
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
          <div className='hover:text-primary hover:underline flex justify-center'>
            <Link href="/" className='mt-6 text-xs'>
              参加せずに、トップページに戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Join;