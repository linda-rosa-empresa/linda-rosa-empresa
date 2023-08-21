//efeito menu
$('.mobile > span').click(function(){
    $('.mobile').find('ul').slideToggle();
})

var form = document.querySelector("#form");
var nome = document.querySelector("#nome");
var tel = document.querySelector("#tel");
var cidade = document.querySelector("#cit");
var input = document.querySelectorAll('input');

function enviarFormulario(event) {
  event.preventDefault();

  // Verificação do nome
  if (nome.value === '') {
    //não pode possuir numeros
    alert("Por favor, digite seu nome!");
    input[0].style.border = '3px solid red';
    return;
  } else if(nome.length > 3){
    //nome maior que 3 caractere
    alert("Seu nome deve possuir mais de 3 caractere");
  } if (nomeValid(nome.value)) {
    //validação se possuir apenas letras
    alert("Seu nome e sobrenome");
    input[0].style.border = '3px solid red';
    return;
  } else {
    //verdadeiro
    input[0].style.border = '3px solid green';
  }

  // Verificação do telefone
  if (tel.value === '') {
    //se não estar vazio
    alert("Por favor, digite seu número de telefone!");
    input[1].style.border = '3px solid red';
    return;
  } else if (!telefoneValid(tel.value)) {
    //se estar nesa sequencia(XX) XXXX-XXXX
    alert("Digite um número de telefone válido no formato (XX) XXXX-XXXX !");
    input[1].style.border = '3px solid red';
    return;
  } else {
    input[1].style.border = '3px solid green';
  }

  //valida cidade e estado
  var cidadeEstado = cidade.value.split("-");
  if (cidadeEstado.length !== 2) {
    alert("Digite o nome da cidade e o estado no formato Cidade-Estado, por exemplo: Pacajus-CE");
    input[2].style.border = '3px solid red';
    return;
  } else {
    input[2].style.border = '3px solid green';
  }

  // Enviar os dados do formulário para uma planilha
  fetch('https://api.sheetmonkey.io/form/6hp63htU8JTqaTrrpypLHT', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome: nome.value, tel: tel.value, cidade: cidade.value })
  }).then(response => {
    if (response.ok) {
      alert("Formulário enviado com sucesso!");
      limparFormulario(); // Limpar o formulário após o envio bem-sucedido
    } else {
      alert("Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.");
    }
  }).catch(error => {
    console.error("Erro durante o envio do formulário:", error);
    alert("Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.");
  });
}

// Adicionando o manipulador de evento após 2 segundos
setTimeout(() => {
  form.addEventListener('submit', enviarFormulario);
}, 2000);

// Função para validar o nome
function nomeValid(nome) {
  const nomeRegex = /^[a-zA-Z]+$/;
  return nomeRegex.test(nome);
}

// Função para validar o número de telefone
function telefoneValid(telefone) {
  const telefoneRegex = /^\(\d{2}\) \d{4}-\d{4}$/;
  return telefoneRegex.test(telefone);
}

// Função para limpar os campos do formulário
function limparFormulario() {
  nome.value = '';
  tel.value = '';
  cidade.value = '';

  // Redefinir a borda dos campos de entrada para a cor padrão
  input.forEach(inputField => {
    inputField.style.border = '1px solid #ccc'; // Substitua '#ccc' pela cor que você deseja
  });

}



