import * as Icons from '@ant-design/icons';
import { createFromIconfontCN } from '@ant-design/icons';

//使用试例: <Icon type="icon-system" style={{ fontSize: '16px', color: '#08c' }} />
const Icon = createFromIconfontCN({
  scriptUrl: [],
});

/**网站通用图标关键字 */
const webIcons = ['group', 'bug', 'console-sql', 'control', 'ci', 'control', 'compass'];

/**网站通用图标 */
const webIconData = {
  group: <Icons.GroupOutlined />,
  compass: <Icons.CompassOutlined />,
  bug: <Icons.BugOutlined />,
  'console-sql': <Icons.ConsoleSqlOutlined />,
  control: <Icons.ControlOutlined />,
  ci: <Icons.CiOutlined />,
  bell: <Icons.BellOutlined />,
};

/**全部图标 */
const iconData = {
  ...webIconData, //网站通用图标
  // ...dataIconData, //数据类图标
  // ...suggestionIconData, //指示性图标
  // ...editIconData, //编辑类图标
  // ...directionIconData, //方向性图标
};

export { webIconData, iconData, webIcons };
