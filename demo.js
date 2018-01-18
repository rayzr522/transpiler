const transpiler = require('.');

let input = process.argv.slice(2).join(' ') || `
x = hello( "world" 5 );
callFunc( method_name("So amazing" 5 "such wow") )
"ayyy"
z = transform("hello, there") ; println("we support multiple statements on one line :D")
`;

let output = transpiler.compile(input);
