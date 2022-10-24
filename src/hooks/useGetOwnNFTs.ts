import { useInfiniteQuery } from 'react-query';
import getOwnNFTs from '../services/getOwnNFTs';

export const useGetOwnNFTs = (publicAddress: string) =>
  useInfiniteQuery(
    [publicAddress, 'getOwnNFTs'],
    async ({ pageParam = 1 }) => {
      const params = {
        page: pageParam,
        perPage: 20,
      };
      const response = await getOwnNFTs(publicAddress, params);
      return response;
    },
    {
      getNextPageParam: data =>
        (data.items.length === 20 && data.page + 1) ?? undefined,
      enabled: publicAddress !== undefined,
    }
  );
