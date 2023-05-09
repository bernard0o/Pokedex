const url = "https://pokeapi.co/api/v2/pokemon/";
const blueButton = document.getElementById("bigbluebutton");

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

//Lista de pokémons ao clicar no botão azul

blueButton.addEventListener("click", async function(){
        document.getElementById("pokemonList").style.display = "block"
        for (let i = 1; i <= 1030; i++){
            let connect = await fetch((url + i).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
            let data = await connect.json();
            let div = document.createElement("div");
            div.className = "pokemon";

            let imagem = document.createElement("img");
            imagem.className = "img";
            imagem.src = await data.sprites.front_default;
            div.appendChild(imagem)

            let h2 = document.createElement("h2");
            div.append(h2);

            h2.textContent = await String(data["name"]).charAt(0).toUpperCase() + String(data["name"]).slice(1);
            document.getElementById("bottom").appendChild(div)
        }
    })
    document.getElementById("back").addEventListener("click", function(){
        document.getElementById("pokemonList").style.display = "none";
    })

//Search Bar

//Buscar dados à API
async function getData(){
    let getName = document.getElementById("pokemonName").value;
    const nome = document.getElementById("nome");
    const tipo = document.getElementById("tipo");
    const altura = document.getElementById("altura");
    const peso = document.getElementById("peso");
    const img = document.getElementById("imagem");
    try{
        let connect = await fetch((url + getName).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
        let data = await connect.json();
        nome.textContent = await String(data["name"]).charAt(0).toUpperCase() + String(data["name"]).slice(1);
        tipo.textContent = await String(data.types[0].type.name).charAt(0).toUpperCase() + String(data.types[0].type.name).slice(1);
        altura.textContent = await (data["height"] / 10) + "m";
        peso.textContent = await (data["weight"] / 10) + "kg";
        img.src = await data.sprites.front_default;
        let a = await Object.keys(data.sprites.versions)[4];
        c = data["id"];
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