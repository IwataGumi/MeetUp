import { userProfileState } from "@/atoms/userProfileState";
import { useState } from "react";
import { useRecoilState } from "recoil";

const GeneralContent = () => {
  const [userProfile, setProfileUser] = useRecoilState(userProfileState);
  const [userName, setUserName] = useState(userProfile.username || '');

  const onBlur = () => {
    if (userName === '' || userName.length > 20) {
      return setProfileUser({...userProfile, username: 'ゲスト'})
    }

    setProfileUser({...userProfile, username: userName})
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
