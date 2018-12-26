'use strict';

class OutputFile {
	constructor(url, name){
		this.url = url;
		this.name = name;
	}
	getUrl(){ //method for getting url
		return this.url;
	};
	getName(){ //method for getting name
		return this.name;
	}
}

exports.OutputFile = OutputFile;
