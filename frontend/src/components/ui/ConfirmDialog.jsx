import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you absolutely sure?",
  description = "This action cannot be undone. This will permanently delete your data from our servers.",
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading = false,
  variant = "destructive"
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} description={description} className="max-w-md">
      <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-border">
        <Button variant="outline" onClick={onClose} disabled={isLoading}>
          {cancelText}
        </Button>
        <Button variant={variant} onClick={onConfirm} isLoading={isLoading}>
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}
