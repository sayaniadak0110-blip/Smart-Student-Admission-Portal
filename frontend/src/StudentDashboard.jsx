import React from "react";

import Courses, { courses } from "./Courses";

import Admission from "./Admission";

import Documents from "./Documents";

import MyApplications from "./MyApplications";

import Payment from "./Payment";

import Notifications from "./Notifications";

import AIRecommendation from "./AIRecommendation";

import Profile from "./Profile";



function StudentDashboard() {

  const [activePage, setActivePage] = React.useState("Dashboard");

  const [selectedCourse, setSelectedCourse] = React.useState("");

  const [menuOpen, setMenuOpen] = React.useState(false);

  const [profileOpen, setProfileOpen] = React.useState(false);

  const [settingsOpen, setSettingsOpen] = React.useState(false);

  const [supportOpen, setSupportOpen] = React.useState(false);

  const [language, setLanguage] = React.useState("English");

  const [passwordOpen, setPasswordOpen] = React.useState(false);

  const [newPassword, setNewPassword] = React.useState("");

  const [confirmPassword, setConfirmPassword] = React.useState("");

  const [message, setMessage] = React.useState("");
  const [dashboardApplications, setDashboardApplications] = React.useState([]);
  const [dashboardCourseCount, setDashboardCourseCount] = React.useState(12);



  const translations = {
    English: { dashboard:"STUDENT DASHBOARD", welcome:"Welcome back,", subtitle:"Manage your admission journey, courses, documents and applications from one simple and secure platform.", studentMenu:"STUDENT MENU", profile:"My Profile", settings:"Settings", language:"LANGUAGE", selected:"Selected", password:"PASSWORD", changePassword:"Change Password", savePassword:"Save Password", help:"Help & Support", logout:"Logout", availableCourses:"Available Courses", application:"Application", documents:"Documents", payment:"Payment", recent:"Recent Application", track:"Track your latest admission application", viewDetails:"View Details →", quickActions:"Quick Actions", exploreCourses:"Explore Courses", applyAdmission:"Apply Admission", uploadDocuments:"Upload Documents", myApplications:"My Applications", courseRecommendation:"Course Recommendation", exploreRecommendation:"Explore Recommendation →", recommended:"Recommended:", passwordMismatch:"New password and confirm password do not match.", passwordSuccess:"Password changed successfully.", passwordShort:"Password must be at least 6 characters." },
    বাংলা: { dashboard:"শিক্ষার্থী ড্যাশবোর্ড", welcome:"স্বাগতম,", subtitle:"একটি সহজ ও নিরাপদ প্ল্যাটফর্ম থেকে আপনার ভর্তি, কোর্স, ডকুমেন্ট এবং আবেদন পরিচালনা করুন।", studentMenu:"স্টুডেন্ট মেনু", profile:"আমার প্রোফাইল", settings:"সেটিংস", language:"ভাষা", selected:"নির্বাচিত", password:"পাসওয়ার্ড", changePassword:"পাসওয়ার্ড পরিবর্তন", savePassword:"পাসওয়ার্ড সংরক্ষণ", help:"সহায়তা ও সাপোর্ট", logout:"লগআউট", availableCourses:"উপলব্ধ কোর্স", application:"আবেদন", documents:"ডকুমেন্ট", payment:"পেমেন্ট", recent:"সাম্প্রতিক আবেদন", track:"আপনার সর্বশেষ ভর্তি আবেদন দেখুন", viewDetails:"বিস্তারিত দেখুন →", quickActions:"দ্রুত কাজ", exploreCourses:"কোর্স দেখুন", applyAdmission:"ভর্তির জন্য আবেদন", uploadDocuments:"ডকুমেন্ট আপলোড", myApplications:"আমার আবেদন", courseRecommendation:"কোর্স সুপারিশ", exploreRecommendation:"সুপারিশ দেখুন →", recommended:"সুপারিশ:", passwordMismatch:"নতুন পাসওয়ার্ড এবং নিশ্চিত পাসওয়ার্ড মিলছে না।", passwordSuccess:"পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে।", passwordShort:"পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।" },
    हिन्दी: { dashboard:"छात्र डैशबोर्ड", welcome:"स्वागत है,", subtitle:"एक सरल और सुरक्षित प्लेटफ़ॉर्म से अपनी प्रवेश प्रक्रिया, कोर्स, दस्तावेज़ और आवेदन प्रबंधित करें।", studentMenu:"स्टूडेंट मेनू", profile:"मेरी प्रोफ़ाइल", settings:"सेटिंग्स", language:"भाषा", selected:"चयनित", password:"पासवर्ड", changePassword:"पासवर्ड बदलें", savePassword:"पासवर्ड सेव करें", help:"मदद और सहायता", logout:"लॉगआउट", availableCourses:"उपलब्ध कोर्स", application:"आवेदन", documents:"दस्तावेज़", payment:"भुगतान", recent:"हाल का आवेदन", track:"अपना नवीनतम प्रवेश आवेदन देखें", viewDetails:"विवरण देखें →", quickActions:"त्वरित कार्य", exploreCourses:"कोर्स देखें", applyAdmission:"प्रवेश के लिए आवेदन", uploadDocuments:"दस्तावेज़ अपलोड", myApplications:"मेरे आवेदन", courseRecommendation:"कोर्स सुझाव", exploreRecommendation:"सुझाव देखें →", recommended:"सुझाव:", passwordMismatch:"नया पासवर्ड और पुष्टि पासवर्ड मेल नहीं खाते।", passwordSuccess:"पासवर्ड सफलतापूर्वक बदल गया।", passwordShort:"पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।" },
    தமிழ்: { dashboard:"மாணவர் டாஷ்போர்டு", welcome:"மீண்டும் வரவேற்கிறோம்,", subtitle:"எளிய மற்றும் பாதுகாப்பான தளத்தில் சேர்க்கை, பாடநெறிகள், ஆவணங்கள் மற்றும் விண்ணப்பங்களை நிர்வகிக்கவும்.", studentMenu:"மாணவர் மெனு", profile:"என் சுயவிவரம்", settings:"அமைப்புகள்", language:"மொழி", selected:"தேர்ந்தெடுக்கப்பட்டது", password:"கடவுச்சொல்", changePassword:"கடவுச்சொல்லை மாற்று", savePassword:"கடவுச்சொல்லை சேமி", help:"உதவி மற்றும் ஆதரவு", logout:"வெளியேறு", availableCourses:"கிடைக்கும் பாடநெறிகள்", application:"விண்ணப்பம்", documents:"ஆவணங்கள்", payment:"கட்டணம்", recent:"சமீபத்திய விண்ணப்பம்", track:"உங்கள் சமீபத்திய சேர்க்கை விண்ணப்பத்தைப் பார்க்கவும்", viewDetails:"விவரங்களைப் பார்க்கவும் →", quickActions:"விரைவு செயல்கள்", exploreCourses:"பாடநெறிகளைப் பார்க்கவும்", applyAdmission:"சேர்க்கைக்கு விண்ணப்பிக்கவும்", uploadDocuments:"ஆவணங்களைப் பதிவேற்றவும்", myApplications:"என் விண்ணப்பங்கள்", courseRecommendation:"பாடநெறி பரிந்துரை", exploreRecommendation:"பரிந்துரையைப் பார்க்கவும் →", recommended:"பரிந்துரை:", passwordMismatch:"புதிய கடவுச்சொல்லும் உறுதிப்படுத்தும் கடவுச்சொல்லும் பொருந்தவில்லை.", passwordSuccess:"கடவுச்சொல் வெற்றிகரமாக மாற்றப்பட்டது.", passwordShort:"கடவுச்சொல் குறைந்தது 6 எழுத்துகள் இருக்க வேண்டும்." },
    తెలుగు: { dashboard:"విద్యార్థి డ్యాష్‌బోర్డ్", welcome:"స్వాగతం,", subtitle:"సులభమైన మరియు సురక్షితమైన ప్లాట్‌ఫారమ్‌లో ప్రవేశం, కోర్సులు, పత్రాలు మరియు దరఖాస్తులను నిర్వహించండి.", studentMenu:"స్టూడెంట్ మెను", profile:"నా ప్రొఫైల్", settings:"సెట్టింగ్స్", language:"భాష", selected:"ఎంచుకున్నది", password:"పాస్‌వర్డ్", changePassword:"పాస్‌వర్డ్ మార్చండి", savePassword:"పాస్‌వర్డ్ సేవ్ చేయండి", help:"సహాయం & సపోర్ట్", logout:"లాగ్‌అవుట్", availableCourses:"అందుబాటులో ఉన్న కోర్సులు", application:"దరఖాస్తు", documents:"పత్రాలు", payment:"చెల్లింపు", recent:"ఇటీవలి దరఖాస్తు", track:"మీ తాజా ప్రవేశ దరఖాస్తును ట్రాక్ చేయండి", viewDetails:"వివరాలు చూడండి →", quickActions:"త్వరిత చర్యలు", exploreCourses:"కోర్సులు చూడండి", applyAdmission:"ప్రవేశానికి దరఖాస్తు", uploadDocuments:"పత్రాలు అప్‌లోడ్", myApplications:"నా దరఖాస్తులు", courseRecommendation:"కోర్సు సిఫార్సు", exploreRecommendation:"సిఫార్సు చూడండి →", recommended:"సిఫార్సు:", passwordMismatch:"కొత్త పాస్‌వర్డ్ మరియు నిర్ధారణ పాస్‌వర్డ్ సరిపోలలేదు.", passwordSuccess:"పాస్‌వర్డ్ విజయవంతంగా మార్చబడింది.", passwordShort:"పాస్‌వర్డ్ కనీసం 6 అక్షరాలు ఉండాలి." },
    मराठी: { dashboard:"विद्यार्थी डॅशबोर्ड", welcome:"पुन्हा स्वागत आहे,", subtitle:"सोप्या आणि सुरक्षित प्लॅटफॉर्मवर प्रवेश, अभ्यासक्रम, कागदपत्रे आणि अर्ज व्यवस्थापित करा.", studentMenu:"स्टुडंट मेनू", profile:"माझे प्रोफाइल", settings:"सेटिंग्ज", language:"भाषा", selected:"निवडलेले", password:"पासवर्ड", changePassword:"पासवर्ड बदला", savePassword:"पासवर्ड सेव्ह करा", help:"मदत आणि सपोर्ट", logout:"लॉगआउट", availableCourses:"उपलब्ध अभ्यासक्रम", application:"अर्ज", documents:"कागदपत्रे", payment:"पेमेंट", recent:"अलीकडील अर्ज", track:"तुमचा नवीनतम प्रवेश अर्ज ट्रॅक करा", viewDetails:"तपशील पहा →", quickActions:"जलद कृती", exploreCourses:"अभ्यासक्रम पहा", applyAdmission:"प्रवेशासाठी अर्ज", uploadDocuments:"कागदपत्रे अपलोड", myApplications:"माझे अर्ज", courseRecommendation:"अभ्यासक्रम शिफारस", exploreRecommendation:"शिफारस पहा →", recommended:"शिफारस:", passwordMismatch:"नवीन पासवर्ड आणि पुष्टी पासवर्ड जुळत नाहीत.", passwordSuccess:"पासवर्ड यशस्वीरित्या बदलला.", passwordShort:"पासवर्ड किमान 6 अक्षरांचा असावा." }
  };
  const t = translations[language] || translations.English;

  const menuItems = [
    ["🏠", "Dashboard"],
    ["👤", "Profile"],
    ["📚", "Courses"],
    ["📝", "Apply for Admission"],
    ["📄", "Documents"],
    ["📋", "My Applications"],
    ["💳", "Payment"],
    ["🔔", "Notifications"],
    ["🤖", "AI Recommendation"],
  ];

  const menuLabels = {
    Dashboard: t.dashboard,
    Profile: t.profile,
    Courses: t.exploreCourses,
    "Apply for Admission": t.applyAdmission,
    Documents: t.documents,
    "My Applications": t.myApplications,
    Payment: t.payment,
    Notifications: "Notifications",
    "AI Recommendation": t.courseRecommendation,
  };

  const stats = [

    ["📚", courses.length.toString(), "Available Courses"],

    ["📝", "1", "Application"],

    ["📄", "3", "Documents"],

    ["💳", "Pending", "Payment"],

  ];



  const profileItemStyle = {

    width: "100%",

    padding: "10px 12px",

    marginBottom: "6px",

    border: "1px solid transparent",

    borderRadius: "10px",

    background: "rgba(255,255,255,.055)",

    color: "#fff",

    cursor: "pointer",

    display: "flex",

    alignItems: "center",

    textAlign: "left",

    fontSize: "11px",

    fontWeight: "600",

    transition: "0.25s ease",

  };



  const menuHoverIn = (e) => {

    e.currentTarget.style.transform = "translateY(-2px)";

    e.currentTarget.style.background =

      "linear-gradient(100deg, rgba(36,142,255,.24), rgba(8,207,255,.16))";

    e.currentTarget.style.borderColor = "rgba(104,220,255,.42)";

  };



  const menuHoverOut = (e) => {

    e.currentTarget.style.transform = "translateY(0)";

    e.currentTarget.style.background = "rgba(255,255,255,.055)";

    e.currentTarget.style.borderColor = "transparent";

  };



  const settingLabelStyle = {

    display: "block",

    marginBottom: "6px",

    color: "#62dcff",

    fontSize: "9px",

    fontWeight: "800",

  };



  const settingSelectStyle = {

    width: "100%",

    padding: "8px",

    borderRadius: "9px",

    border: "1px solid rgba(104,220,255,.22)",

    background: "rgba(4,25,42,.9)",

    color: "#fff",

    fontSize: "10px",

    outline: "none",

  };



  React.useEffect(() => {


    const savedLanguage = localStorage.getItem("smartAdmissionLanguage");


    if (savedLanguage) setLanguage(savedLanguage);

  }, []);



  React.useEffect(() => {

    localStorage.setItem("smartAdmissionLanguage", language);

  }, [language]);



  const goHome = () => {

    setProfileOpen(false);

    setSettingsOpen(false);

    setSupportOpen(false);

    setPasswordOpen(false);

    // Return to the application's home/login route instead of the dashboard.

    window.location.assign("/");

  };




  const changeLanguage = (value) => {
    setLanguage(value);
    localStorage.setItem("smartAdmissionLanguage", value);
    setMessage(`Language changed to ${value}`);
    setTimeout(() => setMessage(""), 1800);
  };

  const savePassword = () => {
    const cleanNew = newPassword.trim();
    const cleanConfirm = confirmPassword.trim();
    if (cleanNew.length < 6) {
      setMessage(t.passwordShort);
      return;
    }
    if (cleanNew !== cleanConfirm) {
      setMessage(t.passwordMismatch);
      return;
    }
    localStorage.setItem("smartAdmissionPassword", cleanNew);
    setNewPassword("");
    setConfirmPassword("");
    setPasswordOpen(false);
    setMessage(t.passwordSuccess);
    setTimeout(() => setMessage(""), 2200);
  };
// Dashboard data and navigation
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      return {};
    }

    return {
      Authorization: `Bearer ${token}`,
    };
  };

  React.useEffect(() => {
    let cancelled = false;

    const loadDashboardData = async () => {
      try {
        const applicationsResponse = await fetch(
          "http://localhost:8080/api/applications",
          {
            method: "GET",
            headers: {
              ...getAuthHeaders(),
            },
          }
        );

        if (!cancelled && applicationsResponse.ok) {
          const data = await applicationsResponse.json();

          if (Array.isArray(data)) {
            setDashboardApplications(data);
          }
        }
      } catch (error) {
        // Keep dashboard working if backend is unavailable
        console.error("Dashboard applications fetch error:", error);
      }
    };

  loadDashboardData();

  return () => {
    cancelled = true;
  };
}, []);

  const goToPage = (page) => {
    setActivePage(page);
    setMenuOpen(false);
    setProfileOpen(false);
    setSettingsOpen(false);
    setSupportOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const recentApplication = dashboardApplications.length
    ? [...dashboardApplications].sort((a, b) =>
        new Date(b.appliedAt || 0).getTime() - new Date(a.appliedAt || 0).getTime()
      )[0]
    : null;

  const formatApplicationDate = (value) => {
    if (!value) return "12 Sep 2026";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  };

  const dashboardStats = [
    ["📚", String(courses.length), t.availableCourses, "Courses"],
    ["📝", String(dashboardApplications.length || 1), t.application, "My Applications"],
    ["📄", "3", t.documents, "Documents"],
    ["💳", recentApplication?.paymentStatus || "Pending", t.payment, "Payment"],
  ];




  return (

    <>

    <div

      id="smart-admission-root"


      style={{

        minHeight: "100vh",

        position: "relative",

        overflowX: "hidden",
        overflowY: "visible",

        color: "white",

        fontFamily: '"Inter", Arial, sans-serif',

        background:
          "linear-gradient(rgba(3,24,42,0.82),rgba(7,59,86,0.88)),url(\'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2000&q=85\') center/cover fixed",

      }}

    >

      {/* BACKGROUND GLOW */}

      <div

        style={{

          position: "fixed",

          width: "420px",

          height: "420px",

          borderRadius: "50%",

          background: "#008cff",

          filter: "blur(110px)",

          opacity: 0.22,

          left: "-180px",

          top: "180px",

          pointerEvents: "none",

        }}

      />



      <div

        style={{

          position: "fixed",

          width: "480px",

          height: "480px",

          borderRadius: "50%",

          background: "#00d8d8",

          filter: "blur(120px)",

          opacity: 0.18,

          right: "-200px",

          bottom: "50px",

          pointerEvents: "none",

        }}

      />



      {/* NAVBAR */}

      <header

        style={{

          width: "calc(100% - 40px)",

          maxWidth: "1450px",

          minHeight: "72px",

          margin: "14px auto 0",

          padding: "0 28px",

          display: "flex",

          alignItems: "center",

          justifyContent: "space-between",

          background: "rgba(12, 61, 87, 0.48)",

          border: "1px solid rgba(255,255,255,0.18)",

          borderRadius: "23px",

          backdropFilter: "blur(25px)",

          WebkitBackdropFilter: "blur(25px)",

          boxShadow:

            "inset 0 1px 0 rgba(255,255,255,0.12), 0 12px 40px rgba(0,0,0,0.12)",

          position: "relative",

          zIndex: 999999,

        }}

      >

        {/* LOGO */}

        <div

          style={{

            display: "flex",

            alignItems: "center",

            gap: "11px",

            minWidth: "210px",

          }}

        >

          <div

            style={{

              width: "43px",

              height: "43px",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              borderRadius: "13px",

              background: "linear-gradient(145deg,#168fff,#1645d8)",

              border: "1px solid rgba(111,225,255,0.45)",

              fontSize: "23px",

              boxShadow: "0 8px 25px rgba(0,150,255,0.25)",

            }}

          >

            🎓

          </div>



          <div>

            <div

              style={{

                fontSize: "17px",

                fontWeight: "800",

                lineHeight: "1.1",

              }}

            >

              Smart <span style={{ color: "#19d9ff" }}>Admission</span>

            </div>



            <div

              style={{

                marginTop: "4px",

                fontSize: "9px",

                color: "rgba(255,255,255,0.48)",

                letterSpacing: "0.8px",

                fontWeight: "600",

              }}

            >

              STUDENT PORTAL

            </div>

          </div>

        </div>



        {/* TOP NAVIGATION — Student Menu replaces the 4 old middle links */}

        <nav

          style={{

            flex: 1,

            display: "flex",

            alignItems: "center",

            justifyContent: "center",

            position: "relative",

          }}

        >

          <div

            style={{

              position: "relative",

              width: "245px",

            }}

          >

            <button

              onClick={() => {

                setMenuOpen(!menuOpen);

                setProfileOpen(false);

                setSettingsOpen(false);

                setSupportOpen(false);

              }}

              style={{

                width: "100%",

                minHeight: "42px",

                padding: "10px 15px",

                borderRadius: "12px",

                border: "1px solid rgba(104,220,255,0.38)",

                background: menuOpen

                  ? "linear-gradient(135deg, rgba(18,91,130,0.99), rgba(8,49,76,0.99))"

                  : "linear-gradient(135deg, rgba(10,50,78,0.98), rgba(8,35,58,0.98))",

                color: "#ffffff",

                fontSize: "11px",

                fontWeight: "800",

                letterSpacing: "0.8px",

                cursor: "pointer",

                display: "flex",

                alignItems: "center",

                justifyContent: "space-between",

                boxShadow: menuOpen

                  ? "0 10px 28px rgba(0,0,0,0.28), 0 0 18px rgba(0,190,255,0.10)"

                  : "0 8px 22px rgba(0,0,0,0.16)",

                transition: "all .2s ease",

              }}

              onMouseEnter={(e) => {

                e.currentTarget.style.background =

                  "linear-gradient(135deg, rgba(18,91,130,0.99), rgba(8,49,76,0.99))";

                e.currentTarget.style.borderColor =

                  "rgba(104,220,255,0.62)";

                e.currentTarget.style.transform = "translateY(-1px)";

                e.currentTarget.style.boxShadow =

                  "0 10px 28px rgba(0,0,0,0.28), 0 0 18px rgba(0,190,255,0.12)";

              }}

              onMouseLeave={(e) => {

                e.currentTarget.style.background = menuOpen

                  ? "linear-gradient(135deg, rgba(18,91,130,0.99), rgba(8,49,76,0.99))"

                  : "linear-gradient(135deg, rgba(10,50,78,0.98), rgba(8,35,58,0.98))";

                e.currentTarget.style.borderColor =

                  "rgba(104,220,255,0.38)";

                e.currentTarget.style.transform = "translateY(0)";

                e.currentTarget.style.boxShadow = menuOpen

                  ? "0 10px 28px rgba(0,0,0,0.28), 0 0 18px rgba(0,190,255,0.10)"

                  : "0 8px 22px rgba(0,0,0,0.16)";

              }}

            >

              <span>{t.studentMenu}</span>

              <span style={{ color: "#ffffff", fontSize: "10px" }}>

                {menuOpen ? "▲" : "▼"}

              </span>

            </button>



            {menuOpen && (

              <div

                style={{

                  position: "absolute",

                  top: "50px",

                  left: "50%",

                  transform: "translateX(-50%)",

                  width: "245px",

                  padding: "10px",

                  borderRadius: "14px",

                  background:

                    "linear-gradient(145deg, rgba(7,39,63,1), rgba(6,25,43,1))",

                  border: "1px solid rgba(104,220,255,0.38)",

                  boxShadow:

                    "0 20px 45px rgba(0,0,0,0.48), 0 0 24px rgba(0,190,255,0.12)",

                  zIndex: 1000001,

                  backdropFilter: "blur(18px)",

                  WebkitBackdropFilter: "blur(18px)",

                  opacity: 1,

                  pointerEvents: "auto",

                }}

              >

                {menuItems.map(([icon, title]) => {

                  const pageName =

                    title === "Apply for Admission" ? "Admission" : title;



                  const active =

                    activePage === pageName ||

                    (title === "Apply for Admission" &&

                      activePage === "Admission");



                  return (

                    <div

                      key={title}

                      onClick={() => {

                        setActivePage(pageName);

                        setMenuOpen(false);

                        setProfileOpen(false);

                        setSettingsOpen(false);

                        setSupportOpen(false);

                      }}

                      onMouseEnter={(e) => {

                        if (!active) {

                          e.currentTarget.style.transform = "translateY(-2px)";

                          e.currentTarget.style.background =

                            "linear-gradient(100deg, rgba(36,142,255,0.30), rgba(8,207,255,0.20))";

                          e.currentTarget.style.borderColor =

                            "rgba(104,220,255,0.48)";

                          e.currentTarget.style.boxShadow =

                            "0 8px 18px rgba(0,0,0,0.20)";

                        }

                      }}

                      onMouseLeave={(e) => {

                        if (!active) {

                          e.currentTarget.style.transform = "translateY(0)";

                          e.currentTarget.style.background =

                            "rgba(255,255,255,.055)";

                          e.currentTarget.style.borderColor =

                            "transparent";

                          e.currentTarget.style.boxShadow = "none";

                        }

                      }}

                      style={{

                        width: "100%",

                        padding: "10px 12px",

                        marginBottom: "6px",

                        borderRadius: "10px",

                        border: active

                          ? "1px solid rgba(104,220,255,0.38)"

                          : "1px solid transparent",

                        background: active

                          ? "linear-gradient(100deg, rgba(36,142,255,0.30), rgba(8,207,255,0.20))"

                          : "rgba(255,255,255,.055)",

                        color: "#fff",

                        cursor: "pointer",

                        display: "flex",

                        alignItems: "center",

                        gap: "9px",

                        fontSize: "11px",

                        fontWeight: active ? "800" : "600",

                        transition: "all .18s ease",

                        boxSizing: "border-box",

                      }}

                    >

                      <span style={{ fontSize: "14px", width: "18px" }}>

                        {icon}

                      </span>

                      <span>{menuLabels[title] || title}</span>

                    </div>

                  );

                })}

              </div>

            )}

          </div>

        </nav>



        {/* RIGHT ACTIONS */}

        <div

          style={{

            display: "flex",

            alignItems: "center",

            gap: "9px",

            minWidth: "210px",

            justifyContent: "flex-end",

          }}

        >

          <button

          onClick={() => { setActivePage("Notifications"); setMenuOpen(false); setProfileOpen(false); }}

            style={{

              width: "40px",

              height: "40px",

              display: "flex",

              alignItems: "center",

              justifyContent: "center",

              borderRadius: "12px",

              color: "white",

              background: "linear-gradient(135deg, rgba(10,50,78,0.98), rgba(8,35,58,0.98))",

              border: "1px solid rgba(104,220,255,0.38)",

              fontSize: "17px",

              cursor: "pointer",

            }}

          >

            🔔

          </button>



          <div style={{ position: "relative" }}>

            <button

              onClick={() => {

                setProfileOpen(!profileOpen);

                setMenuOpen(false);

                setSettingsOpen(false);

                setSupportOpen(false);

              }}

              style={{

                height: "40px",

                display: "flex",

                alignItems: "center",

                gap: "8px",

                padding: "0 13px",

                borderRadius: "12px",

                color: "white",

                background: "linear-gradient(135deg, rgba(10,50,78,0.98), rgba(8,35,58,0.98))",

                border: "1px solid rgba(104,220,255,0.38)",

                fontSize: "11px",

                fontWeight: "600",

                cursor: "pointer",

              }}

            >

              <span style={{ fontSize: "15px" }}>👤</span>

              Swastik

              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "9px" }}>

                {profileOpen ? "▲" : "▼"}

              </span>

            </button>



            {profileOpen && (

              <div

                style={{

                  position: "absolute",

                  top: "48px",

                  right: 0,

                  width: "250px",

                  padding: "10px",

                  borderRadius: "14px",

                  background: "linear-gradient(145deg,rgba(7,39,63,.99),rgba(6,25,43,.99))",

                  border: "1px solid rgba(104,220,255,.30)",

                  boxShadow: "0 20px 45px rgba(0,0,0,.40)",

                  backdropFilter: "blur(18px)",

                  zIndex: 1000002,

                }}

              >

                <div style={{ padding: "9px 11px", marginBottom: "6px", borderRadius: "10px", background: "rgba(255,255,255,.055)" }}>

                  <div style={{ fontWeight: 800, fontSize: "12px" }}>Swastik Debnath</div>

                  <div style={{ marginTop: "3px", color: "#62dcff", fontSize: "10px" }}>Student • BCA</div>

                </div>



                <button onClick={() => { setActivePage("Profile"); setMenuOpen(false); setProfileOpen(false); }} style={profileItemStyle} onMouseEnter={menuHoverIn} onMouseLeave={menuHoverOut}>

                  👤 {t.profile}

                </button>



                <button onClick={() => { setSettingsOpen(!settingsOpen); setSupportOpen(false); }} style={profileItemStyle} onMouseEnter={menuHoverIn} onMouseLeave={menuHoverOut}>

                  ⚙️ {t.settings} <span style={{ marginLeft: "auto" }}>{settingsOpen ? "▲" : "▼"}</span>

                </button>



                {settingsOpen && (

                  <div style={{ margin: "0 0 6px", padding: "10px", borderRadius: "11px", background: "rgba(255,255,255,.045)", border: "1px solid rgba(104,220,255,.16)" }}>

                    <label style={settingLabelStyle}>{t.language}</label>

                    <select value={language} onChange={(e) => changeLanguage(e.target.value)} style={settingSelectStyle}>

                      <option>English</option>

                      <option>বাংলা</option>

                      <option>हिन्दी</option>

                      <option>தமிழ்</option>

                      <option>తెలుగు</option>

                      <option>मराठी</option>

                    </select>

                    <div style={{ marginTop: "6px", color: "rgba(255,255,255,.55)", fontSize: "9px" }}>

                      {t.selected}: {language}

                    </div>

                    <label style={{ ...settingLabelStyle, marginTop: "10px" }}>{t.password}</label>

                    <button onClick={() => setPasswordOpen(!passwordOpen)} style={{ ...profileItemStyle, marginBottom: 0 }}>

                      🔒 {t.changePassword} <span style={{ marginLeft: "auto" }}>{passwordOpen ? "▲" : "▼"}</span>

                    </button>



                    {passwordOpen && (

                      <div style={{ marginTop: "8px" }}>

                        <input type="password" placeholder="New password (min 6 characters)" minLength={6} value={newPassword} onChange={(e) => { setNewPassword(e.target.value); setMessage(""); }} style={settingSelectStyle} />

                        <input type="password" placeholder="Confirm new password" minLength={6} value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); setMessage(""); }} style={{ ...settingSelectStyle, marginTop: "7px" }} />

                        <button onClick={savePassword} style={{ ...profileItemStyle, marginTop: "7px", marginBottom: 0, justifyContent: "center", background: "linear-gradient(100deg,#248eff,#08cfff)" }}>

                          {t.savePassword}

                        </button>

                      </div>

                    )}

                  </div>

                )}



                <button onClick={() => setSupportOpen(!supportOpen)} style={profileItemStyle} onMouseEnter={menuHoverIn} onMouseLeave={menuHoverOut}>

                  ❓ {t.help} <span style={{ marginLeft: "auto" }}>{supportOpen ? "▲" : "▼"}</span>

                </button>

                {supportOpen && (

                  <div style={{ margin: "0 0 6px", padding: "9px 11px", borderRadius: "10px", background: "rgba(255,255,255,.045)", color: "rgba(255,255,255,.75)", fontSize: "10px", lineHeight: 1.5 }}>

                    For admission, documents, payment or application help, contact student support.

                  </div>

                )}



                <button onClick={goHome} style={{ ...profileItemStyle, color: "#ff9b9b", marginTop: "2px" }}>

                  🚪 {t.logout}

                </button>

              </div>

            )}

          </div>

        </div>

      </header>



      {/* MAIN */}





      <main

        style={{

          width: "calc(100% - 80px)",

          maxWidth: "1320px",

          margin: "0 auto",

          padding: "45px 0 70px",

          position: "relative",

          zIndex: 0,

        }}

      >

        {/* TITLE */}

        <div style={{ marginBottom: "28px" }}>

          <div

            style={{

              display: "inline-flex",

              padding: "8px 15px",

              borderRadius: "30px",

              background: "rgba(18,133,185,0.23)",

              border: "1px solid rgba(106,219,255,0.25)",

              color: "#e7f9ff",

              fontSize: "15px",

              fontWeight: "600",

              backdropFilter: "blur(15px)",

            }}

          >

            🎓 &nbsp;

            {activePage === "Dashboard"

              ? t.dashboard

              : activePage.toUpperCase()}

          </div>



          <h1

            style={{

              margin: "18px 0 0",

              fontSize: "clamp(38px, 5vw, 58px)",

              lineHeight: "1",

              letterSpacing: "-2px",

              fontWeight: "800",

            }}

          >

            {activePage === "Dashboard" ? (

              <>

                {t.welcome}{" "}

                <span

                  style={{

                    color: "#0edcff",

                    textShadow: "0 0 30px rgba(0,218,255,0.25)",

                  }}

                >

                  Swastik!

                </span>{" "}

                👋

              </>

            ) : (

              activePage

            )}

          </h1>



          <p

            style={{

              maxWidth: "650px",

              marginTop: "18px",

              color: "rgba(238,249,255,0.78)",

              fontSize: "14px",

              lineHeight: "1.7",

            }}

          >

            Manage your admission journey, courses, documents and

            applications from one simple and secure platform.

          </p>

        </div>



        {/* DASHBOARD LAYOUT */}

        <div

          style={{

            width: "100%",

          }}

        >

          {/* FULL-WIDTH PAGE CONTENT */}

          <section

            style={{

              width: "100%",

            }}

          >

            {activePage === "Profile" ? (

              <Profile />

            ) : activePage === "Courses" ? (

              <Courses

                onApplyCourse={(courseName) => {

                  setSelectedCourse(courseName);

                  setActivePage("Admission");

                }}

              />

            ) : activePage === "Admission" ? (

              <Admission selectedCourse={selectedCourse} />

            ) : activePage === "My Applications" ? (

              <MyApplications />

            ) : activePage === "Notifications" ? (

              <Notifications />

            ) : activePage === "AI Recommendation" ? (

              <AIRecommendation />

            ) : activePage === "Documents" ? (

              <Documents />

            ) : activePage === "Payment" ? (

              <Payment />

            ) : (

              <>

                {/* STATS */}

                <div

                  style={{

                    display: "grid",

                    gridTemplateColumns: "repeat(4,1fr)",

                    gap: "14px",

                  }}

                >

                  {dashboardStats.map(([icon, number, title, targetPage]) => (

                    <button
                      key={title}
                      type="button"
                      onClick={() => goToPage(targetPage)}

                      style={{

                        minHeight: "130px",

                        padding: "20px",

                        borderRadius: "20px",

                        background:

                          "linear-gradient(135deg,rgba(117,220,255,0.18),rgba(255,255,255,0.07))",

                        border:

                          "1px solid rgba(156,233,255,0.25)",

                        backdropFilter: "blur(22px)",

                      }}

                    >

                      <div style={{ fontSize: "25px" }}>

                        {icon}

                      </div>



                      <strong

                        style={{

                          display: "block",

                          marginTop: "8px",

                          fontSize:

                            number === "Pending" ? "18px" : "27px",

                        }}

                      >

                        {number}

                      </strong>



                      <span

                        style={{

                          display: "block",

                          marginTop: "4px",

                          fontSize: "11px",

                          color: "rgba(255,255,255,0.62)",

                        }}

                      >

                        {title}

                      </span>

                    </button>

                  ))}

                </div>



                {/* APPLICATION */}

                <div

                  style={{

                    marginTop: "16px",

                    padding: "22px",

                    borderRadius: "22px",

                    background:

                      "linear-gradient(135deg,rgba(117,220,255,0.18),rgba(255,255,255,0.07))",

                    border:

                      "1px solid rgba(156,233,255,0.25)",

                    backdropFilter: "blur(22px)",

                  }}

                >

                  <div

                    style={{

                      display: "flex",

                      justifyContent: "space-between",

                      alignItems: "center",

                    }}

                  >

                    <div>

                      <h2 style={{ fontSize: "21px" }}>

                        📋 {t.recent}

                      </h2>



                      <p

                        style={{

                          marginTop: "5px",

                          fontSize: "11px",

                          color: "rgba(255,255,255,0.58)",

                        }}

                      >

                        {t.track}

                      </p>

                    </div>



                    <span

                      style={{

                        padding: "7px 12px",

                        borderRadius: "20px",

                        background:

                          "rgba(255,190,0,0.17)",

                        color: "#ffc42e",

                        fontSize: "10px",

                        fontWeight: "800",

                      }}

                    >

                      PENDING

                    </span>

                  </div>



                  <div

                    style={{

                      display: "grid",

                      gridTemplateColumns: "repeat(4,1fr)",

                      gap: "12px",

                      marginTop: "18px",

                      padding: "15px",

                      borderRadius: "14px",

                      background:

                        "rgba(255,255,255,0.045)",

                    }}

                  >

                    {[

                      ["Application No.", "APP001"],

                      ["Course", "BCA"],

                      ["Submitted", "12 Sep 2026"],

                      ["Status", "Pending"],

                    ].map(([label, value]) => (

                      <div key={label}>

                        <small style={{ color: "#36d6ff" }}>

                          {label}

                        </small>



                        <div

                          style={{

                            marginTop: "6px",

                            fontSize: "12px",

                            fontWeight: "700",

                          }}

                        >

                          {value}

                        </div>

                      </div>

                    ))}

                  </div>



                  <button
                    type="button"
                    onClick={() => goToPage("My Applications")}
                    style={{
                      marginTop: "15px",

                      padding: "10px 19px",

                      borderRadius: "14px",

                      color: "white",

                      background:

                        "linear-gradient(100deg,#248eff,#08cfff)",

                      fontWeight: "700",

                      cursor: "pointer",

                    }}

                  >

                    {t.viewDetails}

                  </button>

                </div>



                {/* BOTTOM CARDS */}

                <div

                  style={{

                    display: "grid",

                    gridTemplateColumns: "1fr 1fr",

                    gap: "16px",

                    marginTop: "16px",

                  }}

                >

                  {/* QUICK ACTIONS */}

                  <div

                    style={{

                      padding: "20px",

                      borderRadius: "22px",

                      background:

                        "linear-gradient(135deg,rgba(117,220,255,0.18),rgba(255,255,255,0.07))",

                      border:

                        "1px solid rgba(156,233,255,0.25)",

                      backdropFilter: "blur(22px)",

                    }}

                  >

                    <h2 style={{ fontSize: "19px" }}>

                      ⚡ {t.quickActions}

                    </h2>



                    <div

                      style={{

                        display: "grid",

                        gridTemplateColumns: "1fr 1fr",

                        gap: "10px",

                        marginTop: "14px",

                      }}

                    >

                      {[

                        ["📚", t.exploreCourses],

                        ["📝", t.applyAdmission],

                        ["📄", t.uploadDocuments],

                        ["📋", t.myApplications],

                      ].map(([icon, title]) => (

                        <button
                          key={title}
                          type="button"
                          onClick={() => {
                            const pageMap = {
                              [t.exploreCourses]: "Courses",
                              [t.applyAdmission]: "Admission",
                              [t.uploadDocuments]: "Documents",
                              [t.myApplications]: "My Applications",
                            };
                            goToPage(pageMap[title]);
                          }}

                          style={{

                            padding: "13px",

                            borderRadius: "14px",

                            background:

                              "rgba(255,255,255,0.07)",

                            border:

                              "1px solid rgba(255,255,255,0.1)",

                            cursor: "pointer",

                            fontSize: "11px",

                          }}

                        >

                          <span style={{ fontSize: "20px" }}>

                            {icon}

                          </span>

                          <br />

                          <span

                            style={{

                              display: "inline-block",

                              marginTop: "6px",

                            }}

                          >

                            {title}

                          </span>

                        </button>

                      ))}

                  </div>

                </div>



                  {/* AI */}

                  <div

                    style={{

                      padding: "20px",

                      borderRadius: "22px",

                      background:

                        "radial-gradient(circle at 85% 50%,rgba(0,220,255,0.2),transparent 45%),linear-gradient(135deg,rgba(117,220,255,0.18),rgba(255,255,255,0.07))",

                      border:

                        "1px solid rgba(156,233,255,0.25)",

                      backdropFilter: "blur(22px)",

                    }}

                  >

                    <div

                      style={{

                        color: "#36d6ff",

                        fontSize: "10px",

                        fontWeight: "700",

                      }}

                    >

                      🤖 &nbsp; AI POWERED

                    </div>



                    <h2

                      style={{

                        marginTop: "9px",

                        fontSize: "19px",

                      }}

                    >

                      {t.courseRecommendation}

                    </h2>



                    <p

                      style={{

                        marginTop: "8px",

                        fontSize: "11px",

                        lineHeight: "1.5",

                        color:

                          "rgba(255,255,255,0.62)",

                      }}

                    >

                      Get personalized course suggestions based on

                      your academic profile and interests.

                    </p>



                    <div

                      style={{

                        marginTop: "12px",

                        padding: "12px",

                        borderRadius: "13px",

                        background:

                          "rgba(255,255,255,0.06)",

                        border:

                          "1px solid rgba(255,255,255,0.09)",

                        fontSize: "12px",

                      }}

                    >

                      🎓 <strong>{t.recommended} BCA</strong>



                      <div

                        style={{

                          marginTop: "5px",

                          color:

                            "rgba(255,255,255,0.58)",

                          fontSize: "10px",

                        }}

                      >

                        Computer Applications • Technology

                      </div>

                    </div>



                    <button
                      type="button"
                      onClick={() => goToPage("AI Recommendation")}
                      style={{
                        marginTop: "12px",

                        padding: "10px 16px",

                        borderRadius: "13px",

                        color: "white",

                        background:

                          "linear-gradient(100deg,#248eff,#08cfff)",

                        fontWeight: "700",

                        fontSize: "11px",

                        cursor: "pointer",

                      }}

                    >

                      {t.exploreRecommendation}

                    </button>

                  </div>

                </div>

              </>

            )}

          </section>

        </div>

      </main>



      {message && (

        <div style={{ position: "fixed", left: "50%", bottom: "24px", transform: "translateX(-50%)", zIndex: 200, padding: "11px 18px", borderRadius: "12px", background: "rgba(5,30,48,.96)", border: "1px solid rgba(104,220,255,.35)", color: "#fff", fontSize: "11px", fontWeight: 700, boxShadow: "0 15px 35px rgba(0,0,0,.35)" }}>

          {message}

        </div>

      )}

    </div>

    </>

  );

}



export default StudentDashboard;