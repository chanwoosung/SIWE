import { ethers } from 'ethers';
import abi from '../abi.json';

export default function useTransfer() {
  const transfer = async (receiverAddress: string, tokenId: string) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send('eth_requestAccounts', []);
    const account = accounts[0];

    const signer = provider.getSigner();

    //ether.js 호출
    const NFTContract = new ethers.Contract(receiverAddress, abi, signer);
    //transfer
    const data = await NFTContract['safeTransferFrom(address,address,uint256)'](
      account,
      receiverAddress,
      tokenId
    );

    return data;
  };
  return transfer;
}
