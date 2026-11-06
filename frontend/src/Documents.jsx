import React, { useState } from "react";

function Documents() {
  const [files, setFiles] = useState({});

  const documents = [
    {
      id: "aadhaar",
      icon: "🪪",
      name: "Aadhaar Card",
      optional: false,
    },
    {
      id: "tenth",
      icon: "🎓",
      name: "10th Marksheet",
      optional: false,
    },
    {
    id: "tenth-certificate",
    icon: "🎓",
    name: "10th Certificate",
    optional: false,
    },
    {
      id: "twelfth",
      icon: "🎓",
      name: "12th Marksheet",
      optional: false,
    },
    {
    id: "twelfth-certificate",
    icon: "🎓",
    name: "12th Certificate",
    optional: false,
    },
    {
      id: "diploma-marksheet",
      icon: "📄",
      name: "Diploma Marksheet",
      optional: true,
    },
    {
      id: "school-leaving",
      icon: "🏫",
      name: "School Leaving Certificate",
      optional: false,
    },
    {
      id: "birth",
      icon: "📜",
      name: "Birth Certificate",
      optional: false,
    },
    {
      id: "domicile",
      icon: "🏠",
      name: "Domicile Certificate",
      optional: false,
    },
    {
      id: "diploma-certificate",
      icon: "📜",
      name: "Diploma Certificate",
      optional: true,
    },
    {
      id: "photo",
      icon: "📸",
      name: "Passport Size Photograph",
      optional: false,
    },
    {
      id: "signature",
      icon: "✍️",
      name: "Applicant Signature",
      optional: false,
    },
  ];

  const handleFileChange = (event, id) => {
    
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFiles((previousFiles) => ({
        ...previousFiles,
        [id]: selectedFile,
      }));
    }
  };
  const handleUploadDocuments = async () => {
  const selectedFiles = Object.entries(files);

  if (selectedFiles.length === 0) {
    alert("Please select at least one document.");
    return;
  }

  try {
    for (const [documentType, file] of selectedFiles) {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("documentType", documentType);

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8080/api/documents/upload",
        {
          method: "POST",
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed for ${documentType}`);
      }
    }

    alert("Documents uploaded successfully!");
  } catch (error) {
    console.error(error);
    alert("Document upload failed.");
  }
};

  return (
    <div
      style={{
        width: "100%",
        minHeight: "500px",
        padding: "20px",
        color: "white",
      }}
    >
      {/* PAGE HEADER */}
      <div style={{ marginBottom: "25px" }}>
        <div
          style={{
            display: "inline-block",
            padding: "8px 15px",
            borderRadius: "20px",
            background: "rgba(20,151,255,0.18)",
            border: "1px solid rgba(73,214,255,0.35)",
            fontSize: "12px",
            fontWeight: "700",
          }}
        >
          📄 DOCUMENTS
        </div>

        <h1
          style={{
            margin: "18px 0 0",
            fontSize: "clamp(26px, 3vw, 30px)",
            fontWeight: "800",
            lineHeight: "1",
          }}
        >
          Upload Documents
        </h1>

        <p
          style={{
            marginTop: "12px",
            color: "rgba(238,249,255,0.78)",
            fontSize: "14px",
          }}
        >
          Upload your required documents for the admission application.
        </p>
      </div>

      {/* DOCUMENT CARD */}
      <div
        style={{
          padding: "20px",
          borderRadius: "24px",
          background: "rgba(255,255,255,0.10)",
          border: "1px solid rgba(120,235,255,0.25)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      >
        <h2
          style={{
            margin: "0 0 8px",
            fontSize: "15px",
          }}
        >
          Required Documents
        </h2>

        <p
          style={{
            margin: "0 0 25px",
            color: "rgba(255,255,255,0.70)",
            fontSize: "10px",
          }}
        >
          Please upload clear and readable copies of the following documents.
        </p>

        {/* DOCUMENT LIST */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "5px",
          }}
        >
          {documents.map((document) => (
            <div
              key={document.id}
              style={{
                padding: "10px",
                borderRadius: "15px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(120,235,255,0.20)",
              }}
            >
              {/* DOCUMENT NAME */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "8px",
                }}
              >
                <div
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(20,151,255,0.16)",
                    border: "1px solid rgba(120,235,255,0.25)",
                    fontSize: "15px",
                  }}
                >
                  {document.icon}
                </div>

                <div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                    }}
                  >
                    {document.name}
                  </div>

                  <div
                    style={{
                      marginTop: "4px",
                      fontSize: "11px",
                      color: document.optional
                        ? "#7de7ff"
                        : "rgba(255,255,255,0.55)",
                    }}
                  >
                    {document.optional ? "Optional" : "Required"}
                  </div>
                </div>
              </div>

              {/* FILE INPUT */}
              <label
                style={{
                  display: "block",
                  padding: "11px 14px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(120,235,255,0.22)",
                  cursor: "pointer",
                  textAlign: "center",
                  fontSize: "12px",
                  fontWeight: "700",
                }}
              >
                {files[document.id]
                  ? "✓ File Selected"
                  : "📎 Choose File"}

                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(event) =>
                    handleFileChange(event, document.id)
                  }
                  style={{
                    display: "none",
                  }}
                />
              </label>

              {/* SELECTED FILE NAME */}
              {files[document.id] && (
                <div
                  style={{
                    marginTop: "10px",
                    padding: "8px 8px",
                    borderRadius: "10px",
                    background: "rgba(0,200,150,0.12)",
                    border: "1px solid rgba(0,220,180,0.20)",
                    color: "rgba(255,255,255,0.78)",
                    fontSize: "10px",
                    wordBreak: "break-word",
                  }}
                >
                  <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                }}
                >
                <span style={{ wordBreak: "break-word" }}>
                    ✓ {files[document.id].name}
                </span>

                <button
                    type="button"
                    onClick={() => {
                    setFiles((previousFiles) => {
                        const updatedFiles = { ...previousFiles };
                        delete updatedFiles[document.id];
                        return updatedFiles;
                    });
                    }}
                    style={{
                    border: "none",
                    background: "rgba(197, 137, 137, 0.79)",
                    color: "#f30d0d",
                    borderRadius: "8px",
                    padding: "3px 7px",
                    cursor: "pointer",
                    fontSize: "6px",
                    fontWeight: "700",
                    flexShrink: 0,
                    }}
                >
                    ✕ 
                </button>
                </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* UPLOAD BUTTON */}
        <button
            type="button"
            onClick={handleUploadDocuments}
          style={{
            marginTop: "25px",
            padding: "13px 24px",
            border: "none",
            borderRadius: "14px",
            background:
              "linear-gradient(100deg,#248eff,#08cfff)",
            color: "white",
            fontSize: "13px",
            fontWeight: "700",
            cursor: "pointer",
            boxShadow: "0 10px 30px rgba(0,190,255,0.18)",
          }}
        >
          Upload Documents →
        </button>
      </div>
    </div>
  );
}

export default Documents;