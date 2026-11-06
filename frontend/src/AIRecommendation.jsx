import React, { useState } from "react";
import { courses } from "./Courses";

const AI_API_URL = "http://127.0.0.1:5000/predict";

/* =========================================================
   SUBJECT OPTIONS
========================================================= */

const SUBJECT_OPTIONS = {
  Science: [
    "Mathematics",
    "Computer Science",
    "Physics",
    "Chemistry",
    "Biology",
    "Statistics",
    "Electronics",
    "Biotechnology",
    "Microbiology",
  ],

  Commerce: [
    "Accounting",
    "Finance",
    "Business Studies",
    "Economics",
    "Marketing",
    "Mathematics",
  ],

  Arts: [
    "English",
    "Bengali",
    "History",
    "Geography",
    "Political Science",
    "Psychology",
    "Sociology",
    "Philosophy",
    "Economics",
  ],
};


/* =========================================================
   CAREER GOALS
========================================================= */

const CAREER_GOAL_OPTIONS = [
  {
    value: "Software / IT",
    label: "Software / IT",
  },
  {
    value: "AI / Machine Learning",
    label: "AI / Machine Learning",
  },
  {
    value: "Data Science",
    label: "Data Science",
  },
  {
    value: "Cyber Security",
    label: "Cyber Security",
  },
  {
    value: "Finance / Banking",
    label: "Finance / Banking",
  },
  {
    value: "Business / Management",
    label: "Business / Management",
  },
  {
    value: "Marketing",
    label: "Marketing",
  },
  {
    value: "Teaching / Research",
    label: "Teaching / Research",
  },
  {
    value: "Journalism / Media",
    label: "Journalism / Media",
  },
  {
    value: "Social Work",
    label: "Social Work",
  },
  {
    value: "Government Services",
    label: "Government Services",
  },
];


/* =========================================================
   COURSE NAME NORMALIZATION
========================================================= */

function normalizeCourseName(name) {
  if (!name) return "";

  const raw = String(name).trim();

  const exact = courses.find(
    (course) =>
      course &&
      typeof course.name === "string" &&
      course.name.toLowerCase() === raw.toLowerCase()
  );

  if (exact) {
    return exact.name;
  }

  const converted = raw.replace(/\s*-\s*/g, " – ");

  const convertedMatch = courses.find(
    (course) =>
      course &&
      typeof course.name === "string" &&
      course.name.toLowerCase() === converted.toLowerCase()
  );

  if (convertedMatch) {
    return convertedMatch.name;
  }

  return raw;
}


/* =========================================================
   COURSE DETAILS
========================================================= */

