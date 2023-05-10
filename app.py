from flask import Flask, render_template, request
import sqlite3

# app = Flask(__name__)
import os

# Get the absolute path to the templates directory
templates_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), 'templates'))

# Set the template_folder parameter when creating the Flask app instance
app = Flask(__name__, template_folder=templates_dir)


# Connect to the SQLite3 database
conn = sqlite3.connect('database.db')
print("Opened database successfully")



# Create a table to store the input data if it doesn't exist
conn.execute('CREATE TABLE IF NOT EXISTS input_data (id INTEGER PRIMARY KEY AUTOINCREMENT, First_Name TEXT,Last_Name TEXT, email TEXT, Phone_Number TEXT)')
print("Table created successfully")


@app.route('/hello')
def index():
    return render_template('index.html')


@app.route('/submit-form', methods=['POST'])
def submit_form():
    first_name = request.form['First_Name']
    last_name = request.form['Last_Name']
    email = request.form['email']
    phone_number = request.form['Phone_Number']

    # Save the data to the SQLite3 database
    conn.execute("INSERT INTO input_data (First_Name, Last_Name, email, Phone_Number) VALUES (?, ?, ?, ?)", (first_name, last_name, email, phone_number))
    conn.commit()

    return 'Data submitted successfully'


# Close the database connection
conn.close()


if __name__ == '__main__':
    app.run(debug=True)
