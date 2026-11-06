import React, { useEffect, useState } from "react";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/applications",
        {
          method: "GET",
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              }
            : {
                "Content-Type": "application/json",
              },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }

      const data = await response.json();

      setApplications(data);
    } catch (error) {
      console.error("Application fetch error:", error);

      setMessage(
        "Unable to load applications. Please make sure Spring Boot is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        color: "white",
        padding: "10px 0 40px",
      }}
    >
      {/* HEADER */}
      <div style={{ marginBottom: "28px" }}>
        <div
          style={{
            display: "inline-block",
            padding: "8px 16px",
            borderRadius: "20px",
            background: "rgba(20,151,255,0.18)",
            border: "1px solid rgba(73,214,255,0.3)",
            color: "#b8f3ff",
            fontSize: "12px",
            fontWeight: "700",
            letterSpacing: "1px",
          }}
        >
          📋 MY APPLICATIONS
        </div>

        <h2
          style={{
            margin: "18px 0 8px",
            fontSize: "34px",
            fontWeight: "800",
          }}
        >
          My Applications
        </h2>

        <p
          style={{
            margin: 0,
            color: "rgba(238,249,255,0.75)",
            fontSize: "14px",
          }}
        >
          Track your submitted admission applications and their status.
        </p>
      </div>

      {/* LOADING */}
      {loading && (
        <div
          style={{
            padding: "25px",
            borderRadius: "20px",
            background:
              "linear-gradient(135deg,rgba(117,220,255,0.18),rgba(255,255,255,0.07))",
            border: "1px solid rgba(156,233,255,0.25)",
            textAlign: "center",
          }}
        >
          Loading applications...
        </div>
      )}

      {/* ERROR */}
      {!loading && message && (
        <div
          style={{
            padding: "18px",
            borderRadius: "18px",
            background: "rgba(255,80,80,0.12)",
            border: "1px solid rgba(255,120,120,0.3)",
            color: "#ffd5d5",
          }}
        >
          {message}
        </div>
      )}

      {/* NO APPLICATION */}
      {!loading && !message && applications.length === 0 && (
        <div
          style={{
            padding: "40px",
            borderRadius: "22px",
            background:
              "linear-gradient(135deg,rgba(117,220,255,0.18),rgba(255,255,255,0.07))",
            border: "1px solid rgba(156,233,255,0.25)",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "45px" }}>📋</div>

          <h3 style={{ marginTop: "12px" }}>
            No Applications Found
          </h3>

          <p
            style={{
              marginTop: "8px",
              color: "rgba(255,255,255,0.6)",
              fontSize: "13px",
            }}
          >
            You have not submitted any admission application yet.
          </p>
        </div>
      )}

      {/* APPLICATION CARDS */}
      {!loading &&
        !message &&
        applications.map((application) => (
          <div
            key={application.id}
            style={{
              marginBottom: "18px",
              padding: "22px",
              borderRadius: "22px",
              background:
                "linear-gradient(135deg,rgba(117,220,255,0.18),rgba(255,255,255,0.07))",
              border: "1px solid rgba(156,233,255,0.25)",
              backdropFilter: "blur(22px)",
              WebkitBackdropFilter: "blur(22px)",
            }}
          >
            {/* TOP */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "15px",
                marginBottom: "20px",
              }}
            >
              <div>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "20px",
                  }}
                >
                  📄 {application.applicationNumber}
                </h3>

                <p
                  style={{
                    marginTop: "5px",
                    color: "rgba(255,255,255,0.55)",
                    fontSize: "11px",
                  }}
                >
                  Application ID: {application.id}
                </p>
              </div>

              <span
                style={{
                  padding: "8px 14px",
                  borderRadius: "20px",
                  background:
                    application.status === "APPROVED"
                      ? "rgba(0,220,140,0.16)"
                      : application.status === "REJECTED"
                      ? "rgba(255,80,80,0.16)"
                      : "rgba(255,190,0,0.17)",
                  color:
                    application.status === "APPROVED"
                      ? "#63ffc5"
                      : application.status === "REJECTED"
                      ? "#ff8d8d"
                      : "#ffc42e",
                  fontSize: "10px",
                  fontWeight: "800",
                }}
              >
                {application.status || "PENDING"}
              </span>
            </div>

            {/* APPLICANT NAME */}
            <div
              style={{
                marginBottom: "12px",
                padding: "15px",
                borderRadius: "14px",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(120,230,255,0.18)",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  color: "#36d6ff",
                  fontWeight: "700",
                  marginBottom: "6px",
                }}
              >
                👤 APPLICANT NAME
              </div>

              <div
                style={{
                  fontSize: "15px",
                  fontWeight: "800",
                }}
              >
                {application.applicantName || "Not available"}
              </div>
            </div>

            {/* DETAILS */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(3, minmax(0, 1fr))",
                gap: "12px",
              }}
            >
              <InfoBox
                label="COURSE"
                value={
                  application.course?.courseName ||
                  "Not assigned"
                }
              />

              <InfoBox
                label="DATE OF BIRTH"
                value={
                  application.dateOfBirth ||
                  "Not provided"
                }
              />

              <InfoBox
                label="GENDER"
                value={
                  application.gender ||
                  "Not provided"
                }
              />

              <InfoBox
                label="APPLIED ON"
                value={
                  application.appliedAt
                    ? new Date(
                        application.appliedAt
                      ).toLocaleDateString()
                    : "Not available"
                }
              />

              <InfoBox
                label="STATUS"
                value={
                  application.status ||
                  "PENDING"
                }
              />

              {/* PAYMENT STATUS */}
              <PaymentStatusBox
                status={
                  application.paymentStatus ||
                  "PENDING"
                }
              />

              <InfoBox
                label="ADDRESS"
                value={
                  application.address ||
                  "Not provided"
                }
              />
            </div>
          </div>
        ))}
    </div>
  );
}

