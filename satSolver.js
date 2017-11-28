function readFormula(fileName) {
    var fs = require("fs");
    var data = fs.readFileSync(fileName).toString();
    var text = data.split('\n');
    var getLine = " ";
    for (i = 0;i < text.length;i++){
        if (text[i].charAt(0) == 'p'){
            getLine = text[i].split(" ");
        }
    }
    var clauses = readClauses(text);
    console.log(clauses);
    var variables = readVariables(clauses);
}
function readClauses(text) {
    var getLine = " ";
    for (i = 0;i < text.length;i++){
        if (text[i].charAt(0) == 'p') {
            getLine = text[i].split(" ");
        }
    }
    var array1 = [];
    var array2 = [];
    var getLine2 = "";
    for (i = 0; i < text.length; i++){
        if((text[i].charAt(0) != 'p') && (text[i].charAt(0) != 'c')){
            getLine2 = text[i].split(" ");
            for (k = 0; k < getLine2.length; k++){
                if(getLine2[k] != 0){
                    array2.push(getLine2[k]);
                }else{
                    array1.push(array2);
                    array2 = [];
                }
            }
        }
    }
    return array1;
}
function readVariables(clause) {

}
readFormula('hole1.cnf');
