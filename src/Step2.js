/**
 * Funcao criada para gerar a cadeia de conjuntos de um programa
 */
const generateChainSets = (programa) => {
    
        // Remove os elementos do array que nao nao possuem nenhum valor
        programa = programa.split('\n').filter(function(item) {
            if (item !== "") {
                return item;
            }
        });
    
        var chainSetLineCounter = 0; // Contador dos conjuntos gerados
    
        // Variavel acumuladora criada para concatenar todos os conjuntos gerados
        // Ex: '2 = {&; 4; 3}'
        var programChainSets = chainSetLineCounter + ' = {&} \n';
        
        // Variavel acumuladora criada com o intuito de armazenar os valores dos 
        // conjuntos anteriores, separado do indice da nova linha gerada
        // para concatena-los com os novos conjuntos gerados. Ex: '; 4; 3; 1'
        var chainSet = ""; 
        
        // Obtem o indice da ultima parada do programa
        var lastStopIndex = getLastStopIndex(programa);
        if (lastStopIndex === -1) {
            return 'O programa nao possui paradas!'
        }
    
        // Percorre de baixo pra cima as linhas do programa formalizado 
        // a partir do indice da ultima parada
        for (var i = lastStopIndex; i >= 0; i--) {
            // Para cada linha percorrida, gera um novo conjunto
            chainSetLineCounter++;
            var lineSplited = programa[i].split(" ");
    
            // Para cada linha percorrida de baixo para cima, 
            // verifica todas as linhas buscando as operacoes que sao iguais
            for (var x = programa.length -1; x >= 0; x--) {
                var subLineSplited = programa[x].split(" ");
                // Compara as operacoes das linhas sendo percorridas
                if ((lineSplited[1] === subLineSplited[1]) && (lineSplited[2] === subLineSplited[2])) {
    
                    // Verifica se a linha sendo percorrida ja esta em algum conjunto
                    var novoValor = '; ' + subLineSplited[0].split(':')[0]; // 2: (G,1), (G,1) 
                    if (programChainSets.indexOf(novoValor) === -1) {
                        // Caso nao esteja, o seu indice e adicionado no conjunto
                        chainSet += novoValor;
                    }
                }
            }
    
            var currentChainSet = chainSetLineCounter + ' = {&' + chainSet + '}' + '\n';
            // Verifica se o novo conjunto ja foi gerado anteriormente
            var indexOf = programChainSets.indexOf(currentChainSet.split('= ')[1]); // 1 = {&; 10}
            if (indexOf === -1) {
                programChainSets += currentChainSet;
            }
        }
    
        return programChainSets;
    };
    
    /**
     * Funcao criada para obter o indice da ultima parada do programa formalizado
     * 
     * @param {Array} arr Todas as instrucoes do programa inicial
     */
    const getLastStopIndex = (arr) => {
        var index = -1;
        // Percorre todas as linhas do programa formalizado
        for (var lineIndex = 0; lineIndex < arr.length; lineIndex++) {
            // Divide a linha de acordo com os espacos em brancos
            var lineSplited = arr[lineIndex].split(" ");
    
            // Verifica se a operacao eh uma parada
            if (lineSplited[1] === '(parada,&),') {
                index = lineIndex;
            }
        };
    
        return index;
    }
    
    module.exports = {
        generateChainSets
    }