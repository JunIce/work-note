<template>
  <div>
    <p>wave</p>
  </div>
</template>

<script>
import { onMounted } from "vue";

import VideoSource from "./208.mp4";

window.AudioContext = window.AudioContext || window.webkitAudioContext;

export default {
  setup() {
    const audioContext = new AudioContext();

    const readAudioSource = () => {
      fetch(VideoSource)
        .then((res) => res.arrayBuffer())
        .then((res) => audioContext.decodeAudioData(res))
        .then((res) => {
          console.log(res.getChannelData(0));
          console.log(filterData(res))
        });
    };

    const filterData = (audioBuffer) => {
      const rawData = audioBuffer.getChannelData(0);
      const samples = 70;
      const blockSize = Math.floor(rawData.length / samples);
      const filteredData = [];
      for (let i = 0; i < samples; i++) {
        let blockStart = blockSize * i;
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
          sum = sum + Math.abs(rawData[blockStart + j]);
        }
        filteredData.push(sum / blockSize);
      }
      return filteredData;
    };

    onMounted(() => {
      readAudioSource();
    });
  },
};
</script>

<style></style>
