var reset = false;

class Operacao{
    constructor(num, operacao) {
        this.num = num;
        this.operacao = operacao;
    }    
}

document.addEventListener('keydown', function (event) {
    if (event.keyCode !== 13) return;
    equals();
});

function tratamentoMult(num, calculo) {
    if (num == "x" && calculo.length == 0) { //Impede que o usuário digite x primeiro
        return false;
    }
    if (num == 'x' && calculo.substring(calculo.length - 1) == 'x') {
        //Impede que o usuário coloque duas vezes o x
        return false;
    }
    else if (num == 'x' && calculo.substring(calculo.length - 1) == '÷') {
        //Impede que o usuário coloque x depois de ÷
        return false;
    }
    else if (num == 'x' && calculo.substring(calculo.length - 1) == '-') {
        //Impede que o usuário coloque x depois de -
        return false;
    }
    else if (num == 'x' && calculo.substring(calculo.length - 1) == '+') {
        //Impede que o usuário coloque x depois de +
        return false;
    }
    else {
        return true;
    }
}

function tratamentoDiv(num, calculo) {
    if (num == "÷" && calculo.length == 0) {
        //Impede que o usuário digite ÷ primeiro
        return false;
    }
    if (num == '÷' && calculo.substring(calculo.length - 1) == '÷') {
        //Impede que o usuário coloque duas vezes o ÷
        return false;
    }
    else if (num == '÷' && calculo.substring(calculo.length - 1) == 'x') {
        //Impede que o usuário coloque ÷ depois de x
        return false;
    }
    else if (num == '÷' && calculo.substring(calculo.length - 1) == '+') {
        //Impede que o usuário coloque ÷ depois de +
        return false;
    }
    else if (num == '÷' && calculo.substring(calculo.length - 1) == '-') {
        //Impede que o usuário coloque ÷ depois de -
        return false;
    }
    else {
        return true;
    }
}

function tratamentoSom(num, calculo) {
    if (num == "÷" && calculo.length == 0) {
        //Impede que o usuário digite ÷ primeiro
        return false;
    }
    if (num == '-' && calculo.substring(calculo.length - 1) == '-') {
        //Impede que o usuário coloque duas vezes o -
        return false;
    }
    else if (num == '-' && calculo.substring(calculo.length - 1) == '÷') {
        //Impede que o usuário coloque - depois de ÷
        return false;
    }
    else {
        return true;
    }
}

function tratamentoSub(num, calculo) {
    if (num == "+" && calculo.length == 0) {
        //Impede que o usuário digite + primeiro
        var op = new Operacao(num,calculo);
        return false;
    }
    else if (num == '+' && calculo.substring(calculo.length - 1) == '+') {
        //Impede que o usuário coloque duas vezes o +
        return false;
    }
    else if (num == '+' && calculo.substring(calculo.length - 1) == 'x') {
        //Impede que o usuário coloque + depois de x
        return false;
    }
    else if (num == '+' && calculo.substring(calculo.length - 1) == '÷') {
        //Impede que o usuário coloque + depois de ÷
        return false;
    }
    else if (num == '+' && calculo.substring(calculo.length - 1) == '-') {
        //Impede que o usuário coloque + depois de ÷
        return false;
    }
    else {
        return true;
    }
}


function insert(num) {
    var calculo = document.getElementById("textbox").value;

    var validaMult = true;
    var validaSub = true;
    var validaDiv = true;
    var validaSom = true;

    if (reset) {
        clean();
        reset = false;
    }

    validaMult = tratamentoMult(num, calculo);
    validaSub = tratamentoSub(num, calculo);
    validaDiv = tratamentoDiv(num, calculo);
    validaSom = tratamentoSom(num, calculo);

    if (validaDiv && validaSub && validaMult && validaSom) {
        document.getElementById("textbox").value += num; //Insere o número digitado a textbox       
    }
}

function clean() {
    document.getElementById("textbox").value = ''; //Limpa a textbox
    document.getElementById("sub").textContent = '';//Limpa a label
}

function equals() {
    var exp = document.getElementById("textbox").value;// Pega o elemento da textbox    
    var tr = document.createElement("tr");// Cria uma linha
    var td = document.createElement("td");// Cria uma celula
    tr.className = "histElement animated zoomIn"; // Adiciona a classe de animação a linha    
    var p = document.createElement("p");// Cria o texto da celula
    p.textContent = exp + ' = '; // Combina o texto da textbox com `=` para apresentar na celula

    document.getElementById("sub").textContent = p.textContent;// Coloca o texto de apresentação da celula na label

    exp = exp.replace('÷', '/');// Muda os valores coletados da textbox para ser executado como operação matemática
    exp = exp.replace('x', '*');// ''

    if (exp) {
        p.textContent += eval(exp); // Adiciona ao texto da celula o resultado da operação matemática
        td.appendChild(p); //Adiciona o texto da celula a propria celula
        tr.appendChild(td); //Adiciona a celula a linha

        document.getElementById("textbox").value = eval(exp); //Coloca na textbox o resultado da operação
        document.getElementById("historico").appendChild(tr); //Coloca a linha dentro da tabela historico
    }
    reset = true; //Muda variavel para true para quando executar a função insert, limpar a textbox
}

function del() {
    var exp = document.getElementById("textbox").value; //Pega o valor da textbox
    document.getElementById("textbox").value = exp.substring(0, exp.length - 1);//Apaga o ultimo valor digitado da textbox
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