import { AlertTriangle } from 'lucide-react';

const DeletePopup = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  isDeleting = false 
}) => {
  if (!isOpen) return null;

  return (
  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
  <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 p-6 outline-none">
    <div className="flex items-start gap-3 mb-6">
      <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
        <AlertTriangle className="w-5 h-5 text-red-600" />
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          {message}
        </p>
      </div>
    </div>

    <div className="flex justify-end gap-3">
      <button
        className="px-4 py-2 bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-md transition-colors disabled:opacity-50"
        onClick={onClose}
        disabled={isDeleting}
      >
        {cancelText}
      </button>
      <button
        className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-md disabled:opacity-50 transition-colors min-w-[100px]"
        onClick={onConfirm}
        disabled={isDeleting}
      >
        {isDeleting ? "Đang xóa..." : confirmText}
      </button>
    </div>
  </div>
</div>
  );
};

export default DeletePopup;