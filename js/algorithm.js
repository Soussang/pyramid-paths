/**
* \brief Allows to search for a max sum path from an array
* \param Array2D, array in which we want to search 
* \author Carl-Vincent L.-D.
* Requires tree_struct.js, array_prototype.js
* 
* Heuristic research of the highest possible value. Can be used for pathfinding with changes.
* TODO: Adding best path (Not the sum, but the nodes that generates the best path)
*/
function max_path_sum(Array2D){
	//Let's start by finding the best approximation of the solution
	//In this solving, the best approximation is the maximum of each line.
	var HofX = Array2D.map(function(line){ return line.max(); });
	//We have to reduce the number of required calculation so well "cache" the HofX
	//by the adding the next one to itself, starting by the bottom
	for(var i = (HofX.length - 1) - 1; i >= 0; i--){
		HofX[i] = HofX[i] + HofX[i+1];
	}
	//We push an additionnal line with 0 for coding reasons
	HofX.push(0);
	
	//Now we need a stack of observable for extension
	var UnevaluatedObservable = new Array();
	
	//Now we need to get our tree... for science.
	var Tree = array_to_binary_tree(Array2D);
	
	//Let's start navigating in it by starting by the root
	var Iterator = Tree; //That was a rough line	
	
	UnevaluatedObservable.push(Iterator);
	while(true){		
		//Now we select the next best possible Iterator from UnevaluatedObservable
		Iterator = UnevaluatedObservable.reduce(function(prev, curr){
			return (prev.value + prev.GofX + HofX[prev.i + 1] > curr.value + curr.GofX + HofX[curr.i + 1] ) ? prev : curr;
		});
		
		//We have the optimal solution when there's no leaf left in the observed tree
		if(Iterator.left == null && Iterator.right == null || UnevaluatedObservable.length == 0){
			break;	//We still love you Dijkstra (Goto statement considered harmfull)
		}
		
		//We calculate leaf's best GofX, which is the sum of the path from the root to get up to the node
		//We push the changed GofX in UnevaluatedObservable
		if(Iterator.left.GofX < Iterator.GofX + Iterator.value){
			Iterator.left.GofX = Iterator.GofX + Iterator.value;
			UnevaluatedObservable.push(Iterator.left);
		}
		
		if(Iterator.right.GofX < Iterator.GofX + Iterator.value){
			Iterator.right.GofX = Iterator.GofX + Iterator.value;
			UnevaluatedObservable.push(Iterator.right);
		}
		
		//We render unique each UnevaluatedObservable (TODO: check if required)
		UnevaluatedObservable = UnevaluatedObservable.unique();
		var index = UnevaluatedObservable.indexOf(Iterator);
		if(index >= 0){
			UnevaluatedObservable.splice(index, 1);
		}
	}
	
	return Iterator.GofX + Iterator.value;
}

/**
* \brief Allows to search the maximum sum path from a 2d array
* \param Array2D, array in which we want to search
* \author Carl-Vincent L.-D.
*
* Bottom up algorithm, clear and neat, but doesn't allow to add the best path easely
*/
function bottom_up(Array2D){
	var Bottom_up_array = Array2D.slice();
	
	//Caching
	var l = Bottom_up_array.length;
	for(i = 1 ; i < l; i++){
		//Current line, which is the maximum line minus the levels we already calculated
		var line = l - i - 1;
		//Line under the current position
		var lowerLine = line + 1;
		//For each cell, we select the maximum under it and add it to itself,
		//so each step only allows picking the best sum possibles
		for(j = 0; j < Bottom_up_array[line].count(); j++){
			var op1 = Bottom_up_array[lowerLine][j];
			var op2 = Bottom_up_array[lowerLine][j + 1];
			Bottom_up_array[line][j] += Math.max(op1, op2);
		}
	}
	
	return Bottom_up_array[0][0];
};