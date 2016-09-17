var jsonfile = require('jsonfile'),
  config = require('./config');

var word1 = [
	'moder',
	'folk',
	'gammel',
	'multi',
	'bred',
	'milennie',
	'cyber',
	'kabel',
	'tjock',
	'webb',
	'data',
	'hem',
	'html',
	'blink',
	'cd'
]

var word2 = [
	'modems',
	'aktie',
	'medie',
	'bands',
	'rymds',
	'buggs',
	'delnings',
	'side',
	'motor',
	'grupps',
	'bubble',
	'enhets',
	'portals',
	'handels',
	'frames',
	'dator'
]

var word3 = [
	'modem',
	'teknik',
	'portal',
	'tecken',
	'tabell',
	'modul',
	'taggen',
	'anslutning',
	'plats',
	'sida',
	'bubbla',
	'ikon',
	'hotell',
	'applet',
	'handel',
	'uppkoppling',
	'plugin',
	'gif',
	'buggen',
	'avatar',	
	'ekonomin',
	'bolaget',
	'fabriken',
	'konto',
	'dator',
	'paket',
	'skiva',
	'spelare',
	'chat',
	'disk',
	'forum',
	'editor',
	'kaka',
	'server',
	'rymd',
  'webben'
]

var words = [];

for (var i = 0; i < word1.length; i++){
	for (var j = 0; j < word2.length; j++){
		for (var k = 0; k < word3.length; k++){
			words.push(word1[i] + word2[j] + word3[k]);
		}
	}
}

var randomWords = [];

while (words.length > 0){
	randomWords.push(words.splice(Math.floor(Math.random() * words.length),1)[0]);
}

jsonfile.writeFile(config.shorlJsonFilePath, randomWords, function (err) {
  console.log(err);
});