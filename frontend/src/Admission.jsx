import React, { useEffect, useState } from "react";
import { courses } from "./Courses";

// ======================================================
// COURSE STREAM GROUPING
// Current Courses.jsx has:
// Science / Technology = 25 courses
// Commerce / Business = 15 courses
// Arts / Humanities = 12 courses
// Total = 52 courses
// ======================================================

const SCIENCE_COURSES = courses.slice(0, 25);
const COMMERCE_COURSES = courses.slice(25, 40);
const ARTS_COURSES = courses.slice(40, 52);

function Admission({ selectedCourse }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    stream: "",
    course: "",
    tenthPercentage: "",
    twelfthPercentage: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ======================================================
  // SET COURSE IF COMING FROM COURSES PAGE
  // ======================================================

  useEffect(() => {
    if (selectedCourse) {
      let selectedStream = "";

      if (
        SCIENCE_COURSES.some(
          (course) => course.name === selectedCourse
        )
      ) {
        selectedStream = "Science";
      } else if (
        COMMERCE_COURSES.some(
          (course) => course.name === selectedCourse
        )
      ) {
        selectedStream = "Commerce";
      } else if (
        ARTS_COURSES.some(
          (course) => course.name === selectedCourse
        )
      ) {
        selectedStream = "Arts";
      }

      setFormData((previousData) => ({
        ...previousData,
        stream: selectedStream,
        course: selectedCourse,
      }));
    }
  }, [selectedCourse]);

  // ======================================================
  // GET COURSES BASED ON SELECTED STREAM
  // ======================================================

  const getCoursesByStream = () => {
    if (formData.stream === "Science") {
      return SCIENCE_COURSES;
    }

    if (formData.stream === "Commerce") {
      return COMMERCE_COURSES;
    }

    if (formData.stream === "Arts") {
      return ARTS_COURSES;
    }

    return [];
  };

  const filteredCourses = getCoursesByStream();

  // ======================================================
  // HANDLE FORM CHANGE
  // ======================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    // When stream changes, clear previously selected course
    if (name === "stream") {
      setFormData((previousData) => ({
        ...previousData,
        stream: value,
        course: "",
      }));

      return;
    }

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // ======================================================
  // HANDLE SUBMIT
  // ======================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extra validation for percentages
    const tenth = Number(formData.tenthPercentage);
    const twelfth = Number(formData.twelfthPercentage);

    if (
      formData.tenthPercentage === "" ||
      tenth < 0 ||
      tenth > 100
    ) {
      setMessage(
        "Please enter a valid 10th percentage between 0 and 100."
      );
      return;
    }

    if (
      formData.twelfthPercentage === "" ||
      twelfth < 0 ||
      twelfth > 100
    ) {
      setMessage(
        "Please enter a valid 12th percentage between 0 and 100."
      );
      return;
    }

    if (!formData.stream) {
      setMessage("Please select your stream.");
      return;
    }

    if (!formData.course) {
      setMessage("Please select a course.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      // ==================================================
      // JWT AUTHENTICATION
      // ==================================================

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Login session not found. Please login again."
        );
      }

      const authHeaders = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // ==================================================
      // LOAD COURSES FROM BACKEND
      // ==================================================

      const courseResponse = await fetch(
        "http://localhost:8080/api/courses",
        {
          method: "GET",
          headers: authHeaders,
        }
      );

      if (!courseResponse.ok) {
        const errorText = await courseResponse.text();

        throw new Error(
          errorText || "Unable to load courses"
        );
      }

      const databaseCourses = await courseResponse.json();

      // ==================================================
      // FIND SELECTED COURSE IN DATABASE
      // ==================================================

      const selectedCourseFromDB = databaseCourses.find(
        (course) => {
          const databaseName = (course.courseName || "")
            .replace(/–/g, "-")
            .trim()
            .toLowerCase();

          const selectedName = (formData.course || "")
            .replace(/–/g, "-")
            .trim()
            .toLowerCase();

          return databaseName === selectedName;
        }
      );

      if (!selectedCourseFromDB) {
        throw new Error(
          "Selected course was not found in the database."
        );
      }

      // ==================================================
      // APPLICATION DATA
      // Existing backend structure kept unchanged.
      // ==================================================

      const applicationData = {
        applicantName: formData.name,
        dateOfBirth: formData.dob,
        gender: formData.gender,
        address: formData.address,
        status: "PENDING",

        course: {
          id: selectedCourseFromDB.id,
        },
      };

      console.log(
        "Submitting application:",
        applicationData
      );

      // ==================================================
      // SUBMIT APPLICATION
      // ==================================================

      const response = await fetch(
        "http://localhost:8080/api/applications",
        {
          method: "POST",
          headers: authHeaders,
          body: JSON.stringify(applicationData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
          errorText || "Unable to submit application"
        );
      }

      const result = await response.json();

      setMessage(
        `Application submitted successfully! Application No: ${result.applicationNumber}`
      );

      console.log(
        "Application Response:",
        result
      );

      // ==================================================
      // RESET FORM
      // ==================================================

      setFormData({
        name: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        address: "",
        stream: "",
        course: "",
        tenthPercentage: "",
        twelfthPercentage: "",
      });
    } catch (error) {
      console.error(
        "Application submit error:",
        error
      );

      setMessage(
        error.message ||
          "Application submission failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // PAGE
  // ======================================================

  return (
    <div
      style={{
        width: "100%",
        color: "white",
        padding: "10px 0 40px",
      }}
    >
      {/* PAGE HEADER */}
      <div style={{ marginBottom: "25px" }}>
        <div
          style={{
            display: "inline-block",
            padding: "8px 16px",
            borderRadius: "20px",
            background: "rgba(20,151,255,0.18)",
            border:
              "1px solid rgba(73,214,255,0.3)",
            color: "#b8f3ff",
            fontSize: "12px",
            fontWeight: "700",
            letterSpacing: "1px",
          }}
        >
          📝 ADMISSION
        </div>

        <h2
          style={{
            margin: "18px 0 8px",
            fontSize: "34px",
            fontWeight: "800",
          }}
        >
          Apply for Admission
        </h2>

        <p
          style={{
            margin: 0,
            color: "rgba(238,249,255,0.75)",
            fontSize: "14px",
          }}
        >
          Fill in your details carefully to submit
          your admission application.
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: "rgba(255,255,255,0.07)",
          border:
            "1px solid rgba(120,235,255,0.22)",
          borderRadius: "24px",
          padding: "28px",
          backdropFilter: "blur(22px)",
          WebkitBackdropFilter: "blur(22px)",
          boxShadow:
            "0 15px 40px rgba(0,0,0,0.15)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(2, minmax(0, 1fr))",
            gap: "20px",
          }}
        >
          {/* NAME */}
          <div>
            <label style={labelStyle}>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              style={inputStyle}
            />
          </div>

          {/* EMAIL */}
          <div>
            <label style={labelStyle}>
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              style={inputStyle}
            />
          </div>

          {/* PHONE */}
          <div>
            <label style={labelStyle}>
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
              style={inputStyle}
            />
          </div>

          {/* DOB */}
          <div>
            <label style={labelStyle}>
              Date of Birth
            </label>

            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* GENDER */}
          <div>
            <label style={labelStyle}>
              Gender
            </label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option
                value=""
                style={optionStyle}
              >
                Select Gender
              </option>

              <option
                value="Male"
                style={optionStyle}
              >
                Male
              </option>

              <option
                value="Female"
                style={optionStyle}
              >
                Female
              </option>

              <option
                value="Other"
                style={optionStyle}
              >
                Other
              </option>
            </select>
          </div>

          {/* STREAM */}
          <div>
            <label style={labelStyle}>
              Select Stream
            </label>

            <select
              name="stream"
              value={formData.stream}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option
                value=""
                style={optionStyle}
              >
                Select Stream
              </option>

              <option
                value="Science"
                style={optionStyle}
              >
                Science
              </option>

              <option
                value="Commerce"
                style={optionStyle}
              >
                Commerce
              </option>

              <option
                value="Arts"
                style={optionStyle}
              >
                Arts
              </option>
            </select>
          </div>

          {/* 10TH PERCENTAGE */}
          <div>
            <label style={labelStyle}>
              10th Percentage
            </label>

            <input
              type="number"
              name="tenthPercentage"
              value={formData.tenthPercentage}
              onChange={handleChange}
              placeholder="Enter 10th percentage"
              min="0"
              max="100"
              step="0.01"
              required
              style={inputStyle}
            />
          </div>

          {/* 12TH PERCENTAGE */}
          <div>
            <label style={labelStyle}>
              12th Percentage
            </label>

            <input
              type="number"
              name="twelfthPercentage"
              value={formData.twelfthPercentage}
              onChange={handleChange}
              placeholder="Enter 12th percentage"
              min="0"
              max="100"
              step="0.01"
              required
              style={inputStyle}
            />
          </div>

          {/* COURSE */}
          <div>
            <label style={labelStyle}>
              Select Course
            </label>

            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
              disabled={!formData.stream}
              style={{
                ...inputStyle,
                opacity:
                  !formData.stream ? 0.55 : 1,
                cursor:
                  !formData.stream
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              <option
                value=""
                style={optionStyle}
              >
                {!formData.stream
                  ? "Select Stream First"
                  : "Select Course"}
              </option>

              {filteredCourses.map((course) => (
                <option
                  key={course.name}
                  value={course.name}
                  style={optionStyle}
                >
                  {course.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ADDRESS */}
        <div style={{ marginTop: "20px" }}>
          <label style={labelStyle}>
            Address
          </label>

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your full address"
            rows="4"
            required
            style={{
              ...inputStyle,
              resize: "vertical",
            }}
          />
        </div>

        {/* STREAM INFO */}
        {formData.stream && (
          <div
            style={{
              marginTop: "18px",
              padding: "12px 15px",
              borderRadius: "12px",
              background:
                "rgba(20,151,255,0.10)",
              border:
                "1px solid rgba(73,214,255,0.18)",
              color: "#b8f3ff",
              fontSize: "13px",
            }}
          >
            {formData.stream} stream selected —{" "}
            {filteredCourses.length} courses
            available.
          </div>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "25px",
            padding: "13px 25px",
            border:
              "1px solid rgba(120,235,255,0.45)",
            borderRadius: "14px",
            background:
              "linear-gradient(100deg, #248eff, #80cfff)",
            color: "white",
            fontSize: "14px",
            fontWeight: "700",
            cursor: loading
              ? "not-allowed"
              : "pointer",
            opacity: loading ? 0.7 : 1,
            boxShadow:
              "0 10px 30px rgba(0,190,255,0.18)",
          }}
        >
          {loading
            ? "Submitting..."
            : "Submit Application →"}
        </button>

        {/* MESSAGE */}
        {message && (
          <div
            style={{
              marginTop: "18px",
              padding: "13px 15px",
              borderRadius: "13px",
              background:
                "rgba(0,0,0,0.16)",
              border:
                "1px solid rgba(120,235,255,0.20)",
              color: "#8ff8ff",
              fontSize: "13px",
              lineHeight: "1.5",
            }}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

// ======================================================
// LABEL STYLE
// ======================================================

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  color: "#dff9ff",
  fontSize: "13px",
  fontWeight: "700",
};

// ======================================================
// INPUT STYLE
// ======================================================

const inputStyle = {
  width: "100%",
  padding: "13px 14px",
  borderRadius: "12px",
  border:
    "1px solid rgba(120,235,255,0.22)",
  outline: "none",
  background:
    "rgba(255,255,255,0.08)",
  color: "white",
  fontSize: "13px",
  boxSizing: "border-box",
};

// ======================================================
// OPTION STYLE
// ======================================================

const optionStyle = {
  color: "#05173c",
  background: "#8feeff",
};

export default Admission;