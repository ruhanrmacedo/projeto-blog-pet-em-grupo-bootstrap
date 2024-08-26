function carregarPost () {
    const postNoLocalStorage = JSON.parse(localStorage.getItem("posts"))
    console.log(postNoLocalStorage)

    const url = new URL(window.location.href)
    const params = new URLSearchParams(url.search)
    const idUrl = params.get("id")

    const postEncontrado = postNoLocalStorage.find((item) => item.id == idUrl)
    console.log(postEncontrado)


    if(postEncontrado === undefined) {
       window.location.href = "404.html"
    } else {
        document.getElementById('titulo-post').innerText = postEncontrado.titulo;
        document.getElementById('titulo').innerText = postEncontrado.titulo;
        document.getElementById('dataCriacao').innerText = postEncontrado.dataCriacao;
        document.getElementById('descricao').innerText = postEncontrado.descricao;
        document.getElementById('foto').setAttribute('src', postEncontrado.foto);
        document.getElementById('categoria').setAttribute('value', postEncontrado.categoria);
    }
}

document.addEventListener('DOMContentLoaded', carregarPost)