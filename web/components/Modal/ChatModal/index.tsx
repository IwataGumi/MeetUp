import React from 'react';
import Modal from '@/components/Modal';

interface Props {
  modalId?: string;
}

const ChatModal = React.forwardRef<HTMLDialogElement, Props>(
  function ChatModal ({ modalId }, ref) {
    return (
      <Modal modalId={modalId} modalSizeclassName='max-w-[540px] min-h-[75vh] max-h-[75vh]' ref={ref}>
        <article className="prose w-full">
          <h2 className='p-2 text-left'>チャット</h2>
        </article>
        {/* <div className='flex flex-1 flex-col w-full'>
          <div className='flex-1 flex flex-col p-2'>
            <div className="chat chat-start flex flex-col">
              <div className="chat-header font-bold">
                辻 皓貴(つじこうき)
              </div>
              <div className='flex items-end'>
                <div className="chat-bubble chat-bubble-accent">
                  今日は、何食べた～？？
                </div>
                <time className="text-xs opacity-50 ml-2">10分前</time>
              </div>
            </div>

            <div className="chat chat-end">
              <div className="chat-header font-bold">
                自分
              </div>
              <div className="chat-bubble">
                コメダ珈琲のルノワール食べた！
              </div>
            </div>

            <div className="chat chat-start flex flex-col">
              <div className="chat-header font-bold">
                辻 皓貴(つじこうき)
              </div>
              <div className='flex items-end'>
                <div className="chat-bubble chat-bubble-accent">
                  太るぞ
                </div>
                <time className="text-xs opacity-50 ml-2">数秒前</time>
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="join w-full">
              <textarea className="textarea textarea-bordered resize-none w-full" rows={1} placeholder="メッセージを送信"></textarea>
            </div>
          </div>
        </div> */}

        {/* TODO: 失敗した時だけに表示させる */}
        <div role="alert" className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>エラー : サーバーとのハンドシェイクに失敗しました</span>
        </div>
      </Modal>
    )
  }
);

ChatModal.defaultProps = {
  modalId: 'chat-modal'
}

export default ChatModal;