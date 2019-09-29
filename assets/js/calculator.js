var reset = true;
var resultado = [];
var especial = false;

class Operacao {
    constructor(valor, operacao, funcao, resultado) {
        this._valor = valor;
        this._operacao = ' ' + operacao + ' ';

        if (funcao == undefined) {
            this._funcao = '';
        }
        else {
            this._funcao = funcao;
        }

        this._resultado = resultado;

    }

    get valor() {
        return this._valor;
    }
    set valor(novoValor) {
        this._valor = novoValor;
    }

    get operacao() {
        return this._operacao;
    }
    set operacao(novaOperacao) {
        this._operacao = novaOperacao;
    }

    get funcao() {
        return this._funcao;
    }
    set funcao(novaFuncao) {
        this._funcao = novaFuncao;
    }

    get resultado() {
        return this._resultado;
    }

    set resultado(novoResultado) {
        this._resultado = novoResultado;
    }

    getValorOperacao() {
        var all = 0;
        if (this._resultado == undefined) {
            all = this._valor + this._operacao;
        }
        else if(this._funcao == '√')
        {
            all = this._funcao + this.valor;
        }    
        else {
            all = this._valor + this.funcao;
        }

        return all;
    }


    getAll() {
        var all = 0;
        if (this._resultado == undefined) {
            all = this._valor + this._operacao;
        }
        else {
            all = this._resultado;
        }
        return all;
    }


    calculaFatorial(object) {
        var fatorial = 1;
        for (var x = 1; x < object.valor; x++) {
            fatorial += fatorial * x;
        }
        object.resultado = fatorial;
        object.operacao = '';
        object.funcao = '!';

        return object;
    }

    calculaRaizQuadrada(object) {
        var raiz = Math.sqrt(object.valor);
        object.resultado = raiz;
        object.operacao = '';
        object.funcao = '√';

        return object;
    }

}

document.addEventListener('keydown', function (event) {
    if (event.keyCode !== 13) return;
    equals();
});

function inserirFuncao(operacao) {
    var valor = document.getElementById("textbox").value;

    if (operacao == '+' || operacao == 'x' || operacao == '÷' || operacao == '-' || operacao == '!' || operacao == '√') {
        if (valor.length == 0) {
            var op = new Operacao(0, operacao);
            if (op.operacao == ' ! ') {                
                document.getElementById("sub").textContent += op.getValorOperacao();
                op.calculaFatorial(op);
                especial = true;
            }
            else if (op.operacao == ' √ ') {
                op.calculaRaizQuadrada(op);
                document.getElementById("sub").textContent += op._funcao + op._valor;
                especial = true;
            }
            resultado.push(op);
        }
        else {

            if (especial) {
                var op = new Operacao('', operacao);
            }
            else {
                var op = new Operacao(valor, operacao);
            }

            if (op.operacao == ' ! ') {
                document.getElementById("sub").textContent += op.getValorOperacao();
                op.calculaFatorial(op);
                especial = true;
            }
            else if (op.operacao == ' √ ') {
                op.calculaRaizQuadrada(op);
                document.getElementById("sub").textContent += op._funcao + op._valor;                
                especial = true;
            }
            else {
                document.getElementById("sub").textContent += op.getValorOperacao();
                especial = false;
            }
            resultado.push(op);
        }
        reset = true;
    }
}


function inserirNumero(caracter) {
    if (reset) {
        document.getElementById("textbox").value = '';
        reset = false;
    }

    if (document.getElementById("textbox").value == '0' && caracter !== '.') {
        document.getElementById("textbox").value = caracter;
    }
    else {
        document.getElementById("textbox").value += caracter;//Insere o número digitado a textbox 
    }

}

function clean() {
    document.getElementById("textbox").value = '0'; //Limpa a textbox
    document.getElementById("sub").textContent = '';//Limpa a label
    resultado = [];
    especial = false;
}

function equals() {

    var exp = document.getElementById("textbox").value;// Pega o elemento da textbox    
    var tr = document.createElement("tr");// Cria uma linha
    var td = document.createElement("td");// Cria uma celula
    tr.className = "histElement animated zoomIn"; // Adiciona a classe de animação a linha  

    
    var p = document.createElement("p");// Cria o texto da celula        

    document.getElementById("sub").textContent = p.textContent;// Coloca o texto de apresentação da celula na label      

    if (exp) {

        exp = '';
        if (resultado[0].funcao == '' && resultado[resultado.length - 1].funcao == '') {
            var txtObject = new Operacao(document.getElementById("textbox").value, '', '', '');
            resultado.push(txtObject);
        }        

        resultado.forEach(e => {
            exp += e.getValorOperacao();
        });

        p.textContent = exp + ' = ';
        exp = '';

        resultado.forEach(e => {
            exp += e.getAll();
        });
        if (especial !== true) {
            exp += document.getElementById("textbox").value;
        }
        document.getElementById("sub").textContent = '';// Coloca o texto de apresentação da celula na label

        exp = exp.replace('÷', '/');// Muda os valores coletados da textbox para ser executado como operação matemática
        exp = exp.replace('x', '*');// ''
        p.textContent += eval(exp);


        td.appendChild(p); //Adiciona o texto da celula a propria celula
        tr.appendChild(td); //Adiciona a celula a linha

        document.getElementById("textbox").value = eval(exp); //Coloca na textbox o resultado da operação
        document.getElementById("historico").appendChild(tr); //Coloca a linha dentro da tabela historico
    }
    especial = false;
    reset = true; //Muda variavel para true para quando executar a função insert, limpar a textbox
    resultado = [];
}

function del() {
    var exp = document.getElementById("textbox").value; //Pega o valor da textbox

    document.getElementById("textbox").value = exp.substring(0, exp.length - 1);//Apaga o ultimo valor digitado da textbox

    if (document.getElementById("textbox").value.length == 0) {
        document.getElementById("textbox").value = 0;
    }
}

function cleanHist() {
    var confirmacao = confirm("Deseja realmente limpar todo o histórico?");
    if (confirmacao == true) {
        var i = 0;
        var linhas = document.getElementsByClassName('histElement animated zoomIn');
        var qtdLinhas = linhas.length;
        while (i <= qtdLinhas) {
            document.getElementById('historico').deleteRow(0);
            i = i + 1;
        }
    }
}