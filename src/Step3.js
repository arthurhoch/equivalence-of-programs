var rotulo = 0;

const simplificacao = (programa, p) => {

    rotulo = programa[0]-1;

    programa = removeLixo(programa);

    var programaArray = toArray(programa);
    programaArray = removeRepetidos(programaArray);
    programaArray = verificarCicloInfinito(programaArray);

    programa = array2String(programaArray);
    return programa;
}

const verificarCicloInfinito = (input) => {

    var i = 0;

    var ultimaParada = 0;
    for (i = 0; i < input.length; i++) {
        if ( input[i].includes("(parada,Σ)")) {
            ultimaParada = i;
        }
    }
    var trocarPorCiclo = [];

    for (i = ultimaParada; i < input.length; i++) {
        var elementos = input[i].split(", ");
        
        if (elementos.length > 0) {
            if (elementos[0] === elementos[1]) {
                if (elementos[0] != "(ciclo,ω)" && elementos[0] != "(parada,Σ)") {
                    trocarPorCiclo.push(elementos[0]);
                }
            }
        }
    }
    var j = 0;
    for (i = 0; i < trocarPorCiclo.length; i++) {
        for (j = 0; j < input.length; j++) {

            var elementos = input[j].split(", ");

            if ( elementos[0].includes(trocarPorCiclo[i])) {
                elementos[0] = "(ciclo,ω)";
            }
            if ( elementos[1].includes(trocarPorCiclo[i])) {
                elementos[1] = "(ciclo,ω)";
            }

            input[j] = elementos[0] + ", " + elementos[1];


        }
    }

    ultimaParada = 0;

    for (i = 0; i < input.length; i++) {
        if (input[i].includes("(ciclo,ω)") && input[i].includes("(parada,Σ)")) {
            ultimaParada = i;
            break;
        } else if (input[i].includes("(parada,Σ)")) {
            ultimaParada = i;
        }
    }

    return input.slice(0, ultimaParada+1);

    //Verficar se dois itens de determinada linha são iguai caso forem trocar em todos os lugares esse item por (ciclo, w)
}

const removeRepetidos = (input) => {

    //var uniqueArray = input.filter(function(item, pos) {
    //    return input.indexOf(item) === pos;
    //});

    //return uniqueArray;
    return input;
}

const array2String = (input) => {
    var programa = "";
    var i = 0;
    for (i = 0; i < input.length; i++) {
        programa += ++rotulo + ": " + input[i] + "\n";
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

    var stringLimpa = "";
    var linha = "";

    while ((j = input.indexOf('\n', i)) !== -1) {
        linha = input.substring(i, j);
        stringLimpa += linha.substr(linha.indexOf(' ')+1) + "\n";

        i = j + 1;
      }

      return stringLimpa;
}

module.exports = {
    simplificacao
}