from flask import Flask, request, jsonify
from flask_cors import CORS
from pathlib import Path
import pandas as pd
import joblib
import re

app = Flask(__name__)
CORS(app)

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "model.pkl"

try:
    model = joblib.load(MODEL_PATH)
    print("========================================")
    print("Model loaded successfully!")
    print("Model path:", MODEL_PATH)
    print("========================================")
except Exception as e:
    model = None
    print("ERROR: Could not load model.pkl")
    print("Reason:", e)


# Keep course names consistent with dataset.csv/model classes.
SCIENCE_COURSES = [
    "BCA", "BCA – Artificial Intelligence", "BCA – Machine Learning",
    "BCA – Data Analytics", "BCA – Full Stack Development",
    "BCA – Web Development", "BCA – Cloud Computing",
    "BCA – Software Development", "BCA – Cyber Security", "BCA – DevOps",
    "BCA – Internet of Things (IoT)", "BCA – Blockchain Technology",
    "B.Sc Computer Science", "B.Sc Data Science",
    "B.Sc Information Technology", "B.Sc Mathematics", "B.Sc Physics",
    "B.Sc Chemistry", "B.Sc Biotechnology", "B.Sc Microbiology",
    "B.Sc Electronics", "B.Tech Computer Science",
    "B.Tech Artificial Intelligence & Machine Learning",
    "B.Tech Cyber Security", "B.Tech Data Science"
]

COMMERCE_COURSES = [
    "B.Com", "B.Com – Banking & Finance", "B.Com – Accounting & Finance",
    "B.Com – Taxation", "B.Com – Business Analytics", "BBA",
    "BBA – Marketing", "BBA – Human Resource Management", "BBA – Finance",
    "BBA – Digital Marketing", "BBA – Business Analytics",
    "BBA – International Business", "BBA – Entrepreneurship",
    "Bachelor of Management Studies (BMS)", "Bachelor of Economics"
]

ARTS_COURSES = [
    "B.A", "B.A – English", "B.A – Bengali", "B.A – History",
    "B.A – Political Science", "B.A – Sociology", "B.A – Psychology",
    "B.A – Geography", "B.A – Philosophy",
    "Bachelor of Journalism & Mass Communication", "Bachelor of Social Work",
    "Bachelor of Library & Information Science"
]


def normalize_text(value):
    value = str(value or "").strip().lower()
    value = value.replace("&", " and ")
    value = re.sub(r"[^a-z0-9]+", " ", value)
    return re.sub(r"\s+", " ", value).strip()


def normalize_stream(stream):
    value = normalize_text(stream)
    if value == "science":
        return "Science"
    if value == "commerce":
        return "Commerce"
    if value == "arts":
        return "Arts"
    return ""


def get_eligible_courses(stream):
    if stream == "Science":
        return SCIENCE_COURSES
    if stream == "Commerce":
        return COMMERCE_COURSES
    if stream == "Arts":
        return ARTS_COURSES
    return []


