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
    var result = {'clauses': [], 'variables': []};
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
        variables.push(false);
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
    var binary = "";
    for(i = 0; i < currentAssignment.length; i++){
        if (currentAssignment[i] == true){
            currentAssignment[i] = 1;
        }else{
            currentAssignment[i] = 0;
        }
        binary = binary.concat(currentAssignment[i]);
    }
    var decimal = parseInt(binary,2);
    decimal++;
    var almostReady = decimal.toString(2);
    var almostAssignment = almostAssignment.split("");
    for (i = 0; i < almostAssignment.length; i++){
        currentAssignment[i] = almostAssignment[i];
    }
    for (i = 0; i < currentAssignment.length; i++){
        if(currentAssignment[i] == 0){
            currentAssignment = false;
        }else{
            currentAssignment = true;
        }
    }
    return currentAssignment;
}

function  doSolve(clauses,assignment) {
    var isSat = false;
    var lastAssignment = false;
    while ((!isSat) && (!lastAssignment)) {
        for (i = 0; i < assignment.length; i++){
            if (assignment[i] == 1){
                lastAssignment = true;
            }else {
                lastAssignment = false;
                break;
            }
        }
        
    }
}

console.log(readFormula('hole1.cnf'));
