from flask import Flask, jsonify, request, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Simple in-memory storage for tasks
tasks = []

# Home route to serve HTML
@app.route('/')
def home():
    return render_template('index.html')

# API route to get all tasks
@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

# API route to add a task
@app.route('/api/tasks', methods=['POST'])
def add_task():
    data = request.json
    task = {'id': len(tasks) + 1, 'title': data['title']}
    tasks.append(task)
    return jsonify(task)

# API route to delete a task
@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    global tasks
    tasks = [task for task in tasks if task['id'] != task_id]
    return jsonify({'result': 'success'})
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)  # Use host='0.0.0.0' and port=5001    

#if __name__ == '__main__':
 #   app.run(debug=True)