const specialCourseDetails = {
  "BCA": {
    icon: "🖥️",
    duration: "3 Years",
    eligibility: "10+2",
    description:
      "Bachelor of Computer Applications provides a strong foundation in programming, databases, software development and computer applications.",
    subjects: [
      "Programming",
      "Database Management",
      "Web Development",
      "Computer Networks",
      "Software Engineering",
    ],
    careers: [
      "Software Developer",
      "Web Developer",
      "Application Developer",
      "System Analyst",
      "IT Professional",
    ],
  },

  "BCA – Artificial Intelligence": {
    icon: "🤖",
    duration: "3 Years",
    eligibility: "10+2",
    description:
      "A technology-focused computer application course covering Artificial Intelligence, programming, data analysis and intelligent systems.",
    subjects: [
      "Artificial Intelligence",
      "Python",
      "Machine Learning",
      "Data Science",
      "Database",
    ],
    careers: [
      "AI Developer",
      "Machine Learning Engineer",
      "Python Developer",
      "Data Analyst",
      "AI Engineer",
    ],
  },

  "BCA – Machine Learning": {
    icon: "🧠",
    duration: "3 Years",
    eligibility: "10+2",
    description:
      "A computer application course focused on Machine Learning, Artificial Intelligence, programming, statistics and data-driven systems.",
    subjects: [
      "Python",
      "Machine Learning",
      "Artificial Intelligence",
      "Data Science",
      "Statistics",
      "Database",
    ],
    careers: [
      "Machine Learning Engineer",
      "AI Developer",
      "Data Analyst",
      "Data Scientist",
      "Python Developer",
    ],
  },

  "BCA – Data Analytics": {
    icon: "📊",
    duration: "3 Years",
    eligibility: "10+2",
    description:
      "A technology-oriented course focused on data analysis, programming, statistics and extracting useful information from data.",
    subjects: [
      "Data Analytics",
      "Python",
      "Statistics",
      "Database",
      "Data Visualization",
    ],
    careers: [
      "Data Analyst",
      "Business Analyst",
      "Data Engineer",
      "BI Analyst",
      "Data Professional",
    ],
  },

  "BCA – Full Stack Development": {
    icon: "🌐",
    duration: "3 Years",
    eligibility: "10+2",
    description:
      "A practical software development path covering frontend, backend, databases and full-stack web application development.",
    subjects: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Backend Development",
      "Database",
    ],
    careers: [
      "Full Stack Developer",
      "Frontend Developer",
      "Backend Developer",
      "Web Developer",
      "Software Developer",
    ],
  },

  "BCA – Web Development": {
    icon: "🌍",
    duration: "3 Years",
    eligibility: "10+2",
    description:
      "A practical technology course focused on website development, frontend technologies, backend programming and web applications.",
    subjects: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Web Programming",
      "Database",
    ],
    careers: [
      "Web Developer",
      "Frontend Developer",
      "Backend Developer",
      "UI Developer",
      "Full Stack Developer",
    ],
  },

  "BCA – Cloud Computing": {
    icon: "☁️",
    duration: "3 Years",
    eligibility: "10+2",
    description:
      "A technology-focused course covering cloud infrastructure, application deployment, networking and modern cloud platforms.",
    subjects: [
      "Cloud Computing",
      "Networking",
      "Linux",
      "Virtualization",
      "Cloud Security",
    ],
    careers: [
      "Cloud Engineer",
      "Cloud Developer",
      "System Administrator",
      "DevOps Engineer",
      "Cloud Architect",
    ],
  },

  "BCA – Software Development": {
    icon: "💻",
    duration: "3 Years",
    eligibility: "10+2",
    description:
      "A software-focused course covering programming, software engineering, databases and application development.",
    subjects: [
      "Programming",
      "Java",
      "Software Engineering",
      "Database",
      "Web Development",
    ],
    careers: [
      "Software Developer",
      "Application Developer",
      "Backend Developer",
      "Software Engineer",
      "System Analyst",
    ],
  },

  "BCA – Cyber Security": {
    icon: "🔐",
    duration: "3 Years",
    eligibility: "10+2",
    description:
      "A computer application course focused on cybersecurity, network security, ethical hacking and protection of digital systems.",
    subjects: [
      "Cyber Security",
      "Network Security",
      "Ethical Hacking",
      "Cryptography",
      "Digital Forensics",
    ],
    careers: [
      "Cyber Security Analyst",
      "Security Engineer",
      "Ethical Hacker",
      "SOC Analyst",
      "Security Consultant",
    ],
  },

  "BCA – DevOps": {
    icon: "🚀",
    duration: "3 Years",
    eligibility: "10+2",
    description:
      "A technology-oriented course combining software development, automation, cloud computing and continuous deployment practices.",
    subjects: [
      "DevOps",
      "Linux",
      "Cloud Computing",
      "Docker",
      "CI/CD",
    ],
    careers: [
      "DevOps Engineer",
      "Cloud Engineer",
      "Release Engineer",
      "Automation Engineer",
      "Software Engineer",
    ],
  },

  "BCA – Internet of Things (IoT)": {
    icon: "📡",
    duration: "3 Years",
    eligibility: "10+2",
    description:
      "A technology course focused on connected devices, sensors, programming, networking and intelligent IoT systems.",
    subjects: [
      "IoT",
      "Sensors",
      "Networking",
      "Embedded Systems",
      "Programming",
    ],
    careers: [
      "IoT Developer",
      "Embedded Developer",
      "IoT Engineer",
      "Systems Engineer",
      "Automation Engineer",
    ],
  },

  "BCA – Blockchain Technology": {
    icon: "⛓️",
    duration: "3 Years",
    eligibility: "10+2",
    description:
      "A technology-focused course covering blockchain concepts, distributed systems, smart contracts and digital applications.",
    subjects: [
      "Blockchain",
      "Cryptography",
      "Smart Contracts",
      "Programming",
      "Distributed Systems",
    ],
    careers: [
      "Blockchain Developer",
      "Smart Contract Developer",
      "Web3 Developer",
      "Software Developer",
      "Blockchain Analyst",
    ],
  },

  "B.Sc Computer Science": {
    icon: "💻",
    duration: "3 Years",
    eligibility: "10+2",
    description:
      "A computer science degree covering programming, algorithms, databases, operating systems and computer networks.",
    subjects: [
      "Programming",
      "Data Structures",
      "Algorithms",
      "Operating Systems",
      "Database",
      "Computer Networks",
    ],
    careers: [
      "Software Developer",
      "System Analyst",
      "Web Developer",
      "Database Administrator",
      "IT Professional",
    ],
  },

  "B.Sc Data Science": {
    icon: "📈",
    duration: "3 Years",
    eligibility: "10+2",
    description:
      "A data-focused degree combining statistics, programming, data analysis, machine learning and data visualization.",
    subjects: [
      "Statistics",
      "Python",
      "Data Analysis",
      "Machine Learning",
      "Data Visualization",
    ],
    careers: [
      "Data Scientist",
      "Data Analyst",
      "ML Engineer",
      "Data Engineer",
      "Business Analyst",
    ],
  },

  "B.Sc Information Technology": {
    icon: "🖥️",
    duration: "3 Years",
    eligibility: "10+2",
    description:
      "An information technology degree covering software, databases, networking, web technologies and IT systems.",
    subjects: [
      "Programming",
      "Database",
      "Networking",
      "Web Technologies",
      "Operating Systems",
    ],
    careers: [
      "IT Analyst",
      "Software Developer",
      "Web Developer",
      "System Administrator",
      "IT Support Engineer",
    ],
  },

  "B.Tech Computer Science": {
    icon: "💻",
    duration: "4 Years",
    eligibility: "10+2",
    description:
      "A comprehensive engineering program covering computer science, programming, algorithms, systems and software engineering.",
    subjects: [
      "Programming",
      "Data Structures",
      "Algorithms",
      "Operating Systems",
      "Computer Networks",
      "Software Engineering",
    ],
    careers: [
      "Software Engineer",
      "Software Developer",
      "System Engineer",
      "Data Engineer",
      "Technology Professional",
    ],
  },

  "B.Tech Artificial Intelligence & Machine Learning": {
    icon: "🤖",
    duration: "4 Years",
    eligibility: "10+2",
    description:
      "An engineering program focused on Artificial Intelligence, Machine Learning, mathematics, programming and intelligent systems.",
    subjects: [
      "Artificial Intelligence",
      "Machine Learning",
      "Deep Learning",
      "Python",
      "Statistics",
      "Mathematics",
    ],
    careers: [
      "AI Engineer",
      "Machine Learning Engineer",
      "Data Scientist",
      "AI Developer",
      "ML Engineer",
    ],
  },

  "B.Tech Cyber Security": {
    icon: "🔒",
    duration: "4 Years",
    eligibility: "10+2",
    description:
      "An engineering program focused on cybersecurity, secure systems, network security, cryptography and digital forensics.",
    subjects: [
      "Cyber Security",
      "Network Security",
      "Cryptography",
      "Ethical Hacking",
      "Digital Forensics",
    ],
    careers: [
      "Cyber Security Engineer",
      "Security Analyst",
      "Ethical Hacker",
      "Security Consultant",
      "SOC Engineer",
    ],
  },

  "B.Tech Data Science": {
    icon: "📊",
    duration: "4 Years",
    eligibility: "10+2",
    description:
      "An engineering program combining data science, statistics, programming, machine learning and large-scale data analysis.",
    subjects: [
      "Data Science",
      "Statistics",
      "Machine Learning",
      "Python",
      "Data Analytics",
    ],
    careers: [
      "Data Scientist",
      "Data Engineer",
      "ML Engineer",
      "Data Analyst",
      "AI Engineer",
    ],
  },

  "B.Com": {
    icon: "💰",
    duration: "3 Years",
    eligibility: "10+2",
    description:
      "Bachelor of Commerce focuses on accounting, finance, economics, taxation and business studies.",
    subjects: [
      "Accounting",
      "Finance",
      "Economics",
      "Taxation",
      "Business Law",
    ],
    careers: [
      "Accountant",
      "Financial Executive",
      "Banking Professional",
      "Tax Consultant",
      "Business Executive",
    ],
  },

  "BBA": {
    icon: "💼",
    duration: "3 Years",
    eligibility: "10+2",
    description:
      "Bachelor of Business Administration focuses on management, marketing, finance, business operations and entrepreneurship.",
    subjects: [
      "Management",
      "Marketing",
      "Finance",
      "Human Resource Management",
      "Entrepreneurship",
    ],
    careers: [
      "Business Executive",
      "Marketing Executive",
      "HR Executive",
      "Business Analyst",
      "Entrepreneur",
    ],
  },

  "B.A": {
    icon: "📚",
    duration: "3 Years",
    eligibility: "10+2",
    description:
      "Bachelor of Arts provides opportunities across humanities, social sciences, languages and related fields.",
    subjects: [
      "English",
      "History",
      "Political Science",
      "Sociology",
      "Psychology",
    ],
    careers: [
      "Teacher",
      "Content Writer",
      "Journalist",
      "Social Researcher",
      "Civil Services Aspirant",
    ],
  },
};


