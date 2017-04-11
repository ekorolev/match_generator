const fs = require("fs");
const path = require("path");
const Generator = require("./source/generator");

const Start = () => {
	let MatchJSON_txt = fs.readFileSync("match.json", "utf-8");
	let MatchJSON = JSON.parse( MatchJSON_txt );

	MatchJSON = Generator( MatchJSON );
	MatchJSON_txt = JSON.stringify(MatchJSON, null, "\t");

	fs.writeFileSync("match.json", MatchJSON_txt, "utf-8");
};

Start();