import { defineComponent, h, reactive } from "vue";

export default defineComponent({
    setup() {
        const state = reactive({ count: 1 })
        return () => h("div", null, state.count)
    }
})