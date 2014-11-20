// T124.
(function(prefix) {
  'use strict';

  shareUtils();

  function shareUtils() {
    if (typeof mmcore[prefix] === 'undefined') {
      mmcore[prefix] = {};
    }
    mmcore[prefix].utils = createUtils();
    mmcore[prefix].Campaign = createCampaignConstructor();
  }
  function createUtils() {
    return {
      each: function(obj, callback) {
        var value,
          i = 0,
          length = obj.length,
          objType,
          isArray,
          isNodeList;
        
        objType = Object.prototype.toString.call(obj);
        if (/MSIE 8/.test(navigator.userAgent) &&
            objType === '[object Object]' &&
            obj.length) {
          obj = (function() {
            var arr = [];
            for (var i = 0; i < obj.length; i += 1) {
              arr.push(obj[i]);
            }
            return arr;
          }(obj));
        }
          
        isArray = objType === '[object Array]';
        isNodeList = objType === '[object NodeList]';

        // if (objType === '[object Object]') {
        //   tempObj = Array.prototype.slice.call(obj);
        //   if (!tempObj.length) {
        //     obj = tempObj;
        //   }
        // }
        if (isArray || isNodeList) {
          // if (typeof obj.forEach === 'function') {
          //   obj.forEach(callback, )
          // }
          for (; i < length; i += 1) {
            value = callback.call(obj[i], i, obj[i]);
            if (value === false) {
              break;
            }
          }
        } else {
          for (i in obj) {
            value = callback.call(obj[i], i, obj[i]);
            if (value === false) {
              break;
            }
          }
        }
      },
      extend: function(target, extension) {
        if (typeof target !== 'object') {
          target = {};
        }
        if (typeof extension !== 'object') {
          return;
        }
        for (var prop in extension) {
          if (!target.hasOwnProperty(prop) || target[prop] === 'undefined') {
            target[prop] = extension[prop];
          }
        }
      },
      waitFor: function(options) {
        var DEFAULT_SETTINGS = {
          checker: function() { return true; },
          done: function() {},
          fail: function() {},
          always: function() {},
          interval: function() {},
          emergency: null,
          stopOnDomReady: true
        };
        this.extend(options, DEFAULT_SETTINGS);
        var isDomReady = false;

        if (options.emergency) {
          var start = new Date().getTime();
        }

        function waiter() {
          if ((options.stopOnDomReady && document.readyState === 'complete') ||
              (options.emergency && start + options.emergency <= new Date().getTime())) {
            if (options.checker()) {
              options.done();
            } else {
              options.fail();
            }
            options.always();
          } else {
            if (options.checker()) {
              options.done();
              options.always();
            } else {
              setTimeout(waiter, options.interval);
            }
          }
        }

        setTimeout(waiter, options.interval);
      },
      waitForElementArrival: function(selector, options) {
        function closestNotLastChild(element) {
          var parent,
            grandParent,
            lastChild;
          parent = element.parentNode;
          if (!parent) return element;
          grandParent = parent.parentNode;
          if (!grandParent) return element;
          lastChild = grandParent.lastChild;

          if (lastChild === parent) {
            return closestNotLastChild(parent);
          } else {
            return parent;
          }
        }
        options.checker = function() {
          var target = document.querySelector(selector);
          return (target && closestNotLastChild(target));
        };
        this.waitFor(options);
      },
      wrapInner: function(target, wrapper) {
        var childNodes = target.childNodes;
        for (var i = 0; i < childNodes.length; i += 1) {
          wrapper.appendChild(childNodes[i]);
        }
        target.appendChild(wrapper);
      },
      wrap: function(target, wrapper) {
        var parent = target.parentNode;
        wrapper.appendChild(target);
        parent.appendChild(wrapper);
      },
      addClass: function(element, className) {
        if (element.classList) {
          element.classList.add(className);
        } else {
          element.className += ' ' + className;
        }
      },
      removeClass: function(element, className) {
        if (element.classList) {
          element.classList.remove(className);
        } else if (element.className !== '') {
          if (className !== '') {
            var classNames = String.prototype.split.call(element.className, ' ');
            var indexOfItem = getPositionOfItemInCollection(className, classNames);
            if (indexOfItem > -1) {
              classNames.splice(indexOfItem, className.length);
            }
            element.className = classNames.join(' ');
          } else {
            element.className = '';
          }
        }
        function getPositionOfItemInCollection(item, collection) {
          var length = collection.length;
          for (var index = 0; index < length; ++index) {
            if (collection[index] === item) {
              return index;
            }
          }
          return false;
        }
      },
      hasClass: function(element, className) {
        var hasClass = false;
        if (typeof className !== 'string') {
          return;
        }
        element.className.replace(/\S+/g, function() {
          for (var i = 0; i < arguments.length; i += 1) {
            if (className === arguments[i]) {
              hasClass = true;
              return true;
            }
          }
        });
        return hasClass;
      },
      addEvent: function(elem, event, handler) {
        if (typeof elem.addEventListener === 'function') {
          elem.addEventListener(event, handler, false);
        } else {
          elem.attachEvent('on' + event, handler);
        }
      }

    };
  }
  function createCampaignConstructor() {
    var Campaign = function(name, maxyboxNames, prefix) {
      this.name = name;
      this.maxyboxNames = maxyboxNames;
      this.prefix = prefix;

      this.preventDefaultRendering();
      // this.preventDefaultHiding();
    };
    /* Marks the campaign elements as rendered */
    Campaign.prototype.preventDefaultRendering = function() {
      var maxyboxName;
      for (var i = 0; i < this.maxyboxNames.length; i += 1) {
        maxyboxName = this.maxyboxNames[i];
        mmcore._r_mbs[maxyboxName] = 1;
      }
    };
    /* Hides content by selector */
    Campaign.prototype.hideContent = function(selector, hidingStyle) {
      var css = hidingStyle || 'left: -33554430px; position: absolute; top: -33554430px;';
      var style = document.createElement('style');
      var head = document.head || document.getElementsByTagName('head')[0];

      style.type = 'text/css';
      style.id = 'm' + this.prefix +'-hiding-style';

      css = selector + '{' + css + '}';
      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
      head.appendChild(style);
    };
    /* Shows previously hidden content */
    Campaign.prototype.showContent = function() {
      var hidingStyle = document.getElementById('m' + this.prefix + '-hiding-style');
      if (hidingStyle) {
        hidingStyle.parentNode.removeChild(hidingStyle);
      }
    };
    /* Checks for Non default experience */
    Campaign.prototype.hasNonDefaultExperience = function() {
      var experience = mmcore.GenInfo.hasOwnProperty(this.name) ?  mmcore.GenInfo[this.name] : null;
      var hasNonDefaultExperience = false;
      var elementName;
      var variantName;

      if (!experience) {
        return false;
      }

      for (elementName in experience) {
        variantName = experience[elementName];

        if (experience.hasOwnProperty(elementName) &&
            (variantName !== 'Default')) {
          hasNonDefaultExperience = true;
          break;
        }
      }

      return hasNonDefaultExperience;
    };
    /* Render Maxyboxes */
    Campaign.prototype.renderMaxyboxes = function() {
      var campaign = this;
      var element;

      for (var i = 0; i < this.maxyboxNames.length; i += 1) {
        element = this.maxyboxNames[i];
        if (typeof mmcore._renderers[element] === 'function') {
          mmcore._renderers[element].call(campaign);
        }
      }
    };

    return Campaign;
  }
  
}('t124'));