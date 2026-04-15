const url = 'https://receitasapi-b-2025.vercel.app';
const receitas = [];
let receitaAtual = null;

carregarReceitas();

function carregarReceitas(){
    fetch(url + '/receitas')
    .then(response => response.json())
    .then(data =>{
        receitas.length = 0;
        receitas.push(...data);
        listarCards();
    })
    .catch(e =>alert('Problemas com a conexão da API'));
}

function listarCards(){
    const container = document.querySelector('main');
    container.innerHTML = '';

    receitas.forEach(receita =>{
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
        <h3>${receita.nome}</h3>
        <img src="${receita.img}"alt="${receita.nome}">
        <p>Custo Aproximado: ${receita.custoAproximado}</p>
        `;
        card.onclick = () => abrirReceita(receita);

        container.appendChild(card);
    });
}

function abrirReceita(receita){
    receitaAtual = receita;
    tituloReceita.innerText = receita.nome;
    nomeEdit.value = receita.nome;
    imgReceita.src = receita.img;
    imgEdit.value = receita.img;
    tipoEdit.value = receita.tipo;
    ingredientesEdit.value = receita.ingredientes;
    modoEdit.value = receita.modoFazer;
    custoEdit.value = receita.custoAproximado;
    detalhes.classList.remove('oculto');

}
imgEdit.addEventListener("input", ()=>{
    imgReceita.src = imgEdit.value;
});

document.querySelector('#formCad').addEventListener('submit', function(e){
    e.preventDefault();
    const novaReceita = {
        nome: nome.value,
        tipo: tipo.value,
        ingredientes: ingredientes.value,
        modoFazer: modoFazer.value,
        img: urlImagem.value,
        custoAproximado: custoAproximado.value ? Number(custoAproximado.value) : null
    };

    fetch(url + '/receitas',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(novaReceita)
    })

.then(()=>{
    alert("Receita adicionada com sucesso!");
    cadastro.classList.add('oculto');
    carregarReceitas();
})
.catch(()=>alert("Erro ao salvar receita"));

});
