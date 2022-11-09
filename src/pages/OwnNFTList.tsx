import { useEffect, useRef } from 'react';
import { Grid } from 'react-loader-spinner';
import NFTCard from '../components/core/NFTCard';
import { useGetOwnNFTs } from '../hooks/useGetOwnNFTs';

export default function OwnNFTList() {
  // 호출 상태를위한 상태 관리가 필요합니다. 엄격한 데이터 관리
  const targetRef = useRef<HTMLDivElement>(null);
  const { data, isFetchingNextPage, fetchNextPage, status, hasNextPage } =
    useGetOwnNFTs();
  useEffect(() => {
    if (!targetRef.current) return; // null => 세팅이 안됌, boolean 만으로 처리하지 않는다.
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        !isFetchingNextPage && fetchNextPage();
      }
    });
    observer.observe(targetRef.current);
  }, [targetRef.current, data]);
  // 다 가져왔을때에대한 처리가 없음
  if (data?.pages[0].items.length === 0) {
    return <div>보유중인 NFT가 없습니다.</div>;
  }
  return (
    <div className='w-full flex flex-col gap-6 mb-6 px-6'>
      <ul
        role='list'
        className='grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 xs:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8'
      >
        {status === 'loading' && (
          <Grid wrapperClass='w-full fixed items-center left-[45.75%] top-[50%]' />
        )}
        {status === 'error' && <div>error</div>}
        {status === 'success' && (
          <>
            {data?.pages.map(({ items }) => {
              return items.map(item => {
                return (
                  <li key={item.mediaUrl}>
                    <NFTCard item={item} />
                  </li>
                );
              });
            })}
            {hasNextPage && (
              <div ref={targetRef} className='w-full flex justify-center'>
                <img src='/img/loading-loading-forever.gif' alt='loading' />
              </div>
            )}
          </>
        )}
      </ul>
    </div>
  );
}
