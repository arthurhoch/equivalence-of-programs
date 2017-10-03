
const verificarEquivalencia = (programa1, programa2, p) => {

    if (p == 0)  {
        return programa1 + programa2;
    }

    var verificacao = 0;

    var output = "B" + verificacao++ + " = {" + programa1[0] +", "+ programa2[0] +"}";

    var p1 = removeRepetidos(programa1);
    var p2 = removeRepetidos(programa2);

    var programa1Estrutura = gerarEstrutura(p1);
    var programa2Estrutura = gerarEstrutura(p2);

    

    return output + "\n\n" + verificacaoForte(programa1Estrutura, programa2Estrutura, verificacao);
}

const verificacaoForte = (programa1Estrutura, programa2Estrutura, verificacao) => {
    var output = "";

    var max = programa1Estrutura.length > programa2Estrutura.length ? programa2Estrutura.length : programa1Estrutura.length;
    var x = 0;
    var string = "";
    var eEquivalente = true;
    for (x = 0; x < max; x++) {
        output += "(" + programa1Estrutura[x].tagNum + ", " + programa2Estrutura[x].tagNum + ") B" + verificacao++ + "={" + programa1Estrutura[x].valor1 + ", " + programa2Estrutura[x].valor1 + "}," + " {" + programa1Estrutura[x].valor2 + ", " + programa2Estrutura[x].valor2 + "}\n";

        if (programa1Estrutura[x].valor1 == 'ω') {
            if (programa2Estrutura[x].valor1 != 'ω')  {
                eEquivalente = false;
            }
        }

        if (programa1Estrutura[x].valor2 == 'ω') {
            if (programa2Estrutura[x].valor2 != 'ω')  {
                eEquivalente = false;
            }
        }

        if (programa1Estrutura[x].valor2 == 'Σ') {
            if (programa2Estrutura[x].valor2 != 'Σ')  {
                eEquivalente = false;
            }
        }

        if (programa1Estrutura[x].valor2 == 'Σ') {
            if (programa2Estrutura[x].valor2 != 'Σ')  {
                eEquivalente = false;
            }
        }

    }

    if (!eEquivalente) {
        output += "\nProgramas diferente !"
    } else {
        output += "\nProgramas equivalentes !"
    }



    return output;
}

const removeRepetidos = (input) => {
    
        var proc = toArray(input);
        var procNoLixo = removeLixo(input);


        var uniqueArray = proc.filter(function(item, pos) {
            return procNoLixo.indexOf(item.split(":")[1]) === pos;
        });
    
        return array2String(uniqueArray);
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

const array2String = (input) => {
    var programa = "";
    var i = 0;
    for (i = 0; i < input.length; i++) {
        programa += input[i] + "\n";
    }

    return programa;
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

const removeLixo = (input) => {
    var i = 0;
    var j = 0;

    var stringLimpa = [];
    var linha = "";

    while ((j = input.indexOf('\n', i)) !== -1) {
        linha = input.substring(i, j);
        stringLimpa.push(linha.split(":")[1]);

        i = j + 1;
      }
      console.log(stringLimpa);
      
      return stringLimpa;
}

module.exports = {
    verificarEquivalencia    
}
