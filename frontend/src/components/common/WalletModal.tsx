/*
  Need to disable typescript check to outsmart Rodal package issue.
  If you are making any changes to the code, remove this line temporarily
  as we want to pass typecheck testing as much as possible.
*/
//@ts-nocheck
import React from 'react';
import {useDispatch} from 'react-redux';
import {setAccountAddress, setAccountNet} from '../../redux/actions';
import {LEDGER_NAME} from '../../services/constants';

/* eslint-disable */
import Rodal from 'rodal';
import {connectToAlgoSigner} from '../../utils/connectToAlgoSigner';

import 'rodal/lib/rodal.css';
import './WalletModal.scss';

interface Props {
  openWalletModal: boolean;
  toggleWalletModal: () => void;
}

const WalletModal: React.FC<Props> = ({openWalletModal, toggleWalletModal}) => {
  const dispatch = useDispatch();

  const modalStyle = {
    position: 'relative',
    borderRadius: '30px',
    top: '210px',
  };

  async function connectToAlgoSignerWallet() {
    const accountAddress = await connectToAlgoSigner();

    dispatch(setAccountAddress(accountAddress));
    dispatch(setAccountNet(LEDGER_NAME));

    toggleWalletModal();
  }

  return (
    <Rodal
      width={420}
      customStyles={modalStyle}
      visible={openWalletModal}
      onClose={toggleWalletModal}
      height={200}
      showCloseButton={true}
    >
      <div className="wallet-modal">
        <div className="wallet-modal-header">
          <div className="wallet-modal-header-image">
            <img className="App-logo-modal" src="/logo.png" alt="AlgoSwap" />
          </div>
          Connect to a wallet
        </div>
        <button className="wallet-modal-select" onClick={connectToAlgoSignerWallet}>
          <div className="wallet-modal-select-item">
            AlgoSigner
            <img className="wallet-modal-select-item__img" src="/algosigner.png" alt="AlgoSigner" />
          </div>
        </button>
      </div>
    </Rodal>
  );
};

export default WalletModal;
