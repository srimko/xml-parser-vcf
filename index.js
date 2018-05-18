const fs = require('fs')
// const parse = require('xml-parser')
// const xml = require("xml-parse");
// const inspect = require('util').inspect;
const xml2js = require('xml2js');
const debug = require('debug')('xml')


// pg3375.xml
let file = 'pg3375.xml'

var parser = new xml2js.Parser();
fs.readFile(file, function(err, data) {
    parser.parseString(data, function (err, result) {

        // data = JSON.stringify(result)
        if(typeof result.exo.titre === "object") {
          console.log(result.exo.titre[0]);
        } else if (typeof result.exo.titre === "string"){
          console.log(result.exo.titre);
        }
        console.log(result.exo.consigne);
        // console.log(result.$.consigne);
    });
});
// let content = fs.readFileSync('pg3375.xml', 'utf8');
// let parsedXML = xml.parse(content);
//
// console.log(parsedXML);

//
// let obj = parse(xml);
// console.log(obj);
