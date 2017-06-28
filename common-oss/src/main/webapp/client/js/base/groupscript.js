!function (e) {
    "use strict";
    function t(e) {
        if (e) {
            if ("string" == typeof o[e])return e;
            e = e.charAt(0).toUpperCase() + e.slice(1);
            for (var t, r = 0, i = n.length; i > r; r++)if (t = n[r] + e, "string" == typeof o[t])return t
        }
    }

    var n = "Webkit Moz ms Ms O".split(" "), o = document.documentElement.style;
    "function" == typeof define && define.amd ? define(function () {
        return t
    }) : "object" == typeof exports ? module.exports = t : e.getStyleProperty = t
}(window);
!function (t) {
    "use strict";
    function e(t) {
        var e = parseFloat(t), r = -1 === t.indexOf("%") && !isNaN(e);
        return r && e
    }

    function r() {
    }

    function i() {
        for (var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        }, e = 0, r = d.length; r > e; e++) {
            var i = d[e];
            t[i] = 0
        }
        return t
    }

    function n(r) {
        function n() {
            if (!p) {
                p = !0;
                var i = t.getComputedStyle;
                if (a = function () {
                        var t = i ? function (t) {
                            return i(t, null)
                        } : function (t) {
                            return t.currentStyle
                        };
                        return function (e) {
                            var r = t(e);
                            return r || o("Style returned " + r + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), r
                        }
                    }(), u = r("boxSizing")) {
                    var n = document.createElement("div");
                    n.style.width = "200px", n.style.padding = "1px 2px 3px 4px", n.style.borderStyle = "solid", n.style.borderWidth = "1px 2px 3px 4px", n.style[u] = "border-box";
                    var d = document.body || document.documentElement;
                    d.appendChild(n);
                    var f = a(n);
                    g = 200 === e(f.width), d.removeChild(n)
                }
            }
        }

        function f(t) {
            if (n(), "string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) {
                var r = a(t);
                if ("none" === r.display)return i();
                var o = {};
                o.width = t.offsetWidth, o.height = t.offsetHeight;
                for (var f = o.isBorderBox = !(!u || !r[u] || "border-box" !== r[u]), p = 0, l = d.length; l > p; p++) {
                    var y = d[p], c = r[y];
                    c = h(t, c);
                    var m = parseFloat(c);
                    o[y] = isNaN(m) ? 0 : m
                }
                var s = o.paddingLeft + o.paddingRight, v = o.paddingTop + o.paddingBottom, b = o.marginLeft + o.marginRight, x = o.marginTop + o.marginBottom, W = o.borderLeftWidth + o.borderRightWidth, S = o.borderTopWidth + o.borderBottomWidth, w = f && g, B = e(r.width);
                B !== !1 && (o.width = B + (w ? 0 : s + W));
                var L = e(r.height);
                return L !== !1 && (o.height = L + (w ? 0 : v + S)), o.innerWidth = o.width - (s + W), o.innerHeight = o.height - (v + S), o.outerWidth = o.width + b, o.outerHeight = o.height + x, o
            }
        }

        function h(e, r) {
            if (t.getComputedStyle || -1 === r.indexOf("%"))return r;
            var i = e.style, n = i.left, o = e.runtimeStyle, d = o && o.left;
            return d && (o.left = e.currentStyle.left), i.left = r, r = i.pixelLeft, i.left = n, d && (o.left = d), r
        }

        var a, u, g, p = !1;
        return f
    }

    var o = "undefined" == typeof console ? r : function (t) {
        console.error(t)
    }, d = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
    "function" == typeof define && define.amd ? define(["get-style-property/get-style-property"], n) : "object" == typeof exports ? module.exports = n(require("desandro-get-style-property")) : t.getSize = n(t.getStyleProperty)
}(window);
!function (e) {
    "use strict";
    function t(e, t) {
        return e[i](t)
    }

    function n(e) {
        if (!e.parentNode) {
            var t = document.createDocumentFragment();
            t.appendChild(e)
        }
    }

    function r(e, t) {
        n(e);
        for (var r = e.parentNode.querySelectorAll(t), o = 0, c = r.length; c > o; o++)if (r[o] === e)return !0;
        return !1
    }

    function o(e, r) {
        return n(e), t(e, r)
    }

    var c, i = function () {
        if (e.matchesSelector)return "matchesSelector";
        for (var t = ["webkit", "moz", "ms", "o"], n = 0, r = t.length; r > n; n++) {
            var o = t[n], c = o + "MatchesSelector";
            if (e[c])return c
        }
    }();
    if (i) {
        var u = document.createElement("div"), f = t(u, "div");
        c = f ? t : o
    } else c = r;
    "function" == typeof define && define.amd ? define(function () {
        return c
    }) : "object" == typeof exports ? module.exports = c : window.matchesSelector = c
}(Element.prototype);
(function () {
    "use strict";
    function e() {
    }

    function t(e, t) {
        for (var n = e.length; n--;)if (e[n].listener === t)return n;
        return -1
    }

    function n(e) {
        return function () {
            return this[e].apply(this, arguments)
        }
    }

    var r = e.prototype, i = this, s = i.EventEmitter;
    r.getListeners = function (e) {
        var t, n, r = this._getEvents();
        if (e instanceof RegExp) {
            t = {};
            for (n in r)r.hasOwnProperty(n) && e.test(n) && (t[n] = r[n])
        } else t = r[e] || (r[e] = []);
        return t
    }, r.flattenListeners = function (e) {
        var t, n = [];
        for (t = 0; t < e.length; t += 1)n.push(e[t].listener);
        return n
    }, r.getListenersAsObject = function (e) {
        var t, n = this.getListeners(e);
        return n instanceof Array && (t = {}, t[e] = n), t || n
    }, r.addListener = function (e, n) {
        var r, i = this.getListenersAsObject(e), s = "object" == typeof n;
        for (r in i)i.hasOwnProperty(r) && -1 === t(i[r], n) && i[r].push(s ? n : {listener: n, once: !1});
        return this
    }, r.on = n("addListener"), r.addOnceListener = function (e, t) {
        return this.addListener(e, {listener: t, once: !0})
    }, r.once = n("addOnceListener"), r.defineEvent = function (e) {
        return this.getListeners(e), this
    }, r.defineEvents = function (e) {
        for (var t = 0; t < e.length; t += 1)this.defineEvent(e[t]);
        return this
    }, r.removeListener = function (e, n) {
        var r, i, s = this.getListenersAsObject(e);
        for (i in s)s.hasOwnProperty(i) && (r = t(s[i], n), -1 !== r && s[i].splice(r, 1));
        return this
    }, r.off = n("removeListener"), r.addListeners = function (e, t) {
        return this.manipulateListeners(!1, e, t)
    }, r.removeListeners = function (e, t) {
        return this.manipulateListeners(!0, e, t)
    }, r.manipulateListeners = function (e, t, n) {
        var r, i, s = e ? this.removeListener : this.addListener, o = e ? this.removeListeners : this.addListeners;
        if ("object" != typeof t || t instanceof RegExp)for (r = n.length; r--;)s.call(this, t, n[r]); else for (r in t)t.hasOwnProperty(r) && (i = t[r]) && ("function" == typeof i ? s.call(this, r, i) : o.call(this, r, i));
        return this
    }, r.removeEvent = function (e) {
        var t, n = typeof e, r = this._getEvents();
        if ("string" === n)delete r[e]; else if (e instanceof RegExp)for (t in r)r.hasOwnProperty(t) && e.test(t) && delete r[t]; else delete this._events;
        return this
    }, r.removeAllListeners = n("removeEvent"), r.emitEvent = function (e, t) {
        var n, r, i, s, o = this.getListenersAsObject(e);
        for (i in o)if (o.hasOwnProperty(i))for (r = o[i].length; r--;)n = o[i][r], n.once === !0 && this.removeListener(e, n.listener), s = n.listener.apply(this, t || []), s === this._getOnceReturnValue() && this.removeListener(e, n.listener);
        return this
    }, r.trigger = n("emitEvent"), r.emit = function (e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(e, t)
    }, r.setOnceReturnValue = function (e) {
        return this._onceReturnValue = e, this
    }, r._getOnceReturnValue = function () {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, r._getEvents = function () {
        return this._events || (this._events = {})
    }, e.noConflict = function () {
        return i.EventEmitter = s, e
    }, "function" == typeof define && define.amd ? define(function () {
        return e
    }) : "object" == typeof module && module.exports ? module.exports = e : i.EventEmitter = e
}).call(this);
!function (e) {
    "use strict";
    function n(n) {
        var t = e.event;
        return t.target = t.target || t.srcElement || n, t
    }

    var t = document.documentElement, o = function () {
    };
    t.addEventListener ? o = function (e, n, t) {
        e.addEventListener(n, t, !1)
    } : t.attachEvent && (o = function (e, t, o) {
        e[t + o] = o.handleEvent ? function () {
            var t = n(e);
            o.handleEvent.call(o, t)
        } : function () {
            var t = n(e);
            o.call(e, t)
        }, e.attachEvent("on" + t, e[t + o])
    });
    var c = function () {
    };
    t.removeEventListener ? c = function (e, n, t) {
        e.removeEventListener(n, t, !1)
    } : t.detachEvent && (c = function (e, n, t) {
        e.detachEvent("on" + n, e[n + t]);
        try {
            delete e[n + t]
        } catch (o) {
            e[n + t] = void 0
        }
    });
    var i = {bind: o, unbind: c};
    "function" == typeof define && define.amd ? define(i) : "object" == typeof exports ? module.exports = i : e.eventie = i
}(window);
!function (e) {
    "use strict";
    function t(e) {
        "function" == typeof e && (t.isReady ? e() : a.push(e))
    }

    function n(e) {
        var n = "readystatechange" === e.type && "complete" !== o.readyState;
        t.isReady || n || i()
    }

    function i() {
        t.isReady = !0;
        for (var e = 0, n = a.length; n > e; e++) {
            var i = a[e];
            i()
        }
    }

    function d(d) {
        return "complete" === o.readyState ? i() : (d.bind(o, "DOMContentLoaded", n), d.bind(o, "readystatechange", n), d.bind(e, "load", n)), t
    }

    var o = e.document, a = [];
    t.isReady = !1, "function" == typeof define && define.amd ? define(["eventie/eventie"], d) : "object" == typeof exports ? module.exports = d(require("eventie")) : e.docReady = d(e.eventie)
}(window);
!function (s) {
    "use strict";
    function e(s) {
        return new RegExp("(^|\\s+)" + s + "(\\s+|$)")
    }

    function n(s, e) {
        var n = t(s, e) ? c : a;
        n(s, e)
    }

    var t, a, c;
    "classList" in document.documentElement ? (t = function (s, e) {
        return s.classList.contains(e)
    }, a = function (s, e) {
        s.classList.add(e)
    }, c = function (s, e) {
        s.classList.remove(e)
    }) : (t = function (s, n) {
        return e(n).test(s.className)
    }, a = function (s, e) {
        t(s, e) || (s.className = s.className + " " + e)
    }, c = function (s, n) {
        s.className = s.className.replace(e(n), " ")
    });
    var o = {hasClass: t, addClass: a, removeClass: c, toggleClass: n, has: t, add: a, remove: c, toggle: n};
    "function" == typeof define && define.amd ? define(o) : "object" == typeof exports ? module.exports = o : s.classie = o
}(window);
!function (e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "eventie/eventie"], function (i, n) {
        return t(e, i, n)
    }) : "object" == typeof exports ? module.exports = t(e, require("wolfy87-eventemitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie)
}(window, function (e, t, i) {
    "use strict";
    function n(e, t) {
        for (var i in t)e[i] = t[i];
        return e
    }

    function o(e) {
        return "[object Array]" === d.call(e)
    }

    function r(e) {
        var t = [];
        if (o(e))t = e; else if ("number" == typeof e.length)for (var i = 0, n = e.length; n > i; i++)t.push(e[i]); else t.push(e);
        return t
    }

    function s(e, t, i) {
        if (!(this instanceof s))return new s(e, t);
        "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = r(e), this.options = n({}, this.options), "function" == typeof t ? i = t : n(this.options, t), i && this.on("always", i), this.getImages(), c && (this.jqDeferred = new c.Deferred);
        var o = this;
        setTimeout(function () {
            o.check()
        })
    }

    function h(e) {
        this.img = e
    }

    function f(e) {
        this.src = e, p[e] = this
    }

    var c = e.jQuery, a = e.console, u = "undefined" != typeof a, d = Object.prototype.toString;
    s.prototype = new t, s.prototype.options = {}, s.prototype.getImages = function () {
        this.images = [];
        for (var e = 0, t = this.elements.length; t > e; e++) {
            var i = this.elements[e];
            "IMG" === i.nodeName && this.addImage(i);
            var n = i.nodeType;
            if (n && (1 === n || 9 === n || 11 === n))for (var o = i.querySelectorAll("img"), r = 0, s = o.length; s > r; r++) {
                var h = o[r];
                this.addImage(h)
            }
        }
    }, s.prototype.addImage = function (e) {
        var t = new h(e);
        this.images.push(t)
    }, s.prototype.check = function () {
        function e(e, o) {
            return t.options.debug && u && a.log("confirm", e, o), t.progress(e), i++, i === n && t.complete(), !0
        }

        var t = this, i = 0, n = this.images.length;
        if (this.hasAnyBroken = !1, !n)return void this.complete();
        for (var o = 0; n > o; o++) {
            var r = this.images[o];
            r.on("confirm", e), r.check()
        }
    }, s.prototype.progress = function (e) {
        this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded;
        var t = this;
        setTimeout(function () {
            t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e)
        })
    }, s.prototype.complete = function () {
        var e = this.hasAnyBroken ? "fail" : "done";
        this.isComplete = !0;
        var t = this;
        setTimeout(function () {
            if (t.emit(e, t), t.emit("always", t), t.jqDeferred) {
                var i = t.hasAnyBroken ? "reject" : "resolve";
                t.jqDeferred[i](t)
            }
        })
    }, c && (c.fn.imagesLoaded = function (e, t) {
        var i = new s(this, e, t);
        return i.jqDeferred.promise(c(this))
    }), h.prototype = new t, h.prototype.check = function () {
        var e = p[this.img.src] || new f(this.img.src);
        if (e.isConfirmed)return void this.confirm(e.isLoaded, "cached was confirmed");
        if (this.img.complete && void 0 !== this.img.naturalWidth)return void this.confirm(0 !== this.img.naturalWidth, "naturalWidth");
        var t = this;
        e.on("confirm", function (e, i) {
            return t.confirm(e.isLoaded, i), !0
        }), e.check()
    }, h.prototype.confirm = function (e, t) {
        this.isLoaded = e, this.emit("confirm", this, t)
    };
    var p = {};
    return f.prototype = new t, f.prototype.check = function () {
        if (!this.isChecked) {
            var e = new Image;
            i.bind(e, "load", this), i.bind(e, "error", this), e.src = this.src, this.isChecked = !0
        }
    }, f.prototype.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, f.prototype.onload = function (e) {
        this.confirm(!0, "onload"), this.unbindProxyEvents(e)
    }, f.prototype.onerror = function (e) {
        this.confirm(!1, "onerror"), this.unbindProxyEvents(e)
    }, f.prototype.confirm = function (e, t) {
        this.isConfirmed = !0, this.isLoaded = e, this.emit("confirm", this, t)
    }, f.prototype.unbindProxyEvents = function (e) {
        i.unbind(e.target, "load", this), i.unbind(e.target, "error", this)
    }, s
});
!function (e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["doc-ready/doc-ready", "matches-selector/matches-selector"], function (n, r) {
        return t(e, n, r)
    }) : "object" == typeof exports ? module.exports = t(e, require("doc-ready"), require("desandro-matches-selector")) : e.utils = t(e, e.docReady, e.matchesSelector)
}(window, function (e, t, n) {
    "use strict";
    function r(e) {
        return e.replace(/(.)([A-Z])/g, function (e, t, n) {
            return t + "-" + n
        }).toLowerCase()
    }

    var o = {};
    o.extend = function (e, t) {
        for (var n in t)e[n] = t[n];
        return e
    }, o.modulo = function (e, t) {
        return (e % t + t) % t
    };
    var u = Object.prototype.toString;
    o.isArray = function (e) {
        return "[object Array]" == u.call(e)
    }, o.makeArray = function (e) {
        var t = [];
        if (o.isArray(e))t = e; else if (e && "number" == typeof e.length)for (var n = 0, r = e.length; r > n; n++)t.push(e[n]); else t.push(e);
        return t
    }, o.indexOf = Array.prototype.indexOf ? function (e, t) {
        return e.indexOf(t)
    } : function (e, t) {
        for (var n = 0, r = e.length; r > n; n++)if (e[n] === t)return n;
        return -1
    }, o.removeFrom = function (e, t) {
        var n = o.indexOf(t, e);
        -1 != n && t.splice(n, 1)
    }, o.isElement = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function (e) {
        return e instanceof HTMLElement
    } : function (e) {
        return e && "object" == typeof e && 1 == e.nodeType && "string" == typeof e.nodeName
    }, o.setText = function () {
        function e(e, n) {
            t = t || (void 0 !== document.documentElement.textContent ? "textContent" : "innerText"), e[t] = n
        }

        var t;
        return e
    }(), o.getParent = function (e, t) {
        for (; e != document.body;)if (e = e.parentNode, n(e, t))return e
    }, o.getQueryElement = function (e) {
        return "string" == typeof e ? document.querySelector(e) : e
    }, o.filterFindElements = function (e, t) {
        e = o.makeArray(e);
        for (var r = [], u = 0, i = e.length; i > u; u++) {
            var c = e[u];
            if (o.isElement(c))if (t) {
                n(c, t) && r.push(c);
                for (var f = c.querySelectorAll(t), a = 0, s = f.length; s > a; a++)r.push(f[a])
            } else r.push(c)
        }
        return r
    }, o.debounceMethod = function (e, t, n) {
        var r = e.prototype[t], o = t + "Timeout";
        e.prototype[t] = function () {
            var e = this[o];
            e && clearTimeout(e);
            var t = arguments, u = this;
            this[o] = setTimeout(function () {
                r.apply(u, t), delete u[o]
            }, n || 100)
        }
    };
    var i = e.jQuery;
    return o.htmlInit = function (e, n) {
        t(function () {
            for (var t = r(n), o = document.querySelectorAll(".js-" + t), u = "data-" + t + "-options", c = 0, f = o.length; f > c; c++) {
                var a, s = o[c], l = s.getAttribute(u);
                try {
                    a = l && JSON.parse(l)
                } catch (d) {
                    console && console.error("Error parsing " + u + " on " + s.nodeName.toLowerCase() + (s.id ? "#" + s.id : "") + ": " + d);
                    continue
                }
                var m = new e(s, a);
                i && i.data(s, n, m)
            }
        })
    }, o
});
!function (t, n) {
    "use strict";
    "function" == typeof define && define.amd ? define(["eventie/eventie"], function (o) {
        return n(t, o)
    }) : "object" == typeof exports ? module.exports = n(t, require("eventie")) : t.Unipointer = n(t, t.eventie)
}(window, function (t, n) {
    "use strict";
    function o() {
    }

    function e() {
    }

    function i() {
        return !1
    }

    e.prototype.handleEvent = function (t) {
        var n = "on" + t.type;
        this[n] && this[n](t)
    }, e.prototype.getTouch = function (t) {
        for (var n = 0, o = t.length; o > n; n++) {
            var e = t[n];
            if (e.identifier == this.pointerIdentifier)return e
        }
    }, e.prototype.bindHandles = function (n) {
        var o;
        o = t.navigator.pointerEnabled ? this.bindPointer : t.navigator.msPointerEnabled ? this.bindMSPointer : this.bindMouseTouch, n = void 0 === n ? !0 : !!n;
        for (var e = 0, i = this.handles.length; i > e; e++) {
            var r = this.handles[e];
            o.call(this, r, n)
        }
    }, e.prototype.bindPointer = function (t, o) {
        var e = o ? "bind" : "unbind";
        n[e](t, "pointerdown", this), t.style.touchAction = o ? "none" : ""
    }, e.prototype.bindMSPointer = function (t, o) {
        var e = o ? "bind" : "unbind";
        n[e](t, "MSPointerDown", this), t.style.msTouchAction = o ? "none" : ""
    }, e.prototype.bindMouseTouch = function (t, o) {
        var e = o ? "bind" : "unbind";
        n[e](t, "mousedown", this), n[e](t, "touchstart", this), o && p(t)
    };
    var r = "attachEvent" in document.documentElement, p = r ? function (t) {
        "IMG" == t.nodeName && (t.ondragstart = i);
        for (var n = t.querySelectorAll("img"), o = 0, e = n.length; e > o; o++) {
            var r = n[o];
            r.ondragstart = i
        }
    } : o;
    e.prototype.onmousedown = function (t) {
        var n = t.button;
        n && 0 !== n && 1 !== n || this._pointerDown(t, t)
    }, e.prototype.ontouchstart = function (t) {
        this._pointerDown(t, t.changedTouches[0])
    }, e.prototype.onMSPointerDown = e.prototype.onpointerdown = function (t) {
        this._pointerDown(t, t)
    };
    var s = {
        mousedown: ["mousemove", "mouseup"],
        touchstart: ["touchmove", "touchend", "touchcancel"],
        pointerdown: ["pointermove", "pointerup", "pointercancel"],
        MSPointerDown: ["MSPointerMove", "MSPointerUp", "MSPointerCancel"]
    };
    return e.prototype._pointerDown = function (n, o) {
        this.isPointerDown || (this.isPointerDown = !0, this.pointerIdentifier = void 0 !== o.pointerId ? o.pointerId : o.identifier, this._bindPostStartEvents({
            events: s[n.type],
            node: n.preventDefault ? t : document
        }), this.pointerDown(n, o), this.emitEvent("pointerDown", [this, n, o]))
    }, e.prototype.pointerDown = o, e.prototype._bindPostStartEvents = function (t) {
        for (var o = 0, e = t.events.length; e > o; o++) {
            var i = t.events[o];
            n.bind(t.node, i, this)
        }
        this._boundPointerEvents = t
    }, e.prototype._unbindPostStartEvents = function () {
        var t = this._boundPointerEvents;
        if (t && t.events) {
            for (var o = 0, e = t.events.length; e > o; o++) {
                var i = t.events[o];
                n.unbind(t.node, i, this)
            }
            delete this._boundPointerEvents
        }
    }, e.prototype.onmousemove = function (t) {
        this._pointerMove(t, t)
    }, e.prototype.onMSPointerMove = e.prototype.onpointermove = function (t) {
        t.pointerId == this.pointerIdentifier && this._pointerMove(t, t)
    }, e.prototype.ontouchmove = function (t) {
        var n = this.getTouch(t.changedTouches);
        n && this._pointerMove(t, n)
    }, e.prototype._pointerMove = function (t, n) {
        this.pointerMove(t, n), this.emitEvent("pointerMove", [this, t, n])
    }, e.prototype.pointerMove = o, e.prototype.onmouseup = function (t) {
        this._pointerUp(t, t)
    }, e.prototype.onMSPointerUp = e.prototype.onpointerup = function (t) {
        t.pointerId == this.pointerIdentifier && this._pointerUp(t, t)
    }, e.prototype.ontouchend = function (t) {
        var n = this.getTouch(t.changedTouches);
        n && this._pointerUp(t, n)
    }, e.prototype._pointerUp = function (t, n) {
        this.isPointerDown = !1, delete this.pointerIdentifier, this._unbindPostStartEvents(), this.pointerUp(t, n), this.emitEvent("pointerUp", [this, t, n])
    }, e.prototype.pointerUp = o, e.prototype.onMSPointerCancel = e.prototype.onpointercancel = function (t) {
        t.pointerId == this.pointerIdentifier && this._pointerUp(t, t)
    }, e.prototype.ontouchcancel = function (t) {
        var n = this.getTouch(t.changedTouches);
        this._pointerUp(t, n)
    }, e.getPointerPoint = function (t) {
        return {x: void 0 !== t.pageX ? t.pageX : t.clientX, y: void 0 !== t.pageY ? t.pageY : t.clientY}
    }, e.setPointerPoint = function (t, n) {
        t.x = void 0 !== n.pageX ? n.pageX : n.clientX, t.y = void 0 !== n.pageY ? n.pageY : n.clientY
    }, e
});
!function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["get-size/get-size"], function (i) {
        return e(t, i)
    }) : "object" == typeof exports ? module.exports = e(t, require("get-size")) : (t.Flickity = t.Flickity || {}, t.Flickity.Cell = e(t, t.getSize))
}(window, function (t, e) {
    "use strict";
    function i(t, e) {
        this.element = t, this.parent = e, this.create()
    }

    return i.prototype.create = function () {
        this.element.style.position = "absolute", this.x = 0, this.shift = 0
    }, i.prototype.destroy = function () {
        this.element.style.position = "";
        var t = this.parent.originSide;
        this.element.style[t] = ""
    }, i.prototype.getSize = function () {
        this.size = e(this.element)
    }, i.prototype.setPosition = function (t) {
        this.x = t, this.setDefaultTarget(), this.renderPosition(t)
    }, i.prototype.setDefaultTarget = function () {
        var t = "left" == this.parent.originSide ? "marginLeft" : "marginRight";
        this.target = this.x + this.size[t] + this.size.width * this.parent.cellAlign
    }, i.prototype.renderPosition = function (t) {
        var e = this.parent.originSide;
        this.element.style[e] = this.parent.getPositionValue(t)
    }, i.prototype.wrapShift = function (t) {
        this.shift = t, this.renderPosition(this.x + this.parent.slideableWidth * t)
    }, i.prototype.remove = function () {
        this.element.parentNode.removeChild(this.element)
    }, i
});
!function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./utils"], function (i) {
        return e(t, i)
    }) : "object" == typeof exports ? module.exports = e(t, require("./utils")) : (t.Flickity = t.Flickity || {}, t.Flickity.PrevNextButton = e(t, t.utils))
}(window, function (t, e) {
    "use strict";
    function i(t, e) {
        this.direction = t, this.parent = e, this._create()
    }

    var n = "http://www.w3.org/2000/svg", s = function () {
        function t() {
            if (void 0 !== e)return e;
            var t = document.createElement("div");
            return t.innerHTML = "<svg/>", e = (t.firstChild && t.firstChild.namespaceURI) == n
        }

        var e;
        return t
    }();
    return i.prototype._create = function () {
        this.isEnabled = !0, this.isPrevious = -1 == this.direction;
        var t = this.parent.options.rightToLeft ? 1 : -1;
        if (this.isLeft = this.direction == t, this.element = document.createElement("button"), this.element.className = "flickity-prev-next-button", this.element.className += this.isPrevious ? " previous" : " next", s()) {
            var e = this.createSVG();
            this.element.appendChild(e)
        } else this.setArrowText(), this.element.className += " no-svg";
        var i = this;
        this.onselect = function () {
            i.update()
        }, this.parent.on("select", this.onselect), this.element.onclick = function () {
            i.onclick()
        }
    }, i.prototype.activate = function () {
        this.parent.element.appendChild(this.element)
    }, i.prototype.deactivate = function () {
        this.parent.element.removeChild(this.element)
    }, i.prototype.createSVG = function () {
        var t = document.createElementNS(n, "svg");
        t.setAttribute("viewBox", "0 0 100 100");
        var e = document.createElementNS(n, "path");
        e.setAttribute("d", "M 50,0 L 60,10 L 20,50 L 60,90 L 50,100 L 0,50 Z"), e.setAttribute("class", "arrow");
        var i = this.isLeft ? "translate(15,0)" : "translate(85,100) rotate(180)";
        return e.setAttribute("transform", i), t.appendChild(e), t
    }, i.prototype.setArrowText = function () {
        var t = this.parent.options, i = this.isLeft ? t.leftArrowText : t.rightArrowText;
        e.setText(this.element, i)
    }, i.prototype.onclick = function () {
        if (this.isEnabled) {
            this.parent.uiChange();
            var t = this.isPrevious ? "previous" : "next";
            this.parent[t]()
        }
    }, i.prototype.enable = function () {
        this.isEnabled || (this.element.disabled = !1, this.isEnabled = !0)
    }, i.prototype.disable = function () {
        this.isEnabled && (this.element.disabled = !0, this.isEnabled = !1)
    }, i.prototype.update = function () {
        if (this.parent.options.wrapAround)return void this.enable();
        var t = this.isPrevious ? 0 : this.parent.cells.length - 1, e = this.parent.selectedIndex == t ? "disable" : "enable";
        this[e]()
    }, i
});
!function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["eventie/eventie", "./utils"], function (i, o) {
        return e(t, i, o)
    }) : "object" == typeof exports ? module.exports = e(t, require("eventie"), require("./utils")) : (t.Flickity = t.Flickity || {}, t.Flickity.PageDots = e(t, t.eventie, t.utils))
}(window, function (t, e, i) {
    "use strict";
    function o(t) {
        this.parent = t, this._create()
    }

    return o.prototype._create = function () {
        this.holder = document.createElement("ol"), this.holder.className = "flickity-page-dots", this.dots = [];
        var t = this;
        this.onselect = function () {
            t.updateSelected()
        }, this.parent.on("select", this.onselect), e.bind(this.holder, "click", this)
    }, o.prototype.activate = function () {
        this.setDots(), this.updateSelected(), this.parent.element.appendChild(this.holder)
    }, o.prototype.deactivate = function () {
        this.parent.element.removeChild(this.holder)
    }, o.prototype.setDots = function () {
        var t = this.parent.cells.length - this.dots.length;
        t > 0 ? this.addDots(t) : 0 > t && this.removeDots(-t)
    }, o.prototype.addDots = function (t) {
        for (var e = document.createDocumentFragment(), i = []; t;) {
            var o = document.createElement("li");
            o.className = "dot", e.appendChild(o), i.push(o), t--
        }
        this.holder.appendChild(e), this.dots = this.dots.concat(i)
    }, o.prototype.removeDots = function (t) {
        for (var e = this.dots.splice(this.dots.length - t, t), i = 0, o = e.length; o > i; i++) {
            var s = e[i];
            this.holder.removeChild(s)
        }
    }, o.prototype.updateSelected = function () {
        this.selectedDot && (this.selectedDot.className = "dot"), this.selectedDot = this.dots[this.parent.selectedIndex], this.selectedDot.className = "dot is-selected"
    }, o.prototype.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, o.prototype.onclick = function (t) {
        var e = t.target;
        if ("LI" == e.nodeName) {
            this.parent.uiChange();
            var o = i.indexOf(this.dots, e);
            this.parent.select(o)
        }
    }, o
});
!function (t, i) {
    "use strict";
    "function" == typeof define && define.amd ? define(function () {
        return i()
    }) : "object" == typeof exports ? module.exports = i() : (t.Flickity = t.Flickity || {}, t.Flickity.Player = i())
}(window, function () {
    "use strict";
    function t(t) {
        this.isPlaying = !1, this.parent = t
    }

    return t.prototype.play = function () {
        this.isPlaying = !0, delete this.isPaused, this.tick()
    }, t.prototype.tick = function () {
        if (this.isPlaying && !this.isPaused) {
            var t = this.parent.options.autoPlay;
            t = "number" == typeof t ? t : 3e3;
            var i = this;
            this.timeout = setTimeout(function () {
                i.parent.next(!0), i.tick()
            }, t)
        }
    }, t.prototype.stop = function () {
        this.isPlaying = !1, delete this.isPaused, this.clear()
    }, t.prototype.clear = function () {
        clearTimeout(this.timeout)
    }, t.prototype.pause = function () {
        this.isPlaying && (this.isPaused = !0, this.clear())
    }, t.prototype.unpause = function () {
        this.isPaused && this.play()
    }, t
});
!function (t, i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./unipointer", "classie/classie", "eventie/eventie", "./utils"], function (e, s, n) {
        return i(t, e, s, n)
    }) : "object" == typeof exports ? module.exports = i(t, require("./unipointer"), require("desandro-classie"), require("eventie"), require("./utils")) : (t.Flickity = t.Flickity || {}, t.Flickity.dragPrototype = i(t, t.Unipointer, t.classie, t.eventie, t.utils))
}(window, function (t, i, e, s, n) {
    "use strict";
    function r(t) {
        t.preventDefault ? t.preventDefault() : t.returnValue = !1
    }

    var o = {};
    n.extend(o, i.prototype), o.bindDrag = function () {
        this.options.draggable && (this.handles = [this.viewport], this.bindHandles(), s.bind(this.viewport, "click", this))
    }, o.unbindDrag = function () {
        this.options.draggable && (this.bindHandles(!1), s.unbind(this.viewport, "click", this))
    };
    var a = {INPUT: !0, A: !0, BUTTON: !0};
    return o.pointerDown = function (t, s) {
        var n = t.target.nodeName, o = "touchstart" == t.type, h = a[n];
        (!o || o && !h) && r(t);
        var l = document.activeElement;
        l && l.blur && l != this.element && l.blur(), this.options.accessibility && "INPUT" != n && this.element.focus(), this.velocity = 0, this.pointerDownPoint = i.getPointerPoint(s), this.player.stop(), e.add(this.viewport, "is-pointer-down")
    }, o.pointerMove = function (t, e) {
        var s = i.getPointerPoint(e), n = s.x - this.pointerDownPoint.x;
        !this.isDragging && Math.abs(n) > 3 && this.dragStart(t, e), this.dragMove(s, t, e)
    }, o.pointerUp = function (t, i) {
        this.isDragging ? this.dragEnd(t, i) : this.staticClick(t, i), e.remove(this.viewport, "is-pointer-down")
    }, o.dragStart = function (t, e) {
        this.isDragging = !0, this.dragStartPoint = i.getPointerPoint(e), this.dragStartPosition = this.x, this.startAnimation(), this.isPreventingClicks = !0, this.dispatchEvent("dragStart", t, [e])
    }, o.dragMove = function (t, i, e) {
        if (this.isDragging) {
            this.previousDragX = this.x;
            var s = t.x - this.dragStartPoint.x, n = this.options.rightToLeft ? -1 : 1;
            if (this.x = this.dragStartPosition + s * n, !this.options.wrapAround && this.cells.length) {
                var r = Math.max(-this.cells[0].target, this.dragStartPosition);
                this.x = this.x > r ? .5 * (this.x - r) + r : this.x;
                var o = Math.min(-this.getLastCell().target, this.dragStartPosition);
                this.x = this.x < o ? .5 * (this.x - o) + o : this.x
            }
            this.previousDragMoveTime = this.dragMoveTime, this.dragMoveTime = new Date, this.dispatchEvent("dragMove", i, [e])
        }
    }, o.dragEnd = function (t, i) {
        this.dragEndFlick(), this.options.freeScroll && (this.isFreeScrolling = !0);
        var e = this.dragEndRestingSelect();
        if (this.options.freeScroll && !this.options.wrapAround) {
            var s = this.getRestingPosition();
            this.isFreeScrolling = -s > this.cells[0].target && -s < this.getLastCell().target
        } else this.options.freeScroll || e != this.selectedIndex || (e += this.dragEndBoostSelect());
        this.select(e), this.isDragging = !1;
        var n = this;
        setTimeout(function () {
            delete n.isPreventingClicks
        }), this.dispatchEvent("dragEnd", t, [i])
    }, o.dragEndFlick = function () {
        if (isFinite(this.previousDragX)) {
            var t = this.dragMoveTime - this.previousDragMoveTime;
            t /= 1e3 / 60;
            var i = this.x - this.previousDragX;
            this.velocity = i / t, delete this.previousDragX
        }
    }, o.dragEndRestingSelect = function () {
        var t = this.getRestingPosition(), i = Math.abs(this.getCellDistance(-t, this.selectedIndex)), e = this._getClosestResting(t, i, 1), s = this._getClosestResting(t, i, -1), n = e.distance < s.distance ? e.index : s.index;
        return n
    }, o._getClosestResting = function (t, i, e) {
        for (var s = this.selectedIndex, n = 1 / 0, r = this.options.contain && !this.options.wrapAround ? function (t, i) {
            return i >= t
        } : function (t, i) {
            return i > t
        }; r(i, n) && (s += e, n = i, i = this.getCellDistance(-t, s), null !== i);)i = Math.abs(i);
        return {distance: n, index: s - e}
    }, o.getCellDistance = function (t, i) {
        var e = this.cells.length, s = this.options.wrapAround ? n.modulo(i, e) : i, r = this.cells[s];
        if (!r)return null;
        var o = this.options.wrapAround ? this.slideableWidth * Math.floor(i / e) : 0;
        return t - (r.target + o)
    }, o.dragEndBoostSelect = function () {
        var t = this.getCellDistance(-this.x, this.selectedIndex);
        return t > 0 && this.velocity < -1 ? 1 : 0 > t && this.velocity > 1 ? -1 : 0
    }, o.onclick = function (t) {
        this.isPreventingClicks && r(t)
    }, o.staticClick = function (t, i) {
        "INPUT" == t.target.nodeName && "text" == t.target.type && t.target.focus(), this.dispatchEvent("staticClick", t, [i])
    }, o
});
!function (t, i) {
    "use strict";
    "function" == typeof define && define.amd ? define(["get-style-property/get-style-property", "./utils"], function (e, s) {
        return i(t, e, s)
    }) : "object" == typeof exports ? module.exports = i(t, require("desandro-get-style-property"), require("./utils")) : (t.Flickity = t.Flickity || {}, t.Flickity.animatePrototype = i(t, t.getStyleProperty, t.utils))
}(window, function (t, i, e) {
    "use strict";
    for (var s, n = 0, o = "webkit moz ms o".split(" "), r = t.requestAnimationFrame, h = t.cancelAnimationFrame, l = 0; l < o.length && (!r || !h); l++)s = o[l], r = r || t[s + "RequestAnimationFrame"], h = h || t[s + "CancelAnimationFrame"] || t[s + "CancelRequestAnimationFrame"];
    r && h || (r = function (i) {
        var e = (new Date).getTime(), s = Math.max(0, 16 - (e - n)), o = t.setTimeout(function () {
            i(e + s)
        }, s);
        return n = e + s, o
    }, h = function (i) {
        t.clearTimeout(i)
    });
    var a = {};
    a.startAnimation = function () {
        this.isAnimating || (this.isAnimating = !0, this.restingFrames = 0, this.animate())
    }, a.animate = function () {
        this.applySelectedAttraction();
        var t = this.x;
        if (this.updatePhysics(), this.positionSlider(), this.settle(t), this.isAnimating) {
            var i = this;
            r(function () {
                i.animate()
            })
        }
    };
    var c = i("transform"), u = !!i("perspective");
    return a.positionSlider = function () {
        var t = this.x;
        this.options.wrapAround && (t = e.modulo(t, this.slideableWidth), t -= this.slideableWidth, this.shiftWrapCells(t)), t += this.cursorPosition, t = this.options.rightToLeft && c ? -t : t;
        var i = this.getPositionValue(t);
        c ? this.slider.style[c] = u && this.isAnimating ? "translate3d(" + i + ",0,0)" : "translateX(" + i + ")" : this.slider.style[this.originSide] = i
    }, a.positionSliderAtSelected = function () {
        var t = this.cells[this.selectedIndex];
        this.x = -t.target, this.positionSlider()
    }, a.getPositionValue = function (t) {
        return this.options.percentPosition ? .01 * Math.round(t / this.size.innerWidth * 1e4) + "%" : Math.round(t) + "px"
    }, a.settle = function (t) {
        this.isPointerDown || Math.round(100 * this.x) != Math.round(100 * t) || this.restingFrames++, this.restingFrames > 2 && (this.isAnimating = !1, delete this.isFreeScrolling, u && this.positionSlider(), this.dispatchEvent("settle"))
    }, a.shiftWrapCells = function (t) {
        var i = this.cursorPosition + t;
        this._shiftCells(this.beforeShiftCells, i, -1);
        var e = this.size.innerWidth - (t + this.slideableWidth + this.cursorPosition);
        this._shiftCells(this.afterShiftCells, e, 1)
    }, a._shiftCells = function (t, i, e) {
        for (var s = 0, n = t.length; n > s; s++) {
            var o = t[s], r = i > 0 ? e : 0;
            o.wrapShift(r), i -= o.size.outerWidth
        }
    }, a._unshiftCells = function (t) {
        if (t && t.length)for (var i = 0, e = t.length; e > i; i++)t[i].wrapShift(0)
    }, a.updatePhysics = function () {
        this.velocity += this.accel, this.x += this.velocity, this.velocity *= this.getFrictionFactor(), this.accel = 0
    }, a.applyForce = function (t) {
        this.accel += t
    }, a.getFrictionFactor = function () {
        return 1 - this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"]
    }, a.getRestingPosition = function () {
        return this.x + this.velocity / (1 - this.getFrictionFactor())
    }, a.applySelectedAttraction = function () {
        if (!this.isPointerDown && !this.isFreeScrolling && this.cells.length) {
            var t = this.cells[this.selectedIndex], i = this.options.wrapAround ? this.slideableWidth * Math.floor(this.selectedIndex / this.cells.length) : 0, e = -1 * (t.target + i) - this.x, s = e * this.options.selectedAttraction;
            this.applyForce(s)
        }
    }, a
});
!function (e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["./utils"], function (i) {
        return t(e, i)
    }) : "object" == typeof exports ? module.exports = t(e, require("./utils")) : (e.Flickity = e.Flickity || {}, e.Flickity.cellChangePrototype = t(e, e.utils))
}(window, function (e, t) {
    "use strict";
    function i(e) {
        for (var t = document.createDocumentFragment(), i = 0, s = e.length; s > i; i++) {
            var l = e[i];
            t.appendChild(l.element)
        }
        return t
    }

    var s = {};
    return s.insert = function (e, t) {
        var s = this._makeCells(e);
        if (s && s.length) {
            var l = this.cells.length;
            t = void 0 === t ? l : t;
            var n = i(s), c = t == l;
            if (c)this.slider.appendChild(n); else {
                var h = this.cells[t].element;
                this.slider.insertBefore(n, h)
            }
            if (0 === t)this.cells = s.concat(this.cells); else if (c)this.cells = this.cells.concat(s); else {
                var o = this.cells.splice(t, l - t);
                this.cells = this.cells.concat(s).concat(o)
            }
            this._sizeCells(s), this._cellAddedRemoved(t)
        }
    }, s.append = function (e) {
        this.insert(e, this.cells.length)
    }, s.prepend = function (e) {
        this.insert(e, 0)
    }, s.remove = function (e) {
        for (var i = this.getCells(e), s = 0, l = i.length; l > s; s++) {
            var n = i[s];
            n.remove(), t.removeFrom(n, this.cells)
        }
        i.length && this._cellAddedRemoved(0)
    }, s._cellAddedRemoved = function (e) {
        this.pageDots && this.pageDots.setDots(), this.selectedIndex = Math.max(0, Math.min(this.cells.length - 1, this.selectedIndex)), this.cellChange(e)
    }, s.cellSizeChange = function (e) {
        var i = this.getCell(e);
        if (i) {
            i.getSize();
            var s = t.indexOf(this.cells, i);
            this.cellChange(s)
        }
    }, s.cellChange = function (e) {
        e = e || 0, this._positionCells(e), this._getWrapShiftCells(), this.setContainerSize(), this.options.freeScroll ? this.positionSlider() : this.select(this.selectedIndex)
    }, s
});
!function (t, e) {
    "use strict";
    if ("function" == typeof define && define.amd)define(["classie/classie", "eventEmitter/EventEmitter", "eventie/eventie", "get-size/get-size", "./utils", "./cell", "./prev-next-button", "./page-dots", "./player", "./drag", "./animate", "./cell-change"], function (i, s, o, n, l, r, h, a, c, p, d, u) {
        return e(t, i, s, o, n, l, r, h, a, c, p, d, u)
    }); else if ("object" == typeof exports)module.exports = e(t, require("desandro-classie"), require("wolfy87-eventemitter"), require("eventie"), require("get-size"), require("./utils"), require("./cell"), require("./prev-next-button"), require("./page-dots"), require("./player"), require("./drag"), require("./animate"), require("./cell-change")); else {
        var i = t.Flickity;
        t.Flickity = e(t, t.classie, t.EventEmitter, t.eventie, t.getSize, t.utils, i.Cell, i.PrevNextButton, i.PageDots, i.Player, i.dragPrototype, i.animatePrototype, i.cellChangePrototype)
    }
}(window, function (t, e, i, s, o, n, l, r, h, a, c, p, d) {
    "use strict";
    function u(t, e) {
        for (; t.children.length;)e.appendChild(t.children[0])
    }

    function f(t, e) {
        var i = n.getQueryElement(t);
        return i ? (this.element = i, v && (this.$element = v(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e), void this._create()) : void(m && m.error("Bad element for Flickity: " + (i || t)))
    }

    var v = t.jQuery, g = t.getComputedStyle, m = t.console, y = t.imagesLoaded, C = 0, x = {};
    f.defaults = {
        accessibility: !0,
        freeScrollFriction: .075,
        friction: .28,
        cellAlign: "center",
        draggable: !0,
        percentPosition: !0,
        pageDots: !0,
        prevNextButtons: !0,
        resizeBound: !0,
        selectedAttraction: .025,
        leftArrowText: "←",
        rightArrowText: "→"
    }, n.extend(f.prototype, i.prototype), f.prototype._create = function () {
        var e = this.guid = ++C;
        this.element.flickityGUID = e, x[e] = this, this.selectedIndex = this.options.initialIndex || 0, this.restingFrames = 0, this.x = 0, this.velocity = 0, this.accel = 0, this.originSide = this.options.rightToLeft ? "right" : "left", this.viewport = document.createElement("div"), this.viewport.className = "flickity-viewport", this._createSlider(), this.options.prevNextButtons && (this.prevButton = new r(-1, this), this.nextButton = new r(1, this)), this.options.pageDots && (this.pageDots = new h(this)), this.player = new a(this), (this.options.resizeBound || this.options.watchCSS) && s.bind(t, "resize", this), this.options.watchCSS ? this.watchCSS() : this.activate()
    }, f.prototype.option = function (t) {
        n.extend(this.options, t)
    }, f.prototype.activate = function () {
        this.isActive || (this.isActive = !0, e.add(this.element, "flickity-enabled"), u(this.element, this.slider), this.viewport.appendChild(this.slider), this.element.appendChild(this.viewport), this.getSize(), this.reloadCells(), this.setContainerSize(), this.prevButton && this.prevButton.activate(), this.nextButton && this.nextButton.activate(), this.pageDots && this.pageDots.activate(), this.options.autoPlay && (this.player.play(), s.bind(this.element, "mouseenter", this)), this.positionSliderAtSelected(), this.select(this.selectedIndex), this.imagesLoaded(), this.bindDrag(), this.options.accessibility && (this.element.tabIndex = 0, s.bind(this.element, "keydown", this)))
    }, f.prototype._createSlider = function () {
        var t = document.createElement("div");
        t.className = "flickity-slider", t.style[this.originSide] = 0, this.slider = t
    }, f.prototype.reloadCells = function () {
        this.cells = this._makeCells(this.slider.children), this.positionCells(this.cells), this._getWrapShiftCells(), this.setContainerSize()
    }, f.prototype._makeCells = function (t) {
        for (var e = n.filterFindElements(t, this.options.cellSelector), i = [], s = 0, o = e.length; o > s; s++) {
            var r = e[s], h = new l(r, this);
            i.push(h)
        }
        return i
    }, f.prototype.getLastCell = function () {
        return this.cells[this.cells.length - 1]
    }, f.prototype.positionCells = function () {
        this._sizeCells(this.cells), this._positionCells(0)
    }, f.prototype._positionCells = function (t) {
        this.maxCellHeight = t ? this.maxCellHeight || 0 : 0;
        var e = 0;
        if (t > 0) {
            var i = this.cells[t - 1];
            e = i.x + i.size.outerWidth
        }
        for (var s, o = this.cells.length, n = t; o > n; n++)s = this.cells[n], s.setPosition(e), e += s.size.outerWidth, this.maxCellHeight = Math.max(s.size.outerHeight, this.maxCellHeight);
        this.slideableWidth = e, this._containCells()
    }, f.prototype._sizeCells = function (t) {
        for (var e = 0, i = t.length; i > e; e++) {
            var s = t[e];
            s.getSize()
        }
    }, f.prototype.getSize = function () {
        this.size = o(this.element), this.setCellAlign(), this.cursorPosition = this.size.innerWidth * this.cellAlign
    };
    var S = {center: {left: .5, right: .5}, left: {left: 0, right: 1}, right: {right: 0, left: 1}};
    f.prototype.setCellAlign = function () {
        var t = S[this.options.cellAlign];
        this.cellAlign = t ? t[this.originSide] : this.options.cellAlign
    }, f.prototype.setContainerSize = function () {
        this.viewport.style.height = this.maxCellHeight + "px"
    }, f.prototype._getWrapShiftCells = function () {
        if (this.options.wrapAround) {
            this._unshiftCells(this.beforeShiftCells), this._unshiftCells(this.afterShiftCells);
            var t = this.cursorPosition, e = this.cells.length - 1;
            this.beforeShiftCells = this._getGapCells(t, e, -1), t = this.size.innerWidth - this.cursorPosition, this.afterShiftCells = this._getGapCells(t, 0, 1)
        }
    }, f.prototype._getGapCells = function (t, e, i) {
        for (var s = []; t > 0;) {
            var o = this.cells[e];
            if (!o)break;
            s.push(o), e += i, t -= o.size.outerWidth
        }
        return s
    }, f.prototype._containCells = function () {
        if (this.options.contain && !this.options.wrapAround)for (var t = this.getLastCell(), e = this.options.rightToLeft ? "marginLeft" : "marginRight", i = this.slideableWidth - t.size[e], s = i - this.size.innerWidth * (1 - this.cellAlign), o = 0, n = this.cells.length; n > o; o++) {
            var l = this.cells[o];
            l.setDefaultTarget(), l.target = Math.max(l.target, this.cursorPosition), l.target = Math.min(l.target, s)
        }
    }, f.prototype.dispatchEvent = function (t, e, i) {
        var s = [e].concat(i);
        if (this.emitEvent(t, s), v && this.$element)if (e) {
            var o = v.Event(e);
            o.type = t, this.$element.trigger(o, i)
        } else this.$element.trigger(t, i)
    }, f.prototype.select = function (t, e) {
        this.isActive && (this.options.wrapAround && (0 > t ? this.x -= this.slideableWidth : t >= this.cells.length && (this.x += this.slideableWidth)), (this.options.wrapAround || e) && (t = n.modulo(t, this.cells.length)), this.cells[t] && (this.selectedIndex = t, this.setSelectedCell(), this.startAnimation(), this.dispatchEvent("select")))
    }, f.prototype.previous = function (t) {
        this.select(this.selectedIndex - 1, t)
    }, f.prototype.next = function (t) {
        this.select(this.selectedIndex + 1, t)
    }, f.prototype.updatePrevNextButtons = function () {
        this.prevButton && this.prevButton.update(), this.nextButton && this.nextButton.update()
    }, f.prototype.setSelectedCell = function () {
        this._removeSelectedCellClass(), this.selectedCell = this.cells[this.selectedIndex], e.add(this.selectedCell.element, "is-selected")
    }, f.prototype._removeSelectedCellClass = function () {
        this.selectedCell && e.remove(this.selectedCell.element, "is-selected")
    }, f.prototype.uiChange = function () {
        this.player.stop(), delete this.isFreeScrolling
    }, f.prototype.imagesLoaded = function () {
        function t(t, i) {
            var s = e.getCell(i.img), o = s.element || n.getParent(i.img, ".flickity-slider > *");
            e.cellSizeChange(o)
        }

        if (this.options.imagesLoaded && y) {
            var e = this;
            y(this.slider).on("progress", t)
        }
    }, f.prototype.getCell = function (t) {
        for (var e = 0, i = this.cells.length; i > e; e++) {
            var s = this.cells[e];
            if (s.element == t)return s
        }
    }, f.prototype.getCells = function (t) {
        t = n.makeArray(t);
        for (var e = [], i = 0, s = t.length; s > i; i++) {
            var o = t[i], l = this.getCell(o);
            l && e.push(l)
        }
        return e
    }, f.prototype.onresize = function () {
        this.watchCSS(), this.resize()
    }, n.debounceMethod(f, "onresize", 150), f.prototype.resize = function () {
        this.isActive && (this.getSize(), this.options.wrapAround && (this.x = n.modulo(this.x, this.slideableWidth)), this.positionCells(), this._getWrapShiftCells(), this.setContainerSize(), this.positionSliderAtSelected())
    };
    var b = f.supportsConditionalCSS = function () {
        var t;
        return function () {
            if (void 0 !== t)return t;
            if (!g)return void(t = !1);
            var e = document.createElement("style"), i = document.createTextNode('body:after { content: "foo"; display: none; }');
            e.appendChild(i), document.head.appendChild(e);
            var s = g(document.body, ":after").content;
            return t = -1 != s.indexOf("foo"), document.head.removeChild(e), t
        }
    }();
    return f.prototype.watchCSS = function () {
        var t = this.options.watchCSS;
        if (t) {
            var e = b();
            if (!e) {
                var i = "fallbackOn" == t ? "activate" : "deactivate";
                return void this[i]()
            }
            var s = g(this.element, ":after").content;
            -1 != s.indexOf("flickity") ? this.activate() : this.deactivate()
        }
    }, f.prototype.onkeydown = function (t) {
        if (this.options.accessibility && (!document.activeElement || document.activeElement == this.element))if (37 == t.keyCode) {
            var e = this.options.rightToLeft ? "next" : "previous";
            this.uiChange(), this[e]()
        } else if (39 == t.keyCode) {
            var i = this.options.rightToLeft ? "previous" : "next";
            this.uiChange(), this[i]()
        }
    }, f.prototype.onmouseenter = function () {
        this.player.pause(), s.bind(this.element, "mouseleave", this)
    }, f.prototype.onmouseleave = function () {
        this.player.unpause(), s.unbind(this.element, "mouseleave", this)
    }, f.prototype.deactivate = function () {
        if (this.isActive) {
            e.remove(this.element, "flickity-enabled");
            for (var t = 0, i = this.cells.length; i > t; t++) {
                var o = this.cells[t];
                o.destroy()
            }
            this._removeSelectedCellClass(), this.element.removeChild(this.viewport), u(this.slider, this.element), this.prevButton && this.prevButton.deactivate(), this.nextButton && this.nextButton.deactivate(), this.pageDots && this.pageDots.deactivate(), this.player.stop(), this.unbindDrag(), this.options.accessibility && (this.element.removeAttribute("tabIndex"), s.unbind(this.element, "keydown", this)), this.isActive = !1, this.isAnimating = !1
        }
    }, f.prototype.destroy = function () {
        this.deactivate(), (this.options.resizeBound || this.options.watch) && s.unbind(t, "resize", this), delete this.element.flickityGUID, delete x[this.guid]
    }, n.extend(f.prototype, c), n.extend(f.prototype, p), n.extend(f.prototype, d), f.data = function (t) {
        t = n.getQueryElement(t);
        var e = t && t.flickityGUID;
        return e && x[e]
    }, n.htmlInit(f, "flickity"), v && v.bridget && v.bridget("flickity", f), f.Cell = l, f.PrevNextButton = r, f.PageDots = h, f.Player = a, f
});
$("body").append('<div class="slideright"><a href="javascript:;" class="back">回顶部</a></div>');
$(function () {
    var myScroll, wrapperbox = $("#wrapper").length, iswinH = $(window).height(), isbodyH = $("body").height(), myapp = $(".myapp").length, iscomment = $(".appcommentshow");
    $("img.lazy").lazyload({effect: "fadeIn"});
    $("#seatype>b,#seatype>i").click(function () {
        $("#seaul").slideToggle(150);
    });
    if (iscomment.length) {
        var wh = $(window).width(), $pagebtn = $(".pages_Pagination a:not(.navigation)");
        if (wh < 640) {
            $pagebtn.css("display", "none").eq(1).css("display", "block");
            $(".pages_Pagination a.current").css("display", "block");
            $pagebtn.first().css("display", "block");
            $pagebtn.last().css("display", "block");
        }
    }
    ;
    function loaded() {
        myScroll = new IScroll('#wrapper', {
            eventPassthrough: true,
            scrollX: true,
            scrollY: false,
            preventDefault: false
        });
    };
    if (wrapperbox) {
        $(window).load(function () {
            loaded();
        });
        $(".sbody_group").css("marginTop", 0);
        $("#showmore").click(function () {
            var isclose = $("#closebtn").is(":hidden");
            if (isclose) {
                $("#closebtn,#nav-tabs").css("display", "block");

            } else {
                $("#closebtn,#nav-tabs").css("display", "none");
            }
        });
        $(".closebtn").click(function () {
            $("#closebtn,#nav-tabs").toggle();
        })
    }
    ;
    $("#exampleInputEmail1").change(function () {
        $("#seaul").slideToggle(150);
    });
    $("#seatype").mouseleave(function () {
        var ishidden = $("#seaul").is(":hidden");
        if (ishidden)return;
        $("#seaul").slideToggle(150);
    });
    if (myapp) {
        $(".app-list").each(function () {
            var isdiv = $(this).find(".showdata").length, self = this;
            if (isdiv) {
                $(self).find(".nodata").css("display", "none");
            } else {
                $(self).find(".nodata").css("display", "block");
            }
        })
    }
    $("#seaul li").click(function () {
        var self = this, isval = $(this).text(), isclass = $(self).attr("class"), isautodiv = $(".autocomplete-suggestions:last").html();
        if (isval == "iOS") {
            $(self).closest(".seatypelist").removeClass("android");
            $(self).closest("form").attr("action", "/i/");
        } else {
            $(self).closest(".seatypelist").addClass("android");
            $(self).closest("form").attr("action", "/a/");
        }
        $(self).closest("form").find("#keytype").val(isval);
        $(self).closest("ul").toggle();
        $("#seatype>b").attr("class", isclass).text(isval);
        if (isautodiv.length > 0) {
            $(".autocomplete-suggestions").show();
            $("#exampleInputEmail1").focus();
        }
    });
    // 点击刷新验证码
    $('#code-img').on('click', function () {

        var src = $(this).attr('src'), issrc = "";
        if (src.indexOf('?') != -1) issrc = src.replace(/\?.*/i, '?' + (+new Date()));
        else issrc = issrc + src + '?' + (+new Date());
        console.log(src);
        $(this).attr('src', issrc);
    });
    window.isMobile = /mobile/i.test(navigator.userAgent);
    $('[data-toggle="tooltip"]').tooltip();

    // 已经获取的数据
    window.chartData = {};
    // 已经获取的关键词ID
    window.hasDataIdStr = '';
    // 当前显示的关键词ID
    window.currentKeywordid = [];
    var c, keywordrank = $(".keywordrank").length;
    $('.cascade').hover(function (e) {
        var self = $(this);
        c = setTimeout(function () {
            self.find('.cascade-menu').show();
        }, 200);
    }, function (e) {
        clearTimeout(c);
        var self = $(this);
        self.find('.cascade-menu').hide();
    });
    if (keywordrank) {
        $(".classkey a").click(function () {
            var iskey = $(this).data("id"), ishide = $("#keycategory").is(":hidden");
            $(".classkey a").removeClass("on");
            $(this).addClass("on");
            console.log(iskey);
            if (iskey == "all") {
                if (!ishide) {
                    $("#keycategory").css("display", "none");
                }
            } else if (iskey == "two") {
                if (ishide) {
                    $("#keycategory").css("display", "block");
                }
            }
        });
        $("#closekey").click(function () {
            $("#keycategory").css("display", "none");
            $(".classkey a").removeClass("on").eq(0).addClass("on");
        });
    }
    ;
    if ($('.rank-index').length > 0) {
        // 图片懒加载
        $("img.lazy").lazyload({
            // hreshold : 100,
            // effect : "fadeIn",
        });
    }
    ;

    // 排行榜 滚动联动
    if ($('#fast-navbar').length > 0) {
        $('body').attr({
            'data-offset': $('#rank199').length > 0 ? $('#rank199').offset().top : 170,
            'data-target': '#fast-navbar',
            'data-spy': 'scroll',
        });
        $('#go-top').on('click', function () {
            $('html, body').animate({scrollTop: '0px'}, 100);
        });
    }

    // 展开的列表
    $('.unfold-toggle[data-toggle="unfold"]') && $('[data-toggle="unfold"]').on('click', function (e) {
        preventDefault(e);
        var self = $(this);
        var unfold = self.siblings('.unfold-menu');
        if (unfold.is(":hidden")) {
            unfold.slideDown('fast');
            self.find('span').removeClass('glyphicon-triangle-right').addClass('glyphicon-triangle-bottom');
        } else {
            unfold.slideUp('fast');
            self.find('span').removeClass('glyphicon-triangle-bottom').addClass('glyphicon-triangle-right');
        }
    });


    var $activityBetaObj = $('.activity-beta-box');
    if ($activityBetaObj.length > 0) {
        var currentTime = +new Date(),
            showDate = 0,
            mobilehide = $activityBetaObj.data('mobilehide') || 1;

        showDate = parseInt($.cookie('activity_cookie'));
        isCurrentDay = currentTime + 86400 * 1000 > showDate && currentTime - 86400 * 1000 < showDate;

        if ((isMobile && !mobilehide && isCurrentDay) || (!isMobile && !isCurrentDay)) {
            // 判断是否显示
            setTimeout(function () {
                $activityBetaObj.removeClass('hide').show().addClass('show');
            }, 1000);
            $activityBetaObj.find('.activity-beta-button-circle').on('click', function () {
                if (parseInt($activityBetaObj.find('.activity-beta-content').css('top')) != 0) return false;
                $activityBetaObj.css({'opacity': 1,}).addClass('activity-hide');
                $('.activity-beta-open').show().addClass('activity-show');
                setTimeout(function () {
                    $activityBetaObj.hide().removeClass('show');
                }, 1000);
            });
            // 修改cookie
            var date = new Date();
            date.setTime(date.getTime() + (86400 * 1000 * 30));
            $.cookie('activity_cookie', +new Date(), {path: '/', expires: date});
        } else {
            if (isMobile && !mobilehide) {
                $('.activity-beta-open').show().addClass('activity-show');
            } else if (!isMobile) {
                $('.activity-beta-open').show().addClass('activity-show');
            }
        }

    }
    ;

    // 时间范围选取
    var $dateRangePickerObj = $('.date-range-picker');
    if ($dateRangePickerObj.length > 0) {
        $dateRangePickerObj.map(function (i, e) {
            var $dateRangePickerObj = $(e),
                isOpen = $dateRangePickerObj.data('open'),
                isMulit = $dateRangePickerObj.data('mulit'),
                isNoYestoday = $dateRangePickerObj.data('noyestoday'),
                opens = $dateRangePickerObj.data('opens') || 'left',
                ranges = $dateRangePickerObj.data('ranges') || '',
                noVip = $dateRangePickerObj.data('novip') || 0,
                rangesFirstKey;

            if (noVip) return;

            if (!ranges) {
                ranges = {
                    '今日': [moment().startOf('day'), moment()],
                    '昨日': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    '近7日': [moment().subtract(6, 'days'), moment()],
                    '近30日': [moment().subtract(29, 'days'), moment()],
                    '近三个月': [moment().subtract(3, 'month'), moment()],
                    '近一年': [moment().subtract(1, 'years'), moment()],
                };
                if (isNoYestoday) {
                    delete ranges.昨日;
                    delete ranges.今日;
                }
            } else {
                $.map(ranges, function (obj, index) {
                    ranges[index] = eval('(' + obj + ')');
                });
            }

            locales = {
                applyLabel: '完成',
                cancelLabel: '取消',
                fromLabel: '开始',
                toLabel: '结束',
                customRangeLabel: '自定义',
                daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                firstDay: 1
            }

            $.map(ranges, function (e, k) {
                if (!rangesFirstKey) rangesFirstKey = k;
            });
            window.chartData.titleDate = rangesFirstKey;
            if (isMobile) {
                $dateRangePickerObj.find('span:eq(0).mobile-hide').html(rangesFirstKey).show();
                delete ranges.近三个月;
                locales.customRangeShow = false;
            }

            $dateRangePickerObj.daterangepicker({
                hideRangeInputs: isMobile,
                // format: 'YYYY年MM月D日',
                timePicker: false,
                startDate: moment($dateRangePickerObj.data('date')),
                minDate: $dateRangePickerObj.data('mindate') ? $dateRangePickerObj.data('mindate') : '01/01/2016',
                maxDate: moment().format('MM/DD/YYYY'),
                singleDatePicker: isMulit == 0 || false,
                showDropdowns: true,
                showWeekNumbers: false,
                ranges: ranges,
                opens: opens,
                drops: 'down',
                buttonClasses: ['btn', 'btn-sm'],
                applyClass: 'btn-primary',
                cancelClass: 'btn-default',
                separator: ' to ',
                locale: locales

            }, function (start, end, label) {
                var html;
                if (isMulit == 0) {
                    html = start.format('YYYY年MM月D日');
                } else {
                    if (label != '自定义' && isMobile) {
                        html = label;
                    } else {
                        html = start.format('YYYY年MM月D日') + '~' + end.format('YYYY年MM月D日');
                    }
                }
                $dateRangePickerObj.find('span:eq(0)').html(html);
                if (isOpen == 1) {
                    // 打开页面
                    if (isMulit) {
                        re = new RegExp('sdate=\\d+-\\d+-\\d+', 'i');
                        sdate = window.location.search.match(re);

                        search = window.location.search;
                        if (sdate) {
                            search = search.replace(sdate, 'sdate=' + start.format('YYYY-MM-DD'));
                        } else {
                            search += (window.location.search.indexOf('?') == -1 ? '?' : '&') + 'sdate=' + start.format('YYYY-MM-D');
                        }
                        re = new RegExp('edate=\\d+-\\d+-\\d+', 'i');
                        edate = window.location.search.match(re);
                        if (edate) {
                            search = search.replace(edate, 'edate=' + end.format('YYYY-MM-DD'));
                        } else {
                            search += (window.location.search.indexOf('?') == -1 ? '?' : '&') + 'edate=' + end.format('YYYY-MM-D');
                        }
                    } else {
                        var paramName = $dateRangePickerObj.data('paramname') || 'date',
                            re = new RegExp(paramName + '=\\d+-\\d+-\\d+', 'i'),
                            date = window.location.search.match(re);
                        if (date) {
                            search = window.location.search.replace(date, paramName + '=' + start.format('YYYY-MM-DD'));
                        } else {
                            search = window.location.search + (window.location.search.indexOf('?') == -1 ? '?' : '&') + paramName + '=' + start.format('YYYY-MM-D');
                        }
                    }
                    window.location.href = window.location.protocol + '//' + window.location.hostname + window.location.pathname + search;
                } else {
                    // ajax 获取数据
                    if (label != '自定义') {
                        window.chartData.titleDate = label;
                    } else {
                        window.chartData.titleDate = start.format('YYYY年MM月D日') + '至' + end.format('YYYY年MM月D日');
                    }
                    var url = $('#charts-ajax-data').data('ajaxurl');
                    urlQuery['sdate'] = start.format('YYYY-MM-DD');
                    urlQuery['edate'] = end.format('YYYY-MM-DD');
                    if (window.currentKeywordid.length > 0) {
                        urlQuery.word_id = window.currentKeywordid.join(',');
                    }
                    window.hasDataIdStr = urlQuery.word_id || '';
                    getChartsData(url, urlQuery);
                }

            });
        });
    }
    ;

    // rank-list-more
    var $rankListMore = $('#rank-list-more');
    if ($rankListMore.length > 0) {
        var isGetRankListRunning = false;
        $rankListMore.find('.btn-default').on('click', function () {
            if (isGetRankListRunning) return false;
            var page, maxPage, size, url, spinner, button
            _self = $rankListMore;
            spinner = _self.find('.spinner');
            button = _self.find('.btn-default');
            url = _self.data('url');
            page = _self.data('page');
            size = _self.data('size');
            maxPage = _self.data('maxpage');
            if (page > maxPage) {
                return false;
            }
            button.hide();
            spinner.show();
            isGetRankListRunning = true;
            $.ajax({
                type: 'get',
                url: url + (url.indexOf('?') == -1 ? '?' : '&') + 'page=' + page,
                dataType: 'html',
                success: function (d) {
                    page++;
                    _self.data('page', page);
                    isGetRankListRunning = false;
                    $('.rank-list').append(d);

                    $("img.lazy").lazyload();

                    if (page > maxPage) {
                        _self.remove();
                        return false;
                    }
                    _self.find('.btn-default > span:eq(0)').html('查看  ' + ((page - 1) * size + 1) + '-' + (page * size) + '名');
                    button.show();
                    spinner.hide();
                }

            });
        });
    }
    ;

    var $navAjaxMore = $('#charts-ajax-data');
    if ($navAjaxMore.length > 0) {
        var ajaxUrl = $navAjaxMore.data('ajaxurl'),
            thisUrl = $navAjaxMore.data('thisurl'),
            urlQuery = $navAjaxMore.data('querydata') || {},
            isRun = $navAjaxMore.data('run');


        window.chartData.title = $navAjaxMore.data('title');
        ajaxUrl && isRun != 0 && getChartsData(ajaxUrl, urlQuery);

        $navAjaxMore.find('.dropdown-menu a').on('click', function (e) {
            // preventDefault(e);
            var _self = $(this),
                activeHtml = _self.html(),
                _ul = _self.parents('ul.dropdown-menu'),
                isOpen = _ul.data('open') || 0,
                _li = _self.parent(),
                paramName = _ul.data('paramname'),
                param = _self.data('param');

            urlQuery[paramName] = param;
            if (isOpen) {
                if (!thisUrl) return false;
                var querySearch = '';
                for (var i in urlQuery) {
                    querySearch += i + '=' + urlQuery[i] + '&';
                }
                querySearch = querySearch.slice(0, -1);
                location.href = thisUrl + (thisUrl.indexOf('?') == -1 ? '?' : '&') + querySearch;
            } else {
                if (!ajaxUrl) return false;
                _ul.siblings('a').find('.name').html(activeHtml);
                _li.addClass('active').siblings().removeClass('active');
                getChartsData(ajaxUrl, urlQuery);
            }
        });
    }
    ;


    // 添加自定义关键词
    var $addCustomKeyword = $('.add-custom-keyword');
    if ($addCustomKeyword.length > 0) {
        var $addCompetiBg = $('.add-competi-bg'),
            $addCompetiSpinner = $addCompetiBg.find('.spinner-bg'),
            accountLimit = parseInt($addCompetiBg.find('#account-limit').html()),
            delUrl = $addCompetiBg.find('#custom-list').data('delurl'),
            isSubmiting = false;

        $addCustomKeyword.map(function (i, e) {
            var _self = $(e),
                appid = _self.data('appid'),
                form = _self.find('form'),
                submitUrl = form.attr('action'),
                method = form.attr('method') || 'GET',
                manage = form.find('.btn[type="manage"]');
            // 展示自定义关键词列表
            manage.on('click', function () {
                var url = $(this).data('url');
                $('html, body').animate({scrollTop: '0px'}, 100);
                $addCompetiBg.show();
                $addCompetiSpinner.show();
                return false;
            });
            $('.competi-close').on('click', function () {
                if ($(this).data('refresh')) {
                    window.location.reload();
                }
                $addCompetiBg.hide();
            });

        });
    }
    ;

});

// 获取历史排名
function getChartsData(url, urlQuery) {
    if (!url) return false;
    $.ajax({
        type: 'get',
        url: url,
        data: urlQuery,
        dataType: 'json',
        success: function (d) {
            if (d && d.success == true) {
                if (
                    (!urlQuery.sdate && !urlQuery.edate) ||
                    window.chartData.sdate != urlQuery.sdate ||
                    window.chartData.edate != urlQuery.edate
                ) {
                    window.chartData.sdate = urlQuery.sdate;
                    window.chartData.edate = urlQuery.edate;

                    window.chartData.list = d.data.list;
                    window.chartData.min_date = d.data.min_date;
                    window.chartData.max_date = d.data.max_date;
                    window.chartData.total = d.data.total;
                }
                if (urlQuery.word_id && !window.chartData.titleDate) {
                    window.chartData.titleDate = '近7日';
                }
                ;
                drawCharts(d.data);
            } else {
                drawNodataCharts();
            }
        }
    });
}

// 绘制图标
function drawCharts(data) {
    if ($('#charts').length == 0 || $('#charts').css('display') == 'none') return false;

    var seriesData = [], title = '', tickInterval = 1, reversed = true, type = 'spline', yAxisTxt = '排名',
        colorArr = ['#1ba091', '#ea5a5a', '#428edc', '#e2719e', '#e58844', '#5dcfa3', '#61b5d6', '#5fd055', '#e5da19', '#ee4f89', '#b47b42'],
        colorTotal = colorArr.length,
        appName = $('#charts-appname').val() || '';
    if (data.list) {
        var i = 0;
        for (index in data.list) {
            if (data.list[index]) {
                data.list[index].color = colorArr[i];
                seriesData.push(data.list[index]);
            }
            i++;
        }
    }
    ;
    if (typeof(data['reversed']) != 'undefined') reversed = data['reversed'];
    if (typeof(data['type']) != 'undefined') type = data['type'];
    if (typeof(data['yAxisTxt']) != 'undefined') yAxisTxt = data['yAxisTxt'];
    // 小时数量
    tickInterval = (data.max_date - data.min_date) / 1000 / 3600;
    tickInterval = Math.ceil(tickInterval / data.total);

    if (data.title) {
        title = data.title.replace('##APPNAME##', appName);
        title = title.replace('##DATE##', window.chartData.titleDate);
    } else {
        if (!window.chartData.titleDate) {
            title = '排名趋势';
        } else {
            title = window.chartData.titleDate + '排名趋势';
        }
    }


    // 图表
    if ($('#charts').length > 0) {

        var chartOptions = {
            type: type,                 //指定图表的类型，默认是折线图（line）
            spacingRight: 40,				//图的右边框和绘图区之间的距离
            marginLeft: 27,
            marginRight: 1,
            backgroundColor: '',
            events: {
                load: function () {
                    $('#charts').append('<div class="float-logo"></div>');
                }
            },
        }
        if (!isMobile) {
            delete chartOptions.marginLeft;
            delete chartOptions.marginRight;
            yAxisOffset = 0;
        } else {
            yAxisOffset = -14;
        }

        Highcharts.setOptions({
            global: {
                timezoneOffset: new Date().getTimezoneOffset(),
            }
        });
        $('#charts').highcharts({               //图表展示容器，与div的id保持一致
            chart: chartOptions,
            lang: {
                noData: '暂无数据',
            },
            noData: {
                style: {
                    fontWeight: 'bold',
                    fontSize: '15px',
                    color: '#303030'
                }
            },
            credits: {
                enabled: false, 					//禁用版权信息
                text: 'ASO114.com',
                href: 'http://www.ASO114.com',
            },
            title: {
                text: title,     				//指定图表标题
                style: {
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, "微软雅黑", sans-serif',
                },
            },
            subtitle: {
                // text: '我是副标题'
            },
            xAxis: {
                type: 'datetime',
                title: {
                    // text: '我是时间'
                },
                startOnTick: true,
                endOnTick: true,
                min: data.min_date,
                showEmpty: false,
                showLastLabel: false,
                showFirstLabel: false,
                max: data.max_date,
                // alternateGridColor: '#ccc',
                // tickInterval:  tickInterval * 3600 * 1000,
                labels: {
                    // step: Math.ceil(data.total/8),
                    step: 1,
                },
                // minorGridLineColor: '#dddddd',
                // minorTickInterval: tickInterval * 3600 * 1000,
                dateTimeLabelFormats: {
                    millisecond: '%Y-%m-%d %H点',
                    second: '%Y-%m-%d %H点',
                    minute: '%Y-%m-%d %H点',
                    hour: '%d日 %H点',
                    day: '%m月%d日',
                    week: '%m月%d日',
                    month: '%y年%m月',
                    year: '%Y年'
                },
                gridLineWidth: 1,					// 网格的宽度
                gridLineColor: '#C0C0C0',			// 网格的颜色

                lineColor: '#C0C0C0',				// 轴线的颜色
                lineWidth: 1,						// 轴线的宽度
                tickLength: 0,						// 刻度线的长度
                tickWidth: '1',						// 刻度线的宽度
                tickColor: '#C0C0C0',				// 刻度线的颜色
            },
            yAxis: {
                title: {
                    text: yAxisOffset >= 0 ? yAxisTxt : ''                  //指定y轴的标题
                },
                offset: yAxisOffset,
                tickPositioner: function () {
                    if (type == 'column') return false;
                    var positions = [],
                        tick = 1,
                        increment,
                        maxData;
                    // increment = Math.ceil((this.dataMax - this.dataMin) / 5);
                    // y坐标轴 显示间隔
                    if (this.dataMax < 20) {
                        increment = 5;
                        maxData = 20;
                    } else if (this.dataMax < 50) {
                        increment = 10;
                        maxData = 50;
                    } else if (this.dataMax < 100) {
                        increment = 20;
                        maxData = 100;
                    } else if (this.dataMax < 500) {
                        increment = 100;
                        maxData = 500;
                    } else if (this.dataMax < 1500) {
                        increment = 500;
                        maxData = 1500;
                    } else {
                        tick = this.dataMin - 1;
                        increment = Math.ceil((this.dataMax - this.dataMin) / 5);
                        increment = increment > 0 ? increment : 1;
                        maxData = this.dataMax + 1;
                    }

                    if (this.dataMin == 0) tick = 0;
                    positions.push(tick);
                    for (tick; tick - increment <= maxData; tick += increment) {
                        if (tick <= 1 || tick == this.dataMin - 1) continue;
                        positions.push(this.dataMin > 1 ? tick - 1 : tick);
                    }
                    // console.log(positions);
                    return positions;
                },
                reversed: reversed,						// 逆转轴
                gridLineWidth: 1,					// 网格的宽度
                gridLineColor: '#C0C0C0',			// 网格的颜色

                // lineColor: '#C0C0C0',				// 轴线的颜色
                // lineWidth: 1,					// 轴线的宽度
                // tickLength: 0,					// 刻度线的长度
                // tickWidth: '1',					// 刻度线的宽度
                // tickColor: '#C0C0C0',				// 刻度线的颜色
            },
            tooltip: {
                crosshairs: {
                    color: '#000',
                },
                shared: true,
                valueSuffix: '名',
                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                dateTimeLabelFormats: {
                    millisecond: '%Y-%m-%d %H点',
                    second: '%Y-%m-%d %H点',
                    minute: '%Y-%m-%d %H点',
                    hour: '%Y年%m月%d日 %H点',
                    day: '%Y年%m月%d日',
                    month: '%Y年%m月',
                    year: '%Y年'
                },
                useHTML: true,
                headerFormat: '<small style="display: block; padding-bottom: 10px;">{point.key}</small><table>',
                pointFormat: '<tr><td style="color:{series.color};padding-right: 3px; color:{series.color};">●</td><td>{series.name}</td><td style=" padding-left: 7px; color:{series.color};">{point.y:.0f}</td></tr>',
                footerFormat: '</table>',
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: false,	// 曲线上显示数据
                    },
                    enableMouseTracking: true
                },
                series: {
                    states: {
                        hover: {
                            enabled: true,
                            lineWidth: 2,
                            halo: {
                                size: 0,
                                attributes: {
                                    fill: Highcharts.getOptions().colors[2],
                                    'stroke-width': 1,
                                    stroke: Highcharts.getOptions().colors[1]
                                }
                            }
                        }
                    },
                    marker: {							   // 是否显示原点
                        enabled: true,
                        radius: data.total > 360 ? 1 : 2,  // 点的大小
                        states: {
                            hover: {
                                radiusPlus: 2,			   // 鼠标放上去点的大小
                                lineWidthPlus: 1,
                            }
                        }
                    }
                }
            },
            series: seriesData,
        });
    }
    ;
}

