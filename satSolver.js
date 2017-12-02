function readFormula(fileName) {
    var fs = require("fs");
    var data = fs.readFileSync(fileName).toString();
    var text = data.split('\n');
    var getLine = " ";
    for (i = 0; i < text.length; i++) {
        if (text[i].charAt(0) == 'p') {
            getLine = text[i].split(" ");
        }
    }
        var clauses = readClauses(text);
        var variables = readVariables(clauses);
        console.log(variables);
        var specOk = checkProblemSpecification(text, clauses, variables);
        var result = { 'clauses': [], 'variables': [] };
         if (specOk) {
            result.clauses = clauses;
            result.variables = variables;
         }
        return result;
}

function readClauses(text) {
    var getLine = " ";
    for (i = 0; i < text.length; i++) {
        if (text[i].charAt(0) == 'p') {
            getLine = text[i].split(" ");
        }
    }
    var array1 = [];
    var array2 = [];
    var getLine2 = "";
    for (i = 0; i < text.length; i++) {
        if ((text[i].charAt(0) != 'p') && (text[i].charAt(0) != 'c')) {
            getLine2 = text[i].split(" ");
            for (k = 0; k < getLine2.length; k++) {
                if (getLine2[k] != 0) {
                    array2.push(getLine2[k]);
                } else {
                    array1.push(array2);
                    array2 = [];
                }
            }
        }
    }
    return array1;
}

function readVariables(clause) {
    var biggestLength = 0;
    for (i = 0; i < clause.length; i++) {
        for (k = 0; k < clause[i].length; k++) {
            if (Math.abs(clause[i][k]) > biggestLength) {
                biggestLength = clause[i][k];
            }
        }
    }
    var variables = [];
    for (i = 0; i < biggestLength; i++) {
        variables.push(0);
    }
    return variables;
}

function checkProblemSpecification(text, clauses, variables) {
    var getLine;
    specOk = true;
    for (i = 0; i < text.length; i++) {
        specOk = true;
        if (text[i].charAt(0) == 'p') {
            getLine = text[i].split(" ");
        }
    }
    if (clauses.length != parseInt(getLine[3])) {
        specOk = false;
    } else if (variables.length != parseInt(getLine[2])) {
        specOk = false;
    }
    return specOk;
}

function nextAssignment(currentAssignment) {
    
}

console.log(readFormula('hole1.cnf'));
