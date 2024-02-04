import { useRouter } from 'next/router';
import axios from '@/libs/axios';
import toast from 'react-hot-toast';
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form';

const Home = () => {
  const router = useRouter();

  type InputValues = {
    roomCode: string
  }

  const schema = yup
    .object({
      roomCode: yup.string().uuid().required()
    })
    .required()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const invalidRoomToast = (type: 'invalid' | 'notFound' | 'error') => {
    switch (type) {
      case 'invalid':
        toast.error('無効なルームコードです')
        break
      case 'notFound':
        toast.error('部屋が見つかりませんでした')
        break
      default:
        toast.error('想定外のエラーが発生しました。')
        break
    }
  }

  const joinRoom = async (data: InputValues) => {
    await axios.get(`/api/rooms/${data.roomCode}`)
      .then(() => router.push(`/join/${data.roomCode}`))
      .catch(error => {
        if (error.response) {
          switch (error.response.status) {
            case 404:
            case 422:
              console.log(error.response.status)
              invalidRoomToast('notFound')
              break
            default:
              console.log(error)
              invalidRoomToast('error')
              break
          }
        }
      })
  }

  const createRoom = async () => {
    await axios.post(`/api/rooms`)
      .then((res) => {
        router.push(`/join/${res.data.id}`);
      }).catch((_e) => {
        toast.error('想定外のエラーが発生しました。');
      })
  }

  return (
    <div className='hero h-full min-h-screen'>
      <div className="hero-content text-center m-auto w-full max-w-xs">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-bold">MeetUp</h1>
          <p className="py-6">無料で使えるビデオ通話アプリ</p>
          <div className="join flex">
            <input
              {...register("roomCode")}
              className="flex-0 input input-bordered join-item pr-[0.2rem] sm:pr-[1rem]"
              placeholder="Room Code"
            />
            <button
              onClick={handleSubmit(joinRoom, () => invalidRoomToast('invalid'))}
              className="flex-1 btn btn-neutral join-item"
            >
              参加
            </button>
          </div>
          <div className="dropdown w-full">
            <button tabIndex={0} className="btn btn-neutral w-full mt-2">ルーム作成</button>
            <ul tabIndex={0} className="dropdown-content z-[1] menu mt-1 p-2 shadow rounded-box w-52">
              <li>
                <button
                  onClick={createRoom}
                >
                  今すぐ作成をする
                </button>
              </li>
              {/* TODO: 予約機能の作成 */}
              {/* <li><button>予約する</button></li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
