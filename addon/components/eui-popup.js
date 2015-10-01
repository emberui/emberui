import Ember from 'ember';
import preventPageScroll from '../mixins/prevent-page-scroll';
import renderOnBody from '../mixins/render-on-body';

export default Ember.Component.extend(preventPageScroll, renderOnBody, {
  tagName: 'eui-popup',
  classNames: ['eui-popup']
});
