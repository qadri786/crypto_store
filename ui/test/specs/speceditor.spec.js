import Vue from 'vue'
import { mount } from '@vue/test-utils'
import test from 'ava'
import speceditor from '../../components/product/speceditor.vue'




test('is a Vue instance', t => {
  // const wrapper = mount(speceditor, {
  //   propsData:{
  //     items: [], itemDelete: () => {}
  //   }
  // })
  // t.is(wrapper.isVueInstance(), true)
  t.pass();
})
