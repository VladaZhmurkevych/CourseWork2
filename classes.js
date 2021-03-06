'use strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const OutJ = require('./OutJSON');
const Downld = require('./Download');
const Outf = require('./OFile')
const Prs = require('./Parse')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.post('/public', (req, res)=>{ //creating method post which will work, when user click on download
	try {
		let outJson = new OutJ.OutJSON('docs.json', {});
		let heap = outJson.getData();
		const outFile = new Outf.OutputFile(req.body.url, req.body.name);
		const parse = new Prs.Parse(outFile.getUrl());
		const D = new Downld.Download(parse.parseUrl(), outFile.getName(), parse, heap, outJson);
		D.wget((error,flName, size) => {
			if(error){
				return res.json({error:"Data can not be downloaded"})
			}
			else res.json({
				name: flName, size: size})});
	}
	catch (e) {
		console.log(e);
		res.json({error: "You entered wrong information!"})
	}
});
app.post('/downloaded', (req, res)=>{ // creating method for getting file names to client
	let outJson = new OutJ.OutJSON('docs.json');
	let moon = outJson.getData();
	res.json({keys: outJson.showDownloaded()});

});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
