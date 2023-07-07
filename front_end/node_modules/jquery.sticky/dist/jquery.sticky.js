(function ($) {
'use strict';

$ = $ && $.hasOwnProperty('default') ? $['default'] : $;

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

'use strict';

var Sticky = function () {
  function Sticky(target) {
    var _this = this;

    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    classCallCheck(this, Sticky);

    if (!target.length) {
      return;
    }

    this.target = target;
    this.parent = target.parent();
    this.args = $.extend({
      offset: 0,
      breakpoint: null
    }, args);

    this.placeholder = $('<div class="js-sticky-placeholder"/>');

    this.isAdded = false;

    $(window).on('ready load scroll resize', function () {
      _this.initialize();
    });

    $(window).on('resize', function () {
      $(window).scrollTop($(window).scrollTop() + 1);
    });
  }

  createClass(Sticky, [{
    key: 'initialize',
    value: function initialize() {
      if ('none' == this.target.css('display') || null !== this.args.breakpoint && this.args.breakpoint > $(window).width()) {
        this.parent.removeClass('js-sticky-parent');
        this.target.removeClass('js-sticky-top');
        this.target.removeClass('js-sticky-bottom');
        this.placeholder.remove();
        this.isAdded = false;
        return;
      }

      this.placeholder.width(this.target.outerWidth());
      this.placeholder.height(this.target.outerHeight() + parseInt(this.target.css('margin-bottom')));

      if (this.shouldStickyTop()) {
        this.setTargetSize(this.target.height(), this.target.width());
        this.target.addClass('js-sticky-top');
        this.target.css('top', this.args.offset);
        this.target.after(this.placeholder);
        this.isAdded = true;
      } else if (this.shouldStickyBottom()) {
        this.parent.addClass('js-sticky-parent');
        this.target.removeClass('js-sticky-top');
        this.target.css('top', '');
        this.target.addClass('js-sticky-bottom');
      } else if (this.shouldReleaseStickyBottom()) {
        this.parent.removeClass('js-sticky-parent');
        this.target.addClass('js-sticky-top');
        this.target.css('top', this.args.offset);
        this.target.removeClass('js-sticky-bottom');
      } else if (this.shouldReleaseStickyTop()) {
        this.parent.removeClass('js-sticky-parent');
        this.target.removeClass('js-sticky-top');
        this.target.css('top', '');
        this.target.removeClass('js-sticky-bottom');
        this.setTargetSize('', '');
        this.placeholder.remove();
        this.isAdded = false;
      }
    }
  }, {
    key: 'shouldStickyTop',
    value: function shouldStickyTop() {
      return this.getScrollTop() >= this.getTargetTopY() && !this.isAdded;
    }
  }, {
    key: 'shouldStickyBottom',
    value: function shouldStickyBottom() {
      return this.getTargetBottomY() >= this.getParentBottomY() && !this.parent.hasClass('js-sticky-parent') && this.isAdded;
    }
  }, {
    key: 'shouldReleaseStickyBottom',
    value: function shouldReleaseStickyBottom() {
      return this.getScrollTop() <= this.getTargetTopY() && this.getTargetTopY() >= this.getParentTopY() && this.parent.hasClass('js-sticky-parent') && this.isAdded;
    }
  }, {
    key: 'shouldReleaseStickyTop',
    value: function shouldReleaseStickyTop() {
      return this.getScrollTop() <= this.getParentTopY() && this.isAdded;
    }
  }, {
    key: 'getScrollTop',
    value: function getScrollTop() {
      return $(window).scrollTop() + this.args.offset + parseInt(this.target.css('margin-top'));
    }
  }, {
    key: 'getParentTopY',
    value: function getParentTopY() {
      if (this.target.prev().length) {
        return this.target.prev().offset().top + this.target.prev().outerHeight();
      }
      return this.parent.offset().top;
    }
  }, {
    key: 'getParentBottomY',
    value: function getParentBottomY() {
      if (this.target.next(':not(.js-sticky-placeholder)').length) {
        return this.target.next(':not(.js-sticky-placeholder)').offset().top;
      }
      return this.parent.offset().top + this.parent.outerHeight();
    }
  }, {
    key: 'getTargetTopY',
    value: function getTargetTopY() {
      return this.target.offset().top;
    }
  }, {
    key: 'getTargetBottomY',
    value: function getTargetBottomY() {
      return this.getTargetTopY() + this.target.outerHeight();
    }
  }, {
    key: 'setTargetSize',
    value: function setTargetSize(height, width) {
      this.target.width(width);
      this.target.height(height);
    }
  }]);
  return Sticky;
}();

/**
 * Name: jquery.sticky
 * Author: Takashi Kitajima (inc2734)
 * Author URI: https://2inc.org
 * License: MIT
 *
 * @param { offset }
 */

'use strict';

(function ($$$1) {
  $$$1.fn.sticky = function (args) {
    return this.each(function (i, e) {
      new Sticky($$$1(e), args);
    });
  };
})(jQuery);

}(jQuery));
