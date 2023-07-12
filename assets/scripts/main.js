const informativa = document.querySelectorAll(".legendas-input");
const inputs = document.querySelectorAll(".input-preencher");

class Documentacao {
  constructor() {
    this.legenda = [];
    this.input = [];
    this.valor = [];
    this.cidadeValores = [];
    this.agenciaValores = [];
    this.cartorioValores = [];
    this.enquadramentoValores = [];
    this.documentacaoValores = [];
  }

  lerDados() {
    this.input.compra = document.getElementById("compra");
    this.legenda.compra = document.getElementById("legenda-compra");

    this.valor.compra = document.getElementById("compra").value;
    this.input.financiamento = document.getElementById("financiamento");
    this.legenda.financiamento = document.getElementById("legenda-financiamento");
    this.valor.financiamento = document.getElementById("financiamento").value
    this.valor.recursosProprios = this.valor.compra - this.valor.financiamento;
    this.input.cidade = document.getElementById("cidade");
    this.legenda.cidade = document.getElementById("legenda-cidade");
    this.valor.cidade = document.querySelector("#cidade").value;
    this.input.banco = document.getElementById("banco");
    this.legenda.banco = document.getElementById("legenda-banco");
    this.valor.banco = document.querySelector("#banco").value;
    this.input.agencia = document.getElementById("agencia");
    this.legenda.agencia = document.getElementById("legenda-agencia");
    this.valor.agencia = document.querySelector("#agencia").value;
    this.input.enquadramento = document.getElementById("enquadramento");
    this.legenda.enquadramento = document.getElementById("legenda-enquadramento");
    this.valor.enquadramento = document.querySelector("#enquadramento").value;

    this.verificaCidade();
    this.verificaAgencia();
    this.verificaRegistro();
    this.verificaEnquadramento();
    this.verificaExecucoes();
  }

  verificaCidade() {
    let optionCaixa = document.getElementById("caixa");
    let optionBB = document.getElementById("bb");
    let optionItau = document.getElementById("itau");
    let option0296 = document.getElementById("0296");
    let option0676 = document.getElementById("0676");
    let option3231 = document.getElementById("3231");

    switch (this.valor.cidade) {
      case "campinas":
        this.cidadeValores.limiteFGTS = 350000;
        this.cidadeValores.itbi = this.valor.compra * 0.027;

        optionBB.classList.remove("display-none");
        option0296.classList.remove("display-none");
        option0676.classList.remove("display-none");
        option3231.classList.add("display-none");

        break;

      case "guarulhos":
        this.cidadeValores.limiteFGTS = 264000;
        this.cidadeValores.itbi =
          0.02 * this.valor.recursosProprios + 0.005 * this.valor.financiamento;

        optionBB.classList.add("display-none");
        option0296.classList.add("display-none");
        option3231.classList.remove("display-none");
        option0676.classList.add("display-none");

        break;
    }
  }

  verificaAgencia() {
    let aparecerLinha = (item1, item2) => {
      item1.style.display = "flex";
      item2.style.display = "flex";
    };
    let desaparecerLinha = (item1, item2) => {
      item1.style.display = "none";
      item2.style.display = "none";
    };

    switch (this.valor.banco) {
      case "caixa":
        aparecerLinha(this.legenda.agencia, this.input.agencia);
        switch (this.valor.agencia) {
          case "0296":
            this.agenciaValores.relacionamento =
              this.valor.financiamento * 0.01;
            break;

          case "0676":
            this.agenciaValores.relacionamento = 1500;
            break;

          case "3231":
            this.agenciaValores.relacionamento = 800;
            break;
        }
        break;

      case "bb":
        desaparecerLinha(this.legenda.agencia, this.input.agencia);
        break;

      case "itau":
        desaparecerLinha(this.legenda.agencia, this.input.agencia);
        break;
    }
  }

  verificaRegistro() {
    this.lerDados;
    this.cartorioValores.referenciaCompra = [
      34260.01,
      102780.01,
      171300.01,
      205560.01,
      239820.01,
      274080.01,
      308340.01,
      342600.01,
      685200.01,
      1027800.01,
      1370400.01,
      1713000.01,
      2055600.01,
      Infinity,
    ];
    this.cartorioValores.referenciaValor = [
      1699.18, 1894.28, 2326.54, 2731.51, 2946.72, 3163.38, 3325.82, 3541.74,
      4638.21, 5441.15, 6244.06, 6659.19, 8734.85,
    ];

    for (let i = 0; i < this.cartorioValores.referenciaCompra.length - 1; i++) {
      if (
        this.valor.compra > this.cartorioValores.referenciaCompra[i] &&
        this.valor.compra < this.cartorioValores.referenciaCompra[i + 1]
      ) {
        this.cartorioValores.registro = this.cartorioValores.referenciaValor[i];
      }
    }
  }

