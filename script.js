const url = "https://pokeapi.co/api/v2/pokemon/";

let c = 1;

document.getElementById("pokemonName").value = c;
getData()

function getDataPost(){
    c++;
    document.getElementById("pokemonName").value = c;
    getData()
}

function getDataPast(){
    if (c > 1){
        c--;
        document.getElementById("pokemonName").value = c;
        getData()
    }
}

async function getData(){
    let getName = document.getElementById("pokemonName").value;
    const nome = document.getElementById("nome");
    const tipo = document.getElementById("tipo");
    const altura = document.getElementById("altura");
    const peso = document.getElementById("peso");
    const geracao = document.getElementById("geracao");
    const img = document.getElementById("imagem");
    const setaDireita = document.getElementById("rightcross");
    const setaEsquerda = document.getElementById("leftcross");
    try{
        let connect = await fetch(url + getName);
        let data = await connect.json();
        nome.textContent = await data["name"];
        tipo.textContent = await data.types[0].type.name;
        altura.textContent = await (data["height"] / 10) + "m";
        peso.textContent = await (data["weight"] / 10) + "kg";
        img.src = await data.sprites.front_default;
        let a = await Object.keys(data.sprites.versions)[4];
        geracao.innerText = a;
        c = data["id"];

        let i = 4;
        setaDireita.addEventListener("click", function(){
            if (i == 7){
                i = 1;
            } else{
                i++;
            }
            atualizar();
        })
        
        setaEsquerda.addEventListener("click", function(){
            if (i == 0){
                i = 7;
            } else{
                i--;
            }
            atualizar();
        })

        function atualizar(){
            let a = Object.keys(data.sprites.versions)[i];
            geracao.innerText = a;
            let b = Object.keys(data.sprites.versions[`${a}`])[0];
            img.src = data.sprites.versions[`${a}`][`${b}`].front_default;
        }
    }
    catch{
        nome.textContent = "Não encontrado";
        tipo.textContent = "Não encontrado";
        altura.textContent = "Não encontrado";
        peso.textContent = "Não encontrado";
        img.src = "https://static.vecteezy.com/ti/vetor-gratis/p3/7126739-icone-de-ponto-de-interrogacao-gratis-vetor.jpg";
        geracao.innerText = "Não encontrado";
    }
}