
import React from 'react';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function MobileMenu({ isOpen, onClose, children }: MobileMenuProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={onClose}
          style={{ touchAction: 'none' }}
        />
      )}
      
      {/* Menu */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 transform transition-transform duration-300 ease-in-out",
          "bg-gradient-to-t from-[#2F1B14] to-[#1a0f0a] border-t-2 border-[#4A4A4A]",
          "rounded-t-lg shadow-xl max-h-[80vh] overflow-y-auto",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
        style={{ touchAction: 'pan-y' }}
      >
        {/* Handle bar for better UX */}
        <div className="flex justify-center pt-2 pb-4">
          <div className="w-12 h-1 bg-[#4A4A4A] rounded-full" />
        </div>
        
        <div className="px-4 pb-safe">
          {children}
        </div>
      </div>
    </>
  );
}
