import React, { useEffect, useState } from "react";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return {};
    }

    return {
      Authorization: `Bearer ${token}`,
    };
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/notifications",
        {
          method: "GET",
          headers: {
            ...getAuthHeaders(),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await response.json();

      const sortedData = [...data].sort(
        (a, b) =>
          new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );

      setNotifications(sortedData);
      setMessage("");
    } catch (error) {
      console.error("Notification fetch error:", error);
      setMessage(
        "Unable to load notifications. Please make sure Spring Boot is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "Date not available";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getIcon = (notification) => {
    const text = notification.message?.toLowerCase() || "";

    if (text.includes("approved")) return "✓";
    if (text.includes("rejected")) return "✕";
    if (text.includes("paid") || text.includes("payment")) return "💳";
    if (text.includes("submitted")) return "📝";

    return "🔔";
  };

  const isRejected = (notification) => {
    return notification.message
      ?.toLowerCase()
      .includes("rejected");
  };

  const isApproved = (notification) => {
    return notification.message
      ?.toLowerCase()
      .includes("approved");
  };

  return (
    <div className="notification-page">

      {/* HEADER */}
      <div className="notification-header">
        <div>
          <h2>🔔 Notifications</h2>
          <p>
            Stay updated with your admission application activities.
          </p>
        </div>

        <button
          className="refresh-btn"
          onClick={fetchNotifications}
        >
          🔄 Refresh
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="notification-loading">
          <div className="loader"></div>
          <p>Loading notifications...</p>
        </div>
      )}

      {/* ERROR */}
      {!loading && message && (
        <div className="notification-error">
          ⚠️ {message}
        </div>
      )}

      {/* EMPTY */}
      {!loading &&
        !message &&
        notifications.length === 0 && (
          <div className="empty-notification">
            <div className="empty-icon">🔔</div>
            <h3>No Notifications</h3>
            <p>
              You don't have any notifications yet.
            </p>
          </div>
        )}

      {/* NOTIFICATION CARDS */}
      {!loading &&
        !message &&
        notifications.length > 0 && (
          <div className="notification-list">

            {notifications.map((notification) => (

              <div
                className={`notification-card ${
                  isRejected(notification)
                    ? "rejected"
                    : isApproved(notification)
                    ? "approved"
                    : ""
                }`}
                key={notification.id}
              >

                {/* ICON */}
                <div
                  className={`notification-icon ${
                    isRejected(notification)
                      ? "rejected-icon"
                      : isApproved(notification)
                      ? "approved-icon"
                      : ""
                  }`}
                >
                  {getIcon(notification)}
                </div>

                {/* CONTENT */}
                <div className="notification-content">

                  <div className="notification-title-row">
                    <h3>Admission Update</h3>

                    {!notification.read && (
                      <span className="new-badge">
                        NEW
                      </span>
                    )}
                  </div>

                  <p className="notification-message">
                    {notification.message}
                  </p>

                  <span className="notification-date">
                    🕒 {formatDate(notification.createdAt)}
                  </span>

                </div>

              </div>

            ))}

          </div>
        )}

      {/* STYLES */}
      <style>{`

        .notification-page {
          padding: 25px;
          width: 100%;
          box-sizing: border-box;
        }

        /* HEADER */

        .notification-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 25px;
          gap: 15px;
        }

        .notification-header h2 {
          margin: 0;
          font-size: 28px;
          color: white;
          font-weight: 700;
        }

        .notification-header p {
          margin: 7px 0 0;
          color: #cbd5e1;
          font-size: 14px;
        }

        /* REFRESH BUTTON */

        .refresh-btn {
          border: none;
          background: linear-gradient(
            135deg,
            #06b6d4,
            #2563eb
          );
          color: white;
          padding: 11px 20px;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          font-size: 14px;
          transition: 0.2s;
        }

        .refresh-btn:hover {
          transform: translateY(-2px);
          box-shadow:
            0 6px 20px rgba(6, 182, 212, 0.35);
        }

        /* LIST */

        .notification-list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        /* DARK BLUE CARD */

        .notification-card {
          display: flex;
          align-items: flex-start;
          gap: 18px;

          background:
            linear-gradient(
              145deg,
              rgba(5, 91, 139, 0.95),
              rgba(5, 70, 110, 0.96)
            );

          border: 1px solid rgba(34, 211, 238, 0.28);

          border-radius: 15px;

          padding: 20px;

          box-shadow:
            0 8px 25px rgba(0, 0, 0, 0.20),
            inset 0 1px 0 rgba(255,255,255,0.08);

          transition: all 0.25s ease;

          color: white;
        }

        .notification-card:hover {
          transform: translateY(-3px);

          box-shadow:
            0 12px 30px rgba(0, 0, 0, 0.28),
            0 0 18px rgba(34, 211, 238, 0.12);
        }

        /* APPROVED */

        .notification-card.approved {
          border-left: 4px solid #22c55e;
        }

        /* REJECTED */

        .notification-card.rejected {
          border-left: 4px solid #ef4444;
        }

        /* ICON */

        .notification-icon {
          min-width: 48px;
          width: 48px;
          height: 48px;

          border-radius: 12px;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 23px;
          font-weight: 800;

          background:
            linear-gradient(
              135deg,
              #06b6d4,
              #2563eb
            );

          color: white;

          box-shadow:
            0 5px 15px rgba(0, 0, 0, 0.18);
        }

        /* APPROVED ICON */

        .approved-icon {
          background:
            linear-gradient(
              135deg,
              #16a34a,
              #22c55e
            );
        }

        /* REJECTED ICON */

        .rejected-icon {
          background:
            linear-gradient(
              135deg,
              #dc2626,
              #ef4444
            );
        }

        /* CONTENT */

        .notification-content {
          flex: 1;
          min-width: 0;
        }

        .notification-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }

        .notification-title-row h3 {
          margin: 0;
          color: white;
          font-size: 17px;
          font-weight: 700;
        }

        /* NEW */

        .new-badge {
          background: #0ea5e9;
          color: white;

          font-size: 10px;
          font-weight: 700;

          padding: 4px 8px;

          border-radius: 20px;

          box-shadow:
            0 3px 8px rgba(14, 165, 233, 0.35);
        }

        /* MESSAGE */

        .notification-message {
          margin: 0 0 10px;

          color: #e2e8f0;

          font-size: 14px;

          line-height: 1.6;
        }

        /* DATE */

        .notification-date {
          color: #94a3b8;
          font-size: 12px;
        }

        /* LOADING */

        .notification-loading {
          min-height: 250px;

          display: flex;
          flex-direction: column;

          align-items: center;
          justify-content: center;

          color: #cbd5e1;
        }

        .loader {
          width: 35px;
          height: 35px;

          border: 4px solid rgba(255,255,255,0.15);

          border-top: 4px solid #22d3ee;

          border-radius: 50%;

          animation: spin 0.8s linear infinite;

          margin-bottom: 12px;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }

          100% {
            transform: rotate(360deg);
          }
        }

        /* ERROR */

        .notification-error {
          background: rgba(127, 29, 29, 0.45);

          border: 1px solid rgba(248, 113, 113, 0.45);

          color: #fecaca;

          padding: 15px;

          border-radius: 10px;
        }

        /* EMPTY */

        .empty-notification {
          background:
            linear-gradient(
              145deg,
              rgba(5, 91, 139, 0.95),
              rgba(5, 70, 110, 0.96)
            );

          border:
            1px solid rgba(34, 211, 238, 0.28);

          border-radius: 15px;

          padding: 60px 20px;

          text-align: center;

          color: white;
        }

        .empty-icon {
          font-size: 50px;
          margin-bottom: 10px;
        }

        .empty-notification h3 {
          margin: 0 0 8px;
          color: white;
        }

        .empty-notification p {
          margin: 0;
          color: #cbd5e1;
          font-size: 14px;
        }

        /* MOBILE */

        @media (max-width: 600px) {

          .notification-page {
            padding: 15px;
          }

          .notification-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .refresh-btn {
            width: 100%;
          }

          .notification-card {
            padding: 15px;
          }

        }

      `}</style>
    </div>
  );
}

export default Notifications;