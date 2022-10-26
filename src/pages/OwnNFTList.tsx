import NFTCard from '../components/core/NFTCard';
import { useGetOwnNFTs } from '../hooks/useGetOwnNFTs';

export default function OwnNFTList() {
  const { data, fetchNextPage, status, hasNextPage } = useGetOwnNFTs();

  if (data?.pages[0].items.length === 0) {
    return <div>보유중인 NFT가 없습니다.</div>;
  }
  return (
    <div className='w-full flex flex-col gap-6 mb-6'>
      {data?.pages.map(({ items }) => {
        return items.map((item, index) => {
          return (
            <div key={index}>
              <NFTCard item={item} />
            </div>
          );
        });
      })}
    </div>
  );
}
