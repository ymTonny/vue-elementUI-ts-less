// export enum StylePosition {
//   /**
//    * **default**
//    * static
//    * @version
//    * CSS2
//    */
//   static = 'static',
//   /**
//    * **生成绝对定位的元素，相对于static定位以外的第一个父元素进行定位**
//    */
//   absolute = 'absolute',
//   /**
//    * **生成绝对定位的元素，相对于浏览器的窗口进行定位**
//    */
//   fixed = 'fixed',
//   /**
//    * **生成相对定位的元素，相对于其他正常位置进行定位**
//    */
//   relative = 'relative',
//   /**
//    * **规定应该从父元素继承`position的值`**
//    */
//   inherit = 'inherit',
// }
type StylePosition = 'static' | 'absolute' | 'fixed' | 'relative' | 'inherit';
/**
 * @hidden
 * 元素是不可见的
 * @visible
 * 默认值，元素是可见的
 * @collapse
 * 当在表格元素中使用时，此值可删除一行或一列，但是它不会影响表格的布局，被行或列占据的空间会留给其他内容使用，如果此值被用在其他元素上，会呈现为`hidden`
 * @inherit
 * 规定应该从父元素继承`visibility`属性的值
 */
export type StyleVisible = 'hidden' | 'visible' | 'collapse' | 'inherit';
type StyleCursor =
  | 'url'
  | 'default'
  | 'auto'
  | 'crosshair'
  | 'pointer'
  | 'move'
  | 'e-resize'
  | 'ne-resize'
  | 'nw-resize'
  | 'n-resize'
  | 'se-resize'
  | 'sw-resize'
  | 's-resize'
  | 'w-resize'
  | 'text'
  | 'wait'
  | '-webkit-grabbing'
  | 'help';
type StyleDisplay =
  | 'none'
  | 'block'
  | 'inline'
  | 'inline-block'
  | 'list-item'
  | 'run-in'
  | 'compact'
  | 'marker'
  | 'table'
  | 'inline-table'
  | 'table-row-group'
  | 'table-header-group'
  | 'table-footer-group'
  | 'table-row'
  | 'table-column-gourp'
  | 'table-column'
  | 'table-cell'
  | 'table=caption'
  | 'inherit'
  | '';
export interface CSSStyle {
  /**
   * **规定元素的定位类型**
   * @version
   * CSS2
   */
  position?: StylePosition;
  /**
   * **设置定位元素下外边距边界与其包含块下边界之间的偏移**
   * @version
   * CSS2
   */
  bottom?: string | number;
  /**
   * **规定元素的哪一侧不允许其他浮动元素**
   * @version
   * CSS1
   */
  clear?: string;
  /**
   * **剪裁绝对定位元素**
   * @version
   * CSS2
   */
  clip?: string;
  /**
   * **规定要显示的光标的类型（形状）**
   * @version
   * CSS2
   */
  cursor?: StyleCursor;
  /**
   * **规定框是否应该浮动**
   * @version
   * CSS1
   */
  float?: string;
  /**
   * **设置定位元素左外边距边界与其包含块左边界之间的偏移**
   * @version
   * CSS2
   */
  left?: string | number;
  /**
   * **规定当内容溢出元素框时发生的事情**
   * @version
   * CSS2
   */
  overflow?: string;
  overflowX?: string;
  overflowY?: string;
  /**
   * **规定元素应该生成的框的类型**
   * @version
   * CSS1
   */
  display?: StyleDisplay;
  /**
   * **设置定位元素右外边距边界与其包含块右边界之间的偏移**
   * @version
   * CSS2
   */
  right?: string | number;
  /**
   * **设置定位元素的上外边距边界与其包含块上边界之间的偏移**
   * @version
   * CSS2
   */
  top?: string | number;
  /**
   * **设置元素的垂直对齐方式**
   * @version
   * CSS1
   */
  verticalAlign?: string;
  /**
   * **规定元素是否可见**
   * @version
   * CSS2
   */
  visibility?: StyleVisible;
  /**
   * **设置元素的堆叠顺序**
   * @version
   * CSS2
   */
  zIndex?: string | number;

  // 颜色
  background?: string;
  color?: string;

  width?: string | number;
  maxWidth?: string | number;
  minWidth?: string | number;
  height?: string | number;
  maxHeight?: string | number;
  minHeight?: string | number;

  padding?: string | number;
  paddingTop?: string | number;
  paddingRight?: string | number;
  paddingBottom?: string | number;
  paddingLeft?: string | number;

  margin?: string | number;
  marginTop?: string | number;
  marginRight?: string | number;
  marginBottom?: string | number;
  marginLeft?: string | number;

  wordBreak?: 'break-all';
  'user-select'?: 'none';
  'pointer-events'?: string;
  /** 这个样式名还没有在接口中定义，建议到types/style.ts 中定义样式属性 */
  [key: string]: string | undefined | number;
}
