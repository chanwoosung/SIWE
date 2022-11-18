import { Dialog } from '@headlessui/react';
import { ReactNode } from 'react';
import { ReactComponent as Exit } from '../../outline-x-circle.svg';

interface ICustomDialogProps {
  open: boolean;
  handleClose: () => void;
  title?: string;
  children?: ReactNode;
  isActiveCancel?: boolean;
}

function CustomDialog({
  open,
  handleClose,
  children,
  isActiveCancel,
  title,
}: ICustomDialogProps) {
  return (
    <Dialog open={!!open} onClose={handleClose} className='relative z-50'>
      <div className='w-full px-[10px] fixed inset-0 flex items-center justify-center p-4 mx-auto h-full bg-opacity-80 transition-opacity bg-gray-800'>
        <Dialog.Panel className='max-w-[340px] h-fit my-auto bg-slate-50 rounded-md p-5 flex flex-col gap-4'>
          {title && (
            <DialogTitle
              title={title}
              isActiveCancel={isActiveCancel}
              onClose={handleClose}
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
          <Exit
            fill={'white'}
            stroke='black'
            className='min-w-[24px] min-h-[24px]'
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