# Course-to-interest groups used by the transparent ranking layer.
COURSE_GROUPS = {
    "ai_ml": [
        "BCA – Artificial Intelligence", "BCA – Machine Learning",
        "BCA – Data Analytics", "B.Sc Data Science",
        "B.Tech Artificial Intelligence & Machine Learning",
        "B.Tech Data Science", "B.Sc Computer Science",
        "B.Tech Computer Science"
    ],
    "computer_science": [
        "BCA", "BCA – Artificial Intelligence", "BCA – Machine Learning",
        "BCA – Data Analytics", "BCA – Full Stack Development",
        "BCA – Web Development", "BCA – Cloud Computing",
        "BCA – Software Development", "BCA – Cyber Security", "BCA – DevOps",
        "BCA – Internet of Things (IoT)", "BCA – Blockchain Technology",
        "B.Sc Computer Science", "B.Sc Information Technology",
        "B.Sc Data Science", "B.Tech Computer Science",
        "B.Tech Artificial Intelligence & Machine Learning",
        "B.Tech Cyber Security", "B.Tech Data Science"
    ],
    "software_it": [
        "BCA", "BCA – Full Stack Development", "BCA – Web Development",
        "BCA – Software Development", "BCA – Cloud Computing", "BCA – DevOps",
        "B.Sc Computer Science", "B.Sc Information Technology",
        "B.Tech Computer Science"
    ],
    "cyber_security": [
        "BCA – Cyber Security", "B.Tech Cyber Security",
        "B.Sc Computer Science", "B.Tech Computer Science"
    ],
    "business_management": [
        "BBA", "BBA – Business Analytics", "BBA – Marketing",
        "BBA – Finance", "BBA – Human Resource Management",
        "BBA – International Business", "BBA – Entrepreneurship",
        "Bachelor of Management Studies (BMS)"
    ],
    "finance_accounting": [
        "B.Com", "B.Com – Banking & Finance", "B.Com – Accounting & Finance",
        "B.Com – Taxation", "BBA – Finance", "Bachelor of Economics"
    ],
    "business_analytics": [
        "B.Com – Business Analytics", "BBA – Business Analytics",
        "B.Sc Data Science", "BCA – Data Analytics", "Bachelor of Economics"
    ],
    "arts_humanities": [
        "B.A", "B.A – English", "B.A – Bengali", "B.A – History",
        "B.A – Political Science", "B.A – Sociology", "B.A – Psychology",
        "B.A – Geography", "B.A – Philosophy",
        "Bachelor of Journalism & Mass Communication",
        "Bachelor of Social Work", "Bachelor of Library & Information Science"
    ],
    "natural_science": [
        "B.Sc Mathematics", "B.Sc Physics", "B.Sc Chemistry",
        "B.Sc Biotechnology", "B.Sc Microbiology", "B.Sc Electronics"
    ]
}

GOAL_GROUPS = {
    "ai_ml": [
        "artificial intelligence", "machine learning", "ml",
        "ai", "data science", "data analytics"
    ],
    "computer_science": [
        "computer science", "programming", "software", "information technology",
        "technology", "developer", "web development", "app development"
    ],
    "software_it": [
        "software", "full stack", "web development", "app development",
        "cloud computing", "devops"
    ],
    "cyber_security": [
        "cyber security", "cybersecurity", "ethical hacking", "network security"
    ],
    "business_management": [
        "business", "management", "entrepreneur", "leadership",
        "human resource", "hr", "marketing"
    ],
    "finance_accounting": [
        "finance", "accounting", "banking", "tax", "investment", "economics"
    ],
    "business_analytics": [
        "business analytics", "analytics", "data analysis", "data analytics"
    ],
    "arts_humanities": [
        "journalism", "media", "writing", "history", "politics",
        "social work", "psychology", "literature", "teaching"
    ]
}

SUBJECT_GROUPS = {
    "computer_science": [
        "computer science", "programming", "informatics"
    ],
    "ai_ml": [
        "artificial intelligence", "machine learning", "data science",
        "data analytics", "statistics"
    ],
    "software_it": [
        "information technology", "software", "web development"
    ],
    "cyber_security": ["cyber security", "networking"],
    "business_management": [
        "business studies", "business", "management",
        "entrepreneurship", "marketing"
    ],
    "finance_accounting": [
        "accountancy", "accounting", "finance", "economics", "banking"
    ],
    "business_analytics": [
        "business analytics", "statistics", "mathematics", "economics"
    ],
    "arts_humanities": [
        "english", "bengali", "history", "political science", "geography",
        "psychology", "sociology", "philosophy", "arts"
    ],
    "natural_science": [
        "physics", "chemistry", "biology", "biotechnology",
        "microbiology", "electronics", "mathematics"
    ]
}


def matching_groups(value, mapping):
    text = normalize_text(value)
    result = []
    for group, aliases in mapping.items():
        for alias in aliases:
            alias_text = normalize_text(alias)
            if alias_text == "ai":
                if "ai" in text.split():
                    result.append(group)
                    break
            elif alias_text and alias_text in text:
                result.append(group)
                break
    return result


