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
    <div>
      <img
        src={data.mediaUrl}
        className='w-full h-fit'
        alt='NFT_thumbnail'
        onError={e => {
          e.currentTarget.onerror = null;
          e.currentTarget.outerHTML =
            '<div class="w-full bg-black text-white h-52 rounded-t-md flex flex-col items-center text-center justify-center">Cannot Not Display Image</div>';
        }}
      />
      <div className='my-4'>
        <span>{data.title}</span>
      </div>
      <div
        className='w-full h-60 flex bg-opacity-5 bg-opacity-25'
        style={{
          backgroundImage: `url(${data.collection?.backgroundImgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: '50% 50%',
        }}
      >
        <div
          className='w-16 h-16 rounded-full ml-5 my-auto bg-gray-400'
          style={{
            backgroundImage: `url(${data.collection?.imgUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%',
          }}
        ></div>
      </div>
      <div>
        <span>{data.collection?.title} is presented</span>
      </div>
      <div className='flex flex-col gap-6 px-6'>
        {Object.keys(data).map((key, index) => {
          const element = data[key as keyof typeof data];
          if (element === null) return <></>;
          if (key === 'properties') {
            data[key].map((prop, int) => {
              console.log(prop.title, prop.value);
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
            console.log(key);
            Object.keys(data[key]).map((prop, int) => {
              console.log(prop);
              return <></>;
            });
          } else {
            console.log(key);
            return (
              <div
                className='w-full border rounded-md border-black flex gap-2 p-4'
                key={index}
              >
                <span>{key}</span>
                <span>:</span>
                <span className='flex text-left break-all'>
                  {data[key].toString()}
                </span>
              </div>
            );
          }
        })}
      </div>
      <div className='my-6 w-full px-6'>
        <button
          className='w-full border border-gray-900 p-6 rounded-md'
          onClick={() => setIsDialogOpen(true)}
        >
          전송 버튼
        </button>
      </div>
      <TransferDialog
        isOpen={isDialogOpen}
        setIsOpen={() => setIsDialogOpen(!isDialogOpen)}
      />
    </div>
  );
}
