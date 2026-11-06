import pandas as pd
import numpy as np


# =========================================================
# RANDOM SEED
# =========================================================

np.random.seed(42)


# =========================================================
# STREAM-WISE SUBJECTS
# =========================================================

STREAM_SUBJECTS = {
    "Science": [
        "Mathematics",
        "Computer Science",
        "Physics",
        "Chemistry",
        "Biology"
    ],

    "Commerce": [
        "Accounting",
        "Finance",
        "Business Studies",
        "Economics",
        "Marketing"
    ],

    "Arts": [
        "English",
        "Bengali",
        "History",
        "Geography",
        "Political Science",
        "Psychology",
        "Sociology",
        "Philosophy"
    ]
}


# =========================================================
# CAREER GOALS
# =========================================================

CAREER_GOALS = [
    "Software / IT",
    "AI / Machine Learning",
    "Data Science",
    "Cyber Security",
    "Finance / Banking",
    "Business / Management",
    "Marketing",
    "Teaching / Research",
    "Journalism / Media",
    "Social Work",
    "Government Services"
]


# =========================================================
# COURSE PROFILES
#
# Each course has:
# - stream
# - preferred subjects
# - preferred career goals
# - academic score range
# =========================================================

COURSE_PROFILES = {

    # =====================================================
    # SCIENCE / TECHNOLOGY
    # =====================================================

    "BCA": {
        "stream": "Science",
        "subjects": ["Computer Science", "Mathematics"],
        "goals": ["Software / IT", "Business / Management"],
        "score": (72, 98)
    },

    "BCA – Artificial Intelligence": {
        "stream": "Science",
        "subjects": ["Computer Science", "Mathematics"],
        "goals": ["AI / Machine Learning", "Software / IT"],
        "score": (78, 99)
    },

    "BCA – Machine Learning": {
        "stream": "Science",
        "subjects": ["Computer Science", "Mathematics"],
        "goals": ["AI / Machine Learning", "Data Science"],
        "score": (78, 99)
    },

    "BCA – Data Analytics": {
        "stream": "Science",
        "subjects": ["Mathematics", "Computer Science"],
        "goals": ["Data Science", "Software / IT"],
        "score": (75, 98)
    },

    "BCA – Full Stack Development": {
        "stream": "Science",
        "subjects": ["Computer Science", "Mathematics"],
        "goals": ["Software / IT"],
        "score": (72, 98)
    },

    "BCA – Web Development": {
        "stream": "Science",
        "subjects": ["Computer Science"],
        "goals": ["Software / IT"],
        "score": (70, 96)
    },

    "BCA – Cloud Computing": {
        "stream": "Science",
        "subjects": ["Computer Science", "Mathematics"],
        "goals": ["Software / IT", "Data Science"],
        "score": (75, 98)
    },

    "BCA – Software Development": {
        "stream": "Science",
        "subjects": ["Computer Science", "Mathematics"],
        "goals": ["Software / IT"],
        "score": (72, 99)
    },

    "BCA – Cyber Security": {
        "stream": "Science",
        "subjects": ["Computer Science", "Mathematics"],
        "goals": ["Cyber Security", "Software / IT"],
        "score": (76, 99)
    },

    "BCA – DevOps": {
        "stream": "Science",
        "subjects": ["Computer Science"],
        "goals": ["Software / IT"],
        "score": (75, 98)
    },

    "BCA – Internet of Things (IoT)": {
        "stream": "Science",
        "subjects": ["Computer Science", "Physics"],
        "goals": ["Software / IT", "AI / Machine Learning"],
        "score": (72, 97)
    },

    "BCA – Blockchain Technology": {
        "stream": "Science",
        "subjects": ["Computer Science", "Mathematics"],
        "goals": ["Software / IT", "Finance / Banking"],
        "score": (75, 98)
    },

    "B.Sc Computer Science": {
        "stream": "Science",
        "subjects": ["Computer Science", "Mathematics"],
        "goals": ["Software / IT", "Teaching / Research"],
        "score": (72, 98)
    },

    "B.Sc Data Science": {
        "stream": "Science",
        "subjects": ["Mathematics", "Computer Science"],
        "goals": ["Data Science", "AI / Machine Learning"],
        "score": (78, 99)
    },

    "B.Sc Information Technology": {
        "stream": "Science",
        "subjects": ["Computer Science"],
        "goals": ["Software / IT"],
        "score": (70, 96)
    },

    "B.Sc Mathematics": {
        "stream": "Science",
        "subjects": ["Mathematics"],
        "goals": ["Teaching / Research", "Data Science"],
        "score": (72, 99)
    },

    "B.Sc Physics": {
        "stream": "Science",
        "subjects": ["Physics", "Mathematics"],
        "goals": ["Teaching / Research", "Government Services"],
        "score": (68, 96)
    },

    "B.Sc Chemistry": {
        "stream": "Science",
        "subjects": ["Chemistry"],
        "goals": ["Teaching / Research", "Government Services"],
        "score": (68, 96)
    },

    "B.Sc Biotechnology": {
        "stream": "Science",
        "subjects": ["Biology", "Chemistry"],
        "goals": ["Teaching / Research"],
        "score": (68, 96)
    },

    "B.Sc Microbiology": {
        "stream": "Science",
        "subjects": ["Biology", "Chemistry"],
        "goals": ["Teaching / Research"],
        "score": (68, 96)
    },

    "B.Sc Electronics": {
        "stream": "Science",
        "subjects": ["Physics", "Mathematics"],
        "goals": ["Software / IT", "Teaching / Research"],
        "score": (70, 97)
    },

    "B.Tech Computer Science": {
        "stream": "Science",
        "subjects": ["Computer Science", "Mathematics"],
        "goals": ["Software / IT", "Cyber Security"],
        "score": (80, 100)
    },

    "B.Tech Artificial Intelligence & Machine Learning": {
        "stream": "Science",
        "subjects": ["Mathematics", "Computer Science"],
        "goals": ["AI / Machine Learning", "Data Science"],
        "score": (82, 100)
    },

    "B.Tech Cyber Security": {
        "stream": "Science",
        "subjects": ["Computer Science", "Mathematics"],
        "goals": ["Cyber Security", "Software / IT"],
        "score": (80, 100)
    },

    "B.Tech Data Science": {
        "stream": "Science",
        "subjects": ["Mathematics", "Computer Science"],
        "goals": ["Data Science", "AI / Machine Learning"],
        "score": (82, 100)
    },


    # =====================================================
    # COMMERCE / BUSINESS
    # =====================================================

    "B.Com": {
        "stream": "Commerce",
        "subjects": ["Accounting", "Business Studies"],
        "goals": ["Finance / Banking", "Business / Management"],
        "score": (60, 94)
    },

    "B.Com – Banking & Finance": {
        "stream": "Commerce",
        "subjects": ["Finance", "Accounting"],
        "goals": ["Finance / Banking"],
        "score": (65, 96)
    },

    "B.Com – Accounting & Finance": {
        "stream": "Commerce",
        "subjects": ["Accounting", "Finance"],
        "goals": ["Finance / Banking"],
        "score": (65, 96)
    },

    "B.Com – Taxation": {
        "stream": "Commerce",
        "subjects": ["Accounting", "Finance"],
        "goals": ["Finance / Banking", "Government Services"],
        "score": (62, 94)
    },

    "B.Com – Business Analytics": {
        "stream": "Commerce",
        "subjects": ["Economics", "Mathematics"],
        "goals": ["Data Science", "Business / Management"],
        "score": (68, 97)
    },

    "BBA": {
        "stream": "Commerce",
        "subjects": ["Business Studies", "Economics"],
        "goals": ["Business / Management"],
        "score": (60, 94)
    },

    "BBA – Marketing": {
        "stream": "Commerce",
        "subjects": ["Marketing", "Business Studies"],
        "goals": ["Marketing", "Business / Management"],
        "score": (60, 94)
    },

    "BBA – Human Resource Management": {
        "stream": "Commerce",
        "subjects": ["Business Studies", "Economics"],
        "goals": ["Business / Management"],
        "score": (60, 93)
    },

    "BBA – Finance": {
        "stream": "Commerce",
        "subjects": ["Finance", "Accounting"],
        "goals": ["Finance / Banking", "Business / Management"],
        "score": (65, 96)
    },

    "BBA – Digital Marketing": {
        "stream": "Commerce",
        "subjects": ["Marketing", "Business Studies"],
        "goals": ["Marketing", "Software / IT"],
        "score": (60, 95)
    },

    "BBA – Business Analytics": {
        "stream": "Commerce",
        "subjects": ["Mathematics", "Economics"],
        "goals": ["Data Science", "Business / Management"],
        "score": (68, 97)
    },

    "BBA – International Business": {
        "stream": "Commerce",
        "subjects": ["Business Studies", "Economics"],
        "goals": ["Business / Management", "Marketing"],
        "score": (60, 94)
    },

    "BBA – Entrepreneurship": {
        "stream": "Commerce",
        "subjects": ["Business Studies", "Marketing"],
        "goals": ["Business / Management", "Marketing"],
        "score": (60, 94)
    },

    "Bachelor of Management Studies (BMS)": {
        "stream": "Commerce",
        "subjects": ["Business Studies", "Economics"],
        "goals": ["Business / Management", "Marketing"],
        "score": (62, 95)
    },

    "Bachelor of Economics": {
        "stream": "Commerce",
        "subjects": ["Economics", "Mathematics"],
        "goals": ["Finance / Banking", "Data Science", "Teaching / Research"],
        "score": (68, 97)
    },


    # =====================================================
    # ARTS / HUMANITIES
    # =====================================================

    "B.A": {
        "stream": "Arts",
        "subjects": ["English", "History", "Political Science"],
        "goals": ["Government Services", "Teaching / Research"],
        "score": (55, 90)
    },

    "B.A – English": {
        "stream": "Arts",
        "subjects": ["English"],
        "goals": ["Teaching / Research", "Journalism / Media"],
        "score": (58, 94)
    },

    "B.A – Bengali": {
        "stream": "Arts",
        "subjects": ["Bengali"],
        "goals": ["Teaching / Research", "Journalism / Media"],
        "score": (55, 92)
    },

    "B.A – History": {
        "stream": "Arts",
        "subjects": ["History"],
        "goals": ["Teaching / Research", "Government Services"],
        "score": (55, 92)
    },

    "B.A – Political Science": {
        "stream": "Arts",
        "subjects": ["Political Science"],
        "goals": ["Government Services", "Teaching / Research"],
        "score": (58, 94)
    },

    "B.A – Sociology": {
        "stream": "Arts",
        "subjects": ["Sociology", "Psychology"],
        "goals": ["Social Work", "Teaching / Research"],
        "score": (55, 91)
    },

    "B.A – Psychology": {
        "stream": "Arts",
        "subjects": ["Psychology", "Sociology"],
        "goals": ["Teaching / Research", "Social Work"],
        "score": (60, 94)
    },

    "B.A – Geography": {
        "stream": "Arts",
        "subjects": ["Geography"],
        "goals": ["Teaching / Research", "Government Services"],
        "score": (55, 92)
    },

    "B.A – Philosophy": {
        "stream": "Arts",
        "subjects": ["Philosophy"],
        "goals": ["Teaching / Research", "Government Services"],
        "score": (55, 90)
    },

    "Bachelor of Journalism & Mass Communication": {
        "stream": "Arts",
        "subjects": ["English", "Bengali"],
        "goals": ["Journalism / Media", "Marketing"],
        "score": (58, 94)
    },

    "Bachelor of Social Work": {
        "stream": "Arts",
        "subjects": ["Sociology", "Psychology"],
        "goals": ["Social Work", "Government Services"],
        "score": (55, 90)
    },

    "Bachelor of Library & Information Science": {
        "stream": "Arts",
        "subjects": ["English", "Geography"],
        "goals": ["Teaching / Research", "Government Services"],
        "score": (55, 91)
    }
}


