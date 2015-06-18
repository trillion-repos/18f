'use strict';

module.exports = {
	db: '/home/me/tingo',
	isaacHome: 'http://ccdoc4j3vm01.femaeadis.com/famsRuWeb/home',
	sessionMaxAgeInMin: 30,
	sftpServerAddress : 'ccdifmisvm01.femaeadis.com',
	sftpServerPort: 22,
	sftpServerUsername: 'ocfo_sts',
	sftpServerPath: '/home/ocfo_sts/data/',
	sftpServerKeyFile: '',
	sftpServerPassword: 'ocfosts123',
	famsDbSettings: {
		minConn: 1,
		maxConn: 15,
		incrConn: 1,
		timeout: 3600,
		tns: "(DESCRIPTION= (ADDRESS= (PROTOCOL=TCP)(HOST=ccdrh10.femaeadis.com)(PORT=1521))(CONNECT_DATA= (SERVICE_NAME=edev9.femaeadis.com)))",
		user: 'cafs_svc',
		password: 'cafs_svc_dev'	
	},
	app: {
		title: 'cafs - Development Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || 'APP_ID',
		clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
