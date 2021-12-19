from flask import Flask, request, jsonify
from flask_cors import CORS
from sql_connection import get_sql_connection
import json

import products_dao
import orders_dao
import uom_dao

connection = get_sql_connection()

app = Flask(__name__)
CORS(app)

@app.route('/uom', methods=['GET'])
def get_uom():
    response = uom_dao.get_uoms(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/products")
def get_products():
    products = products_dao.get_all_products(connection)
    response = jsonify(products)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/product', methods=['POST'])
def insert_product():
    request_payload = request.json
    product_id = products_dao.insert_new_product(connection, request_payload)
    response = jsonify({
        'product_id': product_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/orders', methods=['GET'])
def get_all_orders():
    response = orders_dao.get_all_orders(connection)
    response = jsonify(response)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/order', methods=['POST'])
def insert_order():
    request_payload = request.json
    order_id = orders_dao.insert_order(connection, request_payload)
    response = jsonify({
        'order_id': order_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route('/delete', methods=['POST'])
def delete_product():
    return_id = products_dao.delete_product(connection, request.json["product_id"])
    response = jsonify({
        'product_id': return_id
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return return_id

if __name__ == "__main__":
    print("Starting Python Flask server for Grocery Store Management System")
    app.run(port=5000)
