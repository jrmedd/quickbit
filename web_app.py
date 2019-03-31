from flask import Flask, request, jsonify

from flask_cors import CORS

from pymongo import MongoClient

import datetime

import os

MONGO_URL = os.environ.get('MONGO_URL')

CLIENT = MongoClient(MONGO_URL)
DB = CLIENT['hazukiscores']
SCORES = DB['scores']
KEYS = DB['keys']

APP = Flask(__name__)
CORS(APP)

APP.secret_key = os.environ.get('SECRET_KEY')

@APP.route('/entry', methods=["POST"])
def entry():
    key_check = KEYS.find_one({'key':request.headers.get('X-Api-Key')})
    if key_check and key_check.get('valid'):
        score = request.get_json().get('score')
        SCORES.insert_one({'timestamp':datetime.datetime.now(), 'score':score})
        return jsonify(entry = {'success':True})
    else:
        return jsonify(entry = {'success':False})

@APP.route('/high_scores')
def high_scores():
    high_scores = list(SCORES.find({},{'_id':0}).sort('score', -1).limit(3))
    return jsonify(high_scores=high_scores)


@APP.route('/all_scores')
def all_scores():
    all_scores = list(SCORES.find({}, {'_id': 0}).sort('datetime', -1))
    return jsonify(all_scores=all_scores)

if __name__ == '__main__':
    APP.run(host="0.0.0.0", debug=True)
