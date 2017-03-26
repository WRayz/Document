/** 此法遇到[-3,2,3], 0，就死。
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    var resultList = [];
    var tempNums = nums.concat();
    var result, count=0;
    
    nums.sort(function(a, b){ return b-a; }).forEach(function(val, index){
        if(val == target) {
            resultList.push(tempNums.indexOf(val));
            tempNums.splice(tempNums.indexOf(val), 1, null);
        }
        else if (val < target){
            if(count > 0){
                if (result + val == target) {
                    resultList.push(tempNums.indexOf(val));
                    return resultList;
                }
            }
            else {
                result = val;
                resultList.push(tempNums.indexOf(val));
                tempNums.splice(tempNums.indexOf(val), 1, null);
                count++;
            }
        }
    });
    
    return resultList.sort();
};

/** 找出所有target的a+b組合，再去匹配，但遇到indexOf的雷 [3,3] 6，就死。
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    var resultList = [], targetList = [];
    var tempNums = nums.concat();
    var result, count=0;
    var flag = false, flag2 = false;
    var temp;
    
    for(var i=0; i <= target; i++){
        targetList.push({a: i, b: target-i});
        targetList.push({a: -i, b: target+i});
        
    }
    
    nums.forEach(function(val, index){
        targetList.forEach(function(item){
            if(temp) {
                console.log(temp);
                
                if (item.a == temp) {
                    flag2 = item.b == val ? true: false;
                }
                else if (item.b == temp){
                    flag2 = item.a == val ? true: false;
                }
            }
            else {
                if (item.a == val) {
                    temp = item.a;
                    flag = true;
                    console.log(2);
                }
                else if (item.b == val) {
                    temp = item.b;
                    flag = true;
                    console.log(3);
                }
            }
        });
        
        if(flag || flag2){
            resultList.push(index);
            flag = false;
        }
    });
    return resultList.sort();
};