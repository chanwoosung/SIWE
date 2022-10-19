import { Dialog } from '@headlessui/react';
import { ReactNode } from 'react';
interface ILoginDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function CustomDialog({ isOpen, setIsOpen }: ILoginDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className='relative z-50'
    >
      <div className='w-full px-[10px] fixed inset-0 flex items-center justify-center p-4 mx-auto h-full bg-opacity-80 transition-opacity bg-gray-800'>
        <Dialog.Panel className='max-w-[340px] h-fit my-auto bg-slate-50 rounded-md p-5 flex flex-col gap-4'>
          <DialogTitle
            title={'Title'}
            isActiveCancel={true}
            onClose={() => setIsOpen(false)}
          />
          <DialogContent>
            <Dialog.Description>
              This will permanently deactivate your account
            </Dialog.Description>
            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed. This action cannot be undone.
            </p>
            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed. This action cannot be undone.
            </p>
            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed. This action cannot be undone.
            </p>
            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed. This action cannot be undone.
            </p>
            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed. This action cannot be undone.
            </p>
            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed. This action cannot be undone.
            </p>
            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed. This action cannot be undone.
            </p>
            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed. This action cannot be undone.
            </p>
            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed. This action cannot be undone.
            </p>
            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed. This action cannot be undone.
            </p>
          </DialogContent>
          <DialogFooter>
            <button className='flex text-center w-fit h-fit mx-auto'>
              <div
                className='w-16 py-3 border-black items-center'
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </div>
            </button>
          </DialogFooter>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

interface IDialogTitleProps {
  title?: string;
  isActiveCancel?: boolean;
  className?: string;
  onClose?: () => void;
}

function DialogTitle({
  title,
  isActiveCancel = false,
  className,
  onClose,
}: IDialogTitleProps) {
  return (
    <div className={`flex justify-between gap-4 ${className}`}>
      <Dialog.Title className={'break-words'}>{title}</Dialog.Title>
      {isActiveCancel && (
        <div onClick={onClose}>
          <img
            className='min-w-[24px] min-h-[24px]'
            src='/img/outline-x-circle.svg'
            alt='cancel-dialog-button'
          />
        </div>
      )}
    </div>
  );
}

interface IDialogFooter {
  children: ReactNode;
}

function DialogFooter({ children }: IDialogFooter) {
  return <>{children}</>;
}

interface IDialogContentProps {
  children: ReactNode;
}

function DialogContent({ children }: IDialogContentProps) {
  return <div className='w-full max-h-[70vh] overflow-y-auto'>{children}</div>;
}

CustomDialog.title = DialogTitle;
CustomDialog.content = DialogContent;
CustomDialog.footer = DialogFooter;

export default CustomDialog;
