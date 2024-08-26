function criarUsuario(event) {
    event.preventDefault() // Evita que a tela recarregue

    // Obtém os valores dos campos do formulário
    const foto = document.getElementById('foto').value
    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value
    const confirmaSenha = document.getElementById('confirmaSenha').value
    const biografia = document.getElementById('biografia').value

    // Função para mostrar erro
    function mostrarErro(id, mensagem) {
        const campo = document.getElementById(id)
        const erro = document.getElementById(`error-${id}`)
        if (campo) {
            campo.style.borderColor = "red"
            campo.style.borderWidth = "2px"
        }
        if (erro) {
            erro.innerText = mensagem
        }
    }

    // Função para limpar erros
    function limparErros() {
        const campos = ['foto', 'nome', 'email', 'senha', 'confirmaSenha', 'biografia']
        campos.forEach(campo => {
            const elem = document.getElementById(campo)
            const erro = document.getElementById(`error-${campo}`)
            if (elem) {
                elem.style.borderColor = ""
                elem.style.borderWidth = ""
            }
            if (erro) {
                erro.innerText = ""
            }
        })
    }

    limparErros() // Limpa erros anteriores

    let valido = true

    // Validações
    if (foto === "") {
        mostrarErro('foto', 'Insira a URL da foto')
        valido = false
    }

    if (nome === "") {
        mostrarErro('nome', 'Insira seu nome')
        valido = false
    }

    if (email === "") {
        mostrarErro('email', 'Insira seu e-mail')
        valido = false
    }

    if (senha === "") {
        mostrarErro('senha', 'Insira uma senha')
        valido = false
    }

    if (confirmaSenha === "") {
        mostrarErro('confirmaSenha', 'Confirme a senha')
        valido = false
    } else if (confirmaSenha !== senha) {
        mostrarErro('confirmaSenha', 'As senhas não coincidem')
        valido = false
    }

    if (biografia === "") {
        mostrarErro('biografia', 'Insira sua biografia')
        valido = false
    }

    if (valido) {
        // Cria o usuário e salva no local storage
        const cadastroUsuario = {
            id: crypto.randomUUID(), // Gera um número aleatório para a ID
            nome: nome,
            foto: foto,
            email: email,
            senha: senha,
            biografia: biografia
        }

        let listaNoLocalStorage = JSON.parse(localStorage.getItem("cadastros-usuario")) || []
        listaNoLocalStorage.push(cadastroUsuario)
        localStorage.setItem("cadastros-usuario", JSON.stringify(listaNoLocalStorage)) // Salva a lista com os valores no local storage

        document.getElementById('form-cadastro-usuario').reset() // Reseta o formulário
    }
}

document
    .getElementById('form-cadastro-usuario')
    .addEventListener('submit', criarUsuario)

document.getElementById("foto").addEventListener("input", function(event) {
    document.getElementById('visualizacao-url-usuario').setAttribute('src', this.value)
})