/* =========================================================
   FALLBACK COURSE DETAILS
========================================================= */

function getCourseDetails(courseName) {
  if (specialCourseDetails[courseName]) {
    return specialCourseDetails[courseName];
  }

  let icon = "🎓";
  let duration = "3 Years";

  if (courseName.includes("B.Tech")) {
    duration = "4 Years";
    icon = "💻";
  } else if (courseName.includes("B.Com")) {
    icon = "💰";
  } else if (courseName.includes("BBA")) {
    icon = "💼";
  } else if (courseName.includes("B.Sc")) {
    icon = "🔬";
  } else if (courseName.includes("B.A")) {
    icon = "📚";
  } else if (courseName.includes("Journalism")) {
    icon = "📰";
  } else if (courseName.includes("Social Work")) {
    icon = "🤝";
  } else if (courseName.includes("Library")) {
    icon = "📖";
  }

  return {
    icon,
    duration,
    eligibility: "10+2",
    description:
      `${courseName} provides academic and career opportunities related to its field of study.`,
    subjects: [
      "Core Subjects",
      "Practical Learning",
      "Project Work",
      "Professional Skills",
    ],
    careers: [
      "Professional Career",
      "Industry Professional",
      "Analyst",
      "Executive",
      "Specialist",
    ],
  };
}


