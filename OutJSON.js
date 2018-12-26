'use strict';
const fs = require('fs');


class OutJSON{
	constructor(jsonfile){
		this.jsonfile = jsonfile;
		this.obj = {};
	}
	check(name){ //method for checking if file with the same name has already been downloaded
		let count = 0;
		for(let i = 0; i < this.obj.table.length; i++){
			for (let key in this.obj.table[i]){
				if(key === name){
					this.obj.table[i][key] += 1;
					let a = name.lastIndexOf(".");
					name = name.substr(0, a) + "(" + this.obj.table[i][key] + ")" + name.substr(a, name.length);
					fs.writeFile(this.jsonfile, JSON.stringify(this.obj), 'utf8');
					count++;
				}

			}
		}
		if(count === 0){
			this.obj.table[this.obj.table.length] = {[name]: 0};
			fs.writeFile(this.jsonfile, JSON.stringify(this.obj), 'utf8');
		}
		return name;
	}
	showDownloaded(){ //method for pushing all file names to array
		let k = [];
		for (let i = 0; i < this.obj.table.length; i++){
			for (let key in this.obj.table[i]) {
				k.push(key);
			}
		}
		return k;
		
	}
	getData(){ //method for parsing data from json file
		this.obj = JSON.parse(fs.readFileSync(this.jsonfile))
		return JSON.parse(fs.readFileSync(this.jsonfile));
	}
}

exports.OutJSON = OutJSON;
