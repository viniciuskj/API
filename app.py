from flask import Flask
from flask import request
from flask_cors import CORS
import python.quality as quality
import python.database as database

app = Flask(__name__)
CORS(app)

@app.route("/amostra", methods=['POST'])
def function():
    mp10 = request.json['mp10']
    mp25 = request.json['mp25']
    o3 = request.json['o3']
    co = request.json['co']
    no2 = request.json['no2']
    so2 = request.json['so2']
    result = quality.validarQualidade(mp10, mp25, o3, co, no2, so2)
    database.insertData(mp10,mp25,o3,co,no2,so2)
    return result

@app.route("/media", methods=['GET'])
def function2():
    media = database.mediaAmostra()
    if None in media:
        resultado = 'Não há valores suficientes registrados no banco!'
        return 'SEM VALORES'
    else: 
        resultado = quality.validarQualidade(media[0],media[1],media[2],media[3],media[4],media[5])
        vect = []
        for value in media:
            vect.append(value)
        vect.append(resultado)
    return vect

@app.route("/registros", methods=['GET'])
def function4():
    resultado = database.registrosAmostra()
    print(resultado)
    return resultado

@app.route("/alterar", methods=['PUT'])
def function5():
    mp10 = request.json['mp10']
    mp25 = request.json['mp25']
    o3 = request.json['o3']
    co = request.json['co']
    no2 = request.json['no2']
    so2 = request.json['so2']
    idAmostra = request.json['id']
    result = database.atualizarAmostra(mp10,mp25,o3,co,no2,so2,idAmostra)
    return result

@app.route('/deletar/<idAmostra>', methods=['DELETE'])
def function6(idAmostra):
    result = database.deletarAmostra(idAmostra)
    return result
