function funcao() {
    let url = `http://127.0.0.1:5000/amostra`

    let mp10 = document.getElementById('mp10').value
    let mp25 = document.getElementById('mp25').value
    let o3 = document.getElementById('o3').value
    let co = document.getElementById('co').value
    let no2 = document.getElementById('no2').value
    let so2 = document.getElementById('so2').value
    
    if (!mp10 || !mp25 || !o3 || !co || !no2 || !so2) {
        alert("VALORES INCOMPLETOS!")
        return false
    }
    
    let queryObj = { mp10: parseFloat(mp10), mp25: parseFloat(mp25), o3: parseFloat(o3), co: parseFloat(co), no2: parseFloat(no2), so2: parseFloat(so2)}
    
    axios.post(url, queryObj)
    .then(response => {
        boxQuality(response.data)
        document.getElementById('carouselExampleIndicators').setAttribute('class', 'hidden')
        document.getElementById('amostra-button').setAttribute('class','hidden')
    })
    .catch(error =>{
        alert(error.response)
    })
}

function media(){
    let url = `http://127.0.0.1:5000/media`

    axios.get(url)
    .then(response => {
        if (response.data == 'SEM VALORES') {
            alert('Não há amostras registradas!')
            return
        }
        boxQuality(response.data[6])
        document.getElementById('resultado-media').innerHTML = `MP10: ` + response.data[0] + `<br>MP2,5: ` + response.data[1] + '<br>O3: ' + response.data[2] + `
        <br>CO: ` + response.data[3] + `<br>NO2: ` + response.data[4] + `<br>SO2: ` + response.data[5]
        document.getElementById('div-button').setAttribute('class', 'hidden')
        document.getElementById('media-button').setAttribute('class','hidden')
    })
    .catch(error => {
        alert(error.response)
        console.log(error.response)
    })
}

function gerarRegistros() {
    let url = `http://127.0.0.1:5000/registros`

    axios.get(url)
    .then(response => {
        console.log('Sucesso')
        gerarTabela(response.data)
    })
    .catch(error => {
        alert(error.response)
        console.log(error.response)
        console.log('erro aqui')
    })
}

function alterarAmostra() {
    let url = `http://127.0.0.1:5000/alterar`
    let mp10New = document.getElementById('valor-mp10').value
    let mp25New = document.getElementById('valor-mp25').value
    let o3New = document.getElementById('valor-o3').value
    let coNew = document.getElementById('valor-co').value
    let no2New = document.getElementById('valor-no2').value
    let so2New = document.getElementById('valor-so2').value
    let idAmostra = document.getElementById('select-amostras').options[document.getElementById('select-amostras').selectedIndex].value

    if (idAmostra == 'null') {
        alert("SELECIONE UM ID!")
        return false
    }
    if (!mp10New || !mp25New || !o3New || !coNew || !no2New || !so2New) {
        alert("VALORES INCOMPLETOS!")
        return false
    }

    let valoresObj = { mp10: parseFloat(mp10New), mp25: parseFloat(mp25New), o3: parseFloat(o3New), co: parseFloat(coNew), no2: parseFloat(no2New), so2: parseFloat(so2New), id: parseInt(idAmostra)}

    axios.put(url, valoresObj)
    .then(response => {
        console.log('SUCESSO NA ALTERAÇÃO!')
        alert('Amostra atualizada com sucesso!')
        window.location.reload(true);
    })
    .catch(err => {
        alert('Erro na alteração!')
        console.log(err.reponse)
    })
}

function deletarAmostra() {
    let idAmostra = document.getElementById('select-amostras').options[document.getElementById('select-amostras').selectedIndex].value
    
    if (idAmostra == 'null') {
        alert("SELECIONE UM ID!")
        return false
    }

    let url = `http://127.0.0.1:5000/deletar/${idAmostra}`

    axios.delete(url)
    .then(response => {
        alert(`Amostra ${idAmostra} deletada com sucesso!`)
        window.location.reload(true)
    })
    .catch(error => {
        alert("Erro ao deletar amostra!")
        console.log(error.response)
    })
}

