import { useState } from 'react';
import { FaBell, FaExclamationCircle, FaWallet, FaTag } from "react-icons/fa"; // Icons
import { useAuth } from "../context/AuthContext";


// --- Utility Function to format time elapsed ---
const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) return interval + " years ago";
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return interval + " months ago";
  interval = Math.floor(seconds / 86400);
  if (interval > 1) return interval + " days ago";
  interval = Math.floor(seconds / 3600);
  if (interval > 1) return interval + " hours ago";
  interval = Math.floor(seconds / 60);
  if (interval > 1) return interval + " minutes ago";
  return "just now";
};

// --- Utility Function to Map Type to Icon/Color ---
const getNotificationVisuals = (type) => {
  switch (type) {
    case 'transaction':
      return { icon: FaWallet, color: 'text-primary', badge: 'bg-primary' };
    case 'alert':
      return { icon: FaExclamationCircle, color: 'text-danger', badge: 'bg-danger' };
    case 'promo':
      return { icon: FaTag, color: 'text-success', badge: 'bg-success' };
    case 'info':
    default:
      return { icon: FaBell, color: 'text-info', badge: 'bg-info' };
  }
};

// --- Notification Detail Modal Component ---
const NotificationDetailModal = ({ notification, onClose }) => {
  if (!notification) return null;

  const { icon: Icon, color, badge } = getNotificationVisuals(notification.type);
  const timeCreated = new Date(notification.createdAt).toLocaleString();

  return (
    <div className="modal fade show" style={{ display: 'block', zIndex: 1060 }} tabIndex="-1" role="dialog" onClick={onClose}>
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document" onClick={e => e.stopPropagation()}>
        <div className="modal-content shadow-lg rounded-3">
          <div className="modal-header d-flex align-items-center">
            <Icon size={24} className={`me-3 ${color}`} />
            <h5 className="modal-title fw-bold">{notification.title}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {/* Main Message */}
            <p className="text-dark">{notification.message}</p>
            <hr />

            {/* Detailed Information */}
            <div className="d-flex justify-content-between my-2 align-items-center">
              <strong>Type:</strong>
              <span className={`badge ${badge} text-uppercase`}>{notification.type}</span>
            </div>
            <div className="d-flex justify-content-between my-2 align-items-center">
              <strong>Status:</strong>
              <span className={`badge ${notification.isRead ? 'bg-secondary' : 'bg-warning text-dark'}`}>
                {notification.isRead ? 'Read' : 'Unread'}
              </span>
            </div>
            <div className="d-flex justify-content-between my-2">
              <strong>Received:</strong>
              <span>{timeCreated}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Main Notification Component ---
const Notification = () => {
  const { user } = useAuth();

  const notificationsData = user?.notifications || [];
  const [selectedNotification, setSelectedNotification] = useState(null);

  const unreadCount = notificationsData.filter(n => !n.isRead).length;

  // Handler to open the modal
  const handleNotificationClick = async (notification) => {
    setSelectedNotification(notification);

    if (!notification.isRead) {
      try {
        await fetch(`${import.meta.env.VITE_SERVER_URL}/api/notifications/${user._id}/${notification._id}/read`, {
          method: "PATCH",
          credentials: "include",
        });

        // Update UI instantly
        notification.isRead = true;
      } catch (err) {
        console.error("Failed to mark notification as read:", err);
      }
    }
  };


  // Handler to close the modal
  const handleCloseModal = () => {
    setSelectedNotification(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 d-flex align-items-center">
        <FaBell className="me-3" /> Notifications
        {unreadCount > 0 && (
          <span className="badge bg-danger ms-3" style={{ fontSize: '0.9rem' }}>
            {unreadCount} Unread
          </span>
        )}
      </h2>

      <hr className="mb-4" />

      {notificationsData.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          You are all caught up! No notifications to display.
        </div>
      ) : (
        <div className="list-group shadow-sm rounded-3">
          {notificationsData.map((notification) => {
            const { icon: Icon, color } = getNotificationVisuals(notification.type);
            const timeElapsed = timeAgo(notification.createdAt);

            return (
              <div
                key={notification._id}
                // Call handler on click to open modal
                onClick={(e) => { e.preventDefault(); handleNotificationClick(notification); }}
                className={`list-group-item list-group-item-action ${!notification.isRead ? 'list-group-item-light fw-medium' : 'text-muted'}`}
              >
                <div className="d-flex w-100 py-3 px-2 justify-content-between gap-5">
                  <div className="d-flex align-items-start me-4" style={{ flexGrow: 1, minWidth: 0 }}>
                    <Icon className={`me-4 ${color} mt-1 flex-shrink-0`} size={25} />
                    <div style={{ flexGrow: 1, minWidth: 0 }}>
                      <h5 className={`mb-1 ${!notification.isRead ? 'text-dark fw-bold' : 'text-muted'}`}>{notification.title}</h5>

                      <p
                        className={`mb-0 small d-block text-truncate ${!notification.isRead ? 'text-dark' : 'text-muted'}`}
                      >
                        {notification.message}
                      </p>
                    </div>
                  </div>
                  {/* Time is fixed on the right */}
                  <small className={`text-nowrap ${!notification.isRead ? 'text-dark' : 'text-muted'}`}>
                    {timeElapsed}
                  </small>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Conditional Rendering of the Modal and Backdrop */}
      {selectedNotification && (
        <>
          <NotificationDetailModal
            notification={selectedNotification}
            onClose={handleCloseModal}
          />
          <div className="modal-backdrop fade show" style={{ zIndex: 1055 }}></div>
        </>
      )}
    </div>
  );
};

export default Notification;