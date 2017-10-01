var lineIndex = 0;

/**
 * Funcao criada para formalizar um program
 * 
 * @param {Array} program Todas as instrucoes do program inicial
 */
const formalizeProgram = (program, p) => {

    if (p == 0) { lineIndex = 0; contOper = 1; }


    var programFormalized = '';
    program = enumararInstrucoes(program);

    program.forEach((programLineObj, programLineIndex) => {
        // Verifica se a linha do program eh uma operacao ou um teste
        if (programLineObj.type === "test") {
            // Somente executa um teste como se fosse uma operacao, se for o inicio do program
            if (programLineObj.index === 0) {
                var labeledInstructionFromTestTrue = getLabeledInstructionByTeste(program, programLineObj.indexOperTrue, true, programLineObj.index);
                var labeledInstructionFromTestFalse = getLabeledInstructionByTeste(program, programLineObj.indexOperFalse, false, programLineObj.index);
                programFormalized += ++lineIndex + ": " + labeledInstructionFromTestTrue + ", " + labeledInstructionFromTestFalse + "\n";
            }
        } else {
            // Acrescenta uma linha ao program formalizado
            programFormalized += ++lineIndex + ": " + getLabeledInstructionsByOper(program, programLineObj.indexNextOper) + "\n";
        }
    });

    return programFormalized;
}

/**
 * Funcao criada para obter as instrucoes rotuladas 
 * a ser executada por uma operacao
 * 
 * @param {Array} program 
 * @param {Number} indexNextOper 
 */
const getLabeledInstructionsByOper = (program, indexNextOper) => {
    // Obtem o indice da linha que a operacao ira executar
    var oper = program.filter((item) => {
        if (item.index === indexNextOper - 1/** -1 pois o indice do array comeca com 0*/) {
            return item;
        }
    })[0];

    if (oper !== undefined) {
        // Verifica se a operacao eh um teste
        if (oper.type === "test") {
            // Se for um teste, obtem o rotulo que ira executar
            var labeledInstructionFromTestTrue = getLabeledInstructionByTeste(program, oper.indexOperTrue, true, oper.index);
            var labeledInstructionFromTestFalse = getLabeledInstructionByTeste(program, oper.indexOperFalse, false, oper.index);
            return labeledInstructionFromTestTrue + ', ' + labeledInstructionFromTestFalse;
        } else {
            // Se nao for um teste, simplismente retorna o rotulo da operacao
            return oper.labeledInstruction + ', ' + oper.labeledInstruction;
        }
    } else {
        // Se a proxima instrucao a ser executada nao existir, retorna uma parada
        return '(parada,Σ), (parada,Σ)';
    }
}

/**
 * Funcao recursiva criada para obter a instrucao rotulada 
 * a ser executada por um teste ou mais testes encadeados
 * 
 * @param {Array} program Todas as instrucoes do program inicial enumaeradas
 * @param {Number} indexOperFromTeste Indice da linha que o teste ira executar
 * @param {Boolean} isIndexOperFromTesteTrue Especifica se eh para retornar a instrucao verdadeira ou falsa do teste
 * @param {Number} firstIndexTest Indice do primeiro teste quando foi chamado a funcao(usado para detectar ciclo infinito)
 */
const getLabeledInstructionByTeste = (program, indexOperFromTeste, isIndexOperFromTesteTrue, firstIndexTest) => {
    // Obtem o indice da linha que o teste ira executar
    var operFromTeste = program.filter((item) => {
        if (item.index === indexOperFromTeste) {
            return item;
        }
    })[0];

    if (operFromTeste !== undefined) {
        // Verifica se possuem testes encadeados
        if (operFromTeste.type === "test") {
            // Caso o teste encadeado for igual ao primeiro teste, eh um ciclo inifito
            if (firstIndexTest === operFromTeste.index) {
                return '(ciclo,ω)';
            }
            // Se nao for um ciclo infinito, rechama a funcao ate encontrar a operacao true ou false(conforme recebido pelos parametros)
            if (isIndexOperFromTesteTrue) {
                return getLabeledInstructionByTeste(program, operFromTeste.indexOperTrue, isIndexOperFromTesteTrue, firstIndexTest)
            } else {
                return getLabeledInstructionByTeste(program, operFromTeste.indexOperFalse, isIndexOperFromTesteTrue, firstIndexTest)
            }
        } else {
            // Se nao for um teste, retorna a instrucao rotulada da operacao
            return operFromTeste.labeledInstruction;
        }
    } else {
        // Se a proxima instrucao a ser executada pelo teste nao existir, retorna uma parada
        return '(parada,Σ)';
    }
}

var contOper = 1;

/**
 * Funcao criada para organizar as linhas do program em uma lista de objetos,
 * enumerando as instrucoes e os testes
 * 
 * @param {Array} arr Todas as instrucoes do program inicial
 */
const enumararInstrucoes = (arr) => {

    // Remove os elementos do array que nao nao possuem nenhum valor
    arr = arr.split('\n').filter(function (item) {
        if (item !== "") {
            return item;
        }
    });

    // O primeiro rotulo inicia com 2 por que a partida e considerado o primeiro
    contOper++;

    var newArr = [];
    arr.filter((programLine, index) => {
        var programLineSplited = programLine.split(" ");
        if (programLineSplited[0] === 'se') {
            newArr[index] = {
                index: index,
                type: 'test',
                indexOperTrue: parseInt(programLineSplited[4]) - 1, //indice da linha que ira ser executada se a condicao for verdadeira 
                indexOperFalse: parseInt(programLineSplited[7] - 1), //indice da linha que ira ser executada se a condicao for falsa 
            };
        } else {
            newArr[index] = {
                index: index,
                labeledInstruction: '(' + programLineSplited[1] + ',' + contOper + ')',
                type: 'oper',
                indexNextOper: parseInt(programLineSplited[3])
            };
            contOper++;
        }
    })
    return newArr;
}

module.exports = {
    formalizeProgram
}