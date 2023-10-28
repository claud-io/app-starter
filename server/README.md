python3 -m venv .venv
source venv/bin/activate
pip install requirements.txt
uvicorn main:app --reload
