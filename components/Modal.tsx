import React, { FC, PropsWithChildren } from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  description,
  onChange,
  title,
  children,
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onChange} defaultOpen={isOpen}>
      {/*<Dialog.Trigger asChild>*/}
      {/*  <button className="Button violet">Edit profile</button>*/}
      {/*</Dialog.Trigger>*/}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-neutral-900/10 backdrop-blur-md" />
        <Dialog.Content
          className="fixed left-[50%] top-[50%] h-full w-full translate-x-[-50%] translate-y-[-50%] rounded-md
          border border-neutral-700 bg-neutral-800 p-[25px] drop-shadow-md
          md:h-auto md:max-h-[85dvh] md:w-[90vw] md:max-w-[450px]"
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <Dialog.Title className="mb-4 text-center text-xl font-bold">
            {title}
          </Dialog.Title>
          <Dialog.Description className="mb-5 text-center text-sm leading-normal">
            {description}
          </Dialog.Description>
          <div>{children}</div>
          <Dialog.Close asChild className="absolute right-4 top-4">
            <button
              className="text-xl text-neutral-400 hover:text-neutral-300 active:text-neutral-400"
              aria-label="Close"
            >
              &times;
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
