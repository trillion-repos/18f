module.exports.getLocaltime = function(){
	var offset = (new Date().getTimezoneOffset() / 60) * -1 * 3600000;
	return new Date(new Date().getTime() + offset).toJSON();	
};

