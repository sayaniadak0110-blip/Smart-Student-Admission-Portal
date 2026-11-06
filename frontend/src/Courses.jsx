import React, { useEffect, useState } from "react";

export const courses = [
  {
    icon: "💻",
    name: "BCA",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor's Degree",
    eligibility: "10+2 from a recognized board",
    description:
      "Build a strong foundation in computer applications, programming and software development.",
    highlights: ["Programming", "Database Management", "Web Development"],
  },
  {
    icon: "🤖",
    name: "BCA – Artificial Intelligence",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor's Degree",
    eligibility: "10+2 with Mathematics/Computer Science preferred",
    description:
      "Learn artificial intelligence concepts, intelligent systems and modern AI technologies.",
    highlights: ["Artificial Intelligence", "Machine Learning", "Python"],
  },
  {
    icon: "🧠",
    name: "BCA – Machine Learning",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor's Degree",
    eligibility: "10+2 with Mathematics/Computer Science preferred",
    description:
      "Develop skills in machine learning, data analysis and intelligent application development.",
    highlights: ["Machine Learning", "Python", "Data Analysis"],
  },
  {
    icon: "📊",
    name: "BCA – Data Analytics",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor's Degree",
    eligibility: "10+2 from a recognized board",
    description:
      "Learn how to collect, analyze and visualize data for business and technical decisions.",
    highlights: ["Data Analytics", "Statistics", "Data Visualization"],
  },
  {
    icon: "🌐",
    name: "BCA – Full Stack Development",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor's Degree",
    eligibility: "10+2 from a recognized board",
    description:
      "Learn frontend, backend, database and API development for complete web applications.",
    highlights: ["React", "Backend Development", "APIs"],
  },
  {
    icon: "🌍",
    name: "BCA – Web Development",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor's Degree",
    eligibility: "10+2 from a recognized board",
    description:
      "Learn modern web technologies and develop responsive, interactive websites and applications.",
    highlights: ["HTML/CSS", "JavaScript", "React"],
  },
  {
    icon: "☁️",
    name: "BCA – Cloud Computing",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor's Degree",
    eligibility: "10+2 from a recognized board",
    description:
      "Understand cloud platforms, distributed systems and cloud-based application deployment.",
    highlights: ["Cloud Computing", "AWS", "Deployment"],
  },
  {
    icon: "⚙️",
    name: "BCA – Software Development",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor's Degree",
    eligibility: "10+2 from a recognized board",
    description:
      "Learn software engineering principles and the complete software development lifecycle.",
    highlights: ["Java", "Software Engineering", "Application Development"],
  },
  {
    icon: "🛡️",
    name: "BCA – Cyber Security",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor's Degree",
    eligibility: "10+2 from a recognized board",
    description:
      "Develop knowledge of cybersecurity, network security and protection of digital systems.",
    highlights: ["Cyber Security", "Network Security", "Ethical Hacking"],
  },
  {
    icon: "🚀",
    name: "BCA – DevOps",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor's Degree",
    eligibility: "10+2 from a recognized board",
    description:
      "Learn automation, CI/CD, cloud deployment and modern software delivery practices.",
    highlights: ["CI/CD", "Docker", "Cloud"],
  },
  {
    icon: "📡",
    name: "BCA – Internet of Things (IoT)",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor's Degree",
    eligibility: "10+2 from a recognized board",
    description:
      "Explore connected devices, sensors, embedded systems and IoT applications.",
    highlights: ["IoT", "Sensors", "Embedded Systems"],
  },
  {
    icon: "⛓️",
    name: "BCA – Blockchain Technology",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor's Degree",
    eligibility: "10+2 from a recognized board",
    description:
      "Learn blockchain fundamentals, decentralized systems and smart contract concepts.",
    highlights: ["Blockchain", "Smart Contracts", "Web3"],
  },
  {
    icon: "🖥️",
    name: "B.Sc Computer Science",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Science",
    eligibility: "10+2 with Science/Mathematics preferred",
    description:
      "Study computer science fundamentals, algorithms, programming and computing systems.",
    highlights: ["Algorithms", "Programming", "Computer Systems"],
  },
  {
    icon: "📈",
    name: "B.Sc Data Science",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Science",
    eligibility: "10+2 with Mathematics preferred",
    description:
      "Combine statistics, programming and data analysis to solve real-world problems.",
    highlights: ["Data Science", "Statistics", "Machine Learning"],
  },
  {
    icon: "💾",
    name: "B.Sc Information Technology",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Science",
    eligibility: "10+2 from a recognized board",
    description:
      "Learn information technology, databases, networks and software applications.",
    highlights: ["IT", "Networking", "Database"],
  },
  {
    icon: "🔢",
    name: "B.Sc Mathematics",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Science",
    eligibility: "10+2 with Mathematics",
    description:
      "Develop strong mathematical reasoning and analytical problem-solving skills.",
    highlights: ["Pure Mathematics", "Applied Mathematics", "Statistics"],
  },
  {
    icon: "⚛️",
    name: "B.Sc Physics",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Science",
    eligibility: "10+2 with Science",
    description:
      "Study fundamental principles of matter, energy, motion and the physical world.",
    highlights: ["Mechanics", "Electronics", "Modern Physics"],
  },
  {
    icon: "🧪",
    name: "B.Sc Chemistry",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Science",
    eligibility: "10+2 with Science",
    description:
      "Explore chemical principles, laboratory techniques and material properties.",
    highlights: ["Organic Chemistry", "Inorganic Chemistry", "Laboratory"],
  },
  {
    icon: "🧬",
    name: "B.Sc Biotechnology",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Science",
    eligibility: "10+2 with Science",
    description:
      "Study biology and technology with applications in healthcare, agriculture and research.",
    highlights: ["Genetics", "Biotechnology", "Laboratory"],
  },
  {
    icon: "🔬",
    name: "B.Sc Microbiology",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Science",
    eligibility: "10+2 with Science",
    description:
      "Learn about microorganisms, laboratory methods and their applications.",
    highlights: ["Microbiology", "Biology", "Laboratory"],
  },
  {
    icon: "💡",
    name: "B.Sc Electronics",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Science",
    eligibility: "10+2 with Science",
    description:
      "Study electronic circuits, devices, digital systems and communication fundamentals.",
    highlights: ["Electronics", "Digital Systems", "Circuits"],
  },
  {
    icon: "🏗️",
    name: "B.Tech Computer Science",
    duration: "4 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Technology",
    eligibility: "10+2 with Physics, Chemistry and Mathematics",
    description:
      "A technical engineering programme focused on computing, software and technology.",
    highlights: ["Computer Science", "Engineering", "Software"],
  },
  {
    icon: "🤖",
    name: "B.Tech Artificial Intelligence & Machine Learning",
    duration: "4 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Technology",
    eligibility: "10+2 with Physics, Chemistry and Mathematics",
    description:
      "Study advanced AI and machine learning concepts with an engineering foundation.",
    highlights: ["AI", "Machine Learning", "Engineering"],
  },
  {
    icon: "🔐",
    name: "B.Tech Cyber Security",
    duration: "4 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Technology",
    eligibility: "10+2 with Physics, Chemistry and Mathematics",
    description:
      "Build engineering-level knowledge of cybersecurity and secure computing systems.",
    highlights: ["Cyber Security", "Networks", "Secure Systems"],
  },
  {
    icon: "📊",
    name: "B.Tech Data Science",
    duration: "4 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Technology",
    eligibility: "10+2 with Physics, Chemistry and Mathematics",
    description:
      "Learn engineering approaches to data science, analytics and intelligent systems.",
    highlights: ["Data Science", "AI", "Analytics"],
  },

  {
    icon: "💰",
    name: "B.Com",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Commerce",
    eligibility: "10+2 from a recognized board",
    description:
      "Build a foundation in accounting, finance, business and commerce.",
    highlights: ["Accounting", "Finance", "Business"],
  },
  {
    icon: "🏦",
    name: "B.Com – Banking & Finance",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Commerce",
    eligibility: "10+2 from a recognized board",
    description:
      "Learn banking operations, financial management and commerce fundamentals.",
    highlights: ["Banking", "Finance", "Accounting"],
  },
  {
    icon: "🧾",
    name: "B.Com – Accounting & Finance",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Commerce",
    eligibility: "10+2 from a recognized board",
    description:
      "Focus on accounting practices, financial reporting and financial management.",
    highlights: ["Accounting", "Finance", "Taxation"],
  },
  {
    icon: "📑",
    name: "B.Com – Taxation",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Commerce",
    eligibility: "10+2 from a recognized board",
    description:
      "Study taxation concepts, accounting and financial compliance.",
    highlights: ["Taxation", "Accounting", "Finance"],
  },
  {
    icon: "📊",
    name: "B.Com – Business Analytics",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Commerce",
    eligibility: "10+2 from a recognized board",
    description:
      "Combine commerce with data-driven business analysis and decision making.",
    highlights: ["Business Analytics", "Data", "Commerce"],
  },
  {
    icon: "💼",
    name: "BBA",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Business Administration",
    eligibility: "10+2 from a recognized board",
    description:
      "Learn management, business operations, marketing and organizational practices.",
    highlights: ["Management", "Marketing", "Business"],
  },
  {
    icon: "📣",
    name: "BBA – Marketing",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Business Administration",
    eligibility: "10+2 from a recognized board",
    description:
      "Develop skills in marketing strategy, branding, sales and customer management.",
    highlights: ["Marketing", "Branding", "Sales"],
  },
  {
    icon: "👥",
    name: "BBA – Human Resource Management",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Business Administration",
    eligibility: "10+2 from a recognized board",
    description:
      "Learn recruitment, employee management, organizational behaviour and HR practices.",
    highlights: ["HR", "Recruitment", "Management"],
  },
  {
    icon: "💳",
    name: "BBA – Finance",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Business Administration",
    eligibility: "10+2 from a recognized board",
    description:
      "Study financial management, investment basics and business finance.",
    highlights: ["Finance", "Investment", "Management"],
  },
  {
    icon: "📱",
    name: "BBA – Digital Marketing",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Business Administration",
    eligibility: "10+2 from a recognized board",
    description:
      "Learn digital marketing strategies, social media, SEO and online business promotion.",
    highlights: ["Digital Marketing", "SEO", "Social Media"],
  },
  {
    icon: "📈",
    name: "BBA – Business Analytics",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Business Administration",
    eligibility: "10+2 from a recognized board",
    description:
      "Use business data and analytics to support management decisions.",
    highlights: ["Analytics", "Business", "Decision Making"],
  },
  {
    icon: "🌎",
    name: "BBA – International Business",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Business Administration",
    eligibility: "10+2 from a recognized board",
    description:
      "Understand global markets, international trade and multinational business operations.",
    highlights: ["Global Business", "Trade", "Management"],
  },
  {
    icon: "🚀",
    name: "BBA – Entrepreneurship",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Business Administration",
    eligibility: "10+2 from a recognized board",
    description:
      "Develop entrepreneurial thinking and learn how to plan and manage new ventures.",
    highlights: ["Entrepreneurship", "Business Planning", "Innovation"],
  },
  {
    icon: "📚",
    name: "Bachelor of Management Studies (BMS)",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor's Degree",
    eligibility: "10+2 from a recognized board",
    description:
      "Develop practical knowledge of management, business and organizational operations.",
    highlights: ["Management", "Business", "Leadership"],
  },
  {
    icon: "📉",
    name: "Bachelor of Economics",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor's Degree",
    eligibility: "10+2 with Economics/Mathematics preferred",
    description:
      "Study economic theories, markets, finance and analytical methods.",
    highlights: ["Economics", "Finance", "Statistics"],
  },

  {
    icon: "🎓",
    name: "B.A",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Arts",
    eligibility: "10+2 from a recognized board",
    description:
      "Explore humanities, social sciences, communication and cultural studies.",
    highlights: ["Humanities", "Social Science", "Communication"],
  },
  {
    icon: "📖",
    name: "B.A – English",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Arts",
    eligibility: "10+2 from a recognized board",
    description:
      "Develop knowledge of English literature, language and communication.",
    highlights: ["Literature", "Language", "Communication"],
  },
  {
    icon: "📝",
    name: "B.A – Bengali",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Arts",
    eligibility: "10+2 from a recognized board",
    description:
      "Study Bengali language, literature, culture and literary traditions.",
    highlights: ["Literature", "Language", "Culture"],
  },
  {
    icon: "🏛️",
    name: "B.A – History",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Arts",
    eligibility: "10+2 from a recognized board",
    description:
      "Explore historical events, societies, cultures and political developments.",
    highlights: ["History", "Culture", "Research"],
  },
  {
    icon: "🗳️",
    name: "B.A – Political Science",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Arts",
    eligibility: "10+2 from a recognized board",
    description:
      "Study political systems, governance, public policy and international relations.",
    highlights: ["Politics", "Governance", "Public Policy"],
  },
  {
    icon: "👥",
    name: "B.A – Sociology",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Arts",
    eligibility: "10+2 from a recognized board",
    description:
      "Understand society, social relationships, institutions and social change.",
    highlights: ["Society", "Social Research", "Culture"],
  },
  {
    icon: "🧠",
    name: "B.A – Psychology",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Arts",
    eligibility: "10+2 from a recognized board",
    description:
      "Study human behaviour, cognition, personality and psychological processes.",
    highlights: ["Psychology", "Human Behaviour", "Research"],
  },
  {
    icon: "🌍",
    name: "B.A – Geography",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Arts",
    eligibility: "10+2 from a recognized board",
    description:
      "Explore physical and human geography, environment and spatial patterns.",
    highlights: ["Geography", "Environment", "Mapping"],
  },
  {
    icon: "💭",
    name: "B.A – Philosophy",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor of Arts",
    eligibility: "10+2 from a recognized board",
    description:
      "Develop critical thinking through the study of philosophy, ethics and logic.",
    highlights: ["Philosophy", "Logic", "Ethics"],
  },
  {
    icon: "📰",
    name: "Bachelor of Journalism & Mass Communication",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor's Degree",
    eligibility: "10+2 from a recognized board",
    description:
      "Learn journalism, media production, communication and digital media.",
    highlights: ["Journalism", "Mass Communication", "Digital Media"],
  },
  {
    icon: "🤝",
    name: "Bachelor of Social Work",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor's Degree",
    eligibility: "10+2 from a recognized board",
    description:
      "Learn social work practices, community development and social welfare.",
    highlights: ["Social Work", "Community Development", "Welfare"],
  },
  {
    icon: "📚",
    name: "Bachelor of Library & Information Science",
    duration: "3 Years",
    level: "Undergraduate",
    degreeType: "Bachelor's Degree",
    eligibility: "10+2 from a recognized board",
    description:
      "Study information organization, library systems and digital information management.",
    highlights: ["Library Science", "Information Management", "Digital Resources"],
  },
];

