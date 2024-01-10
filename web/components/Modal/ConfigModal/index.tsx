import { forwardRef, useState } from "react";
import { IconType } from "react-icons";
import { PiSpeakerHifiFill, PiVideoCameraFill, PiGearSixFill, PiPaletteFill } from "react-icons/pi";
import AudioContent from "./AudioContent";
import VideoContent from "./VideoContent";
import GeneralContent from "./GeneralContent";
import ThemeContent from "./ThemeContent";

interface Props {
  modalId?: string;
}

type menuNameType = 'audio' | 'video' | 'general' | 'theme'
type menuType = {
  name: menuNameType;
  label: string;
  Icon: IconType;
}



const ConfigModal = forwardRef<HTMLDialogElement, Props>(
  function ConfigModal ({modalId}, ref) {
    const [selectedMenu, setSelectedMenu] = useState<menuNameType>('audio');
    const menus: menuType[] = [
      {
        name: 'audio',
        label: 'オーディオ設定',
        Icon: PiSpeakerHifiFill,
      },
      {
        name: 'video',
        label: 'カメラ設定',
        Icon: PiVideoCameraFill,
      },
      {
        name: 'general',
        label: '全般',
        Icon: PiGearSixFill,
      },
      {
        name: 'theme',
        label: 'テーマ',
        Icon: PiPaletteFill,
      }
    ];

    const renderMenu = () => {
      return menus.map(menu => {
        return (
          <li key={menu.name} className="mt-1">
            <button
              onClick={() => {setSelectedMenu(menu.name)}}
              className={
                `${selectedMenu === menu.name ? 'active' : ''}`
              }
            >
              <menu.Icon size={24} />
              {menu.label}
            </button>
          </li>
        )
      })
    };

    const renderSelectorMenu = () => {
      const renderOptions = menus.map(menu => {
        return (
          <option
            key={menu.name}
            value={menu.name}
          >
            {menu.label}
          </option>
        )
      })

      return (
        <select
          value={selectedMenu}
          onChange={(e) => {setSelectedMenu(e.target.value as menuNameType)}}
          className="select select-bordered w-full max-w-xs"
        >
          { renderOptions }
        </select>
      )
    }

    const renderContent = () => {
      switch (selectedMenu) {
        case 'audio':
          return <AudioContent />
        case 'video':
          return <VideoContent />
        case 'general':
          return <GeneralContent />
        case 'theme':
          return <ThemeContent />
      }
    }

    return (
      <dialog ref={ref} id={modalId} className="modal p-4">
        <div className="modal-box flex flex-col max-w-[960px] min-h-[420px] w-full h-full">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div className="flex justify-between mt-5 md:mt-0">
            <article className="prose">
              <h2 className='p-2 text-center'>設定</h2>
            </article>

            {/* Smartphone menu */}
            <div className="md:hidden">
              { renderSelectorMenu() }
            </div>
          </div>

          <div className="flex grow">
            <div className="hidden md:flex">
              <ul className="menu w-56 pb-auto">
                { renderMenu() }
              </ul>
              <div className="divider divider-horizontal"></div>
            </div>


            <div className="w-full mx-2 my-4">
              { renderContent()}
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    )
  }
);

ConfigModal.defaultProps = {
  modalId: 'config-modal'
}

export default ConfigModal;