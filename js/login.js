const botao_login = document.getElementById("botao_login")
const inputsenha = document.getElementById("senha")


const verificaSenha = () => {
   const entrada = inputsenha.value
    const senha = "ce855f48b7422de36b50512a9a0a06a59d4f2f6efac6f439456777a396773cc1"

    if (senha === hex_sha256(entrada)) {
        sessionStorage.setItem("logado", "sim")
        alert("Login feito com sucesso.")
        window.location = "principal.html"
    } else {
        alert("Senha incorreta.")
    }
}
