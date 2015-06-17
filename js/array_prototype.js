/**
*	Function's prototype adding to simplify coding
*/

/**
* \brief Get the maximum element of an array
*/			
Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

/**
* \brief Get the minimum element of an array
*/
Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

/**
* \brief Get length of the array/count of elements
* TODO: Should be on non-null objects/filter some information
*/
Array.prototype.count = function(){
	return this.length;
};

/**
* \author Chunong Liu
* \source http://jszen.com/best-way-to-get-unique-values-of-an-array-in-javascript.7.html
*/
Array.prototype.unique = function()
{
	this.sort();
	var re=[this[0]];
	for(var i = 1; i < this.length; i++)
	{
		if( this[i] !== re[re.length-1])
		{
			re.push(this[i]); 
		}
	}
	return re;
} 