export const getMonthDay = timestamp => {
    let date = new Date(timestamp * 1000)
    return `${date.getMonth() + 1}/${date.getDay()}`
}



export const urlDecode = (str) => {
    var replaceReverse = ["&", "&amp;", "¥", "&yen;", "<", "&lt;", ">", "&gt;", " ", "&nbsp;", '"', "&quot;", "'", "&#39;"];
    var target = replaceReverse;

    for (var i = 0; i < target.length; i += 2) {
        str = str.replace(new RegExp(target[i], 'g'), target[i + 1]);
    }
    return str;
}