/* =========================================================
   CUSTOM DROPDOWN
========================================================= */

function CustomDropdown({
  label,
  value,
  onChange,
  placeholder,
  options,
}) {
  const [open, setOpen] = useState(false);

  const selectedLabel = value || placeholder;

  return (
    <div style={styles.dropdownWrapper}>
      <label style={styles.label}>{label}</label>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        style={{
          ...styles.input,
          ...styles.dropdownButton,
        }}
      >
        <span
          style={{
            color: value ? "#ffffff" : "#7fa1bd",
          }}
        >
          {selectedLabel}
        </span>

        <span style={styles.dropdownArrow}>
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open && (
        <div style={styles.dropdownMenu}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              style={{
                ...styles.dropdownOption,
                ...(value === option.value
                  ? styles.dropdownOptionSelected
                  : {}),
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


/* =========================================================
   MAIN COMPONENT
========================================================= */

function AIRecommendation() {
  const [tenthMarks, setTenthMarks] = useState("");
  const [twelfthMarks, setTwelfthMarks] = useState("");
  const [twelfthCourse, setTwelfthCourse] = useState("");
  const [interest, setInterest] = useState("");
  const [preferredSubject, setPreferredSubject] = useState("");
  const [careerGoal, setCareerGoal] = useState("");

  const [recommendations, setRecommendations] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  /* =======================================================
     SUBJECT CHANGE
  ======================================================= */

  const handleStreamChange = (value) => {
    setTwelfthCourse(value);
    setPreferredSubject("");
  };


  /* =======================================================
     GET AI RECOMMENDATION
  ======================================================= */

  const getRecommendation = async () => {
    setErrorMessage("");

    const tenth = Number(tenthMarks);
    const twelfth = Number(twelfthMarks);

    if (
      tenthMarks === "" ||
      twelfthMarks === "" ||
      !twelfthCourse ||
      !interest ||
      !preferredSubject ||
      !careerGoal
    ) {
      setErrorMessage(
        "Please complete all fields before getting AI recommendations."
      );
      return;
    }

    if (
      Number.isNaN(tenth) ||
      Number.isNaN(twelfth) ||
      tenth < 0 ||
      tenth > 100 ||
      twelfth < 0 ||
      twelfth > 100
    ) {
      setErrorMessage(
        "10th and 12th percentages must be between 0 and 100."
      );
      return;
    }

    setLoading(true);
    setRecommendations([]);
    setSelectedCourse(null);

    try {
      const response = await fetch(AI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tenth_percentage: tenth,
          twelfth_percentage: twelfth,
          twelfth_stream: twelfthCourse,
          interest: interest,
          preferred_subject: preferredSubject,
          career_goal: careerGoal,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to get AI recommendations."
        );
      }

      const parsedRecommendations = (
        data.recommendations || []
      ).map((item) => ({
        name: normalizeCourseName(item.course),
        score: Number(item.confidence || 0),
        reason:
          "Recommended by the AI/ML model based on your academic profile, stream, interest, preferred subject and career goal.",
      }));

      const validRecommendations = parsedRecommendations.filter(
        (item) => item.name
      );

      if (validRecommendations.length === 0) {
        throw new Error(
          "No suitable course recommendations were returned."
        );
      }

      setRecommendations(validRecommendations);
    } catch (error) {
      console.error("AI Recommendation Error:", error);

      setErrorMessage(
        error.message ||
          "Unable to connect to the AI recommendation server."
      );
    } finally {
      setLoading(false);
    }
  };


  /* =======================================================
     RESET
  ======================================================= */

  const resetForm = () => {
    setTenthMarks("");
    setTwelfthMarks("");
    setTwelfthCourse("");
    setInterest("");
    setPreferredSubject("");
    setCareerGoal("");
    setRecommendations([]);
    setSelectedCourse(null);
    setErrorMessage("");
  };


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div style={styles.container}>

      {/* ===================================================
          HEADER
      =================================================== */}

      <div style={styles.header}>

        <div>
          <h2 style={styles.title}>
            AI Course Recommendation
          </h2>

          <p style={styles.subtitle}>
            Get personalized course suggestions using your
            academic performance, stream, interests, preferred
            subject and career goal.
          </p>
        </div>

        <div style={styles.badge}>
          AI / ML
        </div>

      </div>


      {/* ===================================================
          FORM CARD
      =================================================== */}

      <div style={styles.formCard}>

        <div style={styles.formGrid}>

          {/* 10TH */}

          <div>
            <label style={styles.label}>
              10th Marks (%)
            </label>

            <input
              type="number"
              min="0"
              max="100"
              placeholder="Enter 10th percentage"
              value={tenthMarks}
              onChange={(e) =>
                setTenthMarks(e.target.value)
              }
              style={styles.input}
            />
          </div>


          {/* 12TH */}

          <div>
            <label style={styles.label}>
              12th Marks (%)
            </label>

            <input
              type="number"
              min="0"
              max="100"
              placeholder="Enter 12th percentage"
              value={twelfthMarks}
              onChange={(e) =>
                setTwelfthMarks(e.target.value)
              }
              style={styles.input}
            />
          </div>


          {/* STREAM */}

          <CustomDropdown
            label="12th Course / Stream"
            value={twelfthCourse}
            onChange={handleStreamChange}
            placeholder="Select stream"
            options={[
              {
                value: "Science",
                label: "Science",
              },
              {
                value: "Arts",
                label: "Arts",
              },
              {
                value: "Commerce",
                label: "Commerce",
              },
            ]}
          />


          {/* INTEREST */}

          <CustomDropdown
            label="Your Interest"
            value={interest}
            onChange={setInterest}
            placeholder="Select interest"
            options={[
              {
                value: "Science",
                label: "Science",
              },
              {
                value: "Arts",
                label: "Arts",
              },
              {
                value: "Commerce",
                label: "Commerce",
              },
            ]}
          />


          {/* PREFERRED SUBJECT */}

          <CustomDropdown
            label="Preferred Subject"
            value={preferredSubject}
            onChange={setPreferredSubject}
            placeholder={
              twelfthCourse
                ? "Select subject"
                : "Select stream first"
            }
            options={
              twelfthCourse
                ? SUBJECT_OPTIONS[twelfthCourse].map(
                    (subject) => ({
                      value: subject,
                      label: subject,
                    })
                  )
                : []
            }
          />


          {/* CAREER GOAL */}

          <CustomDropdown
            label="Career Goal"
            value={careerGoal}
            onChange={setCareerGoal}
            placeholder="Select career goal"
            options={CAREER_GOAL_OPTIONS}
          />

        </div>


        {/* ERROR */}

        {errorMessage && (
          <div style={styles.errorBox}>
            ⚠️ {errorMessage}
          </div>
        )}


        {/* BUTTONS */}

        <div style={styles.buttonRow}>

          <button
            onClick={getRecommendation}
            disabled={loading}
            style={{
              ...styles.primaryButton,
              opacity: loading ? 0.7 : 1,
              cursor: loading
                ? "not-allowed"
                : "pointer",
            }}
          >
            {loading
              ? "⏳ Getting Recommendations..."
              : "🤖 Get AI Recommendation"}
          </button>


          <button
            onClick={resetForm}
            style={styles.secondaryButton}
          >
            Reset
          </button>

        </div>

      </div>


      {/* ===================================================
          RESULTS
      =================================================== */}

      {recommendations.length > 0 && (

        <div style={styles.resultsSection}>

          <div style={styles.resultsHeader}>

            <div>
              <h2 style={styles.sectionTitle}>
                Recommended Courses
              </h2>

              <p style={styles.subtitle}>
                Recommended by the AI/ML model based on your
                academic profile, stream, interest, preferred
                subject and career goal.
              </p>
            </div>

            <p style={styles.subtitle}>Match scores are ranking indicators, not admission probabilities. Check each institution’s eligibility rules.</p>
          <span style={styles.countBadge}>
              {recommendations.length} Matches
            </span>

          </div>


          {/* =================================================
              COURSE GRID
          ================================================= */}

          <div style={styles.grid}>

            {recommendations.map((course, index) => {

              const details =
                getCourseDetails(course.name);

              return (

                <div
                  key={course.name}
                  style={styles.courseCard}

                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-6px)";

                    e.currentTarget.style.borderColor =
                      "rgba(86, 211, 255, 0.38)";

                    e.currentTarget.style.boxShadow =
                      "0 20px 45px rgba(0,0,0,0.34), 0 0 22px rgba(0,198,255,0.08)";
                  }}

                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0)";

                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.13)";

                    e.currentTarget.style.boxShadow =
                      "0 15px 38px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)";
                  }}
                >

                  {/* CARD TOP */}

                  <div style={styles.cardTop}>

                    <div style={styles.courseIcon}>
                      {details.icon}
                    </div>

                    <span style={styles.matchBadge}>
                      {index === 0
                        ? "TOP MATCH"
                        : "AI MATCH"}
                    </span>

                  </div>


                  {/* LABEL */}

                  <span style={styles.appLabel}>
                    AI RECOMMENDED COURSE
                  </span>


                  {/* COURSE NAME */}

                  <h3 style={styles.courseName}>
                    {course.name}
                  </h3>


                  {/* DESCRIPTION */}

                  <p style={styles.reason}>
                    {course.reason}
                  </p>


                  {/* META */}

                  <div style={styles.metaRow}>

                    <span style={styles.metaBadge}>
                      🎯 {course.score}% Match
                    </span>

                    <span style={styles.metaBadge}>
                      ⏱ {details.duration}
                    </span>

                  </div>


                  {/* DETAILS BUTTON */}

                  <button
                    onClick={() =>
                      setSelectedCourse({
                        ...details,
                        name: course.name,
                      })
                    }
                    style={styles.detailsButton}
                  >
                    View Course Details →
                  </button>

                </div>

              );
            })}

          </div>

        </div>
      )}


      {/* ===================================================
          COURSE DETAILS MODAL
      =================================================== */}

      {selectedCourse && (

        <div
          style={styles.overlay}
          onClick={() =>
            setSelectedCourse(null)
          }
        >

          <div
            style={styles.modal}
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              style={styles.closeButton}
              onClick={() =>
                setSelectedCourse(null)
              }
            >
              ×
            </button>


            <div style={styles.modalIcon}>
              {selectedCourse.icon}
            </div>


            <h2 style={styles.modalTitle}>
              {selectedCourse.name}
            </h2>


            <p style={styles.modalDescription}>
              {selectedCourse.description}
            </p>


            <div style={styles.detailGrid}>

              <div style={styles.detailCard}>
                <span style={styles.infoLabel}>
                  Duration
                </span>

                <strong>
                  ⏱ {selectedCourse.duration}
                </strong>
              </div>


              <div style={styles.detailCard}>
                <span style={styles.infoLabel}>
                  Eligibility
                </span>

                <strong>
                  🎓 {selectedCourse.eligibility}
                </strong>
              </div>

            </div>


            <div style={styles.detailBox}>

              <span style={styles.infoLabel}>
                Main Subjects
              </span>

              <ul style={styles.list}>

                {selectedCourse.subjects.map(
                  (subject) => (
                    <li key={subject}>
                      {subject}
                    </li>
                  )
                )}

              </ul>

            </div>


            <div style={styles.detailBox}>

              <span style={styles.infoLabel}>
                Career Options
              </span>

              <ul style={styles.list}>

                {selectedCourse.careers.map(
                  (career) => (
                    <li key={career}>
                      {career}
                    </li>
                  )
                )}

              </ul>

            </div>


            <button
              onClick={() =>
                setSelectedCourse(null)
              }
              style={styles.doneButton}
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  );
}


