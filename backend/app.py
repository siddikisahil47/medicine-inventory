from flask import Flask, request, jsonify
from flask_cors import CORS
from supabase import create_client, Client
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["https://your-frontend-domain.com", "http://localhost:3000"]}})

# Initialize Supabase client with service role key
supabase: Client = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_SERVICE_ROLE_KEY")
)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Query Supabase for the user
    response = supabase.table('user_details').select('*').eq('username', username).execute()
    
    if response.data and len(response.data) > 0:
        user = response.data[0]
        if user['password'] == password:  # In production, use proper password hashing
            return jsonify({"message": "Login successful"}), 200
    
    return jsonify({"message": "Invalid username or password"}), 401

@app.route('/api/medicines', methods=['GET'])
def get_medicines():
    response = supabase.table('medicine_details').select('*').execute()
    return jsonify(response.data), 200

@app.route('/api/medicines', methods=['POST'])
def add_medicine():
    medicine = request.json
    required_fields = ['medicineName', 'currentStock', 'medicineNeeded', 'expiredMedicine', 'medicineUsed', 'remainingStock']
    
    for field in required_fields:
        if field not in medicine:
            return jsonify({"error": f"Missing required field: {field}"}), 400
        
        # Convert string values to integers for numeric fields
        if field != 'medicineName':
            try:
                medicine[field] = int(medicine[field])
            except ValueError:
                return jsonify({"error": f"Invalid value for {field}. Must be a number."}), 400

    try:
        # Check if a medicine with the same name already exists
        existing_medicine = supabase.table('medicine_details').select('*').eq('medicineName', medicine['medicineName']).execute()
        
        if existing_medicine.data:
            # Update the existing medicine
            updated_medicine = {**existing_medicine.data[0], **medicine}
            response = supabase.table('medicine_details').update(updated_medicine).eq('id', existing_medicine.data[0]['id']).execute()
            return jsonify({"message": "Medicine updated successfully", "medicine": response.data[0]}), 200
        else:
            # Insert a new medicine
            response = supabase.table('medicine_details').insert(medicine).execute()
            return jsonify({"message": "Medicine added successfully", "medicine": response.data[0]}), 201
    except Exception as e:
        print(f"Detailed error: {str(e)}")
        return jsonify({"error": f"An error occurred while adding/updating the medicine: {str(e)}"}), 500

@app.route('/api/overview', methods=['GET'])
def get_overview():
    medicines = supabase.table('medicine_details').select('*').execute().data
    total_stock = sum(int(med.get('currentStock', 0)) for med in medicines)
    expired_medicines = sum(int(med.get('expiredMedicine', 0)) for med in medicines)
    reorder_needed = sum(1 for med in medicines if int(med.get('medicineNeeded', 0)) > int(med.get('currentStock', 0)))
    
    overview = {
        "totalStock": total_stock,
        "expiredMedicines": expired_medicines,
        "reorderNeeded": reorder_needed
    }
    return jsonify(overview), 200

app = app