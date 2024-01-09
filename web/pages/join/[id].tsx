import { useRouter } from 'next/router';
import SelfCamera from '@/components/Camera/SelfCamera';
import VideoButton from '@/components/Button/VideoButton';
import MicrophoneButton from '@/components/Button/MicrophoneButton';
import SpeakerSelector from '@/components/Selecter/SpeakerSelector';
import useDevices from '@/hooks/useDevices';


const Join = () => {
  const cameraDevices = useDevices('videoinput')
  console.log(cameraDevices)
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1>Self Camera</h1>
      <SelfCamera />
    </div>
  )
}

export default Join;