import { useRouter } from 'next/router';
import { useState } from 'react';

const Home = () => {
  const router = useRouter();
  const [roomId, setRoomId] = useState('');

  const joinRoom = () => {
    router.push(`/join/${roomId}`)
  }

  return (
    <div className='hero h-full min-h-screen'>
      <div className="hero-content text-center m-auto w-full max-w-xs">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-bold">MeetUp</h1>
          <p className="py-6">無料で使えるビデオ通話アプリ</p>
          <div className="join flex">
            <input
              value={roomId}
              onChange={(e) => {setRoomId(e.target.value)}}
              className="flex-0 input input-bordered join-item"
              placeholder="Room Code"
            />
            <button
              onClick={joinRoom}
              className="flex-1 btn btn-neutral join-item"
            >
              参加
            </button>
          </div>
          <div className="dropdown w-full">
            <button tabIndex={0} className="btn btn-neutral w-full mt-2">ルーム作成</button>
            <ul tabIndex={0} className="dropdown-content z-[1] menu mt-1 p-2 shadow rounded-box w-52">
              <li><button>今すぐ作成をする</button></li>
              <li><button>予約する</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
