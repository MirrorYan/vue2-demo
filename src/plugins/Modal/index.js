import Vue from 'vue';
import ModalVue from './src/modal.vue';

// 创建模板
const ModalConstructor = Vue.extend(ModalVue);

let currentMsg, instance,
    msgQueue = [];

// 定义默认的回调函数
const defaultCallback = action => {
  if (currentMsg) {
    let callback = currentMsg.callback;
    if (typeof callback === 'function') {
      callback(action);
    }

    if (currentMsg.resolve) {
      if (action === 'confirm') {
        currentMsg.resolve(action);
      } else if (currentMsg.reject && (action === 'cancel' || action === 'close')) {
        currentMsg.reject(action);
      }
    }
  }
};

// 创建弹窗实例
const initInstance = () => {
  instance = new ModalConstructor({
    el: document.createElement('div')
  });

  instance.callback = defaultCallback;
};

const showNextMsg = () => {
  if (!instance) {
    initInstance();
  }

  instance.action = '';

  if (!instance.visible || instance.closeTimer) {
    if (msgQueue.length > 0) {
      currentMsg = msgQueue.shift();
    }
  }

};

const Modal = {
  install (Vue, options) {
    // 创建模板
    const VueModal = Vue.extend(ModalTpl);
    let modal = null;

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
      } else {
        showNextMsg();
      }
    };
  }
}

export default Modal;