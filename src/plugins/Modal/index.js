import ModalTpl from './main.vue';

const Modal = {
  install (Vue, options) {
    // 创建弹窗子类
    var modal = Vue.extend(ModalTpl);

    Vue.prototype.$modal = (opts, callback) => {
      if (typeof opts === 'string') {
        opts = {
          message: opts
        };
      } else if (opts.callback && !callback) {
        callback = opts.callback;
      }

      if (typeof Promise !== 'undefined') {
        return new Promise((resolve, reject) => {

        });
      }
    };
  }
}

export default Modal;