/* =========================================================
   STYLES
   GLASSMORPHISM / MY APPLICATIONS STYLE
========================================================= */

const styles = {

  container: {
    minHeight: "100%",
    padding: "30px",
    boxSizing: "border-box",
    color: "#ffffff",
  },


  /* HEADER */

  header: {
    maxWidth: "1100px",
    margin: "0 auto 22px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
  },


  title: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "800",
    color: "#ffffff",
  },


  subtitle: {
    margin: "8px 0 0",
    color: "#9bb9d2",
    fontSize: "13px",
    lineHeight: "1.6",
  },


  badge: {
    padding: "8px 14px",
    borderRadius: "20px",
    background:
      "rgba(0, 198, 255, 0.08)",
    border:
      "1px solid rgba(80, 205, 255, 0.25)",
    color: "#69d8ff",
    fontSize: "11px",
    fontWeight: "700",
    whiteSpace: "nowrap",
  },


  /* FORM GLASS CARD */

  formCard: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "24px",
    borderRadius: "22px",

    background:
      "radial-gradient(circle at 85% 0%, rgba(0,198,255,0.08), transparent 35%), linear-gradient(135deg, rgba(117,220,255,0.10), rgba(255,255,255,0.045))",

    border:
      "1px solid rgba(156,233,255,0.18)",

    backdropFilter: "blur(22px)",
    WebkitBackdropFilter: "blur(22px)",

    boxShadow:
      "0 18px 45px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.06)",
  },


  formGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: "18px",
  },


  label: {
    display: "block",
    marginBottom: "8px",
    color: "#c8dced",
    fontSize: "12px",
    fontWeight: "700",
  },


  input: {
    width: "100%",
    minHeight: "42px",
    padding: "11px 13px",
    boxSizing: "border-box",

    border:
      "1px solid rgba(119,181,220,0.20)",

    borderRadius: "11px",

    background:
      "rgba(3, 18, 38, 0.62)",

    color: "#ffffff",

    outline: "none",

    fontSize: "13px",
  },


  dropdownWrapper: {
    position: "relative",
  },


  dropdownButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
    textAlign: "left",
  },


  dropdownArrow: {
    color: "#7faac8",
    fontSize: "10px",
  },


  dropdownMenu: {
    position: "absolute",
    top: "72px",
    left: 0,
    right: 0,
    zIndex: 1000,

    padding: "6px",

    border:
      "1px solid rgba(120,210,255,0.20)",

    borderRadius: "12px",

    background:
      "rgba(7, 27, 52, 0.97)",

    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",

    boxShadow:
      "0 18px 35px rgba(0,0,0,0.35)",
  },


  dropdownOption: {
    width: "100%",
    padding: "10px 12px",

    border: "none",
    borderRadius: "8px",

    background: "transparent",

    color: "#c7d9e8",

    textAlign: "left",
    cursor: "pointer",

    fontSize: "12px",
  },


  dropdownOptionSelected: {
    background:
      "rgba(0,198,255,0.13)",
    color: "#ffffff",
  },


  buttonRow: {
    display: "flex",
    gap: "12px",
    marginTop: "22px",
  },


  primaryButton: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "11px",

    background:
      "linear-gradient(100deg, #159447, #20c95a)",

    color: "#ffffff",

    fontSize: "13px",
    fontWeight: "800",

    cursor: "pointer",

    boxShadow:
      "0 8px 20px rgba(15,160,70,0.18)",
  },


  secondaryButton: {
    padding: "12px 20px",

    border:
      "1px solid rgba(130,190,220,0.20)",

    borderRadius: "11px",

    background:
      "rgba(255,255,255,0.045)",

    color: "#d7e8f5",

    fontSize: "13px",
    fontWeight: "700",

    cursor: "pointer",
  },


  errorBox: {
    marginTop: "16px",
    padding: "11px 14px",

    borderRadius: "10px",

    background:
      "rgba(255,80,80,0.08)",

    border:
      "1px solid rgba(255,100,100,0.20)",

    color: "#ffb0b0",

    fontSize: "12px",
  },


  /* RESULTS */

  resultsSection: {
    maxWidth: "1100px",
    margin: "32px auto 0",
  },


  resultsHeader: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: "20px",
    marginBottom: "18px",
  },


  sectionTitle: {
    margin: 0,
    color: "#ffffff",
    fontSize: "21px",
    fontWeight: "800",
  },


  countBadge: {
    padding: "7px 13px",
    borderRadius: "18px",

    background:
      "rgba(34,197,94,0.10)",

    border:
      "1px solid rgba(74,222,128,0.22)",

    color: "#63e887",

    fontSize: "11px",
    fontWeight: "800",
    whiteSpace: "nowrap",
  },


  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, minmax(0, 1fr))",
    gap: "18px",
  },


  /* =======================================================
     GLASS COURSE CARD
  ======================================================= */

  courseCard: {
    position: "relative",

    minHeight: "300px",

    padding: "20px",

    boxSizing: "border-box",

    borderRadius: "20px",

    background:
      "radial-gradient(circle at 85% 0%, rgba(0,198,255,0.11), transparent 38%), linear-gradient(145deg, rgba(255,255,255,0.095), rgba(255,255,255,0.035))",

    border:
      "1px solid rgba(255,255,255,0.13)",

    backdropFilter: "blur(22px)",
    WebkitBackdropFilter: "blur(22px)",

    boxShadow:
      "0 15px 38px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",

    transition:
      "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",

    overflow: "hidden",
  },


  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "17px",
  },


  courseIcon: {
    width: "42px",
    height: "42px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: "13px",

    background:
      "rgba(52,143,220,0.12)",

    border:
      "1px solid rgba(80,180,255,0.13)",

    fontSize: "21px",
  },


  matchBadge: {
    padding: "6px 9px",
    borderRadius: "8px",

    background:
      "rgba(34,197,94,0.10)",

    color: "#58df7a",

    fontSize: "9px",
    fontWeight: "800",
  },


  appLabel: {
    display: "block",

    marginBottom: "8px",

    color: "#36bfff",

    fontSize: "9px",
    fontWeight: "800",

    letterSpacing: "0.4px",
  },


  courseName: {
    margin: "0 0 9px",

    color: "#ffffff",

    fontSize: "18px",
    lineHeight: "1.3",

    fontWeight: "800",
  },


  reason: {
    minHeight: "62px",

    margin: 0,

    color: "#9dbbd1",

    fontSize: "12px",
    lineHeight: "1.65",
  },


  metaRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "7px",

    marginTop: "15px",
  },


  metaBadge: {
    padding: "7px 9px",

    borderRadius: "9px",

    background:
      "rgba(255,255,255,0.055)",

    border:
      "1px solid rgba(255,255,255,0.08)",

    color: "#b8d0e2",

    fontSize: "10px",
    fontWeight: "700",
  },


  detailsButton: {
    width: "100%",

    marginTop: "17px",

    padding: "10px 13px",

    border:
      "1px solid rgba(63,160,230,0.28)",

    borderRadius: "10px",

    background:
      "rgba(25,104,160,0.08)",

    color: "#56b9ff",

    fontSize: "11px",
    fontWeight: "800",

    cursor: "pointer",
  },


  /* =======================================================
     MODAL
  ======================================================= */

  overlay: {
    position: "fixed",
    inset: 0,

    zIndex: 9999,

    padding: "20px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    background:
      "rgba(1, 8, 20, 0.76)",

    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
  },


  modal: {
    position: "relative",

    width: "100%",
    maxWidth: "650px",
    maxHeight: "85vh",

    overflowY: "auto",

    padding: "28px",

    boxSizing: "border-box",

    borderRadius: "22px",

    background:
      "linear-gradient(145deg, rgba(18,47,75,0.96), rgba(6,25,49,0.97))",

    border:
      "1px solid rgba(111,207,255,0.22)",

    boxShadow:
      "0 25px 70px rgba(0,0,0,0.55)",

    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
  },


  closeButton: {
    position: "absolute",

    top: "13px",
    right: "16px",

    width: "34px",
    height: "34px",

    border: "none",
    borderRadius: "50%",

    background:
      "rgba(255,255,255,0.06)",

    color: "#b9d7eb",

    fontSize: "24px",
    cursor: "pointer",
  },


  modalIcon: {
    width: "62px",
    height: "62px",

    margin: "0 auto 14px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: "18px",

    background:
      "rgba(0,198,255,0.10)",

    border:
      "1px solid rgba(80,205,255,0.15)",

    fontSize: "30px",
  },


  modalTitle: {
    margin: "0 0 10px",

    textAlign: "center",

    color: "#ffffff",

    fontSize: "22px",
    fontWeight: "800",
  },


  modalDescription: {
    margin: "0 auto 20px",

    maxWidth: "560px",

    textAlign: "center",

    color: "#9fc0d7",

    fontSize: "13px",
    lineHeight: "1.7",
  },


  detailGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, 1fr)",

    gap: "12px",

    marginBottom: "12px",
  },


  detailCard: {
    padding: "15px",

    borderRadius: "13px",

    background:
      "rgba(255,255,255,0.045)",

    border:
      "1px solid rgba(255,255,255,0.07)",

    color: "#ffffff",
  },


  detailBox: {
    marginTop: "12px",

    padding: "16px",

    borderRadius: "13px",

    background:
      "rgba(255,255,255,0.045)",

    border:
      "1px solid rgba(255,255,255,0.07)",
  },


  infoLabel: {
    display: "block",

    marginBottom: "7px",

    color: "#78bce0",

    fontSize: "11px",
    fontWeight: "700",
  },


  list: {
    margin: "7px 0 0",

    paddingLeft: "20px",

    color: "#c0d6e6",

    fontSize: "12px",
    lineHeight: "1.8",
  },


  doneButton: {
    width: "100%",

    marginTop: "18px",

    padding: "12px",

    border: "none",
    borderRadius: "11px",

    background:
      "linear-gradient(100deg, #248eff, #08cfff)",

    color: "#ffffff",

    fontSize: "13px",
    fontWeight: "800",

    cursor: "pointer",
  },
};


export default AIRecommendation;