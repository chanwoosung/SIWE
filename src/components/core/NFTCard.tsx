import { Link } from 'react-router-dom';
import { INFTMetaData } from '../../type';

export interface INFTCardProps {
  item: INFTMetaData;
}

export default function NFTCard({ item }: INFTCardProps) {
  const errorImage = (document.createElement('div').style.backgroundColor =
    'red');
  return (
    <div className='w-full px-4 h-fit flex flex-col'>
      <Link to={`/NFT/${item.tokenId}`}>
        <div>
          <img
            src={item.mediaUrl}
            className='w-full h-full rounded-t-md'
            alt='NFT_thumbnail'
            onError={e => {
              e.currentTarget.onerror = null;
              e.currentTarget.outerHTML =
                '<div class="w-full bg-black text-white h-52 rounded-t-md flex flex-col items-center text-center justify-center">Cannot Not Display Image</div>';
            }}
          />
        </div>
        <div className='flex px-2 py-2 rounded-b-md border'>
          <div className='flex flex-col gap-3 items-start'>
            <span>{item.title}</span>
            <span>{item.collectionTitle}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