def course_relevance(course, interest, preferred_subject, career_goal):
    """Heuristic preference score from 0-100; not an admission probability."""
    course_groups = {
        group for group, courses in COURSE_GROUPS.items()
        if course in courses
    }

    interest_groups = matching_groups(interest, {
        "ai_ml": [
            "ai", "artificial intelligence", "machine learning",
            "computer science", "technology", "data science"
        ],
        "computer_science": [
            "computer science", "technology", "programming", "software"
        ],
        "software_it": ["software", "technology", "web development"],
        "cyber_security": ["cyber security", "cybersecurity", "networking"],
        "business_management": [
            "business", "commerce", "management", "marketing", "entrepreneurship"
        ],
        "finance_accounting": ["finance", "accounting", "banking", "economics"],
        "business_analytics": ["analytics", "data", "mathematics", "business"],
        "arts_humanities": [
            "arts", "humanities", "literature", "history", "journalism",
            "psychology", "social"
        ],
        "natural_science": [
            "science", "biology", "physics", "chemistry", "mathematics"
        ]
    })
    subject_groups = matching_groups(preferred_subject, SUBJECT_GROUPS)
    goal_groups = matching_groups(career_goal, GOAL_GROUPS)

    score = 25.0

    if goal_groups:
        if course_groups.intersection(goal_groups):
            score += 35
        elif (
            "computer_science" in goal_groups
            and course_groups.intersection({"ai_ml", "software_it", "cyber_security"})
        ):
            score += 25
        else:
            score -= 8

    if subject_groups:
        if course_groups.intersection(subject_groups):
            score += 25
        elif (
            "computer_science" in subject_groups
            and course_groups.intersection({"ai_ml", "software_it", "cyber_security"})
        ):
            score += 18
        elif (
            "business_analytics" in subject_groups
            and course_groups.intersection({
                "ai_ml", "finance_accounting", "business_management"
            })
        ):
            score += 12
        else:
            score -= 5

    if interest_groups:
        if course_groups.intersection(interest_groups):
            score += 15
        else:
            score -= 4

    course_text = normalize_text(course)
    goal_text = normalize_text(career_goal)
    subject_text = normalize_text(preferred_subject)

    if (
        "machine learning" in goal_text
        or "artificial intelligence" in goal_text
        or goal_text == "ai ml"
    ):
        if any(term in course_text for term in (
            "machine learning", "artificial intelligence", "data science"
        )):
            score += 8

    if "computer science" in subject_text and any(
        term in course_text for term in (
            "computer science", "information technology", "software",
            "machine learning", "artificial intelligence", "data science"
        )
    ):
        score += 5

    return max(0.0, min(100.0, score))


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "success": True,
        "message": "AI Course Recommendation API is running!",
        "model_loaded": model is not None,
        "endpoint": "/predict",
        "method": "POST"
    })


