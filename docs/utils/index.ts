/// <reference types="node" />
import fg from 'fast-glob';
import matter from 'gray-matter';
import { DefaultTheme } from 'vitepress/types/default-theme';
type SidebarItem = {
  text?: string;
  link?: string;
  items?: SidebarItem[];
  collapsed?: boolean;
  order: number;
};
const ignores = ['**/components', '**/public', '**/index.md', '**/utils', '**/node_modules'];
const initSidebarItem = (
  path: string,
  ignore: string[],
  deep: boolean
): {
  text: string;
  items: SidebarItem[];
  order: number;
} => {
  const directories = fg.sync(path + '/*', { onlyDirectories: true, ignore });
  const items = directories.reduce((pre: SidebarItem[], directory) => {
    const files = fg.sync(directory + '/*.md', { onlyFiles: true, ignore });
    const sidebarItem = initSidebarItem(directory, ignore, deep);
    const items = [
      ...sidebarItem.items,
      ...files.reduce((pre: SidebarItem[], file) => {
        const link = '/' + file.replace('/index.md', '/').replace('.md', '');
        const item = {
          text: link.slice(link.lastIndexOf('/') + 1).replace(/[0-9]+./, ''),
          link,
          order: 0,
        };
        const { data } = matter.read(file);
        if (data.order) {
          item.order = data.order;
        }
        if (data.title) {
          item.text = data.title;
        }
        pre.push(item);
        return pre;
      }, []),
    ];
    if (items.length > 0) {
      const isLink = deep ? deep : items.some(v => v.link);
      pre.push({
        order: sidebarItem.order,
        text:
          sidebarItem.text === ''
            ? directory.slice(directory.lastIndexOf('/') + 1).replace(/[0-9]+./, '')
            : sidebarItem.text,
        items: isLink
          ? items
          : items.reduce((pre: SidebarItem[], item) => {
              if (item.items) {
                pre.push(...item.items);
              }
              return pre;
            }, []),
      });
    }
    return pre;
  }, []);
  const res = {
    text: '',
    items,
    order: 0,
  };
  const files = fg.sync(path + '/index.md', { onlyFiles: true });
  if (files.length > 0) {
    const { data } = matter.read(files[0]);
    res.order = data.order || 0;
    if (data.title) {
      res.text = data.title;
    }
  }

  return res;
};

export const initNav = (path: string = '.', ignore: string[] = ignores): DefaultTheme.NavItem[] => {
  const directories = fg.sync(path + '/*', { onlyDirectories: true, ignore });
  const sidebarItem = initOrder(
    directories.reduce((pre: SidebarItem[], item) => {
      const { text, items, order } = initSidebarItem(item, ignore, false);
      if (items.length > 0) {
        pre.push({
          text,
          items,
          order,
          link: item,
        });
      }
      return pre;
    }, [])
  );
  return sidebarItem.map(item => {
    const { text, items } = item;
    const link = findLink(initOrder(items!)[0]).slice(1);
    return {
      text: text === '' ? item.link!.replace(path + '/', '').replace(/[0-9]+./, '') : text!,
      // items: items as DefaultTheme.NavItemWithLink[],
      link,
      activeMatch: '/' + link.slice(0, link.indexOf('/')),
    };
  });
};

export const initSidebar = (
  path: string = '.',
  ignore: string[] = ignores
): DefaultTheme.SidebarMulti => {
  const directories = fg.sync(path + '/*', { onlyDirectories: true, ignore });
  const sidebar = directories.reduce((pre, item) => {
    const { text, items } = initSidebarItem(item, ignore, true);
    // pre[item.replace(path, '') + '/'] = [
    //   {
    //     text: text === '' ? item.replace(path + '/', '').replace(/[0-9]+./, '') : text,
    //   },
    // ];
    pre[item.replace(path, '') + '/'] = initOrder(items);
    return pre;
  }, {});
  return sidebar;
};

const findLink = (sidebarItem: DefaultTheme.SidebarItem): string => {
  if (sidebarItem.link) {
    return sidebarItem.link;
  }
  return findLink(sidebarItem.items![0]);
};

const initOrder = (sidebar: SidebarItem[]): SidebarItem[] => {
  //递归
  const res = sidebar.reduce((pre: SidebarItem[], item) => {
    if (item.items) {
      item.items = initOrder(item.items);
    }
    pre.push(item);
    return pre;
  }, []);
  //排序
  res.sort((a, b) => {
    return a.order - b.order;
  });
  return res;
};
