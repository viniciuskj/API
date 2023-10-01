import oracledb

connection = oracledb.connect(
    user="bd240223153",
    password='Ffxtj6',
    dsn="172.16.12.14/xe")

print("Conectado com sucesso!")
cursor = connection.cursor()

# Criando tabela
try:
    cursor.execute("""
    create table amostras (
        id_amostra number generated always as identity,
        mp10 number(6,2),
        mp25 number(6,2),
        o3 number(6,2),
        co number(6,2),
        no2 number(6,2),
        so2 number(6,2),
        primary key (id_amostra))""")
except:
    print('Erro na criação da tabela!')


def insertData(mp10,mp25,o3,co,no2,so2):
    sql = "INSERT INTO AMOSTRAS (MP10,MP25,O3,CO,NO2,SO2) VALUES (:0,:1,:2,:3,:4,:5)"
    dados = [mp10,mp25,o3,co,no2,so2]
    try: 
        print(f"{sql} {dados}")
        cursor.execute(sql, dados)
        cursor.execute("COMMIT")
        print("SUCESSO NA INSERÇÃO!")
    except Exception as error:
        print(f"{error}")   
    
def mediaAmostra():
    sql = "select round(avg(mp10),2),round(avg(mp25),2),round(avg(o3),2),round(avg(co),2),round(avg(no2),2),round(avg(so2),2) from amostras"
    try:
        for rows in cursor.execute(sql):
            print(rows)
    except Exception as error:
        print("ERRO NAS MÉDIAS!")
        print(error)
    return rows

def registrosAmostra():
    sql = "select * from amostras order by id_amostra"
    result = []
    try:
        for rows in cursor.execute(sql):
            result.append(rows)
    except Exception as error:
        print("ERRO NAS MÉDIAS!")
        print(error)
    return result

def atualizarAmostra(mp10,mp25,o3,co,no2,so2,idAmostra):
    sql = f"UPDATE AMOSTRAS SET MP10={mp10},MP25={mp25},O3={o3},CO={co},NO2={no2},SO2={so2} WHERE ID_AMOSTRA= {idAmostra}"
    try:
        print(f"{sql}")
        cursor.execute(sql)
        cursor.execute("COMMIT")
        print("SUCESSO NA ALTERAÇÃO")
        return 'SUCESSO'
    except Exception as error:
        print(f"{error}")
        return 
    
def deletarAmostra(idAmostra):
    sql = f"DELETE FROM AMOSTRAS WHERE ID_AMOSTRA = {idAmostra}"
    try:
        print(f"{sql}")
        cursor.execute(sql)
        cursor.execute("COMMIT")
        print("AMOSTRA DELETADA COM SUCESSO!")
        return 'SUCESSO'
    except Exception as error:
        print(f"{error}")
        return 'ERRO'