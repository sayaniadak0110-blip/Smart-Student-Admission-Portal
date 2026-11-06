import "./App.css";
import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import StudentDashboard from "./StudentDashboard";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
    !!localStorage.getItem("token")
  


  const [loggedInUser, setLoggedInUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      return null;
    }
  });

  const handleLoginSuccess = () => {
    const savedUser = localStorage.getItem("user");

    try {
      const user = savedUser ? JSON.parse(savedUser) : null;
      setLoggedInUser(user);
    } catch (error) {
      setLoggedInUser(null);
    }

    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setLoggedInUser(null);
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return (
      <StudentDashboard
        loggedInUser={loggedInUser}
        onLogout={handleLogout}
      />
    );
  }

  const features = [
    {
      icon: "🤖",
      title: "AI Course",
      title2: "Recommendation",
      text: "Get personalized suggestions based on your academic profile.",
    },
    {
      icon: "📄",
      title: "Online Admission",
      text: "Complete the application process online with ease.",
    },
    {
      icon: "📁",
      title: "Document Upload",
      text: "Upload your required documents securely.",
    },
    {
      icon: "💳",
      title: "Easy Payment",
      text: "Make secure payments and track your transactions.",
    },
  ];

  const courses = [
    {
      icon: "💻",
      title: "Bachelor of",
      title2: "Computer Applications",
      tag: "POPULAR",
      tagClass: "green",
      text: "Build your career in software development, applications and information technology.",
      category: "IT",
    },
    {
      icon: "📊",
      title: "BCA in",
      title2: "Machine Learning",
      tag: "TRENDING",
      tagClass: "purple",
      text: "Learn machine learning, data analysis and modern intelligent technologies.",
      category: "AI & ML",
    },
    {
      icon: "🌐",
      title: "BCA in",
      title2: "Web Development",
      tag: "CAREER",
      tagClass: "blue",
      text: "Master modern frontend, backend and full-stack web development technologies.",
      category: "Web",
    },
  ];

  return (
    <div className="app">

      {/* Background glow shapes */}
      <div className="background-effects">
        <div className="glow glow-one"></div>
        <div className="glow glow-two"></div>
        <div className="glow glow-three"></div>
        <div className="glow glow-four"></div>

        <div className="orb orb-one"></div>
        <div className="orb orb-two"></div>
        <div className="orb orb-three"></div>
      </div>

      {/* NAVBAR */}
      <header className="navbar">
        <div className="brand">
          <div className="brand-icon">🎓</div>
          <div>
            <span>Smart</span>
            <strong> Admission</strong>
          </div>
        </div>

        <nav className="nav-links">
          <a href="#home" className="active">Home</a>
          <a href="#courses">Courses</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </nav>

        <div className="nav-actions">
          <button className="search-btn">⌕</button>

          <button
            className="login-btn"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>

          <button
            className="register-btn"
            onClick={() => setShowRegister(true)}
          >
            Register
          </button>
        </div>
      </header>

      {/* HERO */}
      <main>

        <section className="hero" id="home">

          <div className="hero-left">

            <div className="portal-badge">
              🎓 &nbsp; Smart Student Admission Portal
            </div>

            <h1>
              Your Future
              <br />
              <span>Starts</span> Here.
            </h1>

            <p className="hero-description">
              Apply for courses online, get AI-based course recommendations,
              upload documents, make payments and track your admission status
              — all from one simple and secure platform.
            </p>

            <div className="hero-buttons">
              <button className="apply-btn">
                🚀 &nbsp; Apply Now
                <span>→</span>
              </button>

              <button className="explore-btn">
                📖 &nbsp; Explore Courses
              </button>
            </div>

            <div className="trust-row">
              <div>
                <span className="trust-icon green-icon">🛡</span>
                Secure Admission
              </div>

              <i></i>

              <div>
                <span className="trust-icon">⚡</span>
                AI Powered
              </div>

              <i></i>

              <div>
                <span className="trust-icon">👥</span>
                Student Friendly
              </div>
            </div>

          </div>

          {/* HERO CARD */}
          <div className="hero-right">

            <div className="admission-status">
              <span className="status-dot"></span>

              <div>
                <small>Admission Open</small>
                <strong>2026 - 2027</strong>
              </div>
            </div>

            <div className="hero-glass-card">

              <div className="big-icon">
                🎓
              </div>

              <h2>Smart Admission</h2>

              <p>
                Everything you need for a simple, secure and transparent
                admission process.
              </p>

              <div className="hero-stats">

                <div className="stat">
                  <div className="stat-icon">📄</div>

                  <div>
                    <strong>100+</strong>
                    <span>Courses</span>
                  </div>
                </div>

                <div className="stat-divider"></div>

                <div className="stat">
                  <div className="stat-icon">◷</div>

                  <div>
                    <strong>24/7</strong>
                    <span>Access</span>
                  </div>
                </div>

                <div className="stat-divider"></div>

                <div className="stat">
                  <div className="stat-icon">📊</div>

                  <div>
                    <strong>AI</strong>
                    <span>Recommendation</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* FEATURES */}
        <section className="feature-section" id="features">

          <div className="feature-wrapper">

            {features.map((feature, index) => (
              <div className="feature-card" key={index}>

                <div className="feature-icon">
                  {feature.icon}
                </div>

                <div className="feature-content">
                  <h3>
                    {feature.title}

                    {feature.title2 && (
                      <>
                        <br />
                        {feature.title2}
                      </>
                    )}
                  </h3>

                  <p>{feature.text}</p>
                </div>

                <button className="arrow-btn">→</button>

              </div>
            ))}

          </div>

        </section>

        {/* COURSES */}
        <section className="courses-section" id="courses">

          <div className="courses-container">

            <div className="courses-heading">

              <div>

                <div className="section-badge">
                  🎓 &nbsp; EXPLORE PROGRAMS
                </div>

                <h2>
                  Find Your <span>Perfect Course</span>
                </h2>

                <p>
                  Explore popular programs and choose the right path for
                  your future.
                </p>

              </div>

              <button className="view-all-btn">
                View All Courses →
              </button>

            </div>

            <div className="course-grid">

              {courses.map((course, index) => (
                <div className="course-card" key={index}>

                  <div className="course-top">

                    <div className="course-icon">
                      {course.icon}
                    </div>

                    <span className={`course-tag ${course.tagClass}`}>
                      {course.tag}
                    </span>

                  </div>

                  <h3>
                    {course.title}
                    <br />
                    {course.title2}
                  </h3>

                  <p>{course.text}</p>

                  <div className="course-bottom">

                    <div className="course-info">
                      <span>◷</span>
                      3 Years
                    </div>

                    <div className="course-info">
                      <span>▱</span>
                      {course.category}
                    </div>

                    <button className="course-arrow">
                      →
                    </button>

                  </div>

                </div>
              ))}

            </div>

          </div>

        </section>

        {/* AI SECTION */}
        <section className="ai-section">

          <div className="ai-content">

            <div className="ai-badge">
              🤖 &nbsp; AI POWERED
            </div>

            <h2>
              Not Sure Which Course Is
              <br />
              Right For You?
            </h2>

            <p>
              Our AI-based recommendation feature analyzes your academic
              information and interests to suggest suitable courses.
            </p>

            <button className="ai-button">
              ✨ &nbsp; Try AI Recommendation
            </button>

          </div>

          <div className="ai-visual">

            <div className="ai-label label-one">
              📊 Academic Profile
            </div>

            <div className="ai-label label-two">
              🎯 Course Match
            </div>

            <div className="robot-circle">
              🤖
            </div>

            <div className="ai-label label-three">
              ✨ AI Recommendation
            </div>

          </div>

          <div>
            <span>🔐</span>
            <h3>Secure</h3>
            <p>Protected student information.</p>
          </div>

          <div className="about-card">
            <span>🤖</span>
            <h3>AI Assisted</h3>
            <p>Smart course recommendations.</p>
          </div>

        </section>

      </main>

      {/* LOGIN POPUP */}
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* REGISTER POPUP */}
      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)}
        />
      )}

      {/* FOOTER */}
      <footer>

        <div className="footer-brand">
          🎓 <strong>Smart Admission</strong>
          <p>Smart Student Admission & Management Portal</p>
        </div>

        <div className="footer-right">
          <span>© 2026 Smart Admission</span>
          <span>Made for BCA Project</span>
        </div>

      </footer>

    </div>
  );
}

export default App;