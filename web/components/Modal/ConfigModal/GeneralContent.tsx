import { userState } from "@/atoms/userState";
import { useState } from "react";
import { useRecoilState } from "recoil";

const GeneralContent = () => {
  const [user, setUser] = useRecoilState(userState);
  const [userName, setUserName] = useState(user.username || '');

  const onBlur = () => {
    if (userName === '' || userName.length > 20) {
      return setUser({...user, username: 'ゲスト'})
    }

    setUser({...user, username: userName})
  };


  return (
    <div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">表示名</span>
        </div>
        <input
          value={userName}
          onBlur={onBlur}
          onChange={(e) => {setUserName(e.target.value)}}
          placeholder="ゲスト"
          className="input input-bordered w-full"
        />
      </label>
    </div>
  )
}

export default GeneralContent;
