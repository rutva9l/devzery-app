import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask, request
from flask_cors import CORS

load_dotenv()

CREATE_TABLE = (
    "CREATE TABLE IF NOT EXISTS test_cases (id SERIAL PRIMARY KEY, case_name TEXT, estimated_time INT, module TEXT, priority TEXT, status TEXT);"
)

INSERT_DATA = ("INSERT INTO test_cases (case_name, estimated_time, module, priority) VALUES (%s,%s,%s,%s);")

GET_DATA = ("SELECT * FROM test_cases;")

UPDATE_STATUS = ("UPDATE test_cases SET status = %s WHERE id = %s")

app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:5000", "http://localhost:3000"])
url= os.getenv("DATABASE_URL")
connection = psycopg2.connect(url)

@app.get('/')
def home():
    return "home"

@app.post('/api/test-case')
def postCase():
    data = request.get_json()
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(CREATE_TABLE)
            cursor.execute(INSERT_DATA, (data["case_name"], data["estimated_time"], data["module"], data["priority"]))
    return {"message": "posted successfully"}, 201

@app.get('/api/test-case')
def getCase():
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(GET_DATA)
            data = cursor.fetchall()
            output = []
            data.sort()
            for item in data:
                output_data = {"case_id": item[0], "case_name": item[1], "estimated_time": item[2], "module": item[3], "priority": item[4], "status": item[5]}
                output.append(output_data)
    return {"data": output}, 200

@app.put('/api/test-case/<int:id>')
def updateStatus(id):
    data = request.get_json()
    with connection:
        with connection.cursor() as cursor:
            cursor.execute(UPDATE_STATUS, (data["status"], id))
    return {"id": id, "status": data["status"]},201