import React, { useEffect, useState } from "react";

function Payment() {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [successPayment, setSuccessPayment] = useState(null);
  const [error, setError] = useState("");

  // JWT header for protected backend APIs
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return {};
    }

    return {
      Authorization: `Bearer ${token}`,
    };
  };

  // Load applications
  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/applications",
        {
          method: "GET",
          headers: {
            ...getAuthHeaders(),
          },
        }
      );

      if (!response.ok) {
        throw new Error("Unable to load applications");
      }

      const data = await response.json();

      setApplications(data);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  // Open payment confirmation
  const handlePayNow = (application) => {
    // Prevent payment if already paid
    if (
      application.paymentStatus &&
      application.paymentStatus.toUpperCase() === "PAID"
    ) {
      return;
    }

    setSelectedApplication(application);
    setSuccessPayment(null);
    setError("");
  };

  // Mock payment
  const handleConfirmPayment = async () => {
    if (!selectedApplication) {
      return;
    }

    // Extra protection against duplicate payment
    if (
      selectedApplication.paymentStatus &&
      selectedApplication.paymentStatus.toUpperCase() === "PAID"
    ) {
      setSelectedApplication(null);
      return;
    }

    setPaying(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:8080/api/payments/mock",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
          body: JSON.stringify({
            amount:
              selectedApplication.course?.fees || 5000,

            application: {
              id: selectedApplication.id,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Payment failed");
      }

      const payment = await response.json();

      // Update application status locally
      setApplications((previousApplications) =>
        previousApplications.map((application) =>
          application.id === selectedApplication.id
            ? {
                ...application,
                paymentStatus: "PAID",
              }
            : application
        )
      );

      setSuccessPayment(payment);
      setSelectedApplication(null);
    } catch (err) {
      console.error(err);
      setError("Payment failed. Please try again.");
    } finally {
      setPaying(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.loading}>
            Loading applications...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>Payment</h2>

          <p style={styles.subtitle}>
            Complete your admission payment securely
          </p>
        </div>

        <div style={styles.badge}>
          MOCK PAYMENT
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div style={styles.errorBox}>
          ❌ {error}
        </div>
      )}

      {/* PAYMENT SUCCESS */}
      {successPayment && (
        <div style={styles.successCard}>

          <div style={styles.successIcon}>
            ✓
          </div>

          <h2 style={styles.successTitle}>
            Payment Successful
          </h2>

          <p style={styles.successText}>
            Your admission payment has been completed successfully.
          </p>

          <div style={styles.detailsBox}>

            <div style={styles.detailRow}>
              <span>Payment ID</span>

              <strong>
                {successPayment.id}
              </strong>
            </div>

            <div style={styles.detailRow}>
              <span>Amount</span>

              <strong>
                ₹
                {Number(
                  successPayment.amount
                ).toLocaleString("en-IN")}
              </strong>
            </div>

            <div style={styles.detailRow}>
              <span>Status</span>

              <strong style={styles.paid}>
                {successPayment.paymentStatus}
              </strong>
            </div>

            <div style={styles.detailRow}>
              <span>Transaction ID</span>

              <strong>
                {successPayment.transactionId}
              </strong>
            </div>

            <div style={styles.detailRow}>
              <span>Payment Date</span>

              <strong>
                {new Date(
                  successPayment.paymentDate
                ).toLocaleString("en-IN")}
              </strong>
            </div>

          </div>

          <button
            style={styles.doneButton}
            onClick={() => setSuccessPayment(null)}
          >
            Done
          </button>

        </div>
      )}

      {/* APPLICATIONS */}
      {!successPayment && (
        <>
          {applications.length === 0 ? (
            <div style={styles.emptyCard}>

              <div style={styles.emptyIcon}>
                💳
              </div>

              <h3>
                No Applications Found
              </h3>

              <p>
                Please submit an admission application before making
                a payment.
              </p>

            </div>
          ) : (
            <div style={styles.grid}>

              {applications.map((application) => {

                const isPaid =
                  application.paymentStatus &&
                  application.paymentStatus.toUpperCase() ===
                    "PAID";

                return (
                  <div
                    key={application.id}
                    style={styles.applicationCard}
                  >

                    {/* CARD TOP */}
                    <div style={styles.cardTop}>

                      <div>
                        <span style={styles.appLabel}>
                          Application
                        </span>

                        <h3 style={styles.applicationNumber}>
                          {application.applicationNumber ||
                            `APP${String(
                              application.id
                            ).padStart(3, "0")}`}
                        </h3>
                      </div>

                      <span
                        style={{
                          ...styles.status,

                          background:
                            application.status ===
                            "APPROVED"
                              ? "rgba(34,197,94,0.15)"
                              : application.status ===
                                "REJECTED"
                              ? "rgba(239,68,68,0.15)"
                              : "rgba(245,158,11,0.15)",

                          color:
                            application.status ===
                            "APPROVED"
                              ? "#4ade80"
                              : application.status ===
                                "REJECTED"
                              ? "#f87171"
                              : "#fbbf24",

                          border:
                            application.status ===
                            "APPROVED"
                              ? "1px solid rgba(34,197,94,0.3)"
                              : application.status ===
                                "REJECTED"
                              ? "1px solid rgba(239,68,68,0.3)"
                              : "1px solid rgba(245,158,11,0.3)",
                        }}
                      >
                        {application.status ||
                          "PENDING"}
                      </span>

                    </div>

                    {/* INFO */}
                    <div style={styles.info}>

                      <div>
                        <span style={styles.infoLabel}>
                          Course
                        </span>

                        <strong>
                          {application.course?.courseName ||
                            "Course not available"}
                        </strong>
                      </div>

                      <div>
                        <span style={styles.infoLabel}>
                          Applicant
                        </span>

                        <strong>
                          {application.student?.name ||
                            application.applicantName ||
                            "Student"}
                        </strong>
                      </div>

                      <div>
                        <span style={styles.infoLabel}>
                          Application ID
                        </span>

                        <strong>
                          #{application.id}
                        </strong>
                      </div>

                      <div>
                        <span style={styles.infoLabel}>
                          Admission Fee
                        </span>

                        <strong>
                          ₹
                          {Number(
                            application.course?.fees ||
                              5000
                          ).toLocaleString("en-IN")}
                        </strong>
                      </div>

                    </div>

                    {/* PAYMENT STATUS */}
                    <div
                      style={{
                        ...styles.paymentStatusBox,

                        background: isPaid
                          ? "rgba(34,197,94,0.10)"
                          : "rgba(245,158,11,0.10)",

                        border: isPaid
                          ? "1px solid rgba(34,197,94,0.30)"
                          : "1px solid rgba(245,158,11,0.25)",
                      }}
                    >

                      <span>
                        💳 Payment Status
                      </span>

                      <strong
                        style={{
                          color: isPaid
                            ? "#4ade80"
                            : "#fbbf24",
                        }}
                      >
                        {isPaid
                          ? "✓ PAID"
                          : "⏳ PENDING"}
                      </strong>

                    </div>

                    {/* BUTTON */}
                    {isPaid ? (
                      <button
                        style={
                          styles.completedButton
                        }
                        disabled
                      >
                        ✓ Payment Completed
                      </button>
                    ) : (
                      <button
                        style={styles.payButton}
                        onClick={() =>
                          handlePayNow(application)
                        }
                      >
                        💳 Pay Now
                      </button>
                    )}

                  </div>
                );
              })}

            </div>
          )}
        </>
      )}

      {/* PAYMENT CONFIRMATION MODAL */}
      {selectedApplication && (
        <div style={styles.overlay}>

          <div style={styles.modal}>

            <button
              style={styles.closeButton}
              onClick={() =>
                setSelectedApplication(null)
              }
            >
              ×
            </button>

            <div style={styles.modalIcon}>
              💳
            </div>

            <h2 style={styles.modalTitle}>
              Confirm Payment
            </h2>

            <p style={styles.modalText}>
              Please confirm your admission payment.
            </p>

            <div style={styles.confirmBox}>

              <div>
                <span>Application</span>

                <strong>
                  {selectedApplication.applicationNumber ||
                    `APP${String(
                      selectedApplication.id
                    ).padStart(3, "0")}`}
                </strong>
              </div>

              <div>
                <span>Course</span>

                <strong>
                  {selectedApplication.course?.courseName ||
                    "Selected Course"}
                </strong>
              </div>

              <div>
                <span>Amount</span>

                <strong style={styles.amount}>
                  ₹
                  {Number(
                    selectedApplication.course?.fees ||
                      5000
                  ).toLocaleString("en-IN")}
                </strong>
              </div>

            </div>

            <div style={styles.mockNotice}>
              🧪 This is a mock/test payment.
              <br />
              No real money will be deducted.
            </div>

            <button
              style={{
                ...styles.confirmButton,
                opacity: paying ? 0.6 : 1,
                cursor: paying
                  ? "not-allowed"
                  : "pointer",
              }}
              onClick={handleConfirmPayment}
              disabled={paying}
            >
              {paying
                ? "Processing Payment..."
                : "Confirm & Pay"}
            </button>

            <button
              style={styles.cancelButton}
              onClick={() =>
                setSelectedApplication(null)
              }
              disabled={paying}
            >
              Cancel
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    minHeight: "100%",
    padding: "10px 5px 30px",
    boxSizing: "border-box",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },

  title: {
    margin: 0,
    color: "#ffffff",
    fontSize: "28px",
    fontWeight: "700",
  },

  subtitle: {
    marginTop: "7px",
    color: "#b7d9f7",
    fontSize: "14px",
  },

  badge: {
    padding: "8px 14px",
    borderRadius: "20px",
    background: "rgba(255, 255, 255, 0.07)",
    border: "1px solid rgba(120, 235, 255, 0.22)",
    color: "#67dfff",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.5px",
    backdropFilter: "blur(15px)",
    WebkitBackdropFilter: "blur(15px)",
  },

  /* GLASS LOADING CARD */
  card: {
    background: "rgba(255, 255, 255, 0.07)",
    border: "1px solid rgba(120, 235, 255, 0.22)",
    borderRadius: "24px",
    padding: "40px",
    backdropFilter: "blur(22px)",
    WebkitBackdropFilter: "blur(22px)",
    boxShadow:
      "0 15px 40px rgba(0, 0, 0, 0.15)",
  },

  loading: {
    textAlign: "center",
    color: "#b7d9f7",
    fontSize: "16px",
  },

  errorBox: {
    padding: "14px 18px",
    marginBottom: "20px",
    borderRadius: "20px",
    background: "rgba(255, 255, 255, 0.07)",
    border: "1px solid rgba(248, 113, 113, 0.35)",
    color: "#ff9b9b",
    backdropFilter: "blur(22px)",
    WebkitBackdropFilter: "blur(22px)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(290px, 1fr))",
    gap: "20px",
  },

  /* ADMISSION FORM STYLE */
  applicationCard: {
    background: "rgba(255, 255, 255, 0.07)",
    border: "1px solid rgba(120, 235, 255, 0.22)",
    borderRadius: "24px",
    padding: "24px",

    backdropFilter: "blur(22px)",
    WebkitBackdropFilter: "blur(22px)",

    boxShadow:
      "0 15px 40px rgba(0, 0, 0, 0.15)",

    transition: "all 0.25s ease",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "20px",
  },

  appLabel: {
    color: "#8bb9d9",
    fontSize: "12px",
  },

  applicationNumber: {
    margin: "5px 0 0",
    color: "#ffffff",
    fontSize: "20px",
  },

  status: {
    padding: "6px 10px",
    borderRadius: "15px",
    fontSize: "11px",
    fontWeight: "700",
  },

  info: {
    display: "grid",
    gap: "14px",
    marginBottom: "18px",
  },

  infoLabel: {
    display: "block",
    color: "#8bb9d9",
    fontSize: "12px",
    marginBottom: "4px",
  },

  paymentStatusBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 14px",
    borderRadius: "14px",
    marginBottom: "14px",
    fontSize: "13px",
  },

  payButton: {
    width: "100%",
    padding: "13px",
    border: "1px solid rgba(120, 235, 255, 0.25)",
    borderRadius: "14px",
    background: "rgba(255, 255, 255, 0.08)",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "0.2s",
  },

  completedButton: {
    width: "100%",
    padding: "13px",
    border:
      "1px solid rgba(34,197,94,0.35)",
    borderRadius: "14px",
    background: "rgba(34,197,94,0.12)",
    color: "#4ade80",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "default",
  },

  /* EMPTY GLASS CARD */
  emptyCard: {
    textAlign: "center",
    padding: "60px 20px",
    background: "rgba(255, 255, 255, 0.07)",
    border: "1px solid rgba(120, 235, 255, 0.22)",
    borderRadius: "24px",
    color: "#b7d9f7",

    backdropFilter: "blur(22px)",
    WebkitBackdropFilter: "blur(22px)",

    boxShadow:
      "0 15px 40px rgba(0, 0, 0, 0.15)",
  },

  emptyIcon: {
    fontSize: "45px",
    marginBottom: "15px",
  },

  /* MODAL OVERLAY */
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    zIndex: 9999,
  },

  /* GLASS MODAL */
  modal: {
    position: "relative",
    width: "100%",
    maxWidth: "450px",

    background: "rgba(255, 255, 255, 0.07)",

    border:
      "1px solid rgba(120, 235, 255, 0.22)",

    borderRadius: "24px",

    padding: "30px",

    boxSizing: "border-box",

    backdropFilter: "blur(22px)",
    WebkitBackdropFilter: "blur(22px)",

    boxShadow:
      "0 25px 70px rgba(0, 0, 0, 0.5)",
  },

  closeButton: {
    position: "absolute",
    top: "14px",
    right: "16px",
    background: "transparent",
    border: "none",
    color: "#b7d9f7",
    fontSize: "28px",
    cursor: "pointer",
  },

  modalIcon: {
    width: "60px",
    height: "60px",
    borderRadius: "18px",
    background: "rgba(255, 255, 255, 0.08)",
    border:
      "1px solid rgba(120, 235, 255, 0.22)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    margin: "0 auto 15px",
  },

  modalTitle: {
    textAlign: "center",
    color: "#ffffff",
    margin: "0 0 8px",
  },

  modalText: {
    textAlign: "center",
    color: "#9ec6e4",
    fontSize: "14px",
    marginBottom: "20px",
  },

  confirmBox: {
    background: "rgba(255, 255, 255, 0.05)",
    border:
      "1px solid rgba(120, 235, 255, 0.12)",
    borderRadius: "16px",
    padding: "18px",
    display: "grid",
    gap: "15px",
  },

  mockNotice: {
    marginTop: "18px",
    padding: "12px",
    borderRadius: "14px",
    background:
      "rgba(245, 158, 11, 0.10)",
    border:
      "1px solid rgba(245, 158, 11, 0.25)",
    color: "#f7c66a",
    fontSize: "12px",
    textAlign: "center",
    lineHeight: "1.6",
  },

  confirmButton: {
    width: "100%",
    marginTop: "18px",
    padding: "13px",
    border:
      "1px solid rgba(120, 235, 255, 0.25)",
    borderRadius: "14px",
    background: "rgba(255, 255, 255, 0.08)",
    color: "#ffffff",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
  },

  cancelButton: {
    width: "100%",
    marginTop: "10px",
    padding: "11px",
    border:
      "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "14px",
    background: "transparent",
    color: "#a9c7df",
    cursor: "pointer",
  },

  /* SUCCESS GLASS CARD */
  successCard: {
    maxWidth: "600px",
    margin: "20px auto",
    padding: "35px",
    textAlign: "center",

    background: "rgba(255, 255, 255, 0.07)",

    border:
      "1px solid rgba(34, 197, 94, 0.35)",

    borderRadius: "24px",

    backdropFilter: "blur(22px)",
    WebkitBackdropFilter: "blur(22px)",

    boxShadow:
      "0 15px 40px rgba(0, 0, 0, 0.15)",
  },

  successIcon: {
    width: "65px",
    height: "65px",
    margin: "0 auto 15px",
    borderRadius: "50%",
    background: "rgba(34, 197, 94, 0.15)",
    border:
      "1px solid rgba(34, 197, 94, 0.35)",
    color: "#4ade80",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
    fontWeight: "700",
  },

  successTitle: {
    color: "#ffffff",
    marginBottom: "8px",
  },

  successText: {
    color: "#a9c7df",
    fontSize: "14px",
  },

  detailsBox: {
    marginTop: "25px",
    background: "rgba(255, 255, 255, 0.04)",
    border:
      "1px solid rgba(120, 235, 255, 0.10)",
    borderRadius: "16px",
    padding: "18px",
  },

  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
    padding: "12px 0",
    borderBottom:
      "1px solid rgba(255, 255, 255, 0.07)",
    color: "#a9c7df",
    fontSize: "13px",
  },

  paid: {
    color: "#4ade80",
  },

  doneButton: {
    marginTop: "22px",
    width: "100%",
    padding: "13px",
    border:
      "1px solid rgba(120, 235, 255, 0.25)",
    borderRadius: "14px",
    background: "rgba(255, 255, 255, 0.08)",
    color: "#ffffff",
    fontWeight: "700",
    cursor: "pointer",
  },

  amount: {
    color: "#67dfff",
    fontSize: "17px",
  },
};

export default Payment;