import { useRouter } from 'next/router';

const JoinRoom = () => {
  const router = useRouter();
  return (
    <h1>{router.query.id}</h1>
  )
}

export default JoinRoom;