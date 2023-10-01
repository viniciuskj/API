from flask import Flask, request, jsonify
from flask_cors import CORS
import oracledb

app = Flask(__name__)
CORS(app)

conn = oracledb.connect(
    user="bd240223155",
    password="Tggvx9",
    dsn="172.16.12.14/xe"
)
cursor = conn.cursor()


def quality(mp10, mp25, o3, co, no2, so2):
    boa = 'Boa'
    moderada = 'Moderada'
    ruim = 'Ruim'
    muitoRuim = 'Muito Ruim'
    pessima = 'Péssima'

    if (mp10 > 250 or mp25 > 125 or o3 > 200 or co > 15 or no2 > 1130 or so2 > 800):
        return pessima
    elif (mp10 > 150 or mp25 > 75 or o3 > 160 or co > 13 or no2 > 320 or so2 > 365):
        return muitoRuim
    elif (mp10 > 100 or mp25 > 50 or o3 > 130 or co > 11 or no2 > 240 or so2 > 40):
        return ruim
    elif (mp10 > 50 or mp25 > 25 or o3 > 100 or co > 9 or no2 > 200 or so2 > 20):
        return moderada
    else:
        return boa


@app.route('/samples', methods=['GET'])
def get_all_samples():
    cursor.execute("SELECT * FROM samples")
    rows = cursor.fetchall()

    samples = []
    for row in rows:
        sample = {
            "id": row[0],
            "mp10": row[1],
            "mp25": row[2],
            "o2": row[3],
            "co": row[4],
            "no2": row[5],
            "so2": row[6],
        }
        samples.append(sample)

    return jsonify({"samples": samples})


@app.route('/samples/<int:sample_id>', methods=['GET'])
def get_sample(sample_id):
    cursor.execute("SELECT * FROM samples WHERE id=:id", id=sample_id)
    row = cursor.fetchone()

    if row:
        sample = {
            "id": row[0],
            "mp10": row[1],
            "mp25": row[2],
            "o2": row[3],
            "co": row[4],
            "no2": row[5],
            "so2": row[6],
        }
        return jsonify(sample)
    else:
        return jsonify({"error": "Amostra não encontrada"})


@app.route('/samples', methods=['POST'])
def create_sample():
    data = request.get_json()
    mp10 = data.get('mp10')
    mp25 = data.get('mp25')
    o2 = data.get('o2')
    co = data.get('co')
    no2 = data.get('no2')
    so2 = data.get('so2')

    if any(value == "" for value in [mp10, mp25, o2, co, no2, so2]):
        return jsonify({"error": "Digite todas as amostras"}), 400

    cursor.execute("INSERT INTO samples (mp10, mp25, o2, co, no2, so2) VALUES (:mp10, :mp25, :o2, :co, :no2, :so2)",
                   mp10=mp10, mp25=mp25, o2=o2, co=co, no2=no2, so2=so2)
    conn.commit()

    sample_id = cursor.lastrowid
    sample = {
        "id": sample_id,
        "mp10": mp10,
        "mp25": mp25,
        "o2": o2,
        "co": co,
        "no2": no2,
        "so2": so2,
    }

    return jsonify(sample)


@app.route('/samples/<int:sample_id>', methods=['PUT'])
def update_sample(sample_id):
    data = request.get_json()
    mp10 = data.get('mp10')
    mp25 = data.get('mp25')
    o2 = data.get('o2')
    co = data.get('co')
    no2 = data.get('no2')
    so2 = data.get('so2')

    if any(value == "" for value in [mp10, mp25, o2, co, no2, so2]):
        return jsonify({"error": "Digite todas as amostras"}), 400

    cursor.execute("UPDATE samples SET mp10=:mp10, mp25=:mp25, o2=:o2, co=:co, no2=:no2, so2=:so2 WHERE id=:id",
                   mp10=mp10, mp25=mp25, o2=o2, co=co, no2=no2, so2=so2, id=sample_id)
    conn.commit()

    sample = {
        "id": sample_id,
        "mp10": mp10,
        "mp25": mp25,
        "o2": o2,
        "co": co,
        "no2": no2,
        "so2": so2,
    }

    return jsonify(sample)


@app.route('/samples/<int:sample_id>', methods=['DELETE'])
def delete_sample(sample_id):
    cursor.execute("DELETE FROM samples WHERE id=:id", id=sample_id)
    conn.commit()

    return jsonify({"message": "Amostra removida"})


@app.route('/samples/average', methods=['GET'])
def get_average_samples():
    cursor.execute(
        "SELECT AVG(mp10), AVG(mp25), AVG(o2), AVG(co), AVG(no2), AVG(so2) FROM samples")
    result = cursor.fetchall()

    mp10, mp25, o2, co, no2, so2 = result[0]

    air_quality = quality(mp10, mp25, o2, co, no2, so2)

    averages = {
        "mp10": mp10,
        "mp25": mp25,
        "o2": o2,
        "co": co,
        "no2": no2,
        "so2": so2,
        "quality": air_quality,
    }

    return jsonify(averages)


if __name__ == '__main__':
    app.run(debug=True)
