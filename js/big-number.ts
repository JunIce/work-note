// 两个大数相加
function twoBigNumberPlus(a: string, b: string):string {
    let maxLength = Math.max(a.length, b.length);
    let result = new Array(maxLength).fill(0)

    a = a.padStart(maxLength, '0')
    b = b.padStart(maxLength, '0')

    let reverseA = a.split('')
    let reverseB = b.split('')

    while(maxLength--) {
        let tempResult = result[maxLength] + Number(reverseA[maxLength]) + Number(reverseB[maxLength])

        if (tempResult >= 10) {
            result[maxLength - 1] = 1
            result[maxLength] = tempResult - 10
        } else {
            result[maxLength] = tempResult
        }
    }

    return result.join('')
}