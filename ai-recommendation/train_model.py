import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report


# =========================================================
# 1. LOAD DATASET
# =========================================================

df = pd.read_csv("dataset.csv")

print("\nDataset loaded successfully!")
print("Dataset shape:", df.shape)

print("\nColumns:")
print(df.columns.tolist())


# =========================================================
# 2. INPUT FEATURES
# =========================================================

X = df[
    [
        "tenth_percentage",
        "twelfth_percentage",
        "twelfth_stream",
        "interest",
        "preferred_subject",
        "career_goal"
    ]
]


# =========================================================
# 3. TARGET
# =========================================================

y = df["recommended_course"]


# =========================================================
# 4. NUMERICAL FEATURES
# =========================================================

numeric_features = [
    "tenth_percentage",
    "twelfth_percentage"
]


# =========================================================
# 5. CATEGORICAL FEATURES
# =========================================================

categorical_features = [
    "twelfth_stream",
    "interest",
    "preferred_subject",
    "career_goal"
]


# =========================================================
# 6. PREPROCESSING
# =========================================================

preprocessor = ColumnTransformer(
    transformers=[
        (
            "num",
            "passthrough",
            numeric_features
        ),
        (
            "cat",
            OneHotEncoder(
                handle_unknown="ignore"
            ),
            categorical_features
        )
    ]
)


# =========================================================
# 7. RANDOM FOREST MODEL
# =========================================================

model = RandomForestClassifier(
    n_estimators=300,
    random_state=42,
    class_weight="balanced",
    n_jobs=-1
)


# =========================================================
# 8. CREATE PIPELINE
# =========================================================

pipeline = Pipeline(
    steps=[
        (
            "preprocessor",
            preprocessor
        ),
        (
            "model",
            model
        )
    ]
)


# =========================================================
# 9. TRAIN / TEST SPLIT
# =========================================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)


print("\nTraining samples:", len(X_train))
print("Testing samples:", len(X_test))


# =========================================================
# 10. TRAIN MODEL
# =========================================================

print("\nTraining Random Forest model...")

pipeline.fit(
    X_train,
    y_train
)

print("Model training completed successfully!")


# =========================================================
# 11. MODEL EVALUATION
# =========================================================

y_pred = pipeline.predict(X_test)

accuracy = accuracy_score(
    y_test,
    y_pred
)

print("\n========================================")
print("MODEL ACCURACY")
print("========================================")

print(
    f"Accuracy: {accuracy * 100:.2f}%"
)


# =========================================================
# 12. CLASSIFICATION REPORT
# =========================================================

print("\nClassification Report:")
print(
    classification_report(
        y_test,
        y_pred,
        zero_division=0
    )
)


# =========================================================
# 13. SAVE MODEL
# =========================================================

joblib.dump(
    pipeline,
    "model.pkl"
)

print("\n========================================")
print("MODEL SAVED SUCCESSFULLY")
print("========================================")

print("File: model.pkl")
print("Features used:")
print(
    [
        "tenth_percentage",
        "twelfth_percentage",
        "twelfth_stream",
        "interest",
        "preferred_subject",
        "career_goal"
    ]
)

print("\nAI model is ready!")