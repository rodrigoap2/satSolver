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
    var binaryConcat = "";
    var allZero = true;
    var decimal;
    for (i = 0; i < currentAssignment.length; i++) {
        if (currentAssignment[i] == true) {
            currentAssignment[i] = 1;
            allZero = false;
        } else {
            currentAssignment[i] = 0;
        }
        binary = ""+currentAssignment[i];
        if(i != 0){
            binary = binary.concat(binaryConcat);
        }
        binaryConcat = binary;
    }
    if (allZero) {
        decimal = 1;
    } else {
        decimal = parseInt(binary, 2);
        decimal++;
    }
    var almostReady = decimal.toString(2);
    var almostAssignment = almostReady.split("");
    var f = 0;
    for (i = almostAssignment.length-1; i >= 0; i--) {
        currentAssignment[f] = almostAssignment[i];
        f++;
    }
    for (i = 0; i < currentAssignment.length; i++) {
        if (currentAssignment[i] == 0) {
            currentAssignment[i] = false;
        } else {
            currentAssignment[i] = true;
        }
    }
    return currentAssignment;
}

function doSolve(clauses, assignment) {
    var isSat = false;
    var lastAssignment = false;
    var inicialClause = clauses;
    while ((!isSat) && (!lastAssignment)) {
        for (i = 0; i < assignment.length; i++) {
            if (assignment[i] == 1) {
                lastAssignment = true;
            } else {
                lastAssignment = false;
                break;
            }
        }
        for (i = 0; i < clauses.length; i++){
            for (k = 0; k < clauses[i].length; k++){
                var isFalse = true;
                for (u = 1; u <= assignment.length; u++){
                    if(Math.abs(clauses[i][k]) == u){
                        if (clauses[i][k] == u){
                            clauses[i][k] = assignment[u-1];
                        }else{
                            clauses[i][k] = (!assignment[u-1]);
                        }
                    }
                }
                if (clauses[i][k] == true){
                    clauses[i] = true;
                    isFalse = false;
                    break;
                }else if(k == clauses[i].length-1){
                    clauses[i] = false;
                }
            }
        }
        for (i = 0; i < clauses.length; i++){
            if (clauses[i] == false){
                isSat = false;
                break;
            }else {
                isSat = true;
            }
        }
        if (!isSat && !lastAssignment) {
            assignment = nextAssignment(assignment);
            doSolve(inicialClause,assignment);
        }
    }
    var result = {'isSat' : isSat, satisfyingAssignment: null}
    if (isSat){
        result.satisfyingAssignment = assignment;
    }
    return result;
}

exports.solve = function (fileName) {
    var formula = readFormula(fileName);
    var result = doSolve(formula.clauses, formula.variables);
    return result;
}
