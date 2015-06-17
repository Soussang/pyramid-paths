/**
*	Function's prototype adding to simplify coding
*/

/**
* \brief Allows to transform a string to a 1D_array
* \param word_separator, regex that determines different cells
*
* Basically a string.split. Use array.map to parse to other values
*/
String.prototype.to_1D_array = function(word_separator){
	word_separator = word_separator instanceof RegExp ? word_separator : /\s/;
	return this.split(word_separator);
};

/**
* \brief Allows to transform a string to a 2D_array
* \param word_separator, regex that determines different cells in a line
* \param line_separator, regex that determines different lines
*
* Basically a string.split with an extra dimension. Use array.map(function(elem){elem.map... to parse to other values
*/
String.prototype.to_2D_array = function(word_separator, line_separator){
	word_separator = word_separator instanceof RegExp ? word_separator : /\s/;
	line_separator = line_separator instanceof RegExp ? line_separator : /\n/;
	
	return this.split(line_separator).map(function(element){ return element.split(word_separator); });
}