// 没有获取到排行数据
function drawNodataCharts() {
    if ($('#charts').length > 0) {
        $('#charts').highcharts({               //图表展示容器，与div的id保持一致
            title: {
                text: '未进入当前榜单'     			//指定图表标题
            },
            lang: {
                noData: "未进入当前榜单",
            },
            noData: {
                style: {
                    fontWeight: 'bold',
                    fontSize: '15px',
                    color: '#333'
                }
            },
            credits: {
                enabled: true, 					//禁用版权信息
                text: 'ASO114.com',
                href: 'http://www.ASO114.com',

            },
            yAxis: {
                title: {
                    text: '排名'                  //指定y轴的标题
                },
                reversed: true,						// 逆转轴
            },
            series: [{
                type: 'line',
                name: '无数据',
                data: []
            }],

        });
        $('#charts').highcharts();
    }
    ;
}

//一个中文字占4个bytes; 一个以上中文字占3个bytes
function CEMixLen(str) {
    var byteLen = 0, len = str.length;
    if (str) {
        for (var i = 0; i < len; i++) {
            if (str.charCodeAt(i) > 255) {
                byteLen += 3; //中文字符
            } else {
                byteLen++;    //英文字符
            }
        }
        return byteLen;
    } else {
        return 0;
    }
}
// 浏览器默认事件
function preventDefault(e) {
    e = e || window.event,
    e.preventDefault && e.preventDefault() || (e.returnValue = !1),
    e.stopPropagation && e.stopPropagation()
}
$("body").on("click", ".back", function () {
    $("html,body").stop(true).animate({"scrollTop": 0});
});
$(".slideright .back").hide();
var ishome = $("#banner").length;
if (ishome) {
    $(".logosx").css("display", "none");
}
;
function dofootfixed() {
    var isbodyH = $("body").height(), iswinH = $(window).height();
    if (isbodyH - 59 < iswinH) {
        $("#footer").removeClass("footerout").addClass("footerout");
    } else {
        $("#footer").removeClass("footerout");
    }
};dofootfixed();
$(window).scroll(function () {
    var istop = $(window).scrollTop(), ish = $(window).height();
    if (istop > 450) {
        $(".slideright .back").stop(true).fadeIn();
        if (ishome) {
            $(".logosx").fadeIn();
        }
    } else {
        $(".slideright .back").stop(true).fadeOut();
        if (ishome) {
            $(".logosx").fadeOut();
        }
    }
    ;
    dofootfixed();
})
var emsg = $("#errorMsg");
if (emsg.length) {
    var etime = 3, eout, eurl = emsg.data("url");

    function errormsg() {
        etime--;
        eout = setTimeout(errormsg, 1000);
        if (etime == 0) {
            etime = 0;
            clearTimeout(eout);
            window.open(eurl, "_self");
        }
        $("#errorMsg>span").text(etime);
    };
    errormsg();
}
// 首页搜索
$("#asosearchbtn").click(function () {
    var istext = $(this).closest("form").find("input:eq(0)").val(), forms = $(this).closest("form").attr("action");
    if (istext.length == 0) {
        //swal('请输入应用名称或APP ID');
        return false;
    }
    window.open(forms + istext + "/", "_self");
});
var Y = $(".form-control");
if (Y.length > 0) {
    var Y = Y.not(".s-ed");
    search(Y)
}
// 搜索关键词列表请求地址（数组格式）：earch_get.json
function search(e) {
    var t = e;
    t.autocomplete({
        serviceUrl: "/json-searchdrop.html",
        paramName: "word",
        dataType: "json",
        transformResult: function (e) {
            return {
                suggestions: $.map(e,
                    function (e) {
                        return {
                            value: e,
                            data: e
                        }
                    })
            }
        },
        deferRequestBy: 200,
        maxHeight: "auto",
        onSelect: function (e) {
            var forms = $(this).closest("form").attr("action"), iskey = $(this).val();
            window.open(forms + iskey + "/", "_self");
            // if(forms=="/a/"){
            // 	window.open("/android/json-searchdrop.html?word="+iskey,"_self");
            // }else{
            // }

        }
    })
};
var isopen = false, win_h = $(document).height(), divhome = $("#banner").length;
if (divhome) {
    $("#sbody").css("margin-top", 0);
    $(window).resize(function () {
        $("#sbody").css("margin-top", 0);
    });
}
;
$(".aso_nav .nav .dropdown").hover(function () {
        var e = $(this);
        e.addClass("open")
    },
    function () {
        var e = $(this);
        e.removeClass("open")
    });