@app.route("/predict", methods=["POST"])
def predict():
    try:
        if model is None:
            return jsonify({
                "success": False,
                "message": "AI model is not loaded."
            }), 500

        data = request.get_json(silent=True)
        if not data:
            return jsonify({
                "success": False,
                "message": "Request body is empty."
            }), 400

        tenth_percentage = data.get("tenth_percentage")
        twelfth_percentage = data.get("twelfth_percentage")
        twelfth_stream = normalize_stream(data.get("twelfth_stream"))
        interest = str(data.get("interest", "")).strip()
        preferred_subject = str(data.get("preferred_subject", "")).strip()
        career_goal = str(data.get("career_goal", "")).strip()

        if tenth_percentage is None:
            return jsonify({"success": False, "message": "10th percentage is required."}), 400
        if twelfth_percentage is None:
            return jsonify({"success": False, "message": "12th percentage is required."}), 400
        if not twelfth_stream:
            return jsonify({"success": False, "message": "Valid stream is required."}), 400
        if not interest:
            return jsonify({"success": False, "message": "Interest is required."}), 400
        if not preferred_subject:
            return jsonify({"success": False, "message": "Preferred subject is required."}), 400
        if not career_goal:
            return jsonify({"success": False, "message": "Career goal is required."}), 400

        try:
            tenth_percentage = float(tenth_percentage)
            twelfth_percentage = float(twelfth_percentage)
        except (TypeError, ValueError):
            return jsonify({
                "success": False,
                "message": "Percentage must be a valid number."
            }), 400

        if not 0 <= tenth_percentage <= 100:
            return jsonify({
                "success": False,
                "message": "10th percentage must be between 0 and 100."
            }), 400
        if not 0 <= twelfth_percentage <= 100:
            return jsonify({
                "success": False,
                "message": "12th percentage must be between 0 and 100."
            }), 400

        eligible_courses = get_eligible_courses(twelfth_stream)
        if not eligible_courses:
            return jsonify({
                "success": False,
                "message": "No courses found for selected stream."
            }), 400

        input_data = pd.DataFrame([{
            "tenth_percentage": tenth_percentage,
            "twelfth_percentage": twelfth_percentage,
            "twelfth_stream": twelfth_stream,
            "interest": interest,
            "preferred_subject": preferred_subject,
            "career_goal": career_goal
        }])

        probabilities = model.predict_proba(input_data)[0]
        classes = model.classes_

        # Keep only model classes permitted by the selected stream.
        model_scores = {
            str(course): float(probability)
            for course, probability in zip(classes, probabilities)
            if str(course) in eligible_courses
        }
        max_probability = max(model_scores.values(), default=0.0)

        ranked_courses = []
        for course in eligible_courses:
            raw_probability = model_scores.get(course, 0.0)

            if max_probability > 0:
                relative_model_score = (
                    raw_probability / max_probability
                ) * 100
            else:
                relative_model_score = 0.0

            relevance_score = course_relevance(
                course, interest, preferred_subject, career_goal
            )

            # Academic performance is a small ranking factor only; it is not
            # treated as proof of admission eligibility. Preference fit has
            # the largest weight, followed by model output and marks.
            academic_average = (tenth_percentage + twelfth_percentage) / 2.0
            academic_score = max(0.0, min(100.0, academic_average))
            combined_score = (
                0.70 * relevance_score
                + 0.20 * relative_model_score
                + 0.10 * academic_score
            )

            ranked_courses.append({
                "course": course,
                "confidence": round(combined_score, 1)
            })

        if not ranked_courses:
            return jsonify({
                "success": False,
                "message": "The AI model could not find a recommendation."
            }), 404

        ranked_courses.sort(
            key=lambda item: item["confidence"],
            reverse=True
        )
        recommendations = ranked_courses[:5]

        return jsonify({
            "success": True,
            "input": {
                "tenth_percentage": tenth_percentage,
                "twelfth_percentage": twelfth_percentage,
                "twelfth_stream": twelfth_stream,
                "interest": interest,
                "preferred_subject": preferred_subject,
                "career_goal": career_goal
            },
            "recommendations": recommendations,
            "score_note": (
                "Match scores are ranking indicators based on stream eligibility, "
                "interest, preferred subject, career goal, model output and academic "
                "marks. They are not calibrated probabilities, admission chances, "
                "or a guarantee of eligibility. Check each institution's official criteria."
            )
        })

    except Exception as e:
        print("\nPrediction Error:")
        print(e)
        return jsonify({
            "success": False,
            "message": "Prediction failed.",
            "error": str(e)
        }), 500


if __name__ == "__main__":
    print("\n========================================")
    print("AI COURSE RECOMMENDATION SERVER")
    print("========================================")
    print("Model loaded:", model is not None)
    print("\nServer running on:")
    print("http://127.0.0.1:5000")
    print("\nPrediction endpoint:")
    print("POST http://127.0.0.1:5000/predict")
    print("\nFeatures:")
    print("1. tenth_percentage")
    print("2. twelfth_percentage")
    print("3. twelfth_stream")
    print("4. interest")
    print("5. preferred_subject")
    print("6. career_goal")
    print("\n========================================\n")

    app.run(host="127.0.0.1", port=5000, debug=False)