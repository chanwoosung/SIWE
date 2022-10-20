import { Dialog } from '@headlessui/react';
import { ReactNode } from 'react';
interface ICustomDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title?: string;
  children?: ReactNode;
  isActiveCancel?: boolean;
}

function CustomDialog({
  isOpen,
  setIsOpen,
  children,
  isActiveCancel,
  title,
}: ICustomDialogProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className='relative z-50'
    >
      <div className='w-full px-[10px] fixed inset-0 flex items-center justify-center p-4 mx-auto h-full bg-opacity-80 transition-opacity bg-gray-800'>
        <Dialog.Panel className='max-w-[340px] h-fit my-auto bg-slate-50 rounded-md p-5 flex flex-col gap-4'>
          {title && (
            <DialogTitle
              title={title}
              isActiveCancel={isActiveCancel}
              onClose={() => setIsOpen(false)}
            />
          )}
          {children}
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
  className = '',
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
