function readFormula(fileName) {
    var fs = require("fs");
    var data = fs.readFileSync(fileName).toString();
    var text = data.split('\n');
    var clauses = readClauses(text);
    var variables = readVariables(clauses);
    var specOk = checkProblemSpecification(text, clauses, variables);
    var result = {'clauses': [], 'variables': []};
    if (specOk) {
        result.clauses = clauses;
        result.variables = variables;
    }else{
        result.clauses = ["Numero de clausulas ou variáveis não confere"];
        result.variables = [];
    }
    return result;
}

function readClauses(text) {
    var array1 = [];
    var array2 = [];
    var getLine = "";
    for (i = 0; i < text.length; i++) {
        if ((text[i].charAt(0) != 'p') && (text[i].charAt(0) != 'c')) {
            getLine = text[i].split(" ");
            for (k = 0; k < getLine.length; k++) {
                if (getLine[k] != 0 && (getLine[k] != "")) {
                    array2.push(getLine[k]);
                } else if (getLine[k] == "0" || getLine[k] == "0\r") {
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
    var specOk = true;
    for (i = 0; i < text.length; i++) {
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
        binary = "" + currentAssignment[i];
        if (i != 0) {
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
    for (i = almostAssignment.length - 1; i >= 0; i--) {
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
    if(clauses == "Numero de clausulas ou variáveis não confere"){
        lastAssignment = true;
    }
    while ((!isSat) && (!lastAssignment)) {
        var clausesBoolean = [];
        var almostSat = true;
        for (i = 0; i < assignment.length; i++) {
            if (assignment[i] == 1) {
                lastAssignment = true;
            } else {
                lastAssignment = false;
                break;
            }
        }
        for (i = 0; i < clauses.length; i++) {
            for (k = 0; k < clauses[i].length; k++) {
                var isTrue = false;
                for (u = 1; u < assignment.length + 1; u++) {
                    if (Math.abs(parseInt(clauses[i][k])) == u) {
                        if (clauses[i][k] == u) {
                            if (assignment[u - 1] == true) {
                                clausesBoolean.push(true);
                                isTrue = true;
                            }
                            break;
                        } else {
                            if (assignment[u - 1] == false) {
                                clausesBoolean.push(true);
                                isTrue = true;
                            }
                            break;
                        }
                    }
                }
                if (isTrue) {
                    break;
                } else if (k == clauses[i].length - 1 && !isTrue) {
                    clausesBoolean[i] = false;
                    almostSat = false;
                }
            }
            if (almostSat == false) {
                break;
            }
        }
        if (!almostSat) {
            assignment = nextAssignment(assignment);
        } else {
            isSat = true;
        }
    }
    var result = {'isSat': isSat, satisfyingAssignment: null}
    if (isSat) {
        result.satisfyingAssignment = assignment;
    }
    return result;
}

exports.solve = function (fileName) {
    var formula = readFormula(fileName);
    var result = doSolve(formula.clauses, formula.variables);
    return result;
}
