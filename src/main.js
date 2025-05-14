import '@/assets/styles/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// 只需在此处 import icon，不要在组件里重复
import { faMinus, faPlus, faChevronUp, faChevronDown, faTrashAlt, faMagnifyingGlass, faUser, faBagShopping, faBars, faCaretRight, faCaretLeft, faCrown, faMedal, faXmark} from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faLine, faInstagram } from '@fortawesome/free-brands-svg-icons'

// 把你要用到的 icon 全部加进 library
library.add(faMinus, faPlus, faFacebook, faLine, faInstagram, faChevronUp, faChevronDown, faTrashAlt, faMagnifyingGlass, faUser, faBagShopping, faBars, faCaretRight, faCaretLeft, faCrown, faMedal, faXmark)

const app = createApp(App)
app.use(createPinia())
app.use(router)
// 注册组件一次，全局可用
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')