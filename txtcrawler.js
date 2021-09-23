const fs = require('fs');
const readline = require('readline');

function getIndicesOfDiv(line){
	let arr = [];
	for(let i=0; i<line.length; i++){
		if(line[i] === '/'){
			//console.log(line + " "+i);
			arr.push(i);
		}
	}
	return arr;
}

let count = 0;
let lineNo = 0;

async function processLineByLine() {
  const fileStream = fs.createReadStream('Nfe_template.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
  	lineNo++;
    // Each line in file will be successively available here as `line`.
    //console.log(`Line from file: ${line}`);
    findAllDivisionsInLine(line, lineNo);
  }
  console.log("Total Found: "+ count);
}

function findAllDivisionsInLine(line, lineNo){
	let arr = getIndicesOfDiv(line);
    //console.log(arr);

    for (const index of arr){
    	if(line.charAt(index) === '/' 
    		&& line.charAt(index-1) !== '<'
    		&& line.charAt(index-1) !== '"'){
    		count++;
    		console.log(lineNo);
    		console.log(line + "\n");

    	}
    }
}

processLineByLine();