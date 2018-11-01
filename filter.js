// Innappropriate words filter
function validateWord(word){
	for (var bannedWord of Global.get("restricted")) {
		if (word === bannedWord){
			return false;
		}
	}
	return true;
}