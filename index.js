const http = require("http");
const path = require("path");
const fs = require("fs");

let productPath = path.join(__dirname, "ProductList");
let indexPage = fs.readFileSync(path.join(__dirname, "index.html"));

let server = http.createServer((request, response) => {
    if (request.url == "/add" && request.method == "POST") {
        addJProductToList(request,response);
    }
        else if (request.url == "/addProduct?" && request.method == "GET") {
        getproduct(request, response);
    }
    else{
        indexPage = fs.readFileSync(path.join(__dirname, "index.html"));
        response.writeHead("200", { 'Content-Type': 'text/html' });
        response.end(indexPage);
    }});

server.listen(3333);

function addJProductToList(req, res) {

    let data = "";
    req.on('data', (chunk) => {
        data += chunk;
    });

    req.on("end", () => {
        searchParams = new URLSearchParams(data);
        
        productJsonObj = {
            productName: searchParams.get('ProductName'),
            productCost: searchParams.get('ProductCost')
        }
            let pathProductFile = path.join(productPath,productJsonObj)
            fs.writeFileSync(path.join(pathProductFile, JSON.stringify(productJsonObj)));
            res.end();
           
    });
}
  
function getproduct(req, res) {
    let productName = fs.readdirSync(productPath);
    res.end(JSON.stringify(getproduct(productName)));
}
