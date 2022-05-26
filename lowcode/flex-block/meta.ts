import type { ComponentMetadata, Snippet } from '@alilc/lowcode-types';

const FlexBlockMeta: ComponentMetadata = {
  group: '自建组件',
  componentName: 'FlexBlock',
  title: '布局容器',
  docUrl: '',
  screenshot: '',
  npm: {
    package: 'flex-block',
    version: '{{version}}',
    exportName: 'FlexBlock',
    main: '',
    destructuring: true,
    subName: '',
  },
  props: [
    {
      name: 'className',
      propType: 'any',
    },
    {
      name: 'device',
      propType: {
        type: 'oneOf',
        value: ['phone', 'tablet', 'desktop'],
      },
      description: '设备，用来做自适应，默认为PC',
      defaultValue: 'desktop',
    },
    {
      name: 'columns',
      propType: 'number',
      description: '分为几列',
      defaultValue: 12,
    },
    {
      name: 'style',
      propType: 'object',
    },
  ],
  configure: {
    component: {
      isContainer: true,
    },
    props: [
      {
        name: 'layout',
        title: '布局',
        description: 'x:y:z:h',
        defaultValue: '6:6',
        setter: {
          componentName: 'StringSetter',
        },
        extraProps: {
          setValue(target, value) {
            // 解析x:y:z的数据形式,排除不符合规范的传入
            let arrValue = value.split(':');
            arrValue = arrValue.filter((item) => {
              return item && item.trim(); // 去除空数组项
            });
            const flag = arrValue.find((item) => {
              return isNaN(Number(item));
            });
            if (flag) {
              return;
            }
            const { node } = target;
            node.children.mergeChildren(
              (child, index) => {
                child.setPropValue('colSpan', arrValue[index]);
                return index >= arrValue.length;
              },
              (children) => {
                let l = children.length;
                const items = [];
                while (l++ < arrValue.length) {
                  items.push({
                    componentName: 'FlexBlockCell',
                    title: '单元格',
                    props: {
                      colSpan: arrValue[l - 1] || 1,
                    },
                  });
                }
                return items;
              },
              null,
            );
          },
        },
      },
      {
        title: {
          label: {
            type: 'i18n',
            'en-US': 'rows',
            'zh-CN': '行数',
          },
        },
        name: 'rows',
        setter: {
          componentName: 'MixedSetter',
          props: {
            setters: [
              {
                componentName: 'StringSetter',
                isRequired: false,
                initialValue: '',
              },
              {
                componentName: 'NumberSetter',
                isRequired: false,
                initialValue: 0,
              },
            ],
          },
        },
      },
      {
        name: 'gap',
        title: '列间距',
        defaultValue: 0,
        setter: {
          componentName: 'MixedSetter',
          props: {
            setters: [
              {
                componentName: 'NumberSetter',
                props: {
                  defaultValue: 8,
                },
              },
              {
                componentName: 'JsonSetter',
                props: {
                  defaultValue: [8, 4],
                },
              },
              'ExpressionSetter',
            ],
          },
        },
      },
      {
        name: 'dense',
        title: '紧密模式',
        defaultValue: false,
        setter: {
          componentName: 'MixedSetter',
          props: {
            setters: ['BoolSetter', 'ExpressionSetter'],
          },
        },
      },
      {
        name: 'style',
        setter: {
          componentName: 'StyleSetter',
        },
      },
    ],
  },
  icon: '',
  category: '布局容器类',
};
const snippets: Snippet[] = [
  {
    "title": "弹性布局(6:6)",
    "screenshot": "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/1-1.png",
    "schema": {
      "componentName": "FlexBlock",
      "props": {
      },
    }
  },
  {
    "title": "弹性布局(4:4:4)",
    "screenshot": "https://alifd.alicdn.com/fusion-cool/icons/icon-antd/1-1-1.png",
    "schema": {
      "componentName": "FlexBlock",
      "props": {
        "layout": '4:4:4'
      },
    }
  }
];

export default {
  ...FlexBlockMeta,
  snippets
};