function boxQuality(quality) {
    let container = document.getElementById('flexbox-quality')
    let paragraph = document.getElementById('p-quality')
    let title = document.getElementById('p-quality-title')
    let img = document.getElementById('img-quality')
    switch(quality){
        case 'boa':
            container.setAttribute('class', 'flexbox-quality-boa')
            img.setAttribute('src', '../imgs/boa.png')
            title.innerHTML = 'BOA'
            title.style.color = 'greenyellow'
            paragraph.innerHTML = 'Sem riscos à saúde.'
            break
        case 'moderada':
            container.setAttribute('class', 'flexbox-quality-moderada')
            img.setAttribute('src', '../imgs/moderada.png')
            title.innerHTML = 'MODERADA'
            title.style.color = 'yellow'
            paragraph.innerHTML = 'Pessoas de grupos sensíveis (crianças, idosos e pessoas com doenças respiratórias e cardíacas) podem apresentar sintomas como tosse seca e cansaço. A população, em geral, não é afetada.'
            break
        case 'ruim':
            container.setAttribute('class', 'flexbox-quality-ruim')
            img.setAttribute('src', '../imgs/ruim.png')
            title.innerHTML = 'RUIM'
            title.style.color = 'tomato'
            paragraph.innerHTML = 'Toda a população pode apresentar sintomas como tosse seca, cansaço, ardos nos olhos, nariz e garganta. Pessoas de grupos sensíveis (crianças, idosos e pessoas com doenças respiratórias e cardíacas) podem apresentar efeitos mais sérios na saúde.'
            break
        case 'muitoRuim':
            container.setAttribute('class', 'flexbox-quality-muitoRuim')
            img.setAttribute('src', '../imgs/muitoruim.png')
            title.innerHTML = 'MUITO RUIM'
            title.style.color = 'red'
            paragraph.innerHTML = 'Toda a população pode apresentar agravamento dos sintomas como tosse seca, cansaço, ardor nos olhos, nariz e garganta e ainda falta de ar e respiração ofegante. Efeitos ainda mais graves à saúde de grupos sensíveis (crianças, idosos e pessoas com doenças respiratórias e cardíacas).'
            break
        case 'pessima':
            container.setAttribute('class', 'flexbox-quality-pessima')
            img.setAttribute('src', '../imgs/pessima.png')
            title.innerHTML = 'PÉSSIMA'
            title.style.color = 'black'
            paragraph.innerHTML = 'Toda a população pode apresentar sérios riscos de manifestações de doenças respiratórias e cardiovasculares. Aumento de mortes prematuras em pessoas de grupos sensíveis.'
            break
        default :
            container.setAttribute('class', 'flexbox-quality-ruim')
            title.innerHTML = 'FALHA'
            paragraph.innerHTML = 'Falha na classificação do ar!'
            console.log('ERRO NA CLASSIFICAÇÃO!')
    }
}

function gerarTabela(registros) {
    let tbody = document.querySelector('.corpo-tabela')
    registros.map(valor => {
        var linha = document.createElement('tr')
        var id = document.createElement('td')
        var mp10 = document.createElement('td')
        var mp25 = document.createElement('td')
        var o3 = document.createElement('td')
        var co = document.createElement('td')
        var so2 = document.createElement('td')
        var no2 = document.createElement('td')
        id.innerText = valor[0]
        mp10.innerText = valor[1]
        mp25.innerText = valor[2]
        o3.innerText = valor[3]
        co.innerText = valor[4]
        so2.innerText = valor[5]
        no2.innerText = valor[6]
        linha.append(id)
        linha.append(mp10)
        linha.append(mp25)
        linha.append(o3)
        linha.append(co)
        linha.append(so2)
        linha.append(no2)
        linha.setAttribute("id", `amostra${valor[0]}`)
        tbody.append(linha)
    })
    attSelectOptions(registros)
}

function attSelectOptions(registros){
    var selectBody = document.querySelector('#select-amostras')
    registros.map(valor => {
        var option = document.createElement('option')
        option.innerText = valor[0]
        option.setAttribute(`value`, `${valor[0]}`)
        selectBody.append(option)
    })
}

function attInputs() {
    var select = document.getElementById('select-amostras')
    var opcaoValor = select.options[select.selectedIndex].value;    
    var amostraDados = document.querySelectorAll(`#amostra${opcaoValor} td`)
    document.getElementById('valor-mp10').setAttribute('value', `${amostraDados[1].innerHTML}`)
    document.getElementById('valor-mp25').setAttribute('value', `${amostraDados[2].innerHTML}`)
    document.getElementById('valor-o3').setAttribute('value', `${amostraDados[3].innerHTML}`)
    document.getElementById('valor-co').setAttribute('value', `${amostraDados[4].innerHTML}`)
    document.getElementById('valor-no2').setAttribute('value', `${amostraDados[5].innerHTML}`)
    document.getElementById('valor-so2').setAttribute('value', `${amostraDados[6].innerHTML}`)
}