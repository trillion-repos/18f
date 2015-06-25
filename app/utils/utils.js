module.exports.getLocaltime = function(){
	var offset = (new Date().getTimezoneOffset() / 60) * -1 * 3600000;
	return new Date(new Date().getTime() + offset).toJSON();	
};

if (typeof String.prototype.capitalize != 'function') {
	String.prototype.capitalize = function(lower) {
	    return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
	};
}


if (typeof String.prototype.startsWith != 'function') {
	  String.prototype.startsWith = function (str){
	    return this.slice(0, str.length) == str;
	  };
	}

if (typeof String.prototype.replaceAll != 'function') {
	  String.prototype.replaceAll = function (find, replace){
	    return this.replace(new RegExp(escapeRegExp(find), 'g'), replace);
	  };
	}


function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}



