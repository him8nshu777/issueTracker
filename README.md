Working Video:
https://github.com/user-attachments/assets/4b87143f-9b35-467e-80a8-78baba8efaa3

1. Clone the Repository

How to Run Backend
1. Navigate to backend folder
cd backend




2. Create Virtual Environment
python -m venv venv

3. Activate Virtual Environment
Windows:
venv\Scripts\activate
Mac/Linux:
source venv/bin/activate

5. Install Dependencies
pip install -r requirements.txt

6. Configure PostgreSQL Database

Ensure PostgreSQL is installed and running.

Update your database connection string in .env file in "app" root means backend/app/.env
and write below line:
DATABASE_URL=postgresql://username:password@localhost:5432/issue_tracker

6. Run Backend Server
fastapi dev app/main.py

Backend will start at:

http://127.0.0.1:8000

Swagger API Docs:

http://127.0.0.1:8000/docs
create project and issues.


How to Run Frontend
1. Open a new terminal and navigate to frontend
cd frontend

3. Install Dependencies
npm install

4. Start React App
npm start

Frontend will run at:

http://localhost:3000
