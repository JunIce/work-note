import emojiList from "./emoji.json";
const emojiMap = emojiList.reduce((resultMap, item) => {
  resultMap[item.group] = resultMap[item.group] || [];
  resultMap[item.group].push(item);
  return resultMap;
}, {});

export default {
  created() {
    this.emojiList = emojiMap["Smileys & Emotion"];
  }
}