function Courses({ onApplyCourse }) {
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    if (selectedCourse) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [selectedCourse]);

  const handleApply = () => {
    if (onApplyCourse && selectedCourse) {
      onApplyCourse(selectedCourse.name);
    }
    setSelectedCourse(null);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        color: "#ffffff",
        padding: "30px",
        boxSizing: "border-box",
      }}
    >
      {/* PAGE HEADER */}
      <div style={{ marginBottom: "28px" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "30px",
            fontWeight: "700",
            color: "#ffffff",
          }}
        >
          Explore Courses
        </h1>

        <p
          style={{
            marginTop: "8px",
            color: "#94a3b8",
            fontSize: "15px",
          }}
        >
          Explore {courses.length} available undergraduate courses
        </p>
      </div>

      {/* COURSE GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "22px",
        }}
      >
        {courses.map((course, index) => (
          <div
            key={`${course.name}-${index}`}
            style={{
              background:
                "linear-gradient(135deg, rgba(18,80,110,0.72), rgba(8,45,68,0.82))",
              border: "1px solid rgba(156,233,255,0.25)",
              borderRadius: "18px",
              padding: "24px",
              cursor: "pointer",
              transition:
                "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
              backdropFilter: "blur(22px)",
              WebkitBackdropFilter: "blur(22px)",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.borderColor =
                "rgba(156,233,255,0.55)";
              e.currentTarget.style.boxShadow =
                "0 15px 35px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.08)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor =
                "rgba(156,233,255,0.25)";
              e.currentTarget.style.boxShadow =
                "0 10px 30px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.06)";
            }}
            onClick={() => setSelectedCourse(course)}
          >
            {/* ICON */}
            <div
              style={{
                width: "58px",
                height: "58px",
                borderRadius: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "30px",
                marginBottom: "17px",
              }}
            >
              {course.icon}
            </div>

            {/* COURSE NAME */}
            <h3
              style={{
                color: "#ffffff",
                margin: "0 0 10px",
                fontSize: "19px",
                lineHeight: "1.35",
              }}
            >
              {course.name}
            </h3>

            {/* COURSE INFO */}
            <p
              style={{
                color: "#94a3b8",
                margin: "0 0 12px",
                fontSize: "14px",
              }}
            >
              {course.duration} • {course.level}
            </p>

            {/* DESCRIPTION */}
            <p
              style={{
                color: "#cbd5e1",
                lineHeight: "1.6",
                margin: "0 0 18px",
                fontSize: "14px",
              }}
            >
              {course.description}
            </p>

            {/* HIGHLIGHTS */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "7px",
                marginBottom: "18px",
              }}
            >
              {course.highlights.map((item, highlightIndex) => (
                <span
                  key={highlightIndex}
                  style={{
                    padding: "5px 9px",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.06)",
                    color: "#cbd5e1",
                    fontSize: "11px",
                  }}
                >
                  {item}
                </span>
              ))}
            </div>

            {/* VIEW DETAILS */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCourse(course);
              }}
              style={{
                width: "100%",
                padding: "11px",
                borderRadius: "10px",
                border: "1px solid rgba(99,102,241,0.5)",
                background: "rgba(99,102,241,0.12)",
                color: "#ffffff",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* DETAILS MODAL */}
      {selectedCourse && (
        <div
          onClick={() => setSelectedCourse(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.78)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 9999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "650px",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "#111827",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "20px",
              padding: "28px",
              color: "#ffffff",
              boxSizing: "border-box",
            }}
          >
            {/* MODAL ICON */}
            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "38px",
                background: "rgba(99,102,241,0.12)",
                marginBottom: "15px",
              }}
            >
              {selectedCourse.icon}
            </div>

            {/* TITLE */}
            <h2
              style={{
                margin: "0 0 10px",
                fontSize: "25px",
                color: "#ffffff",
              }}
            >
              {selectedCourse.name}
            </h2>

            {/* DEGREE / DURATION */}
            <p
              style={{
                color: "#94a3b8",
                margin: "0 0 20px",
              }}
            >
              {selectedCourse.degreeType} • {selectedCourse.duration}
            </p>

            {/* DESCRIPTION */}
            <div>
              <h4
                style={{
                  marginBottom: "8px",
                  color: "#ffffff",
                }}
              >
                About the Course
              </h4>

              <p
                style={{
                  color: "#cbd5e1",
                  lineHeight: "1.7",
                  marginTop: 0,
                }}
              >
                {selectedCourse.description}
              </p>
            </div>

            {/* ELIGIBILITY */}
            <div style={{ marginTop: "22px" }}>
              <h4
                style={{
                  marginBottom: "8px",
                  color: "#ffffff",
                }}
              >
                Eligibility
              </h4>

              <p
                style={{
                  color: "#cbd5e1",
                  lineHeight: "1.6",
                  marginTop: 0,
                }}
              >
                {selectedCourse.eligibility}
              </p>
            </div>

            {/* COURSE HIGHLIGHTS */}
            <div style={{ marginTop: "22px" }}>
              <h4
                style={{
                  marginBottom: "10px",
                  color: "#ffffff",
                }}
              >
                Course Highlights
              </h4>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "9px",
                }}
              >
                {selectedCourse.highlights.map((item, index) => (
                  <span
                    key={index}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "9px",
                      background: "rgba(99,102,241,0.12)",
                      border: "1px solid rgba(99,102,241,0.25)",
                      color: "#cbd5e1",
                      fontSize: "13px",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* BUTTONS */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "28px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={handleApply}
                style={{
                  flex: 1,
                  minWidth: "150px",
                  padding: "13px 18px",
                  border: "none",
                  borderRadius: "10px",
                  background: "#4f46e5",
                  color: "#ffffff",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "14px",
                }}
              >
                Apply Now
              </button>

              <button
                onClick={() => setSelectedCourse(null)}
                style={{
                  flex: 1,
                  minWidth: "150px",
                  padding: "13px 18px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.06)",
                  color: "#ffffff",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;