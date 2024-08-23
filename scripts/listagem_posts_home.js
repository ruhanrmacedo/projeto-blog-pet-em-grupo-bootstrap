document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts');

    // Função para calcular o tempo de leitura
    function calcularTempoLeitura(conteudo) {
        const palavras = conteudo.split(' ');
        const tempoLeitura = Math.ceil(palavras.length / 200);
        return tempoLeitura || 1;
    }

    // Função para formatar a data 
    function formatarData(data) {
        const dataISO = moment(data, 'DD/MM/YYYY').toISOString();
        const dataObj = new Date(dataISO);
        if (isNaN(dataObj.getTime())) {
            return 'Data inválida'; 
        }
    
        const dia = dataObj.getUTCDate().toString().padStart(2, '0');
        const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
        const mes = meses[dataObj.getUTCMonth()];
        const ano = dataObj.getUTCFullYear();
    
        return `${dia} ${mes}, ${ano}`;
    }

    // Carrega os posts do localStorage
    let posts = JSON.parse(localStorage.getItem('posts')) || [];

    // Atualiza os posts com o tempo de leitura e a data formatada
    posts = posts.map(post => {
        post.tempo_leitura = calcularTempoLeitura(post.descricao);
        post.dataCriacaoFormatada = formatarData(post.dataCriacao); 
        return post;
    });

    // Renderiza os cards
    posts.forEach(post => {
        const card = document.createElement('div');
        card.classList.add('col');

        card.innerHTML = `
            <div class="card h-100">
                <img src="${post.foto}" class="card-img-top" alt="${post.titulo}">
                <div class="card-body">
                    <h5 class="card-title">${post.titulo}</h5>
                    <p class="card-text"><strong>${post.categoria}</strong></p>
                    <p class="card-text">${post.dataCriacaoFormatada} - ${post.tempo_leitura} minutos de leitura</p>
                </div>
            </div>
        `;

        // Evento de double-click para redirecionar ao post
        card.addEventListener('dblclick', () => {
            window.location.href = `post.html?id=${post.id}`;
        });

        postsContainer.appendChild(card);
    });

    // Salva os posts atualizados no localStorage
    localStorage.setItem('posts', JSON.stringify(posts));
});
