import { createApp } from "vue";
import App from "./App.vue";
// import "./plugin/vant";
import {
  ActionBar,
  ActionBarIcon,
  ActionBarButton,
  Divider,
  Popup,
  Overlay,
  Loading,
  Dialog,
  ContactCard,
  Form,
  AddressEdit,
  AddressList,
  Field,
  CellGroup,
  Cell,
  SwipeCell,
  Icon,
  Stepper,
  Card,
  Checkbox,
  CheckboxGroup,
  Button,
  Swipe,
  SwipeItem,
  PullRefresh,
  List,
  Tab,
  Tabs,
  SubmitBar,
  Toast,
  NavBar
} from "vant";
import "vant/lib/index.css"; // 全局引入样式
import store from "./store";
import router from "./router/index";
const app = createApp(App);

// // 全局过滤器
// app.config.globalProperties.$filters = {
//   prefix(url) {
//     if (url && url.startsWith('http')) {
//       return url
//     } else {
//       const preURL = baseURL.substring(0,baseURL.length-4)
//       url = `${preURL}${url}`
//       return url
//     }
//   }
// }
app
  .use(ActionBarButton)
  .use(ActionBarIcon)
  .use(ActionBar)
  .use(Divider)
  .use(Popup)
  .use(Overlay)
  .use(Loading)
  .use(Dialog)
  .use(Toast)
  .use(ContactCard)
  .use(Form)
  .use(AddressEdit)
  .use(AddressList)
  .use(Field)
  .use(CellGroup)
  .use(Cell)
  .use(SwipeCell)
  .use(Icon)
  .use(Stepper)
  .use(Card)
  .use(Button)
  .use(Swipe)
  .use(SwipeItem)
  .use(PullRefresh)
  .use(List)
  .use(Tab)
  .use(Tabs)
  .use(SubmitBar)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(NavBar);

app.use(router);
app.use(store);
app.mount("#app");
