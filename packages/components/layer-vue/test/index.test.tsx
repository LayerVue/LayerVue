import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Layer from '../layer.vue';

describe('Modal', () => {
  it('render', () => {
    const wrapper = mount(Layer, {
      props: {
        title: 'hello',
        msg: '2',
        show: true,
      },
    });
    expect(wrapper.html()).toMatchInlineSnapshot(`
      "<div>hello</div>
      <div>layer 2</div>"
    `);
  });
});
