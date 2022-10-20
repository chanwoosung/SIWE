import detectEthereumProvider from '@metamask/detect-provider';

export default function useIsInstallMetamask() {
  const isInstalledMetamask = () => {
    if (typeof window.ethereum !== 'undefined') {
      return true;
    } else {
      return false;
    }
  };
  const provider = async () => await detectEthereumProvider();
  const isMetamaskInstalled = isInstalledMetamask() ? true : false;
  return { provider, isMetamaskInstalled };
}
