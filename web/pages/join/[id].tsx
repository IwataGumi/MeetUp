import { useRouter } from 'next/router';
import VideoButton from '@/components/Button/VideoButton';
import MicrophoneButton from '@/components/Button/MicrophoneButton';
import SpeakerSelector from '@/components/Selecter/SpeakerSelector';


const JoinRoom = () => {
  const router = useRouter();
  return (
    <div className='flex flex-col'>
      <div>
        <h1>{router.query.id}</h1>
      </div>
      <div className='flex'>
        <MicrophoneButton />
        <VideoButton />
      </div>
      <div className='flex'>
        <SpeakerSelector />
      </div>
    </div>
  )
}

export default JoinRoom;