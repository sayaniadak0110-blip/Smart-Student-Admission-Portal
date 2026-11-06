import React from "react";

function Profile() {
  const [editing, setEditing] = React.useState(false);
  const [saved, setSaved] = React.useState(false);

  const [profile, setProfile] = React.useState({
    fullName: "Swastik Debnath",
    email: "swastik@example.com",
    phone: "+91 98765 43210",
    dob: "10 May 2004",
    gender: "Male",
    address: "Kolkata, West Bengal",
    course: "BCA",
    studentId: "STU001",
  });

  const update = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid rgba(130,225,255,0.22)",
    background: "rgba(5,38,60,0.55)",
    color: "#fff",
    outline: "none",
    fontSize: "12px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "7px",
    color: "rgba(235,250,255,0.72)",
    fontSize: "10px",
    fontWeight: "700",
    letterSpacing: "0.5px",
  };

  const field = (label, key, type = "text") => (
    <div>
      <label style={labelStyle}>{label}</label>
      {editing ? (
        <input
          type={type}
          value={profile[key]}
          onChange={(e) => update(key, e.target.value)}
          style={inputStyle}
        />
      ) : (
        <div style={inputStyle}>{profile[key]}</div>
      )}
    </div>
  );

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr",
          gap: "18px",
          alignItems: "stretch",
        }}
      >
        {/* PROFILE SUMMARY */}
        <div
          style={{
            padding: "26px 20px",
            borderRadius: "22px",
            background:
              "linear-gradient(145deg,rgba(117,220,255,0.18),rgba(255,255,255,0.07))",
            border: "1px solid rgba(156,233,255,0.25)",
            backdropFilter: "blur(22px)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "92px",
              height: "92px",
              margin: "0 auto",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(145deg,#168fff,#1645d8)",
              border: "2px solid rgba(110,230,255,0.45)",
              boxShadow: "0 12px 35px rgba(0,150,255,0.28)",
              fontSize: "40px",
            }}
          >
            👤
          </div>

          <h2 style={{ margin: "16px 0 5px", fontSize: "20px" }}>
            {profile.fullName}
          </h2>

          <p
            style={{
              margin: 0,
              color: "#43d8ff",
              fontSize: "11px",
              fontWeight: "700",
            }}
          >
            {profile.course}
          </p>

          <div
            style={{
              marginTop: "20px",
              padding: "13px",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.055)",
              textAlign: "left",
            }}
          >
            <div style={{ color: "#43d8ff", fontSize: "9px", fontWeight: "800" }}>
              STUDENT ID
            </div>
            <div style={{ marginTop: "5px", fontSize: "12px", fontWeight: "700" }}>
              {profile.studentId}
            </div>
          </div>

          <div
            style={{
              marginTop: "10px",
              padding: "13px",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.055)",
              textAlign: "left",
            }}
          >
            <div style={{ color: "#43d8ff", fontSize: "9px", fontWeight: "800" }}>
              STATUS
            </div>
            <div style={{ marginTop: "5px", color: "#62e6a7", fontSize: "12px", fontWeight: "700" }}>
              ✓ Active Student
            </div>
          </div>
        </div>

        {/* PROFILE DETAILS */}
        <div
          style={{
            padding: "24px",
            borderRadius: "22px",
            background:
              "linear-gradient(145deg,rgba(117,220,255,0.18),rgba(255,255,255,0.07))",
            border: "1px solid rgba(156,233,255,0.25)",
            backdropFilter: "blur(22px)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h2 style={{ margin: 0, fontSize: "21px" }}>👤 Profile Details</h2>
              <p
                style={{
                  margin: "7px 0 0",
                  color: "rgba(255,255,255,0.58)",
                  fontSize: "11px",
                }}
              >
                View and manage your student information.
              </p>
            </div>

            <button
              onClick={() => {
                if (editing) {
                  setSaved(true);
                }
                setEditing(!editing);
              }}
              style={{
                padding: "10px 17px",
                borderRadius: "12px",
                border: "1px solid rgba(110,230,255,0.25)",
                background: "linear-gradient(100deg,#248eff,#08cfff)",
                color: "#fff",
                fontSize: "11px",
                fontWeight: "800",
                cursor: "pointer",
              }}
            >
              {editing ? "✓ Save Profile" : "✎ Edit Profile"}
            </button>
          </div>

          {saved && (
            <div
              style={{
                marginTop: "14px",
                padding: "10px 12px",
                borderRadius: "11px",
                background: "rgba(49,220,145,0.10)",
                border: "1px solid rgba(98,230,167,0.24)",
                color: "#72efb2",
                fontSize: "11px",
              }}
            >
              ✓ Profile updated successfully.
            </div>
          )}

          <div
            style={{
              marginTop: "22px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            {field("FULL NAME", "fullName")}
            {field("EMAIL ADDRESS", "email", "email")}
            {field("PHONE NUMBER", "phone", "tel")}
            {field("DATE OF BIRTH", "dob")}
            {field("GENDER", "gender")}
            {field("COURSE", "course")}
          </div>

          <div style={{ marginTop: "16px" }}>
            {field("ADDRESS", "address")}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
