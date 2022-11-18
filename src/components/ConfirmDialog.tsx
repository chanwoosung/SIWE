import { useAppSelector } from '../store/config';
import CustomDialog from './core/CustomDialog';

interface IConfirmDialog {
  text: string;
  onConfirm: () => void;
  confirmText: string;
  onCancel: () => void;
  cancelText: string;
}

export function ConfirmDialog({
  text,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
}: IConfirmDialog) {
  const dialog = useAppSelector(state => state.dialog);

  return (
    <>
      <CustomDialog open={dialog.open} handleClose={onCancel}>
        <div className='flex flex-col gap-4'>
          <span className='font-extrabold text-2xl text-center'>{text}</span>
          <div className='flex gap-4 justify-center'>
            <button
              className='border rounded-md bg-pink-700 hover:bg-pink-900 text-white hover:text-yellow-300 text-lg font-semibold py-3 px-4'
              onClick={onConfirm}
            >
              {confirmText}
            </button>
            <button
              className='border rounded-md bg-slate-300 hover:bg-slate-600 text-black hover:text-gray-200 text-lg font-semibold py-3 px-4'
              onClick={onCancel}
            >
              {cancelText}
            </button>
          </div>
        </div>
      </CustomDialog>
    </>
  );
}
