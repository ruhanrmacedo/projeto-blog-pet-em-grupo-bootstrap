const contas = [
  {
    id: 123,
    nome: "Amelie",
    foto: "",
    email: "amelie@gmail.com",
    senha: "123@",
    biografia: "Eu sou uma gata branca com patinhas escuras.",
  },
];

const contasAarmazenar = JSON.stringify(contas);
localStorage.setItem("contas", contasAarmazenar);

const btnLogin = document.getElementById("btnLogin");

btnLogin.addEventListener("click", efetuarLogin);

function efetuarLogin(event) {
  event.preventDefault();
  const usuarioInput = document.getElementById("emailLogin").value;
  const senhaInput = document.getElementById("senhaLogin").value;
  const form = document.getElementById("formLogin");
  form.reset();
  const contasArmazenadas = JSON.parse(localStorage.getItem("contas"));
  const usuario = contasArmazenadas.find(
    (usuarioArmazenado) => usuarioArmazenado.email == usuarioInput
  );
  if (usuario && usuario.senha === senhaInput) {
    window.location.replace("../index.html");
  } else {
    alert("Usuário não localizado ou senha incorreta.");
  }
}
