import { useForm } from 'react-hook-form';
import CustomDialog from './core/CustomDialog';

export interface ITransferDialog {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function TransferDialog({ isOpen, setIsOpen }: ITransferDialog) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);
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
          <input {...register('test_input')} />
          <input {...register('test2_input')} />
          <button>전송하기</button>
        </form>
      </CustomDialog.content>
    </CustomDialog>
  );
}
