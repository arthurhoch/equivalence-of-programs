
/**
 * Funcao criada para formalizar um programa
 * 
 * @param {Array} programa Todas as instrucoes do programa inicial
 */
const formalizeProgram = (programa) => {

    // Remove os elementos do array que nao nao possuem nenhum valor
    programa = programa.split('\n').filter(function(item){
        if (item !== "") {
            return item;
        }
    });
    
    var programFormalized = '';

    // Percorre todas as linhas do programa
    for (var lineIndex = 0; lineIndex < programa.length; lineIndex++) {

        // Divide a linha de acordo com os espacos em brancos
        var lineSplited = programa[lineIndex].split(" ");

        // Verifica se a linha do programa eh uma operacao ou um teste
        if (lineSplited[0] == 'faça' || lineSplited[0] == 'faca') {
            var oper = '';
            // Obtem a linha que a instrucao atual ira executar
            var indexNextLine = parseInt(lineSplited[3]) - 1;
            if (indexNextLine >= programa.length) {
                // Caso a linha a ser executada nao exista, eh uma parada
                oper = '(parada,&)';
            } else {
                oper = '(' + lineSplited[1] + ',' + lineSplited[3] + ')';
            }

            // Acrescenta uma linha ao programa formalizado
            programFormalized += (lineIndex + 1) + ': ' + oper + ', ' + oper + ' \n';

        } else if (lineSplited[0] == 'se') {

            // Obtem o indice da linha que ira ser executada se a condicao for verdadeira 
            var indexOperTrue = parseInt(lineSplited[4]) - 1;
            // Obtem o indice da linha que ira ser executada se a condicao for falsa
            var indexOperFalse = parseInt(lineSplited[7]) - 1;

            //Obtem a proxima instrucao a ser executada caso o teste for verdadeiro
            var operTrue = getOperFromTeste(programa, indexOperTrue, true, indexOperTrue, true);
            //Obtem a proxima instrucao a ser executada caso o teste for falso
            var operFalse = getOperFromTeste(programa, indexOperFalse, false, indexOperFalse, true);

            // Acrescenta uma linha ao programa formalizado
            programFormalized += (lineIndex + 1) + ': ' + operTrue + ', ' + operFalse + ' \n';
        }
    }

    return programFormalized;
}

/**
 * Funcao recursiva criada para obter a proxima instrucao a 
 * ser executada de um teste que pode ter outros testes encadeados
 * 
 * @param {Array} arr Todas as instrucoes do programa inicial
 * @param {Number} indexTestExec Indice da linha que o teste ira executar
 * @param {Boolean} isTrue Especifica se eh para retornar a instrucao verdadeira ou falsa do teste
 * @param {Number} firstIndexTest Indice do primeiro teste quando foi chamado a funcao(usado para detectar ciclo infinito)
 * @param {Boolean} isFirstTest Especifica se eh a primeira vez que esta sendo executada a funcao recursiva
 */
const getOperFromTeste = (arr, indexTestExec, isTrue, firstIndexTest, isFirstTest) => {
    // Se a proxima instrucao a ser executada pelo teste nao existir, retorna uma parada
    if (indexTestExec >= arr.length) {
        return '(parada,&)';
    // Se nao for a primeira chamada da funcao recursiva, 
    // e se o indice da linha que o teste ira executar for igual ao primeiro indice testado, 
    // retorna um ciclo infinito
    } else if (!isFirstTest && indexTestExec === firstIndexTest) {
        return '(ciclo,w)';
    } else {
        // Obtem a linha que o teste ira executar
        var lineOperSplited = arr[indexTestExec].split(" ");
        // Se a prox instrucao a ser executada for um teste
        if (lineOperSplited[0] == 'se') {
            var indexNewTeste;
            // Obtem o indice da prox Linha a ser executada pelo teste, 
            // de acordo com a condicao do teste recebida por parametro(true or false)
            if (isTrue) {
                indexNewTeste = parseInt(lineOperSplited[4]) - 1;
            } else {
                indexNewTeste = parseInt(lineOperSplited[7]) - 1;
            }
            // Rechama a funcao recursiva passando o indico do proximo teste por parametro
            return getOperFromTeste(arr, indexNewTeste, isTrue, firstIndexTest, false);
        } else {
            // Caso a proxima instrucao existir e nao for um teste, retorna a operacao 
            if (lineOperSplited[1] !== undefined && lineOperSplited[3] !== undefined) {
                return '(' + lineOperSplited[1] + ',' + lineOperSplited[3] + ')';    
            } else {
                return '(parada,&)';
            }
        }
    }
}

module.exports = {
    formalizeProgram
}