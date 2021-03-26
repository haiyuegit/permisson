import Vue from 'vue'
import {
  Pagination,
  Dialog,
//   Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
//   Switch,
  Select,
  Option,
//   OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
//   TimeSelect,
//   TimePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
//   Alert,
//   Slider,
  Icon,
  Row,
  Col,
  Upload,
//   Progress,
//   Badge,
  Card,
//   Rate,
//   Steps,
//   Step,
//   Carousel,
//   CarouselItem,
//   Collapse,
//   CollapseItem,
  Cascader,
//   ColorPicker,
  // Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Loading,
  MessageBox,
  Message,
  Notification,
  
} from 'element-ui';


import App from './App.vue'
import router from './router'
import store from './store'

import service from './service'
import methodPlu from './components/common/mixMethods'
import auth from './router/auth'
import utils from './lib/utils'
import filters from './lib/filter'
import dataConfig from './config/dataConfig'
import selectData from './config/rewardSelectData'
//二级和三级联动（省，市，区）
import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'

import 'element-ui/lib/theme-chalk/index.css';
import './assets/style/css.css';

Vue.config.productionTip = false

// Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.use(Pagination);
Vue.use(Dialog);
// Vue.use(Autocomplete);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
// Vue.use(Switch);
Vue.use(Select);
Vue.use(Option);
// Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
// Vue.use(TimeSelect);
// Vue.use(TimePicker);
Vue.use(Popover);
Vue.use(Tooltip);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Tag);
Vue.use(Tree);
// Vue.use(Alert);
// Vue.use(Slider);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
// Vue.use(Progress);
// Vue.use(Badge);
Vue.use(Card);
// Vue.use(Rate);
// Vue.use(Steps);
// Vue.use(Step);
// Vue.use(Carousel);
// Vue.use(CarouselItem);
// Vue.use(Collapse);
// Vue.use(CollapseItem);
Vue.use(Cascader);
// Vue.use(ColorPicker);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);

Vue.use(Loading.directive);
//注册组件公共方法
Vue.use(methodPlu)
//注册权限控制
Vue.use(auth,router)

Vue.prototype.$ELEMENT = { size: 'small'};
// Vue.use(utils,router)
Vue.use(provinceAndCityData);
Vue.use(regionData);
Vue.use(provinceAndCityDataPlus);
Vue.use(regionDataPlus);
Vue.use(CodeToText);
Vue.use(TextToCode);

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

Vue.prototype.$provinceAndCityData = provinceAndCityData;
Vue.prototype.$regionData = regionData;
Vue.prototype.$provinceAndCityDataPlus = provinceAndCityDataPlus;
Vue.prototype.$regionDataPlus = regionDataPlus;
Vue.prototype.$CodeToText = CodeToText;
Vue.prototype.$TextToCode = TextToCode;

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.prototype.$service = service
Vue.prototype.$systemList = [];
Vue.prototype.$utils = utils
Vue.prototype.dataConfig = dataConfig
Vue.prototype.selectData = selectData
Vue.prototype.baseURL = process.env.VUE_APP_URL;


window.isPermission = false; //是否开启权限菜单


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
