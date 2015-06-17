/**
* \brief Simple binary tree structure
* TODO: Create nTree
*/
function BinaryTree(val, left_tree, right_tree, iPos, jPos){
	this.value = val;
	this.left = left_tree instanceof BinaryTree ? left_tree : null;
	this.right = right_tree instanceof BinaryTree ? right_tree : null;
	
	//For route finding related problems
	this.i = iPos;
	this.j = jPos;
	
	//Route finding related problems, contains the sum of each previous optimal parent's values
	this.GofX = 0;
}

/**
* \brief Create a binary tree out of a table
*
* Needs the first line to have 1 element and + 1 element per line
* TODO: Secure so no value can be empty
*/
function array_to_binary_tree(array2D){
	//We save each created leaves so we can later on proceed to link them
	var tree_loader = new Array();
	
	//Faster than evaluating each time (TODO: check if length is stored)
	height = array2D.length;
	
	//Bottom up approach, allows easier allocation of the tree
	for(var i = height - 1; i >= 0; i--){
		
		var tree_row = new Array();
		for(var j = 0; j < array2D.length; j++){
			var left, right = null;
			//We don't want to add leaves to the last ones
			if(i < height - 1){
				//left is direct descendant
				left = tree_loader[i + 1][j];
				//right is the next position
				right = tree_loader[i + 1][j + 1];
			}
			//Let's add each new trees
			tree_row[j] = new BinaryTree(array2D[i][j], left, right, i, j);
		}
		tree_loader[i] = tree_row;
	}
	
	//Return the root
	return tree_loader[0][0];
}