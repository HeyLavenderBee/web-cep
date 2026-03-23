const input = document.getElementById("search-input");
const result = document.getElementById("result");

function showMessage(message, type){
    result.innerHTML = message;
    result.className = `${type}`;
}

async function handleCepSearch(){
    const rawCep = input.value.replace(/\D/g,""); //tira todos os espaços e letras, deixando apenas números
    console.log(rawCep);
    if(rawCep.length != 8){
        showMessage("CEP inválido. Use 8 números, ex: 12345-678.", "error");
    } else{
        showMessage("Consultando CEP...", "loading");
        const response = await fetch(`https://viacep.com.br/ws/${rawCep}/json`);
        if(!response.ok){
            showMessage("Falha no serviço.", "error");
        } else{
            const data = await response.json();
            if(data.erro){
                showMessage("CEP não encontrado.", "error");
            } else{
                const message = `
                    <p><strong>CEP:</strong> ${data.cep || "-"}</p>
                    <p><strong>Logradouro:</strong> ${data.logradouro || "-"}</p>
                    <p><strong>Complemento:</strong> ${data.complemento || "-"}</p>
                    <p><strong>Bairro:</strong> ${data.bairro || "-"}</p>
                    <p><strong>Cidade:</strong> ${data.localidade || "-"}</p>
                    <p><strong>UF:</strong> ${data.uf || "-"}</p>
                    <p><strong>Estado:</strong> ${data.estado || "-"}</p>
                    <p><strong>Região:</strong> ${data.regiao || "-"}</p>
                    <p><strong>DDD:</strong> ${data.ddd || "-"}</p>
                `;
                showMessage(message, "success");
            }
        }
    }
}

input.addEventListener("keydown", function(event){
    if(event.key=="Enter"){
        handleCepSearch();
    }
    
})

input.addEventListener("input", function(){
    if(input.value.trim() == ""){
        result.innerHTML = "";
        result.className = "";
    }
})
