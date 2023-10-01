def validarQualidade(mp10, mp25, o3, co, no2, so2):
    boa = 'boa'
    moderada = 'moderada'
    ruim = 'ruim'
    muitoRuim = 'muitoRuim'
    pessima = 'pessima'

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