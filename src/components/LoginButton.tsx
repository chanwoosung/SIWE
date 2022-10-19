export default function LoginButton() {
  return (
    <div className='w-44 h-20 rounded-xl border border-slate-500'>
      <button className='w-full h-full flex gap-5'>
        <img
          src='/img/Metamask.svg'
          className='w-16 h-16 my-auto'
          alt='metamask_icon'
        />
        <span className='my-auto'>MetaMask 연결하기</span>
      </button>
    </div>
  );
}
