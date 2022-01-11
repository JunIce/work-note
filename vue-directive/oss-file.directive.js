import Vue from "vue";

let cache = {};

const CACHED = false;

Vue.directive("auth-blob", {
  bind: (el, binding) => {
    let src = binding.value;
    if (src) {
      renderImage(el, src);
    }
  },
  update: (el, binding) => {
    let { value, oldValue } = binding;
    if (value !== oldValue) {
      renderImage(el, value);
    }
  },
});

const renderImage = (el, src) => {
  if (CACHED && cache[src]) {
    el.setAttribute("src", cache[src]);
  } else {
    getOssImageBlob(src).then((blob) => {
      if (blob) {
        let file = URL.createObjectURL(blob);
        cache[src] = file;
        el.setAttribute("src", file);
        el.setAttribute("data-oss-file", file)
      }
    });
  }
};

const getOssImageBlob = (url) => {
  return new Promise((resolve, reject) => {
    if (!sessionStorage.getItem("token")) {
      reject(new Error("请先登录"));
    }
    let xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.open(
      "get",
      process.env.VUE_APP_URL +
        "/oss/download/crab?objectName=" +
        encodeURIComponent(url),
      true
    );
    xhr.setRequestHeader(
      "Authorization",
      "bearer " + sessionStorage.getItem("token")
    );
    xhr.onreadystatechange = (e) => {
      if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
        resolve(xhr.response);
      }
    };
    xhr.send(null);
  });
};
