import base64
import CORScanner as CORScanner
from flask import Flask, jsonify, request, send_file
from pymongo import MongoClient
from flask_cors import CORS
import cryptography
import gridfs


app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'application/json'



def db_conn(collection_name):
    uri = "mongodb+srv://Vinay_N:Vinay_1998@communityconnect.ntsofil.mongodb.net/"
    client = MongoClient(uri)
    db = client["Community_Connect"]  # Replace with your database name
    users_collection = db[collection_name]
    return users_collection


def getdata(coll_name):
    mycoll = db_conn(coll_name)
    response = list()
    for x in mycoll.find({}, {"_id": 0}):
        response.append(x)
    return response


def updatedata(coll_name, name):
    mycoll = db_conn(coll_name)
    mycoll.update_one({'name': name}, {"$inc": {'volunteer_registered': 1}})


def grant_approval(coll_name, name, event):
    mycoll = db_conn(coll_name)
    mycoll.update_one({'name': name, 'eve_name': event}, {"$set": {'status': 'Approved'}})

# def update_user_data(name, key, input):
    
@app.route('/', methods=['GET'])
def home():
    return "<h1>Welcome to community connect API centre</h1>"
@app.route('/addUser/<username>/<password>/<mail>/<address>/<phone>/<user_type>/<area_of_interest>/<age>/<dob>/<gender>', methods=['GET', 'POST'])
def add_user(username=None, password=None, mail=None, address=None, phone=None, user_type=None, area_of_interest=None, age=None,dob=None, gender=None):
    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    user = {
        'username': username,
        'password': password,
        'email': mail,
        'address': address,
        'phone': phone,
        'volunteer_type': user_type,
        'area_of_interest': area_of_interest,
        'age': age,
        'gender': gender,
        'date_of_birth':dob
    }

    result = db_conn('UserData').insert_one(user)
    response = jsonify([{'message': 'Account is created successfully', 'id': str(result.inserted_id)}])
    response.headers['Content-Type'] = 'application/json'
    return response, 200



@app.route('/getUsers/<coll_name>', methods=['GET'])
def retrieveData(coll_name):
    result = getdata(coll_name)
    return result


@app.route("/add_event/<eventname>/<venue>/<date>/<time>/<purpose>/<maximum_strength>/<desc>", methods=['GET', 'POST'])
def add_event(eventname, venue, date, time, purpose,maximum_strength,desc):
    try:
        event = {'name': eventname, 'desc':desc, 'venue': venue, 'date': date, 'timing': time, 'purpose': purpose, 'max_strength': int(maximum_strength),
                 'volunteer_registered': 0}
        db_conn('CreateEvents').insert_one(event)
        return jsonify([{"message": "Event added successfully!"}]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route('/to_register/<name>/<eve_name>/<venue>/<date>/<time>/<purpose>/<desc>', methods=['GET', 'POST'])
def register_an_event(name, eve_name, venue, date, purpose, time,desc):
    check_registration = getdata(coll_name='RegistedEvent')
    for a in check_registration:
        if a['eve_name'] == eve_name and a['name'] == name:
            return jsonify([{'sorry': f'{name} has already registered for {eve_name}'}])

    x = getdata(coll_name='CreateEvents')
    for y in x:
        if y['name'] == eve_name:
            if y['max_strength'] != y['volunteer_registered']:
                print(updatedata('CreateEvents', eve_name))
                r_event = {'name': name, 'eve_name': eve_name, 'venue': venue, 'date': date, 'time': time,
                           'purpose': purpose,
                           'desc':desc,
                           'status': 'Pending Approval'}
                db_conn('RegistedEvent').insert_one(r_event)
                return jsonify([{'message': f'Congratulations {name} !,You have registered for {eve_name}.'}]), 200
            else:
                return jsonify([{'message': 'All slots havve been filled'}])


@app.route('/approval/<name>/<event>', methods=['GET', 'POST'])
def approval(name,event):
    result = getdata('RegistedEvent')
    for y in result:
        if y['name'] == name and y['eve_name'] == event:
            print(grant_approval('RegistedEvent', name, event))
            return jsonify([{'message': f'Request from {name} is Approved!'}])


@app.route('/RegisteredEvents/<name>', methods=['GET'])
def registered_events(name):
    reg_events = getdata(coll_name='RegistedEvent')
    reg_list = list()
    for a in reg_events:
        if a['name'] == name:
            reg_list.append(a)
    return reg_list

@app.route('/download_invitation/<name>', methods=['GET'])
def download_invitation(name):
    download_invite = getdata(coll_name='RegistedEvent')
    invitation_list = list()
    for a in download_invite:
        if a['name'] == name and a['status'] == 'Approved':
            invitation_list.append(a)
    return invitation_list

@app.route('/update_user_data/<name>/<key>/<input>', methods=['GET'])
def update_user_data(name, key, input):
    user_data = getdata('UserData')
    for x in user_data:
        if name == x['username']:
            db_conn('UserData').update_one({'username':name}, {'$set': {key : input}})
        return jsonify([{'message':'Changes are updated'}])
    
def geteventmember():
    reg_data = getdata('RegistedEvent')
    result = {}
    for x in reg_data:
        for key,value in {x['eve_name']: x['name']}.items():
            if key in result:
               result[key].append(value)
            else:
                result[key] = [value]
    return result

uri = "mongodb+srv://Vinay_N:Vinay_1998@communityconnect.ntsofil.mongodb.net/"
client = MongoClient(uri)
db = client["Images"]
fs = gridfs.GridFS(db)

# File Upload Route
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected for uploading"}), 400

    # Store the file in MongoDB GridFS
    file_id = fs.put(file, filename=file.filename)
    
    return jsonify({"message": "File uploaded successfully", "file_id": str(file_id)}), 201


# Retrieve Images Route
@app.route('/images', methods=['GET'])
def get_images():
    images = []
    
    # Retrieve all files stored in GridFS
    for grid_out in fs.find():
        # Read binary data from GridFS
        file_data = grid_out.read()
        
        # Convert binary image data to base64 string
        image_data = base64.b64encode(file_data).decode('utf-8')
        
        # Append image details to list
        images.append({
            'name': grid_out.filename,
            'image': image_data
        })

    # Send the images as a JSON response
    return jsonify(images), 200 
@app.route('/eventdetails', methods=['GET'])
def get_combined_event_user_details():
    list_of_users = getdata('RegistedEvent')
    event_dict = {}
    for user in list_of_users:
        event_name = user.get('eve_name', 'Unknown Event')
        user_name = user.get('name', 'Unknown User')
        if event_name not in event_dict:
            event_dict[event_name] = {}
        event_dict[event_name][user_name] = fetch_user_details_filtered(user_name)
    result = [{event_name: user_details} for event_name, user_details in event_dict.items()]
    return result

def fetch_user_details_filtered(name):
    user_data = []
    list_of_users = getdata('UserData')
    for user in list_of_users:
        if user['username'] == name:
            user_details = {key: value for key, value in user.items() if key not in ['password', 'username']}
            user_data.append(user_details)
    return user_data



# Example call to the function

        
            

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5000)
    
    