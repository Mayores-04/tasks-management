import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    notifications: string[];
    setNotifications: React.Dispatch<React.SetStateAction<string[]>>; // Function to update notifications
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, notifications, setNotifications }) => {
    if (!isOpen) return null;

    const deleteNotification = (index: number) => {
        // Update the notifications state
        setNotifications(prevNotifications => prevNotifications.filter((_, i) => i !== index));
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-4 w-1/3">
                <h2 className="text-xl font-semibold mb-2">Notifications</h2>
                <ul className="space-y-2">
                    {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                            <li key={index} className="flex justify-between items-center p-2 border-b last:border-b-0">
                                <span>{notification}</span>
                                <button
                                    onClick={() => deleteNotification(index)}
                                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                                >
                                    Delete
                                </button>
                            </li>
                        ))
                    ) : (
                        <li>No notifications</li>
                    )}
                </ul>
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-gray-800 text-white rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
