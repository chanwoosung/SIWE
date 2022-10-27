import { useForm } from 'react-hook-form';
import CustomDialog from './core/CustomDialog';
import abi from '../abi.json';
import { ethers } from 'ethers';
import { INFTDetailMetaData } from '../type';
import useTransfer from '../hooks/useTransfer';
import { useAppDispatch, useAppSelector } from '../store/config';

export interface ITransferDialog {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  NFTDetailMetaData: INFTDetailMetaData;
}

export default function TransferDialog({
  isOpen,
  setIsOpen,
  NFTDetailMetaData,
}: ITransferDialog) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const walletState = useAppSelector(state => state.wallet);
  const transfer = useTransfer();
  const onSubmit = async (data: any) => {
    const txData = await transfer(
      data.receiverAddress,
      NFTDetailMetaData.tokenId
    );
  };

  const isMyAddress = (inputAddress: string) => {
    return walletState.publicAddress !== inputAddress;
  };

  return (
    <CustomDialog
      setIsOpen={setIsOpen}
      isOpen={isOpen}
      title='전송하기'
      isActiveCancel={true}
    >
      <CustomDialog.content>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='w-full flex flex-col gap-5'
        >
          <>
            <input
              {...register('receiverAddress', {
                required: true,
                maxLength: 42,
                pattern: {
                  value: /^[0x]/,
                  message: '0x로 시작해야합니다',
                },
                validate: value => isMyAddress(value),
              })}
            />
            {errors.receiverAddress?.type === 'required' && (
              <p className='text-red-600'>
                수신할 accountAddress를 입력해주세요!
              </p>
            )}
            {errors.receiverAddress?.type === 'pattern' && (
              <p className='text-red-600'>
                {errors.receiverAddress.message?.toString()}
              </p>
            )}
            {errors.receiverAddress?.type === 'validate' && (
              <p className='text-red-600'>{'자신의 계정과 같은 주소입니다.'}</p>
            )}
            {errors.receiverAddress?.type === 'maxLength' && (
              <p className='text-red-600'>{'42자가 넘었습니다.'}</p>
            )}
          </>
          <button>전송하기</button>
        </form>
      </CustomDialog.content>
    </CustomDialog>
  );
}
