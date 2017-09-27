const simplificacao = (programa) => {
    programa = removeLixo(programa);

    var programaArray = toArray(programa);
    programaArray = removeRepetidos(programaArray);


    programa = array2String(programaArray);
    return programa;
}

const cortarUltimaParada = (input) => {
    //Cortar o array onde a linha corresponder a ultima parada
}

const verificarCicloInfinito = (input) => {
    //Verficar se dois itens de determinada linha são iguai caso forem trocar em todos os lugares esse item por (ciclo, w)
}

const removeRepetidos = (input) => {

    var uniqueArray = input.filter(function(item, pos) {
        return input.indexOf(item) === pos;
    });

    return uniqueArray;
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