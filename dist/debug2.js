var isNode=!1;if(isNode="undefined"==typeof window?!0:!1)var clc=require("cli-color");var utils=require("./utils"),DEBUG2=function(){var e,t="{{time}} - {{group}}: {{message}}",n=[],r=[],i=!1,o=/\{\{(time)\}\}/g,f=/\{\{(group)\}\}/g,a=/\{\{(message)\}\}/g,c=[],u={allow:function(e){if(utils.isFunction(e))return n.push(e),void 0;if("*"===e)return n=[],void 0;if(utils.isString(e)){var t=utils.clone(n);t.forEach(function(t,r){t(e)&&n.splice(r,1)})}},deny:function(e){if(utils.isFunction(e))return r.push(e),void 0;if("*"===e)return r=[],void 0;if(utils.isString(e)){var t=utils.clone(r);t.forEach(function(t,n){t(e)&&r.splice(n,1)})}},denyAll:function(){i=!i},format:function(e){t=e},_time:function(){var e=new Date;return e.getHours()+":"+e.getMinutes()+":"+e.getSeconds()},_runRules:function(e){var t;for(t=0;r.length>t;t++)if(r[t](e))return!1;for(t=0;n.length>t;t++)if(n[t](e))return!0;return i?!1:!0},getMessage:function(e){return c[e]},getLastMessage:function(){return this.getMessage(c.length-1)},saveMessage:function(e,t){c.push({message:e,type:t}),c.length>50&&c.shift()},_parseMessage:function(e,n){var r=t;return r=r.replace(o,this._time()),r=r.replace(f,e),r=r.replace(a,n)}};return e=isNode?{log:function(e){console.log(e)},info:function(e){console.log(clc.green(e))},warn:function(e){console.log(clc.yellow(e))},error:function(e){console.log(clc.red(e))}}:{log:function(e){console.log(e)},info:function(e){console.info(e)},warn:function(e){console.warn(e)},error:function(e){console.error(e)}},["log","info","warn","error"].forEach(function(t){u[t]=function(n,r){if(this._runRules(n)){var i=this._parseMessage(n,r);this.saveMessage(i,t),e[t](i)}}}),u}();DEBUG2.VERSION="0.1",global.DEBUG2=DEBUG2;