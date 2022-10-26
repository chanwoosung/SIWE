import { useQuery } from 'react-query';
import getNFTDetail from '../services/getNFTDetail';

export const useGetNFTDetail = (collectionAddress = '', tokenId = '') =>
  useQuery(
    [`${collectionAddress}/${tokenId}`],
    async () => {
      return await getNFTDetail({ collectionAddress, tokenId });
    },
    {}
  );
