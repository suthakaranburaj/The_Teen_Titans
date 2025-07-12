const Notification = ({ notification, onClose }) => {
    if (!notification) return null;
  
    return (
      <div className={`fixed top-4 right-4 p-4 rounded-md shadow-md z-50 ${
        notification.isSuccess ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}>
        <div className="flex justify-between items-center">
          <span>{notification.message}</span>
          <button onClick={onClose} className="ml-4">
            ×
          </button>
        </div>
      </div>
    );
  };
  
  export default Notification;