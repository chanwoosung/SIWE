import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className='w-full h-16 bg- flex items-center my-auto px-6 backdrop-blur bg-slate-500'>
      <Link to='/'>
        <img src='/img/Ethereum.svg' alt='header-logo' className='w-11 h-11' />
      </Link>
    </div>
  );
}
