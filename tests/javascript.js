var a = 42;
console.log(typeof(a));
var a = "saurabh";
console.log(typeof(a));
let arr = [12,43,23,20,70];
console.log(arr[1]);
console.log(arr.length);
arr.push(100)
console.log(arr);
arr.pop();
console.log(arr);
arr.sort();
console.log(arr);
arr.reverse();
console.log(arr);


// Reduce

let sum = arr.reduce((sum, value)=> sum+value,0);
console.log(sum);

let max = arr.reduce((max,value)=>value>max?value:max,arr[0]);
console.log(max);

// filter
let evenArr = arr.filter(value=>value%2==0);
console.log(evenArr);

// map
let doubleArr = arr.map(value => value+2);  
console.log(doubleArr);