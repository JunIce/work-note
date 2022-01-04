import { loop } from "../util"



export const useForbidMouseWheel = () => {
    document.addEventListener('wheel', loop)
}
