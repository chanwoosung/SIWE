import { useQuery } from 'react-query';
import getNFTDetail from '../services/getNFTDetail';

export const useGetNFTDetail = (collectionAddress = '', tokenId = '') =>
  useQuery(
    [`${collectionAddress}/${tokenId}`],
    async () => {
      return await getNFTDetail({ collectionAddress, tokenId });
    },
    {
      enabled: !!collectionAddress && !!tokenId,
      keepPreviousData: true,
      cacheTime: 600,
    }
  );
// 조건의 값의 유효성 처리가 필요합니다. enabled 처리 필요합니다.
