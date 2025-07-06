import React from 'react';

type PopoverContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  closeContent: () => void;
  triggerRef: React.RefObject<HTMLDivElement>;
};

export const PopoverContext = React.createContext<PopoverContextType | null>(
  null
);

export const usePopover = () => {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error('usePopover must be used within a PopoverProvider');
  }
  return context;
};
