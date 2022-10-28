import { useState } from 'react';
import { useParams } from 'react-router-dom';
import TransferDialog from '../components/TransferDialog';
import { useGetNFTDetail } from '../hooks/useGetNFTDetail';
import { ICollectionMetaData } from '../type';

export default function NFTDetail() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { collectionAddress, tokenId } = useParams();
  const { data, status } = useGetNFTDetail(collectionAddress, tokenId);
  function instanceOfCollection(object: any): object is ICollectionMetaData {
    return 'collectionAddress' in object;
  }
  if (data === undefined) return <></>;
  return (
    <div className='pt-20 text-white'>
      <div>
        <img
          src={data.mediaUrl}
          className='w-full h-fit'
          alt='NFT_thumbnail'
          onError={e => {
            e.currentTarget.onerror = null;
            e.currentTarget.outerHTML =
              '<div class="w-full bg-black text-white h-52 flex flex-col items-center text-center justify-center">Cannot Not Display Image</div>';
          }}
        />
      </div>
      <div className='p-6'>
        <div className='border border-gray-300 rounded-md'>
          <div
            className='w-full h-60 flex bg-opacity-5 bg-opacity-25 gap-2 rounded-lg'
            style={{
              backgroundImage: `url(${data.collection?.backgroundImgUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: '50% 50%',
            }}
          >
            <div
              className='w-16 h-16 rounded-full ml-5 my-auto bg-gray-400 basis-24'
              style={{
                backgroundImage: `url(${data.collection?.imgUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: '50% 50%',
              }}
            ></div>
            <div className='animate-bounce w-full rounded-l-full rounded-r-full bg-black/[0.4] my-auto text-neutral-50 break-all flex flex-col gap-1'>
              <span className='decoration-sky-300 underline text-green-300'>
                {data.collection.title}
              </span>
              <span className='underline decoration-pink-500 text-yellow-300'>
                {data.title}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className='rounded-full bg-violet-400 mx-6'>Detail Info</div>
      <div className='columns-2 gap-3 px-6 my-6'>
        {Object.keys(data).map((key, index) => {
          const element = data[key as keyof typeof data];
          if (element === null) return <></>;
          if (key === 'properties') {
            data[key].map((prop, int) => {
              // console.log(prop.title, prop.value);
              return (
                <div
                  className='w-full border rounded-md border-black flex gap-2 p-4'
                  key={`${prop.title + int}`}
                >
                  <span>{prop.title.toString()}</span>
                  <span>??</span>
                  <span className='flex text-left break-all'>
                    {prop.value.toString()}
                  </span>
                </div>
              );
            });
          } else if (key === 'collection') {
            // console.log(key);
            Object.keys(data[key]).map((prop, int) => {
              // console.log(prop);
              return <></>;
            });
          } else {
            // console.log(key);
            return (
              <>
                <div className='border border-white rounded-xl mb-5'>
                  <span className='font-extrabold'>{key}</span>
                  <div
                    className='w-full  rounded-md flex gap-2 p-4'
                    key={index}
                  >
                    <span className='w-full flex break-all text-center items-center justify-center text-sm'>
                      {data[key].toString()}
                    </span>
                  </div>
                </div>
              </>
            );
          }
        })}
      </div>
      {data.properties && data.properties.length !== 0 && (
        <>
          <div className='rounded-full bg-violet-400 mx-6'>Property</div>
          <div className='columns-2 gap-6 px-6 my-6'>
            {data.properties.map((property, index) => {
              return (
                <>
                  <div className='border rounded-xl mb-6' key={index}>
                    <span className='font-extrabold'>{property.title}</span>
                    <div className='w-full rounded-md flex gap-2 p-4'>
                      <span className='w-full flex break-all text-center items-center justify-center text-sm'>
                        {property.value}
                      </span>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
      <div className='my-6 w-full px-6'>
        <button
          className='w-full border border-gray-900 p-6 rounded-md bg-gray-700'
          onClick={() => setIsDialogOpen(true)}
        >
          전송 버튼
        </button>
      </div>
      <TransferDialog
        isOpen={isDialogOpen}
        setIsOpen={() => {
          setIsDialogOpen(!isDialogOpen);
        }}
        NFTDetailMetaData={data}
      />
    </div>
  );
}
