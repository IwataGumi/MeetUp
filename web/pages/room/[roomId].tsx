import { userProfileState } from "@/atoms/userProfileState";
import { usersState } from "@/atoms/usersState";
import VideoControlls from "@/components/Camera/Controlls/VideoControlls";
import VideoContainer from "@/components/Camera/VideoContainer";
import axios from "@/libs/axios";
import { WebSocketURL } from "@/utils/static";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState,  } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import ReconnectingWebSocket from 'reconnecting-websocket';
import { preparedState } from '@/atoms/prepeardState';
import { UserType } from "@/@types/state";

const Room = () => {
  const router = useRouter();
  const prepeard = useRecoilValue(preparedState);
  const [users, setUsers] = useRecoilState(usersState);
  const userProfile = useRecoilValue(userProfileState);
  const [message, setMessage] = React.useState<string>()
  const [isReady, setIsReady] = useState<boolean>(false);
  const websocketRef = useRef<ReconnectingWebSocket>();

  const connectWebscoket = useCallback(async (roomId: string | string[] | undefined) => {
    if (websocketRef === undefined) return;

    const websocket = new ReconnectingWebSocket(
      `${WebSocketURL}/ws/rooms/${roomId}`
    );
    websocketRef.current = websocket;

    const onMessage = (event: MessageEvent<string>) => {
      setMessage(event.data)
    }
    websocket.addEventListener('message', onMessage)

    return () => {
      websocket.close()
      websocket.removeEventListener('message', onMessage)
    }

  }, [])

  useEffect(() => {
    if (message !== undefined) {
      console.log(message)
      const data = JSON.parse(message)
      switch (data.type) {
        case 'join_room':
          setUsers([
            ...users, {
              userId: data.body.user_id,
              username: data.body.username,
              type: 'offer',
            } as UserType
          ])
          break
      }
    }
    console.log(users)
  }, [message, setUsers, users])

  const connectRoom = useCallback(async () => {
    websocketRef.current?.send(
      JSON.stringify({
        "type": "join_room",
        "body": {
          "username": userProfile.username
        }
      })
    )
  }, [userProfile.username])

  useEffect(() => {
    if (!prepeard) router.push('/')
    const { roomId } = router.query;

    if (roomId !== undefined && isReady) {
      connectWebscoket(roomId);
      if (users.length <= 0) {
        const me: UserType = {
          userId: "me",
          username: userProfile.username ? userProfile.username : 'ゲスト',
          type: 'answer'
        }
        setUsers([...users, me])
      }
      connectRoom();
    }
  }, [connectRoom, connectWebscoket, isReady, prepeard, router, setUsers, userProfile.username, users])

  useEffect(() => {
    if (router.query.roomId == undefined) return

    axios.get(`/api/rooms/${router.query.roomId}`)
      .then(() => setIsReady(true))
      .catch((_error) => {
        router.push('/')
      })
  }, [router]);


  return (
    <>
      <div className="m-2 mt-16 flex flex-col">
        <VideoContainer />
        <VideoControlls />
      </div>
    </>
  );
};

export default Room;