/**
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
   你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
   你可以按任意顺序返回答案。
 * 
 * @param arr 
 * @param target 
 * @returns 
 */
function getTwoNumberIndex(arr: number[], target: number): number[] {
    let result: number[] = [];

    let map = {};

    for (let i = 0, len = arr.length; i < len; i++) {
        let v = target - arr[i];
        if (map[v] !== undefined) {
            return [map[v], i];
        }

        map[arr[i]] = i;
    }

    return result;
}
