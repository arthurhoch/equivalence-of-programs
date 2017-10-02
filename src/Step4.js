
const verificarEquivalencia = (programa1, programa2, p) => {

    if (p == 0)  {
        return programa1 + programa2;
    }

    var verificacao = 0;

    var output = "B" + verificacao++ + " = {" + programa1[0] +", "+ programa2[0] +"}";

    //var p1 = removeRepetidos(programa1);
    //var p2 = removeRepetidos(programa2);

    var programa1Estrutura = gerarEstrutura(programa1);
    var programa2Estrutura = gerarEstrutura(programa2);

    console.log(programa1Estrutura);


    if (true) {
        output += "\nProgramas diferente !"
    } else {
        output += "\nProgramas equivalentes !"
    }

    return output + "\n" + verificacaoForte(programa1Estrutura, programa2Estrutura, verificacao);
}

const verificacaoForte = (programa1Estrutura, programa2Estrutura, verificacao) => {
    var output = "";

    var max = programa1Estrutura.length > programa2Estrutura.length ? programa2Estrutura.length : programa1Estrutura.length;
    var x = 0;
    var string = "";
    for (x = 0; x < max; x++) {
        output += "(" + programa1Estrutura[x].tagNum + ", " + programa2Estrutura[x].tagNum + ") B" + verificacao++ + "={" + programa1Estrutura[x].valor1 + ", " + programa2Estrutura[x].valor1 + "}," + " {" + programa1Estrutura[x].valor2 + ", " + programa2Estrutura[x].valor2 + "}\n";
    }


    return output;
}

const removeRepetidos = (input) => {
    
        var uniqueArray = input.split("\n").filter(function(item, pos) {
            return input.indexOf(item.split(":")[1]) === pos.split(":")[1];
        });
    
        return uniqueArray;
}


const gerarEstrutura = (input) => {
    var i = 0;
    var j = 0;
    var array = [];
    var linha = "";
    while ((j = input.indexOf('\n', i)) !== -1) {
        linha = input.substring(i, j);
        
        var tagInstrucoes =  linha.split(":");

        var elementos = tagInstrucoes[1].split(", ")


        var estrutura = {
            tagNum: tagInstrucoes[0],
            valor1: elementos[0].replace(/[() ]+/g,'').split(',')[1],
            valor2: elementos[1].replace(/[() ]+/g,'').split(',')[1]
        }


        array.push(estrutura);
        i = j + 1;
    }

    return array;


}

const toArray = (input) => {
    var i = 0;
    var j = 0;
    var array = [];
    var linha = "";
    while ((j = input.indexOf('\n', i)) !== -1) {
        linha = input.substring(i, j);
        array.push(linha);
        i = j + 1;
    }

    return array;
}

module.exports = {
    verificarEquivalencia    
}