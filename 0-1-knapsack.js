/*
Question: Given a list of items with values and weights, as well as a max weight, find the
maximum value you can generate from items where the sum of the weights is less than
the max.
eg.
items = {(w:1, v:6), (w:2, v:10), (w:3, v:12)}
maxWeight = 5
knapsack(items, maxWeight) = 22

*/


// Recursive SOlution


function knapSack(items, maxWeight){

  return helper(items,0, maxWeight, 0)

}

function helper(items,start, remainingWeight, currentValue ){

  if (start>=items.length){
    return currentValue
  }

  let maxValueIncludingCurrentElement = -1
  const maxValueExcludingCurrentElement = helper(items, start+1, remainingWeight, currentValue)

  if ((remainingWeight - items[start].w) >0 ){
       maxValueIncludingCurrentElement = helper(items, start+1, remainingWeight - items[start].w, currentValue + items[start].v)
  } else if(remainingWeight - items[start].w === 0) {
       maxValueIncludingCurrentElement = currentValue + items[start].v
  }

  return Math.max(maxValueIncludingCurrentElement, maxValueExcludingCurrentElement)

}

//DP approach

function DPSolution (items,maxWeight){
    [


}



console.log(knapSack([{w:1, v:6}, {w:2, v:10}, {w:3, v:12}],5))