# =========================================================
# VALIDATE COURSE COUNT
# =========================================================

print("\nTotal courses:", len(COURSE_PROFILES))

if len(COURSE_PROFILES) != 52:
    raise ValueError(
        f"Expected 52 courses, found {len(COURSE_PROFILES)}"
    )


# =========================================================
# DATA GENERATION
# =========================================================

records = []

RECORDS_PER_COURSE = 150


for course, profile in COURSE_PROFILES.items():

    stream = profile["stream"]

    preferred_subjects = profile["subjects"]

    preferred_goals = profile["goals"]

    min_score, max_score = profile["score"]


    for _ in range(RECORDS_PER_COURSE):

        # -------------------------------------------------
        # ACADEMIC SCORES
        # -------------------------------------------------

        tenth_percentage = np.random.uniform(
            min_score,
            max_score
        )

        # 12th marks slightly related to 10th marks
        twelfth_percentage = (
            tenth_percentage
            + np.random.normal(0, 7)
        )

        twelfth_percentage = np.clip(
            twelfth_percentage,
            40,
            100
        )


        # -------------------------------------------------
        # INTEREST
        #
        # Existing frontend uses:
        # Science / Commerce / Arts
        # -------------------------------------------------

        if np.random.random() < 0.98:

            interest = stream

        else:

            other_interests = [
                s for s in
                ["Science", "Commerce", "Arts"]
                if s != stream
            ]

            interest = np.random.choice(
                other_interests
            )


        # -------------------------------------------------
        # PREFERRED SUBJECT
        # -------------------------------------------------

        if np.random.random() < 0.98:

            preferred_subject = np.random.choice(
                preferred_subjects
            )

        else:

            other_subjects = [
                subject
                for subject in STREAM_SUBJECTS[stream]
                if subject not in preferred_subjects
            ]

            if other_subjects:

                preferred_subject = np.random.choice(
                    other_subjects
                )

            else:

                preferred_subject = np.random.choice(
                    STREAM_SUBJECTS[stream]
                )


        # -------------------------------------------------
        # CAREER GOAL
        # -------------------------------------------------

        if np.random.random() < 0.98:

            career_goal = np.random.choice(
                preferred_goals
            )

        else:

            other_goals = [
                goal
                for goal in CAREER_GOALS
                if goal not in preferred_goals
            ]

            career_goal = np.random.choice(
                other_goals
            )


        # -------------------------------------------------
        # ADD RECORD
        # -------------------------------------------------

        records.append({

            "tenth_percentage":
                round(
                    tenth_percentage,
                    2
                ),

            "twelfth_percentage":
                round(
                    twelfth_percentage,
                    2
                ),

            "twelfth_stream":
                stream,

            "interest":
                interest,

            "preferred_subject":
                preferred_subject,

            "career_goal":
                career_goal,

            "recommended_course":
                course
        })


# =========================================================
# CREATE DATAFRAME
# =========================================================

df = pd.DataFrame(records)


# =========================================================
# SHUFFLE DATA
# =========================================================

df = df.sample(
    frac=1,
    random_state=42
).reset_index(
    drop=True
)


# =========================================================
# SAVE DATASET
# =========================================================

df.to_csv(
    "dataset.csv",
    index=False
)


# =========================================================
# INFORMATION
# =========================================================

print("\n========================================")
print("DATASET GENERATED SUCCESSFULLY")
print("========================================")

print(
    "Total records:",
    len(df)
)

print(
    "Total features:",
    len(df.columns)
)

print("\nColumns:")

for column in df.columns:
    print(
        " -",
        column
    )


# =========================================================
# COURSE DISTRIBUTION
# =========================================================

print("\nCourse distribution:")

print(
    df["recommended_course"]
    .value_counts()
    .sort_index()
)


# =========================================================
# FIRST 5 RECORDS
# =========================================================

print("\nFirst 5 records:")

print(
    df.head().to_string(
        index=False
    )
)


# =========================================================
# SAVE CONFIRMATION
# =========================================================

print("\n========================================")
print("dataset.csv SAVED SUCCESSFULLY")
print("========================================")