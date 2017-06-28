var request={
    QueryString:function(name, format, defaultValue) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) {
            if (format) {
                //return unescape(r[2]);
                return decodeURI(r[2]);
            }
            else
                return r[2];
        }
        return defaultValue; //返回参数值
    },
    Url:function(url) {
        if(!url)
            url =  document.location.href;

        var a = document.createElement('a');
        a.href = url;
        return {
            source: url,
            protocol: a.protocol.replace(':', ''),
            host: a.hostname,
            port: a.port,
            query: a.search,
            arrayParams: (function () {
                var arr = new Array();
                if (a.search.length > 0) {
                    var seg = a.search.replace(/^\?/, '').split('&');
                    var r = 0;
                    for (var i = 0; i < seg.length; i++) {
                        if (!seg[i]) {
                            continue;
                        }
                        s = seg[i].split('=');
                        if (s.length == 2) {
                            arr[r] = seg[i];
                            r++;
                        }
                    }
                }
                return arr;
            })(),
            params: (function () {
                var ret = {};
                if (a.search.length > 0) {
                    var seg = a.search.replace(/^\?/, '').split('&'),
                        len = seg.length, i = 0, s;
                    for (; i < len; i++) {
                        if (!seg[i]) {
                            continue;
                        }
                        s = seg[i].split('=');
                        if (s.length == 2)
                            ret[s[0]] = s[1];
                        else
                            ret[null] = s[0];
                    }
                }
                return ret;
            })(),
            file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
            hash: a.hash.replace('#', ''),
            path: a.pathname.replace(/^([^\/])/, '/$1'),
            relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
            segments: a.pathname.replace(/^\//, '').split('/'),
            fullpath: (function () {
                var _index = url.indexOf("?");
                if (_index == -1) return url;
                return url.substring(0, _index);
            })(),
            //在链接中添加参数
            addParams: function (k, v) {
                var options = {};
                if (typeof k === "string" && typeof v === "string")
                    options[k] = v;
                else if (typeof k === "object")
                    options = k;
                else
                    return this;
                for (var i in options) {
                    if (this.params[i])
                        delete options[i];
                }
                var s = $.param(options), _query = this.query, url = this.source;
                if (s.length > 0) {
                    if (_query.length > 0) {
                        var b = _query.substring(0, 1), e = _query.substring(_query.length - 1, _query.length);
                        if (e != "&" && e != "?") _query += "&";
                    }
                    else {
                        url = url.replace("?", "");
                        _query += "?";
                    }
                    _query += s;
                    var _d = this.query;
                    if (this.hash.length > 0) {
                        _d += "#" + this.hash;
                        _query += "#" + this.hash;
                    }
                    if (_d.length == 0)
                        url += _query;
                    else
                        url = url.replace(_d, _query);
                }
                return GetUri(url);
            }
        };
    }
}
