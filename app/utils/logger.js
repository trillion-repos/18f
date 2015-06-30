var winston = require('winston');
winston.emitErrs = true;

// Return the last folder name in the path and the calling
// module's filename.
var getLabel = function(callingModule) {
    var parts = callingModule.filename.split('/');
    return parts[parts.length - 2] + '/' + parts.pop();
};


var logger = function(callingModule) {
  return new winston.Logger({
      transports: [
          new winston.transports.File({
              label: getLabel(callingModule),
              level: 'error',
              filename: './all-logs.log',
              handleExceptions: true,
              json: true,
              maxsize: 25000000, //25MiB
              maxFiles: 1,
              colorize: false
          }),
          new winston.transports.Console({
              label: getLabel(callingModule),
              level: 'debug',
              handleExceptions: true,
              json: false,
              colorize: true
          })
      ],
      exitOnError: false
  });
};

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};
