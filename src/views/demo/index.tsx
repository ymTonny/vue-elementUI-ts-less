import { Component, Vue } from "vue-property-decorator";
import { Button } from "element-ui";
@Component
export default class Demo extends Vue {
  created() {
    Vue.use(Button);
  }
  protected render() {
    return <el-button type="primary">123</el-button>;
  }
}
