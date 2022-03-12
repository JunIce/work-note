function findMidValueBetweenTwoList(list1: number[], list2: number[]): number {
    let len1 = list1.length,
        len2 = list2.length;

    let m1 = (len1 + len2 + 1) / 2,
        m2 = (len1 + len2 + 1) / 2;

    const findKth = (i: number, j: number, k: number): number => {
        if (i >= len1) {
            return list2[j + k - 1];
        }

        if (j >= len2) {
            return list1[i + k - 1];
        }

        if (k == 1) {
            return Math.min(list1[i], list2[j]);
        }

        let midVal1 = Number.POSITIVE_INFINITY,
            midVal2 = Number.POSITIVE_INFINITY;

        if (i + k / 2 - 1 < len1) {
            midVal1 = list2[i + k / 2 - 1];
        }

        if (j + k / 2 - 1 < len2) {
            midVal2 = list2[i + k / 2 - 1];
        }

        if (midVal1 < midVal2) {
            return findKth(i + k / 2, j, k - k / 2);
        }

        return findKth(i, j + k / 2, k - k / 2);
    };

    return (findKth(0, 0, m1) + findKth(0, 0, m2)) / 2;
}