$("#mobile-menu").css("height", win_h);
$(".mobile-nav-left,.mobile_menu_bgs").click(function (e) {
    var ishome = $("#banner").length, app_android = $("#app_android").length;
    if (isopen == false) {
        $(".mobile_menu_bgs").show().css("left", "200px");
        $("body").addClass("width_left_mobile");
        $("#sbody,#top,#footer").animate({"marginLeft": "200px"}, 100);
        $("#mobile-menu").animate({"marginLeft": "0px"}, 100);
        if (ishome) {
            $("#banner").animate({"marginLeft": "200px"}, 100);
        }
        if (app_android) {
            $("#app_android").animate({"marginLeft": "200px"}, 100);
        }
        isopen = true;
    } else if (isopen == true) {
        $(".mobile_menu_bgs").hide().css("left", "0px");
        $("body").removeClass("width_left_mobile");
        $("#sbody,#top,#footer").animate({"marginLeft": "0px"}, 100);
        $("#mobile-menu").animate({"marginLeft": "-200px"}, 100);
        if (ishome) {
            $("#banner").animate({"marginLeft": "0px"}, 100);
        }
        if (app_android) {
            $("#app_android").animate({"marginLeft": "0px"}, 100);
        }
        isopen = false;
    }
});
var ishomesea = $("#exampleInputEmail1").length;
if (ishomesea) {
    $(".mobile-nav-search").remove()
}
;
$(document).on("click", ".mobile-nav-search", function (e) {
    preventDefault(e);
    window.open("/", "_self");
    // var t=$(".mobile-nav-search-form").addClass("active").find('form input[name="search"]');
    // t.focus().val(t.val());return false
});
// $(document).on("click",".mobile-nav-search-form > .btn",function(e){preventDefault(e);
// 	$(".mobile-nav-search-form").removeClass("active").find('form input[name="search"]').blur();return false});

$(document).blur();
if ($("#search-ed").length) {
    $("#search-ed").focus().keydown(function (event) {
        var self = this;
        if (event.keyCode == 13) {
            $(self).closest("form").submit();
        }
    });
}
;
if ($("#exampleInputEmail1").length) {
    $("#exampleInputEmail1").focus().keypress(function (event) {
        var self = this;
        if (event.keyCode == 13) {
            var forms = $(this).closest("form").attr("action"), iskey = $(this).val();
            if (iskey.length == 0) {
                return false;
            }
            window.open(forms + iskey + "/", "_self");
            event.preventDefault();
        }
    })
}
;
$("#app_android li>a").click(function () {
    var isnovip = $(this).hasClass("avip"), self = this, isshowdiv = $(".android_vip").length;
    if (isnovip) {
        $(self).blur();
        if (isshowdiv > 0) {
            return true
        }
        ;
        $("#sbody").addClass("notvip").prepend('<div class="android_vip"><div class="avip_bg"></div><div class="avip_title">当前页面需要<a href="http://test.aso114.com/about-vip.html">开通VIP</a>尚可查看！</div></div>');
        setTimeout(function () {
            $(".android_vip").remove();
            $("#sbody").removeClass("notvip");
        }, 3500);
    }
})