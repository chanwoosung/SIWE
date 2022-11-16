import { Link } from 'react-router-dom';
import { INFTMetaData } from '../../type';

export interface INFTCardProps {
  item: INFTMetaData;
}

export default function NFTCard({ item }: INFTCardProps) {
  return (
    <>
      <div className='group aspect-w-10 aspect-h-10 lg:aspect-h-7 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100'>
        <Link to={`/NFT/${item.collectionAddress}/${item.tokenId}`}>
          <div className='h-full rounded-t-md border border-solid border-white bg-slate-500'>
            <img
              src={item.mediaUrl}
              className='h-full m-auto pointer-events-none aspect-1 object-contain group-hover:opacity-75'
              alt='NFT_thumbnail'
              onError={e => {
                e.currentTarget.onerror = null;
                e.currentTarget.outerHTML =
                  '<div class="w-full bg-black text-white h-full rounded-t-md flex flex-col items-center text-center justify-center">Can Not Display Image</div>';
              }}
            />
          </div>
          <div className='flex px-2 py-2 rounded-b-md border bg-white'>
            <div className='flex flex-col items-start'>
              <span className='text-xs text-gray-400'>
                {item.collectionTitle}
              </span>
              <span className='text-lg'>{item.title}</span>
            </div>
          </div>
        </Link>
      </div>
      <p className='pointer-events-none block text-sm font-medium text-gray-500'>
        {item.collectionTitle}
      </p>
      <p className='pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900'>
        {item.title}
      </p>
    </>
  );
}
