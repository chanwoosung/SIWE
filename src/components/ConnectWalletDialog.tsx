import useIsInstallMetamask from '../hooks/useIsInstallMetamask';
import CustomDialog from './core/CustomDialog';
import LoginButton from './LoginButton';

interface IConnectWalletDialogProps {
  isOpen: boolean;
  handleClose: () => void;
}

export default function ConnectWalletDialog({
  isOpen,
  handleClose,
}: IConnectWalletDialogProps) {
  const { isMetamaskInstalled } = useIsInstallMetamask();
  const buttonText = isMetamaskInstalled ? 'MetaMask 연결' : 'MetaMask 설치';
  return (
    <div>
      <CustomDialog open={!!isOpen} handleClose={handleClose}>
        <LoginButton buttonText={buttonText} />
      </CustomDialog>
    </div>
  );
}
