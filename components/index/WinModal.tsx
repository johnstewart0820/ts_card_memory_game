import * as React from 'react';
import ReactModal from 'react-modal';

import IconButton from "../common/IconButton";

export default function WinModal({isOpen, onRequestClose, restartgame}) {
  return (
    <ReactModal
      isOpen={isOpen}
      contentLabel="Congrats"
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={{content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column'
      }}}
    >
      <div style={{marginBottom: 10}}>You won the game!!</div>
      
      <IconButton icon={"/refresh.svg"} text="Restart" onClick={restartgame} />
    </ReactModal>
  )
}