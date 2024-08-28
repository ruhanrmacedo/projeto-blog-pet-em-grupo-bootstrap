document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const readMoreLink = document.querySelector('.mt-4 a');
    const tituloElement = document.querySelector('h2');

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
    function rendederizarCards(postsRedenrizados) {
        postsContainer.innerHTML = '';

        postsRedenrizados.forEach(post => {
            const card = document.createElement('div');
            card.className = 'col d-flex align-items-stretch';
            const tempoLeituraTexto = post.tempo_leitura > 1 ? 'minutos' : 'minuto';
            card.innerHTML = `
                <div class="card h-100" data-bs-toggle="tooltip" title="Clique duas vezes para abrir o post">
                    <img src="${post.foto}" class="card-img-top" alt="${post.titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${post.titulo}</h5>
                        <p class="card-text"><strong>${post.categoria}</strong></p>
                        <p class="card-text">${post.dataCriacaoFormatada} - ${post.tempo_leitura} ${tempoLeituraTexto} </p>
                    </div>
                </div>
            `;

            // Evento de double-click para redirecionar ao post
            card.addEventListener('dblclick', () => {
                window.location.href = `post.html?id=${post.id}`;
            });

            postsContainer.appendChild(card);
        });

        // Inicializa os tooltips do Bootstrap para os cards
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Renderiza os cards ao carregar a página
    rendederizarCards(posts);

    // Evento para filtrar os posts pelo menu de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const categoria = link.textContent.trim().toUpperCase();
            if (categoria === 'TODOS') {
                rendederizarCards(posts);
                tituloElement.textContent = 'Todos os posts';
                return;
            } else {
                const postsFiltrados = posts.filter(post => post.categoria === categoria);
                rendederizarCards(postsFiltrados);
                tituloElement.textContent = `Posts de ${categoria.charAt(0) + categoria.slice(1).toLowerCase()}`;
            }
        });
    });

    // Evento para exibir todos os posts pelo link "Leia mais"
    readMoreLink.addEventListener('click', (event) => {
        event.preventDefault();
        rendederizarCards(posts);
        tituloElement.textContent = 'Todos os posts';
    });

    // Salva os posts atualizados no localStorage
    localStorage.setItem('posts', JSON.stringify(posts));
});
