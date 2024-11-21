import {useRef, useEffect, type PropsWithChildren, type MouseEventHandler} from 'react';

type Props = PropsWithChildren<{
  title: string
  onClose: () => void
}>

export const Modal = ({ title, children, onClose }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;

    if (dialogElement) {
      if (dialogElement.showModal) {
        dialogElement.showModal();
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [onClose]);

  const handleClose = () => {
    onClose();
  };

  const handleOverlayClick: MouseEventHandler<HTMLDialogElement> = (event) => {
    if (event.target === dialogRef.current) {
      handleClose();
    }
  };

  return (
    <dialog
      open
      ref={dialogRef}
      onClick={handleOverlayClick}
      className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={handleClose}
            aria-label="Fermer"
            title="Fermer"
            className="text-gray-600 hover:text-gray-900"
          >
            ✕
          </button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </dialog>
  );
};
