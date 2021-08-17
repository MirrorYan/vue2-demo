import ModalTpl from './src/modal.vue';

let currentMsg = null;

const Modal = {
  install (Vue, options) {
    // 创建模板
    const VueModal = Vue.extend(ModalTpl);
    let modal = null;
    console.log(VueModal)

    Vue.prototype.$modal = (opts, callback) => {
      if (typeof opts === 'string') {
        opts = {
          message: opts
        };
      } else if (opts.callback && !callback) {
        callback = opts.callback;
      }

      if (!modal) {
        // 创建实例
        modal = new VueModal().$mount();
        // 挂载实例
        document.body.appendChild(modal.$el);
      }

      modal.handleShow(opts);

      if (typeof Promise !== 'undefined') {
        return new Promise((resolve, reject) => {
          currentMsg = { resolve, reject }
        });
      }
    };
  }
}

export default Modal;