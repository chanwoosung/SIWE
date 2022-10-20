import { useState } from 'react';
import useIsInstallMetamask from '../hooks/useIsInstallMetamask';
import CustomDialog from './core/CustomDialog';
import LoginButton from './LoginButton';

interface IConnectWalletDialogProps {
  isDialogOpen: boolean;
}

export default function ConnectWalletDialog({
  isDialogOpen,
}: IConnectWalletDialogProps) {
  const [isOpen, setIsOpen] = useState(isDialogOpen);
  const { isMetamaskInstalled } = useIsInstallMetamask();
  const buttonText = isMetamaskInstalled ? 'MetaMask 연결' : 'MetaMask 설치';
  return (
    <div>
      <CustomDialog isOpen={isOpen} setIsOpen={() => setIsOpen(!isOpen)}>
        <LoginButton buttonText={buttonText} />
      </CustomDialog>
    </div>
  );
}