/* NORMAL INFO BOX */
function InfoBox({ label, value }) {
  return (
    <div
      style={{
        padding: "14px",
        borderRadius: "14px",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(120,230,255,0.15)",
      }}
    >
      <div
        style={{
          fontSize: "10px",
          color: "#36d6ff",
          fontWeight: "700",
          marginBottom: "6px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: "12px",
          fontWeight: "600",
          color: "rgba(255,255,255,0.85)",
          wordBreak: "break-word",
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* PAYMENT STATUS BOX */
function PaymentStatusBox({ status }) {
  const normalizedStatus = status.toUpperCase();

  const isPaid = normalizedStatus === "PAID";
  const isFailed = normalizedStatus === "FAILED";

  return (
    <div
      style={{
        padding: "14px",
        borderRadius: "14px",
        background: isPaid
          ? "rgba(0,220,140,0.10)"
          : isFailed
          ? "rgba(255,80,80,0.10)"
          : "rgba(255,190,0,0.10)",
        border: isPaid
          ? "1px solid rgba(0,255,170,0.25)"
          : isFailed
          ? "1px solid rgba(255,100,100,0.25)"
          : "1px solid rgba(255,200,0,0.22)",
      }}
    >
      <div
        style={{
          fontSize: "10px",
          color: "#36d6ff",
          fontWeight: "700",
          marginBottom: "6px",
        }}
      >
        💳 PAYMENT STATUS
      </div>

      <div
        style={{
          fontSize: "12px",
          fontWeight: "800",
          color: isPaid
            ? "#63ffc5"
            : isFailed
            ? "#ff8d8d"
            : "#ffc42e",
        }}
      >
        {isPaid
          ? "✓ PAID"
          : isFailed
          ? "✕ FAILED"
          : "⏳ PENDING"}
      </div>
    </div>
  );
}

export default MyApplications;