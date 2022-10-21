export default function useGetWalletAddress() {
  const getWalletAddress = async () => {
    const accounts = (await window.ethereum?.request({
      method: 'eth_requestAccounts',
    })) as string[];
    return accounts[0];
  };
  const getChainId = async () =>
    await window.ethereum?.request({ method: 'eth_chainId' });

  return { getWalletAddress, getChainId };
}
