const defaults = {
  title: null,
  message: '',
  type: '',
  iconClass: '',
  showInput: false,
  showClose: true,
  modalFade: true,
  lockScroll: true,
  closeOnClickModal: true,
  closeOnPressEscape: true,
  closeOnHashChange: true,
  inputValue: null,
  inputPlaceholder: '',
  inputType: 'text',
  inputPattern: null,
  inputValidator: null,
  inputErrorMessage: '',
  showConfirmButton: true,
  showCancelButton: false,
  confirmButtonPosition: 'right',
  confirmButtonHighlight: false,
  cancelButtonHighlight: false,
  confirmButtonText: '',
  cancelButtonText: '',
  confirmButtonClass: '',
  cancelButtonClass: '',
  customClass: '',
  beforeClose: null,
  dangerouslyUseHTMLString: false,
  center: false,
  roundButton: false,
  distinguishCancelAndClose: false
};

import Vue from 'vue';
import merge from 'element-ui/src/utils/merge';
import ModalVue from './src/modal.vue';

// 创建模板
const ModalConstructor = Vue.extend(ModalVue);

let currentMsg, instance;
let msgQueue = [];

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

      let options = currentMsg.options;
      for (let prop in options) {
        if (options.hasOwnProperty(prop)) {
          instance[prop] = options[prop];
        }
      }
      if (options.callback === undefined) {
        instance.callback = defaultCallback;
      }

      let oldCb = instance.callback;
      instance.callback = (action, instance) => {
        oldCb(action, instance);
        showNextMsg();
      }

      delete instance.$slots.defaultCallback;

      ['modal', 'showClose', 'closeOnClickModal', 'closeOnPressEscape', 'closeOnHashChange'].forEach(prop => {
        if (instance[prop] === undefined) {
          instance[prop] = true;
        }
      });

      document.body.appendChild(instance.$el);

      Vue.nextTick(() =>{
        instance.visible = true;
      });
    }
  }

};

const Modal = {
  install (Vue, options) {
    Vue.prototype.$modal = (opts, callback) => {
      if (typeof opts === 'string') {
        opts = {
          message: opts
        };
        if (typeof arguments[1] === 'string') {
          options.title = arguments[1];
        }
      } else if (opts.callback && !callback) {
        callback = opts.callback;
      }

      if (typeof Promise !== 'undefined') {
        return new Promise((resolve, reject) => {
          msgQueue.push({
            options: merge({}, defaults, Modal.defaults, opts),
            callback,
            resolve,
            reject
          });
          showNextMsg();
        });
      } else {
        msgQueue.push({
          options: merge({}, defaults, Modal.defaults, opts),
          callback
        });
        showNextMsg();
      }
    };
  }
}

Modal.setDefaults = defaults => {
  Modal.defaults = defaults;
};


export default Modal;