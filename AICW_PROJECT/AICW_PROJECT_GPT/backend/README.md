# Backend (Flask)

```bash
pip install -r requirements.txt
cp .env.example .env
export FLASK_APP=app.py
flask run --port 8000
```

Endpoints:
- `/chat` : forward messages to OpenAI GPT
- `/continue/claude` : send conversation to Claude-3
