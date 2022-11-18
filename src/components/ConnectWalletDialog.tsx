import useIsInstallMetamask from '../hooks/useIsInstallMetamask';
import CustomDialog from './core/CustomDialog';
import LoginButton from './LoginButton';

interface IConnectWalletDialogProps {
  open: boolean;
  handleClose: () => void;
}

export default function ConnectWalletDialog({
  open,
  handleClose,
}: IConnectWalletDialogProps) {
  const { isMetamaskInstalled } = useIsInstallMetamask();
  const buttonText = isMetamaskInstalled ? 'MetaMask 연결' : 'MetaMask 설치';
  return (
    <div>
      <CustomDialog open={!!open} handleClose={handleClose}>
        <LoginButton buttonText={buttonText} />
      </CustomDialog>
    </div>
  );
}
