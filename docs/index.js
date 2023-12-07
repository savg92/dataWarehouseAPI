// import docsSwagger from './docs.json';
var docsSwagger = require('./docs.json');

// import pathsCompanies from './Company/paths.json';
// import pathsApplicates from './Applicant/paths.json';

// import schemaCompany from './Company/schema.json';
// import schemaApplicant from './Applicant/schema.json';

const objConfigSwagger = {
	...docsSwagger,
	paths: {
		// ...pathsCompanies,
		// ...pathsApplicates,
	},
	components: {
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
			},
		},
		schemas: {
			// ...schemaCompany,
			// ...schemaApplicant,
		},
		// "parameters": {}    Create a file for the parameters. "parameters.json"
		// "paths": {}         Create a file for the paths. "paths.json"
		// "responses": {}     Create a file for the responsers. "responses.json"
		// "headers": {}       Create a file for the headers. "headers.json"
	},
};

module.exports = objConfigSwagger;