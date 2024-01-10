import SelfCamera from '@/components/Camera/SelfCamera';
import useDevices from '@/hooks/useDevices';
import { PiMicrophoneSlashFill } from "react-icons/pi"


const Join = () => {
  const cameraDevices = useDevices('videoinput')
  console.log(cameraDevices)
  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='flex justify-evenly items-center w-full flex-wrap'>
        <SelfCamera />
        <div className='w-full max-w-sm'>
          <article className="prose">
            <h2 className='p-2 text-center'>Are you READY?</h2>
          </article>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">表示名</span>
            </div>
            <input
              type="text"
              placeholder="ゲスト"
              className="input input-bordered w-full"
            />
          </label>
          <button className="btn w-full btn-neutral mt-4">
            参加する
          </button>
        </div>
      </div>
    </div>
  )
}

export default Join;