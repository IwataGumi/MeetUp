import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

const Home = () => {
  return (
    <div className='hero'>
      <div className="hero-content text-center w-full max-w-xs">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-bold">MeetUp</h1>
          <p className="py-6">無料で使えるビデオ通話アプリ</p>
          <div className="join">
            <input className="input join-item" placeholder="Room Code"/>
            <button className="btn btn-neutral join-item">参加</button>
          </div>
          <div className="dropdown w-full">
            <button tabIndex={0} className="btn w-full mt-2">ルーム作成</button>
            <ul tabIndex={0} className="dropdown-content z-[1] menu mt-1 p-2 shadow bg-base-100 rounded-box w-52">
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