  verificaEnquadramento() {
    switch (this.valor.banco) {
      case "caixa":
        switch (this.valor.enquadramento) {
          case "mcmv":
            this.enquadramentoValores.taxa =
              this.valor.financiamento * 0.015 + 50;
            break;

          case "proCotista":
            this.enquadramentoValores.taxa =
              this.valor.financiamento * 0.015 + 50;
            break;

          case "sbpe":
            this.enquadramentoValores.taxa = 1050;
            break;
        }
        break;

      case "bb":
        switch (this.valor.enquadramento) {
          case "mcmv":
            this.enquadramentoValores.taxa =
              this.valor.financiamento * 0.015 + 50;
            break;

          case "proCotista":
            this.enquadramentoValores.taxa =
              this.valor.financiamento * 0.015 + 50;
            break;

          case "sbpe":
            this.enquadramentoValores.taxa = 1365;
            break;
        }
        break;

      case "itau":
        this.enquadramentoValores.taxa = 1950;
        break;
    }
  }

  verificaExecucoes() {
    this.documentacaoValores.taxa = this.enquadramentoValores.taxa;
    this.documentacaoValores.relacionamento = this.agenciaValores.relacionamento;
    this.documentacaoValores.itbi = this.cidadeValores.itbi;
    this.documentacaoValores.registro = this.cartorioValores.registro;

    let resposta = window.document.getElementById("resposta");
    let resultado = (valor) => {
      resposta.innerHTML = valor;
    };

    let modificaDinheiroReal = (valor) => {
      return valor.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
    };

    function executaErro() {
      resposta.classList.remove("caixa_reposta");
      resposta.classList.add("resposta_erro");
    }

    function validaErro() {
      resposta.classList.remove("resposta_erro");
      resposta.classList.add("caixa_reposta");
    }

    resposta.style.display = "flex";

    if (this.valor.compra < 62000) {
      executaErro();
      resultado(
        "Valor de compra e venda inferior ao minimo " +
          modificaDinheiroReal(62000)
      );
    } else if (this.valor.compra * 0.8 < this.valor.financiamento) {
      executaErro();
      resultado(
        "Valor de financiamento maior do que 80% do valor de compra,<br> valor possivel: " +
          modificaDinheiroReal(this.valor.compra * 0.8)
      );
    } else if (
      this.valor.cidade == "nenhum" ||
      this.valor.banco == "nenhum" ||
      this.valor.enquadramento == "nenhum"
    ) {
      executaErro();
      resultado("Preencha todos os campos");
    } else if (
      this.valor.enquadramento == "mcmv" &&
      this.valor.compra > this.cidadeValores.limiteFGTS
    ) {
      executaErro();
      resultado(
        `O valor de compra informado é maior do que o limite para esse enquadramento <br> limite FGTS de ${
          this.valor.cidade
        }: ${modificaDinheiroReal(this.cidadeValores.limiteFGTS)}`
      );
    } else {
      validaErro();
      switch (this.valor.banco) {
        case "caixa":
          resultado(
            `Taxa a vista: ${modificaDinheiroReal(
              this.documentacaoValores.taxa
            )} ` +
              `<br>Relacionamento: ${modificaDinheiroReal(
                this.documentacaoValores.relacionamento
              )} ` +
              `<br>ITBI: ${modificaDinheiroReal(
                this.documentacaoValores.itbi
              )} ` +
              `<br>Registro: ${modificaDinheiroReal(
                this.documentacaoValores.registro
              )} `
          );
          break;

        case "bb":
          resultado(
            `Taxa a vista: ${modificaDinheiroReal(
              this.documentacaoValores.taxa
            )} ` +
              `<br>ITBI: ${modificaDinheiroReal(
                this.documentacaoValores.itbi
              )} ` +
              `<br>Registro: ${modificaDinheiroReal(
                this.documentacaoValores.registro
              )} `
          );
          break;

        case "itau":
          resultado(
            `Taxa a vista: ${modificaDinheiroReal(
              this.documentacaoValores.taxa
            )} ` +
              `<br>ITBI: ${modificaDinheiroReal(
                this.documentacaoValores.itbi
              )} ` +
              `<br>Registro: ${modificaDinheiroReal(
                this.documentacaoValores.registro
              )} `
          );
          break;
      }
    }
  }
}

let documentacao = new Documentacao();
// Uso o forEach para aplicar (em todos elementos) a função de executar o resultado toda vez que trocar algum dado do input
const elementos = document.querySelectorAll(
  "#compra, #financiamento, #cidade, #banco, #agencia, #enquadramento"
);

elementos.forEach((elemento) => {
  elemento.addEventListener("change", () => {
    documentacao.lerDados();
  });
});

//Botões

resposta.addEventListener("click", function () {
  let valoresDocumentacao = document.getElementById("resposta");
  navigator.clipboard.writeText(valoresDocumentacao.textContent);
});
