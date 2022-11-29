import dayjs from 'dayjs';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import uniqolor from 'uniqolor';
import TransferDialog from '../components/TransferDialog';
import { useGetNFTDetail } from '../hooks/useGetNFTDetail';
import { IProperty } from '../type';

export default function NFTDetail() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { collectionAddress, tokenId } = useParams();

  const { data, status } = useGetNFTDetail(collectionAddress, tokenId);
  if (data === undefined) return <></>;
  return (
    <>
      {status === 'error' && <div>로딩중 에러 발생</div>}
      <div className='bg-white'>
        <div className='py-20 min-h-fit lg:max-w-7xl mx-auto'>
          <div className='lg:flex h-full'>
            <div className='w-full h-full mx-auto mt-6 max-w-2xl lg:grid '>
              <div className='lg:flex lg:flex-col aspect-auto rounded-lg'>
                <img
                  src={data.mediaUrl}
                  alt={data.tokenId}
                  className='h-full w-full object-contain object-center aspect-1'
                  onError={e => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.outerHTML =
                      '<div class="w-full bg-black text-white h-full min-h-[30vh] flex flex-col items-center text-center justify-center">Can Not Display Image</div>';
                  }}
                />
              </div>
              <div className='hidden lg:flex w-full h-20 z-20 items-center p-3 bg-white'>
                <button
                  className='w-full border border-gray-900 p-3 rounded-md bg-indigo-600 text-white ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700 shadow-sm'
                  onClick={() => setIsDialogOpen(true)}
                >
                  전송 하기
                </button>
              </div>
            </div>
            <div className='w-full lg:flex lg:flex-col mt-6 px-3'>
              <div className='flex flex-col gap-1'>
                <span className='font-extrabold text-2xl'>{data.title}</span>
                <span className='text-gray-400'>{data.collection.title}</span>
              </div>
              {data.properties.length !== 0 && (
                <div>
                  <h2 className='text-sm font-medium text-gray-500 mt-5'>
                    Properties
                  </h2>
                  <ul
                    role='list'
                    className='mt-3 grid grid-cols-2 gap-5 rounded-md'
                  >
                    {data.properties.map((property: IProperty) => (
                      <li
                        key={property.title}
                        className='col-span-1 flex flex-col md:flex-row rounded-md shadow-sm h-16'
                      >
                        <div
                          className={`flex-shrink-0 flex items-center justify-center py-1 w-full md:w-24 text-white text-sm font-medium rounded-t-md md:rounded-l-md lg:rounded-r-none  text-center px-4`}
                          style={{
                            backgroundColor: uniqolor.random().color,
                          }}
                        >
                          {property.title}
                        </div>
                        <div className='flex flex-1 items-center justify-between truncate rounded-b-md md:rounded-r-md lg:rounded-l-none border-t border-r border-b border-gray-200 bg-white'>
                          <div className='flex-1 truncate px-4 py-2 text-sm'>
                            <span className='font-medium text-gray-900 hover:text-gray-600'>
                              {property.value}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <h2 className='text-sm font-medium text-gray-500 mt-5'>
                  ETC Info
                </h2>
                <ul
                  role='list'
                  className='mt-3 grid grid-cols-2 gap-5 rounded-md'
                >
                  <li className='col-span-1 flex flex-col md:flex-row rounded-md shadow-sm h-16'>
                    <div
                      className={`flex-shrink-0 flex items-center justify-center py-1 w-full md:w-24 text-white text-sm font-medium rounded-t-md md:rounded-l-md lg:rounded-r-none text-center px-4`}
                      style={{
                        backgroundColor: uniqolor.random().color,
                      }}
                    >
                      createdAt
                    </div>
                    <div className='flex flex-1 items-center justify-between truncate rounded-b-md md:rounded-r-md lg:rounded-l-none border-t border-r border-b border-gray-200 bg-white'>
                      <div className='flex-1 truncate px-4 py-2 text-sm'>
                        <span className='font-medium text-gray-900 hover:text-gray-600'>
                          {dayjs(data.createdAt)
                            .locale('ko')
                            .format('DD/MM/YYYY HH:mm:ss')}
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className='col-span-1 flex rounded-md shadow-sm h-16'>
                    <div
                      className={`flex-shrink-0 flex items-center justify-center w-24 text-white text-sm font-medium rounded-l-md text-center px-4`}
                      style={{
                        backgroundColor: '#ff3399',
                      }}
                    >
                      <img src='/img/hc-heart-off.svg' alt='like_icon' />
                    </div>
                    <div className='flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white'>
                      <div className='flex-1 truncate px-4 py-2 text-sm'>
                        <span className='font-medium text-gray-900 hover:text-gray-600'>
                          {data.likeCount}
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className='text-sm font-medium text-gray-500 mt-5'>
                  Collection
                </h2>
                {data.collection?.backgroundImgUrl && (
                  <div
                    className='w-full h-24 mt-1 flex'
                    style={{
                      backgroundImage: `url(${data.collection?.backgroundImgUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: '50% 50%',
                    }}
                  >
                    <div
                      className='w-16 h-16 rounded-full ml-5 my-auto bg-gray-400 '
                      style={{
                        backgroundImage: `url(${data.collection?.imgUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: '50% 50%',
                      }}
                    ></div>
                  </div>
                )}
                <div className='mt-4'>
                  <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                    {data.collection.title}
                  </h2>
                  <p className='mt-4 text-gray-500'>
                    {data.collection.description}
                  </p>

                  <dl className='mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8'>
                    <div className='border-t border-gray-200 pt-4'>
                      <dt className='font-medium text-gray-900'>Chain</dt>
                      <dd className='mt-2 text-sm text-gray-500'>
                        {data.collection.chain}
                      </dd>
                    </div>
                    <div className='border-t border-gray-200 pt-4'>
                      <dt className='font-medium text-gray-900'>Created At</dt>
                      <dd className='mt-2 text-sm text-gray-500'>
                        {data.collection.createdAt}
                      </dd>
                    </div>
                    <div className='border-t border-gray-200 pt-4'>
                      <dt className='font-medium text-gray-900'>Updated At</dt>
                      <dd className='mt-2 text-sm text-gray-500'>
                        {data.collection.updatedAt}
                      </dd>
                    </div>
                    {data.collection.collectionRoyalties.length !== 0 && (
                      <div className='border-t border-gray-200 pt-4'>
                        <dt className='font-medium text-gray-900'>
                          Royalty Receivers
                        </dt>
                        <dd className='mt-2 text-sm text-gray-500'>
                          <ul>
                            {data.collection.collectionRoyalties.map(
                              (collection, index) => {
                                return (
                                  <li key={index}>
                                    <div className='relative pb-8'>
                                      {index !==
                                      data.collection.collectionRoyalties
                                        .length -
                                        1 ? (
                                        <span
                                          className='absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200'
                                          aria-hidden='true'
                                        />
                                      ) : null}
                                      <div className='relative flex space-x-3'>
                                        <div>
                                          <span
                                            className={
                                              'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                                            }
                                          >
                                            <div>
                                              <span className='h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white'>
                                                <svg
                                                  className='h-5 w-5 text-white'
                                                  x-description='Heroicon name: mini/user'
                                                  xmlns='http://www.w3.org/2000/svg'
                                                  viewBox='0 0 20 20'
                                                  fill='currentColor'
                                                  aria-hidden='true'
                                                >
                                                  <path d='M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z'></path>
                                                </svg>
                                              </span>
                                            </div>
                                          </span>
                                        </div>
                                        <div className='flex min-w-0 flex-1 justify-between space-x-4 pt-1.5'>
                                          <div>
                                            <p className='text-sm text-gray-500'>
                                              <span className='font-medium text-gray-900 truncate max-w-[55vw] md:max-w-[30vw] lg:max-w-[160px] block'>
                                                {collection.accountAddress}
                                              </span>
                                            </p>
                                          </div>
                                          <div className='whitespace-nowrap text-right text-xs text-gray-500'>
                                            {collection.chain} :
                                            {collection.rate}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                );
                              }
                            )}
                          </ul>
                        </dd>
                      </div>
                    )}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='lg:hidden w-full fixed h-20 bottom-0 z-20 border border-l-0 border-r-0 border-b-0 border-gray-700 flex items-center p-3 bg-white'>
        <button
          className='w-full border border-gray-900 p-3 rounded-md bg-indigo-600 text-white ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700 shadow-sm'
          onClick={() => setIsDialogOpen(true)}
        >
          전송 하기
        </button>
      </div>
      <TransferDialog
        isOpen={isDialogOpen}
        setIsOpen={() => {
          setIsDialogOpen(!isDialogOpen);
        }}
        NFTDetailMetaData={data}
      />
    </>
  );
}
