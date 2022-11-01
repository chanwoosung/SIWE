import { useEffect, useRef } from 'react';
import NFTCard from '../components/core/NFTCard';
import { useGetOwnNFTs } from '../hooks/useGetOwnNFTs';

export default function OwnNFTList() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { data, isFetchingNextPage, fetchNextPage, status, hasNextPage } =
    useGetOwnNFTs();
  useEffect(() => {
    if (!targetRef.current) return;
    const observer = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        !isFetchingNextPage && fetchNextPage();
      }
    });
    observer.observe(targetRef.current);
  }, [targetRef.current, data]);

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
      {hasNextPage && (
        <div ref={targetRef} className='w-full flex justify-center'>
          <img src='/img/loading-loading-forever.gif' alt='loading' />
        </div>
      )}
    </div>
  );
}
