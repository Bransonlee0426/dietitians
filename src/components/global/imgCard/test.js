/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils';
import imgCard from './main.vue';

describe('<functionButton/>', () => {
  test('should render correct contents', () => {
    const wrapper = shallowMount(imgCard);
    wrapper.setData({ checked: true });
    expect(wrapper.vm.checked).toBe(true);
  });
});
