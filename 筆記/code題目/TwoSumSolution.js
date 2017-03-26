/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    var result = [];
    var myMap = new Map();
    
    for(var i=0; i < nums.length; i++) {
        if(myMap.get(nums[i]) === undefined){
            myMap.set(target - nums[i], i);
        }
        else {
            result[0] = myMap.get(nums[i]);
            result[1] = i;
        }
    }
    
    return result.sort();
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    var result = [];
    var myMap = new Map();
    
    nums.forEach(function(val, index){
        if (myMap.get(val) === undefined) {
            myMap.set(target-val, index);
        }
        else {
            result.push(myMap.get(val), index);
        }
    });
    
    return result.sort();
};