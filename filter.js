// Innappropriate words filter
function validateWord(word){
	word = word.replace(/\s+/g, '');
	word = word.toLowercase();
	for (var bannedWord of Global.get("restricted")) {
		if (word.includes(bannedWord)){
			return false;
		}
	}
	return true;
}