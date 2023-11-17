!function(v){var m=/CLASS/g;function d(e){var t=this;t.id=e.id,t.query=e.query,t.app=e,t.cache=e.cache,t.class=e.class,t.components=e.components,t.instances=[],t.events={},t.refs={}}function l(e){var t,n={},i={},o=!1;e.$rebindtimeout=null;for(r of e.instances)!r.config.path||'@'!==r.config.path.charAt(0)||(t=r.config.path.substring(1))!=r.id&&(n[t]?n[t].push(r):n[t]=[r],i[r.id]=t,o=!0);if(o)for(var r of e.instances)r.binded=n[r.id]||null,r.binder=i[r.id]?e.instances.findItem('id',i[r.id]):null}function f(){}function h(){var e=this;e.state={init:0,value:null,disabled:!1,modified:!1,readonly:!1,touched:!1,invalid:!1,delay:10,notify:!1,bind:!1,validate:!0},e.cache={},e.events={},e.$inputs={},e.$outputs={}}d.prototype.find=function(e){var t,n='.'===e.charAt(0)?e.substring(1):'',e=n?'':'@'===e.charAt(0)?e.substring(1):e;for(t of this.instances)if(n){if(t.config.path===n)return t}else if(t.id===e)return t},d.prototype.urlify=function(){return this.app.urlify.apply(this.app,arguments),this},d.prototype.clfind=function(){return this.app.clfind.apply(this.app,arguments),this},d.prototype.clread=function(){return this.app.clread.apply(this.app,arguments),this},d.prototype.view=function(){return this.app.view.apply(this.app,arguments),this},d.prototype.clean=function(){return this},d.prototype.on=function(e,t){var n=this;n.events[e]?n.events[e].push(t):n.events[e]=[t]},d.prototype.rebind=function(){var e=this;e.$rebindtimeout&&clearTimeout(e.$rebindtimeout),e.$rebindtimeout=setTimeout(l,50,e)},d.prototype.emit=function(e,t,n,i,o,r){e=this.events[e];if(e)for(var s of e)s.call(this,t,n,i,o,r)},d.prototype.emitstate=function(e,t){var n,i={},o=e.instance,r=t=t||'state',s='noemit'+t,a=(e.instance.cache[r]=null,o.parent),c=0;for(e.level=0,e.type=t;a&&(e.level++,i[a.id]=!0,!a.fork)&&(a.events[t]&&(c++,a.emit(t,e)),!e.$propagation);)a=a.parent;e.level=null,t='@'+t;for(n of this.instances)i[o.id]||n===e.instance||n.events[t]&&(c++,n.emit(t,e));o.state[s]=0===c},customElements.define('uibuilder-component',class extends HTMLElement{constructor(){super(),setTimeout(()=>this.compile(),1)}compile(){var e,t=this,n=t.parentNode,f=v.selectors.component.substring(1);for(t.classList.add('block');n;){if('BODY'===n.tagName)return;if(n.classList.contains(f)){e=n.uibuilder;break}n=n.parentNode}var i,o=!0,r=(e.fork||(o=!1,e.fork=new d(e.app),e.fork.element=e.element,e.fork.compile=y,e.root=e),(t.getAttribute('config')||'').parseConfig()),s={},a=(s.id=t.getAttribute('uid')||'ui'+GUID(10),s.config=r||{},s.component=t.getAttribute('name'),!1);for(i in r)if('#'===r[i]){var c=t.children[0];if(c&&'SCRIPT'===c.tagName)switch(c.getAttribute('type')){case'application/json':case'text/json':r[i]=PARSE(c.innerHTML.trim());break;case'text/html':case'text/plain':r[i]=c.innerHTML.trim()}else r[i]=t.innerHTML;a=!0}a&&(t.innerHTML='');var l=t.getAttribute('path'),l=(l&&(r.path=l),e.fork.components[s.component]);if(!l)return console.error('UI Builder: The component not found: '+s.component),void t.parentNode.removeChild(t);t.innerHTML&&(r.name=t.innerHTML.trim(),t.innerHTML=''),r.name||(r.name=l.name),(r.$bind||t.getAttribute('bind'))&&(s.bind=!0),(r.$notify||t.getAttribute('notify'))&&(s.notify=!0),s.readonly=!0,e.fork.compile(t,s,null,null,t),t.uibuilder&&(t.uibuilder.parent=e),e.fork.rebind();l=t.classList;l.remove('invisible'),l.remove('hidden'),o||setTimeout(e=>e.emit('fork',e.fork),1,e)}}),f.prototype.stopPropagation=function(){this.$propagation=!0};function i(){return''}var r,e=h.prototype;e.$forcecheck=function(e){e.$checktimeout=null;var t=!1;e.state.disabled||e.state.readonly?t=!1:e.validate&&(!0===(t=e.validate())||1===t||''===t||t instanceof Array&&!t.length?t=!1:!1!==t&&0!==t||(t=!0)),e.set('invalid',t)},e.$forcechange=function(e){e.$changetimeout=null,e.app.emit('change',e)},e.errors=function(){var e,t=[],n=this.state.invalid,i=typeof n;if(!n||'boolean'==i||'number'==i)return t;if('string'==i)t.push({error:n});else if(n instanceof Array)for(var o of n)o&&('string'==typeof o?t.push({error:o}):(e=o.error||o.err||o.msg||o.message)&&t.push({error:e}));else(e=n.error||n.err||n.msg||n.message)&&t.push({error:e});return t},e.change=function(){var e=this;e.app.events.change&&(e.$changetimeout&&clearTimeout(e.$changetimeout),e.$changetimeout=setTimeout(e.$forcechange,50,e))},e.check=function(e){var t=this;if(!1!==t.state.validate)return t.$checktimeout&&clearTimeout(t.$checktimeout),e?t.$forcecheck(t):t.$checktimeout=setTimeout(t.$forcecheck,50,t),t};function o(e,t,n,i){var o={};o.id=e.id+'_'+t.id,o.instanceid=e.id,o.componentid=e.component.id,o.ref=t.id,o.icon=t.icon,o.color=t.color,o.note=t.note,o.name=t.name,o.component=e.component,o.app=e.app,o.instance=e,o.err=n,o.data=i,e.app.emit('output',o),v.emit('output',o)}function s(){r=null;var e,t=[];for(e in v.components){var n=v.components[e];n.css&&t.push(n.css)}CSS(t,'uibuilder')}function y(l,e,u,t,n,i){var o=this,r=o.components[e.component];if(r){var s=n||document.createElement('DIV'),f=new h;if(s.classList.add('ui_'+r.id),e.gap&&s.classList.add('UI_gap'),r.floating&&(s.classList.add('UI_floating'),s.style='left:{0}px;top:{1}px;z-index:{2};position:absolute'.format(e.x||0,e.y||0,e.zindex||1)),e.bind&&(f.state.bind=!0),e.notify&&(f.state.notify=!0),r.config||(r.config={}),f.id=e.id,f.args=o.args,f.newbie=i||e.newbie,f.element=$(s),f.element.aclass(v.selectors.component.substring(1)+' '+r.cls).attrd('id',e.id),f.dom=s,f.events={},f.config=CLONE(r.config),f.app=o,f.component=r,f.protected=e.protected,f.meta=e,f.edit=x,e.newbie&&delete e.newbie,n&&(f.forked=!0),e.config)for(var a in e.config)f.config[a]=e.config[a];if(f.config.name||(f.config.name=r.name),o.instances.push(f),!n||(i=l.getAttribute('uid'))&&(o.refs[i]=f),s.uibuilder=f,!n){var c=l.closest(v.selectors.component);if(c&&c.length&&(f.parent=c[0].uibuilder,f.parent&&((i=f.parent).children||(i.children=[]),i.containers||(i.containers={}),a='container'+u,i.children.push(f),i.containers[a]?null==t?i.containers[a].push(f):i.containers[a].splice(t,0,f):i.containers[a]=[f])),c=$(l),null==t)c.append(s);else{for(var p=!1,m=0;m<c[0].children.length;m++)if(m===t){c[0].insertBefore(s,c[0].children[m]),p=!0;break}p||c.append(s)}}r.make&&r.make(f,f.config,f.element,f.component.cls,v.iseditor),v.events.make&&v.emit('make',f),n||(e.children instanceof Array?setTimeout(function(e,t){for(var n=g(e,t.id),i=0;i<t.children.length;i++){var o=n.findItem('index',i);if(o)for(l of t.children[i])e.compile(o.element,l,i)}var r=e.components[t.component];if(r.children)for(var s={},a=CLONE(r.children),c=function(e){for(var t of e)for(var n of t)s[n.id]=f.id+'X'+HASH(n.id).toString(36),n.children&&n.children.length&&c(n.children)},r=(c(a),Object.keys(s)),r=new RegExp(r.join('|'),'g'),a=PARSE(JSON.stringify(a).replace(r,e=>s[e])),i=0;i<a.length;i++){var l,o=n.findItem('index',i);if(o)for(l of a[i])e.compile(o.element,l,i)}e.refreshio()},1,o,e):o.refreshio())}else console.error('UI Builder: The component "{0}" not found'.format(e.component))}function b(){for(var e=0,t=0,n=[];;){var i=this.instances[e];if(!i)break;if(function(e){if(e){if('BODY'===e.tagName)return 1;for(var t=e.parentNode;t;){if('BODY'===t.tagName)return 1;t=t.parentNode}}}(i.dom))e++;else{if(t++,i.removecss)for(var o of i.removecss)CSS('',o);i.events.destroy&&i.emit('destroy'),this.instances.splice(e,1),n.push(i)}}if(this.refreshio(),t)for(var r of this.instances)r.events.refresh&&r.emit('refresh',{type:'remove',items:n})}e.maketemplate=function(e){var t=this;if(!(e=e||t.component.html))return i;var n=HASH(e).toString(36);return t.app.cache[n]||(t.app.cache[n]=-1===e.indexOf('{{')?()=>e:Tangular.compile(e),t.app.cache[n])},e.error=function(e){var t=this.config;console.error('UIBuilder:',this.component.name+' - '+t.name+(t.path?' ({0})'.format(t.path):''),e)},e.clone=function(e){var t=e;return'object'==typeof e&&(!e||e instanceof Date||(t=CLONE(e))),t},e.set=function(e,t,n,i){var o,r,s=this,a=!1;switch(e){case'disabled':case'modified':case'readonly':case'touched':a=!0,t=!!t;break;case'invalid':a=!0}if('touched'===e&&s.check(),s.state.noemitsomething||((r=s.cache.something)?s.cache.something.changes[e]=1:((r=s.cache.something=new f).id=s.id,r.instance=s,r.state=s.state,r.element=s.element,r.changes={},r.changes[e]=1,r.kind=n,setTimeout(e=>e.app.emitstate(e.cache.something,'something'),222,s))),'force'!==n&&(null==t||'object'!=typeof t)&&s.state[e]===t)return!1;if(s.state[e]=t,s.events.set&&s.emit('set',e,t,n),s.change(),'value'===e){if(s.events.value&&s.emit('value',t,n),s.binded)for(var c of s.binded)c!==i&&(o=s.clone(t),c.state.notify?c.emit('notify',o,s):c.set('value',o,i?'noemitstate':'',s));s.binder&&!s.state.notify&&s.binder!==i&&s.binder.set('value',s.clone(t),i?'noemitstate':'',s),s.check()}return'noemitstate'!==n?(a&&s.element.tclass('UI_'+e,!!t),s.state.noemitstate||((r=s.cache.state)?s.cache.state.changes[e]=1:((r=s.cache.state=new f).id=s.id,r.instance=s,r.state=s.state,r.element=s.element,r.changes={},r.changes[e]=1,r.kind=n,setTimeout(e=>e.app.emitstate(e.cache.state),s.state.delay,s))),!0):void 0},e.input=function(e,t){return this.$inputs[e]=t,this},e.output=function(e,t){var n=this,i=(n.component.outputs||EMPTYARRAY).findItem('id',e);if(i)return t?'function'==typeof t?n.$outputs[e]=t:o(n,i,null,t):(t=n.$outputs[e])&&t((e,t)=>o(n,i,e,t)),n;console.error('UI Builder: Output "{0}" not found in the "{1}" component'.format(e,n.component.name))},e.family=function(e){var n=[],i=function(e){if(e.children)for(var t of e.children)n.push(t),t.component.scope||i(t)};if(null!=e){'object'==typeof e&&(e=ATTRD(e,'index'));e=this.containers?this.containers['container'+e]:null;if(e)for(var t of e)n.push(t),i(t)}else i(this);return n},e.remove=function(){this.element.remove(),this.app.clean()},e.readvalue=function(e){if(!e)return this.state.value;e=this.find(e);return e?e.state.value:null},e.view=function(e,t,n){return e&&('function'==typeof t&&(n=t,t=null),'#'===e.charAt(0)&&(e=e.substring(1)),this.app.view(e,t,n)),this},e.datasource=function(e,t){var n=this;if(!e)return n;function i(e){e&&(e=!(e instanceof Array)&&e.items instanceof Array?e.items:e)instanceof Array&&t(CLONE(e))}var o=e.charAt(0);return'#'===o?n.view(e,null,t):'@'===o?(o=n.find(e))&&(o.on('value',i),i(o.state.value)):n.clfind(e,i),n},e.clfind=function(t,n,i){var o=this;if('function'==typeof n&&(i=n,n=''),!i)return new Promise(e=>o.app.clfind(t,n,e));var e=t.charAt(0);if('#'!==e){if('@'!==e)return o.app.clfind(t,n,i),o;e=o.find(t);if(e&&e.state.value instanceof Array){var r,s=[];n=n&&n.toSearch();for(r of e.state.value)!r.name||n&&-1===r.name.toSearch().indexOf(n)||s.push(r);i(s)}else i([])}else o.view(t,{search:n},function(e){e?(e.items instanceof Array&&(e=e.items),i(e)):i([])})},e.clread=function(t,n,i){var o=this;if(!i)return new Promise(e=>o.app.clread(t,n,e));var e=t.charAt(0);if('#'!==e){if('@'!==e)return o.app.clread(t,n,i),o;(e=o.find(t))&&e.state.value instanceof Array?i(e.state.value.findItem('id',n)):i(null)}else o.view(t,{id:n},function(e){e?(e=e.items instanceof Array?e.items:e)instanceof Array?i(e.findItem('id',n)):i(e):i(null)})},e.find=function(e){return this.app.find(e)},e.hidden=function(){return HIDDEN(this.dom)},e.reset=function(){return this.events.reset&&this.emit('reset'),this},e.reconfigure=function(e){var t=this,n={};if(e)for(var i in e){var o=t.config[i],r=e[i];r!==o&&(n[i]=o,t.config[i]=r)}return t.events.configure&&t.emit('configure',n),t},e.get=function(e){return this.state[e||'value']},e.on=function(e,t){var n;for(n of e.split(/\+|\s/).trim())this.events[n]?this.events[n].push(t):this.events[n]=[t]},e.off=function(e,t){var n;for(n of e.split(/\+|\s/).trim()){var i,o=this.events[n];o&&(t?-1!==(i=o.indexOf(t))&&(o.splice(i,1),o.length||delete this.events[n]):delete this.events[n])}return this},e.emit=function(e,t,n,i,o,r){e=this.events[e];if(e)for(var s of e)s.call(this,t,n,i,o,r)},e.bindable=function(e){return(!this.config.path||'@'!==this.config.path.charAt(0))&&this.config.path===e},e.write=function(e,t,n){if(!t||'@'===t.charAt(0))return n;for(var i=t.split('.'),o=0;o<i.length-1;o++){var r=e[i[o]];e=r=null==r?e[i[o]]={}:r}return e[i[o]]=n,e},e.include=function(o,f,r){var u=this,p=[];return(f.import||EMPTYARRAY).wait(function(e,t){v.cache[e]?t():(v.cache[e]=1,IMPORT(e,t))},function(){var l=Object.keys(f.components);l.wait(function(s,a){if(u.app.components[s])a();else{var e=f.components[s];if('string'==typeof e){if('@'===e||'#'===e)return v.components[s]?u.app.pending.push({name:s,fn:v.components[s],local:!0}):console.error('UI Builder: The component "{0}" not found.'.format(s)),void a();var c=((t=e.split(' '))[1]||'').trim(),t=t[0].trim();if(c||(c=t,t=''),'base64'!==(t=t&&'.'===t.charAt(0)?t.substring(1):t))t&&'html'!==t&&'json'!==t||('@'===c.charAt(0)&&(c=c.substring(1)),v.editor&&'/'===c.charAt(0)&&(c=(v.origin||'')+c),AJAX('GET '+c.format(s)+(v.cachecomponents?' <{0}>'.format(1==v.cachecomponents?'session':v.cachecomponents):''),function(e,t){if(t)return console.error('UI Builder:',c,t),void a();if(ERROR(e))return console.error('UI Builder:',c,e),void a();if('object'!=typeof e){var t='@'===e.charAt(0),n=(t&&(e=e.substring(1)),v.parsehtml(e));try{var i={};if(i.id=s,i.isexternal=t,i.cls=u.app.class+'_'+HASH(i.id).toString(36),n.css&&(i.css=n.css),n.readme&&(i.readme=n.readme),n.html&&(i.html=n.html.replace(m,i.cls)),n.settings&&(i.settings=n.settings.replace(m,i.cls)),new Function('exports',n.js.replace(m,i.cls))(i),i.components)for(var o in i.components)f.components[o]||(f.components[o]=i.components[o],l.push(o));var r=c.indexOf('/',10);-1!==r&&(i.origin=c.substring(0,r),v.origin!==i.origin&&(i.render&&'/'===i.render.charAt(0)&&(i.render=c.substring(0,r)+i.render),i.settings&&'/'===i.settings.charAt(0)&&(i.settings=c.substring(0,r)+i.settings))),p.push({name:s,fn:i})}finally{a()}}else{for(var o in e)f.components[o]||(f.components[o]='@'+e[o],l.push(o));a()}}));else try{var n=v.parsehtml(decodeURIComponent(atob(c))),i={};if(i.id=s,i.cls=u.app.class+'_'+HASH(i.id).toString(36),n.css&&(i.css=n.css),n.html&&(i.html=n.html.replace(m,i.cls)),new Function('exports',n.js.replace(m,i.cls))(i),i.components)for(var o in i.components)f.components[o]||(f.components[o]=i.components[o],l.push(o));p.push({name:s,fn:i})}finally{a()}}else p.push({name:s,fn:e}),a()}},function(){var e=p.splice(0),i=[];e.wait(function(e,t){var n=null;'function'==typeof e.fn?((n={}).id=e.name,n.cls=(e.local?'uibuilder':u.app.class)+'_'+HASH(n.id).toString(36),e.fn(n)):n=e.fn,u.app.components[e.name]=n,e.local?t():(n.css&&i.push(n.css.replace(m,n.cls)),n.import instanceof Array?n.import.wait(function(e,t){v.cache[e]?t():(v.cache[e]=1,IMPORT(e,t))},t):t())},function(){var e;f.css&&i.unshift(f.css.replace(m,u.app.class)),i.length&&(e=u.app.class+'_'+GUID(5),CSS(i.join('\n'),e),u.removecss||(u.removecss=[]),u.removecss.push(e));for(var t,n=0;n<f.children.length;n++)for(t of f.children[n])u.app.compile(o,t,n);r&&r()})},3)}),u},e.watch=function(e,t,n){'function'==typeof t&&(n=t,t='value');e=this.app.instances.findItem('id',e);return e&&e.on(t,n),this},e.read=function(e,t){if(!t||'@'===t.charAt(0))return e;for(var n=t.split('.'),i=0;i<n.length;i++)if(!(e=e[n[i]]))return;return e},e.replace=e.variables=function(e,o,r){var s=this;return e.replace(/\{[a-z0-9_.-]+\}/gi,function(e){var t=e.substring(1,e.length-1).trim(),n='',i=t.substring(0,4);if('user'===i)W.user&&(n=-1===(t=t.substring(5)).indexOf('.')?W.user[t]:s.read(W.user,t));else if('args'===i)t=t.substring(5),n=s.args[t];else if('data'===i)o&&(n=-1===(t=t.substring(4)).indexOf('.')?o:s.read(o,t.substring(1)));else if('query'===t.substring(0,5)){if(-1===(t=t.substring(5)).indexOf('.'))return QUERIFY(s.query).substring(1);n=s.query[t.substring(1)]}if(null==n)return e;if('function'==typeof r)return r(n);switch(r){case'url':case'urlencode':case'encode':return encodeURIComponent(n);case'escape':case'html':return Thelpers.encode(n);case'json':return JSON.stringify(n)}return n})},e.wait=function(e,t){function n(){e()?t():setTimeout(n,300)}return n(),this},e.querify=function(e,t){return this.app.urlify(this.variables(t?QUERIFY(e,t):e))},e.urlify=function(e){return this.app.urlify(this.variables(e))},e.settings=function(){this.app.emit('settings',this),v.emit('settings',this)},v.version=1.14,v.selectors={component:'.UI_component',components:'.UI_components'},v.current='default',v.events={},v.apps={},v.cache={},v.components={},v.loader=0,v.component=function(e,t,n){var i,o;r&&clearTimeout(r),'string'==typeof t&&((i={}).id=e,i.cls='uibuilder_'+HASH(i.id).toString(36),o=v.parsehtml('base64 '===t.substring(0,7)?decodeURIComponent(atob(t.substring(7))):t),new Function('exports',o.js.replace(m,i.cls))(i),t=i,o.css&&(t.css=o.css),o.html&&(t.html=o.html)),t.id=e,t.cls||(t.cls='uibuilder_'+HASH(t.id).toString(36)),t.css&&(t.css=t.css.replace(m,t.cls)),t.html&&(t.html=t.html.replace(m,t.cls)),t.import instanceof Array?(v.loader++,t.import.wait(function(e,t){v.cache[e]?t():(v.cache[e]=1,IMPORT(e,t))},function(){v.loader--,r&&clearTimeout(r),r=setTimeout(s,2),v.components[e]=t,n&&n(null,t)})):(r&&clearTimeout(r),v.components[e]=t,n&&n(null,t))},v.resize=function(){for(var e in v.apps){var t;for(t of v.apps[e].instances)t.events.resize&&t.emit('resize')}},ON('resize + resize2',v.resize),v.on=function(e,t){this.events[e]?this.events[e].push(t):this.events[e]=[t]},v.emit=function(e,t,n,i,o,r){e=this.events[e];if(e)for(var s of e)s.call(this,t,n,i,o,r)},v.register=function(e,t){v.apps[v.current].pending.push({name:e,fn:t})};var g=function(e,t){var n=e.element,i=[];for(n of n.find(v.selectors.component+'[data-id="{0}"] {1}'.format(t,v.selectors.components)))(n=$(n)).closest(v.selectors.component).attrd('id')===t&&i.push({index:+n.attrd('index'),element:n});return i.quicksort('index'),i};function k(e,t,n,i,o,r,s){if('string'==typeof n){if(!this.components[n])return void console.error('UI Builder: The component "{0}" not found'.format(n));n={id:'cid'+Date.now().toString(36),component:n,children:[],config:n.config||{},gap:0!=n.gap}}if(r&&COPY(r,n),o)for(var a in o)n.config[a]=o[a];r=g(this,e);if(r.length)for(var c of r)c.index==t&&this.compile(c.element,n,t,i,null,s);return this.refreshio(),n}v.build=function(e,u,i){if(!v.loader){if(v.apps[u.id])return v.remove(u.id),void setTimeout(v.build,100,e,u,i);v.current=u.id;function t(){if(c=null,v.editor){p.inputs=[],p.outputs=[],p.list=[],p.zindex=1;for(var e of p.instances)if(e.dom.parentNode){e.component.floating&&(p.zindex=(e.element.css('z-index')||'').parseInt(),p.zindex<=0&&(p.zindex=1));var t=e.component.inputs,n=e.config.name||e.component.name;if(p.list&&p.list.push({id:e.id,componentid:e.component.id,name:n,icon:e.component.icon,color:e.component.color}),t)for(var i of t)p.inputs.push({id:e.id+'_'+i.id,ref:i.id,name:n+': '+i.name,componentid:e.component.id,component:n,input:i.name,icon:e.component.icon,color:e.component.color,note:i.note,schema:i.schema});if((t=e.component.outputs)&&t.length)for(var i of t)p.outputs.push({id:e.id+'_'+i.id,ref:i.id,name:n+': '+i.name,componentid:e.component.id,component:n,output:i.name,icon:e.component.icon,color:e.component.color,note:i.note,schema:i.schema})}}if(!p.ready){p.ready=!0,p.callback&&p.callback(p),s.rclass('invisible'),l(p);function o(e){e.state.init=1,e.events.ready&&e.emit('ready')}var r;for(r of p.instances)r.fork&&a(r,o),r.state.init=1,r.events.ready&&r.emit('ready');v.emit('app',p),p.emit('ready')}p.emit('io',p),v.emit('io',p)}var n=document.createElement('DIV'),s=$(n),p=(s.attrd('id',u.id),s.aclass('UI_app invisible'),s.empty(),$(e)[0].appendChild(n),{}),o=[],a=(p.id=v.current,p.components={},p.args=u.args||{},p.query=u.query||CLONE(NAV.query),p.schema=u,p.events={},p.cache={},p.refs={},p.compile=y,p.stringify=A,p.clean=b,p.add=k,p.remove=()=>v.remove(p.id),p.class='ui_'+HASH(v.current).toString(36),p.element=s,p.dom=s[0],p.pending=[],p.instances=[],p.removecss=[],u.urlify?p.urlify=u.urlify:p.urlify=e=>e,s.aclass(p.class),v.view?p.view=v.view:p.view=function(e,t,n){n(EMPTYARRAY)},v.clfind?p.clfind=v.clfind:p.clfind=function(e,t,n){n(EMPTYARRAY)},v.clread?p.clread=v.clread:p.clread=function(e,t,n){n(EMPTYOBJECT)},p.on=d.prototype.on,p.find=d.prototype.find,p.emit=d.prototype.emit,p.emitstate=d.prototype.emitstate,p.intervalcounter=0,p.interval&&clearInterval(p.interval),p.interval=setInterval(function(t){if(W.inDOM(t.dom)){t.intervalcounter++;var e,n=e=>e.events.service&&e.emit('service',t.intervalcounter);for(e of t.instances)e.events.service&&e.emit('service',t.intervalcounter),e.fork&&a(e,n)}else t.remove()},6e4,p),p.recompile=function(){p.clean();for(var e,t=0;t<p.schema.children.length;t++)for(e of p.schema.children[t])e.protected=!0,p.compile(p.element,e,t)},p.build=function(e,t,n){t.urlify=p.urlify,v.build(e,t,n)},function(e,t){for(var n of e.fork.instances)t(n),n.fork&&a(n,t)}),c=null;return p.refreshio=function(e){e?t():(c&&clearTimeout(c),c=setTimeout(t,100))},p.input=function(e,t,n){n=n||NOOP;var i=e.indexOf('_'),o=e.substring(0,i),e=e.substring(i+1),i=p.instances.findItem('id',o);i?(i=i.$inputs[e])?i(t,n):n('Input "{0}" not found'.format(e)):n('Instance "{0}" not found'.format(o))},p.output=function(e){i=i||NOOP;var t=e.indexOf('_'),n=e.substring(0,t),e=e.substring(t+1),t=p.instances.findItem('id',n);t?t.output(e):i('Instance "{0}" not found'.format(n))},v.apps[v.current]=p,(u.import||EMPTYARRAY).wait(function(e,t){v.cache[e]?t():(v.cache[e]=1,IMPORT(e,t))},function(){var f=Object.keys(u.components);f.wait(function(r,s){var e=u.components[r];if('string'==typeof e){if('@'===e||'#'===e)return v.components[r]?p.pending.push({name:r,fn:v.components[r],local:!0}):console.error('UI Builder: The component "{0}" not found.'.format(r)),void s();var a,c,l=((t=e.split(' '))[1]||'').trim(),t=t[0].trim();if(l||(l=t,t=''),'base64'!==(t=t&&'.html'===t.charAt(0)?t.substring(1):t))t&&'html'!==t||((a='@'===l.charAt(0))&&(l=l.substring(1)),c=(l=v.editor&&'/'===l.charAt(0)?(v.origin||'')+l:l).format(r),AJAX('GET '+c+(v.cachecomponents?' <{0}>'.format(1==v.cachecomponents?'session':v.cachecomponents):''),function(e,t){if(t)return console.error('UI Builder:',c,t),void s();if(ERROR(e))return console.error('UI Builder:',c,e),void s();if(!e)return console.error('UI Builder:',c,'empty file'),void s();if('object'!=typeof e){t=v.parsehtml(e);try{var n={};if(n.id=r,n.isexternal=a,n.cls=p.class+'_'+HASH(n.id).toString(36),t.css&&(n.css=t.css),t.readme&&(n.readme=t.readme),t.html&&(n.html=t.html.replace(m,n.cls)),t.settings&&(n.settings=t.settings.replace(m,n.cls)),new Function('exports',t.js.replace(m,n.cls))(n),n.components)for(var i in n.components)u.components[i]||(u.components[i]=n.components[i],f.push(i));var o=l.indexOf('/',10);-1!==o&&(n.origin=l.substring(0,o),v.origin!==n.origin&&(n.render&&'/'===n.render.charAt(0)&&(n.render=l.substring(0,o)+n.render),n.settings&&'/'===n.settings.charAt(0)&&(n.settings=l.substring(0,o)+n.settings))),p.pending.push({name:r,fn:n})}finally{s()}}else{for(var i in e)u.components[i]||(u.components[i]='@'+e[i],f.push(i));s()}}));else try{var n={},i=(n.id=r,n.cls=p.class+'_'+HASH(n.id).toString(36),v.parsehtml(decodeURIComponent(atob(l))));if(i.css&&(n.css=i.css),i.html&&(n.html=i.html.replace(m,n.cls)),new Function('exports',i.js.replace(m,n.cls))(n),n.components)for(var o in n.components)u.components[o]||(u.components[o]=n.components[o],f.push(o));p.pending.push({name:r,fn:n})}finally{s()}}else p.pending.push({name:r,fn:e}),s()},function(){p.pending.splice(0).wait(function(e,t){var n=null;'function'==typeof e.fn?((n={}).id=e.name,n.cls=(e.local?'uibuilder':p.class)+'_'+HASH(n.id).toString(36),e.fn(n)):n=e.fn,p.components[e.name]=n,e.local?t():(n.css&&o.push(n.css.replace(m,n.cls)),n.import instanceof Array?n.import.wait(function(e,t){v.cache[e]?t():(v.cache[e]=1,IMPORT(e,t))},t):t())},function(){u.css&&o.unshift(u.css.replace(m,p.class)),CSS(o,p.class);for(var e,t=0;t<u.children.length;t++)for(e of u.children[t])e.protected=!0,p.compile(s,e,t);p.callback=i})},1)}),p}setTimeout(v.build,100,e,u,i)},v.parsehtml=function(e){var t='';if(-1===e.indexOf('<script>'))return{js:e};var n,i='',o='',t='',r='',s='',a=e.indexOf('<settings>');return-1!==a&&(n=e.indexOf('</settings>',a+10),i=e.substring(a+8,n).trim(),e=e.substring(0,a)+e.substring(n+11)),-1!==(a=e.indexOf('<style>'))&&(t=e.substring(a+7,e.indexOf('</style>',a+7))),-1!==(a=e.indexOf('<body>'))&&(s=e.substring(a+6,e.indexOf('</body>',a+6))),-1!==(a=e.indexOf('<readme>'))&&(o=e.substring(a+8,e.indexOf('</readme>',a+8))),-1!==(a=e.indexOf('<script>'))&&(n=e.indexOf('<\/script>',a+8),r=e.substring(a+8,n).trim()),{js:r,css:t,settings:i,readme:o,html:s}},v.remove=function(t){var n=v.apps[t];if(n){n.interval&&clearInterval(n.interval),n.interval=null;for(var e of n.instances){if(e.removecss)for(var i of e.removecss)CSS('',i);e.events.destroy&&e.emit('destroy')}setTimeout(function(){for(var e in n.components){e=n.components[e];e.uninstall&&e.uninstall()}n.tmp=null,CSS('',n.class),n.element.remove(),delete v.apps[t]},2)}};var u=null,p=document;function x(n,i,e){var t,o,r,s,a,c,l=(n=!(n instanceof jQuery)?$(n):n).closest('.UI_component')[0];!l||l.uibuilder.meta.readonly||l.uibuilder.forked||(null==(i=i||{}).format&&(i.format=!0),i.format&&null==i.icon&&(i.icon=!0),e&&(i.callback=e),u?u.element[0]!=n[0]&&(u.close(),setTimeout(x,100,n,i,e)):(i.backup=n.html(),i.html&&n.html(i.html),n.attr('contenteditable',!0),n.aclass('UI_editing'),(u={}).element=n,u.dom=n[0],u.instance=l.uibuilder,u.parent=i.parent?i.parent[0]:u.dom,u.createlink=function(){if(function(e){if(p.selection&&'Text'===p.selection.type)return p.selection.createRange().htmlText;if(W.getSelection){var t=W.getSelection();if(!t.rangeCount)return'';for(var n=p.createElement('div'),i=0,o=t.rangeCount;i<o;++i)n.appendChild(t.getRangeAt(i).cloneContents());return e?n:n.innerHTML}}().trim()){for(var e=u.element,t='#link'+Date.now().toString(36),n=e[0],i=0;i<5;i++){if('A'===n.tagName)return;if(!(n=n.parentNode))break}document.execCommand('CreateLink',!1,t);var o,e=e.find('a[href="'+t+'"]');e.length&&(u&&u.close(),t=e.text(),o='',e.aclass('UI_link'),-1!==t.indexOf('@')?o='mailto:'+t:/\d+/.test(t)?o='tel:'+t:-1===t.indexOf(' ')&&-1===t.indexOf(',')&&-1!==t.indexOf('.')&&(o=/http(s):\/\//.test(t)?t:'https://'+t),t=-1!==o.indexOf('.')&&-1===o.indexOf(location.hostname)?'_blank':'',e.attr('href',o||'#'),e.attr('target',t),v.emit('link',e))}},t=function(){u.close()},o=function(e){e.target===u.parent||u.parent.contains(e.target)||u.close()},r=function(e){e.preventDefault();e=(e.originalEvent||e).clipboardData.getData('text/plain');document.execCommand('insertHTML',!1,e)},s=function(e){if(i.keydown&&i.keydown(e),27===e.keyCode)return e.preventDefault(),e.stopPropagation(),u.key=27,void u.close();if(i.backslashremove&&8===e.keyCode&&!n.text().trim())return u.key=8,void u.close();if(13!==e.keyCode){if(9===e.keyCode)return i.tabs?(e.preventDefault(),void document.execCommand('insertHTML',!1,'&#009')):(i.endwithtab?(e.preventDefault(),u.key=9):(e.preventDefault(),e.stopPropagation()),void u.close());if(u.change=!0,e.metaKey||e.ctrlKey)if(66!==e.keyCode)if(76!==e.keyCode)if(73!==e.keyCode){var t;if(80===e.keyCode)return i.format&&!0===i.icon&&(t='<i class="ti ti-totaljs UI_icon" contenteditable="false"></i>','span'===n[0].nodeName.toLowerCase()?n.parent().prepend(t):document.execCommand('insertHTML',!1,t)),e.preventDefault(),void e.stopPropagation();85!==e.keyCode?32===e.keyCode&&(document.execCommand('insertHTML',!1,'&nbsp;'),e.preventDefault(),e.stopPropagation()):i.format&&!1!==i.underline||(e.preventDefault(),e.stopPropagation())}else i.format&&!1!==i.italic||(e.preventDefault(),e.stopPropagation());else i.format&&!1!==i.link?u.createlink():(e.preventDefault(),e.stopPropagation());else i.format&&!1!==i.bold||(e.preventDefault(),e.stopPropagation())}else i.multiline&&!e.shiftKey||(e.preventDefault(),e.stopPropagation(),u.key=13,u.close())},n.focus(),'end'===i.cursor&&((e=document.createRange()).selectNodeContents(n[0]),e.collapse(!1),(l=W.getSelection()).removeAllRanges(),l.addRange(e)),u.close=function(){var e;$(W).off('click',o),n.rattr('contenteditable'),n.off('keydown',s),n.off('contextmenu',t),n.off('paste',r),n.rclass('UI_editing'),i.callback&&((e={}).text=n.text().trim(),e.html=n.html(),e.change=u.change,e.element=u.element,e.dom=u.dom,e.backup=i.backup,e.key=u.key,e.param=i.param,i.callback(e)),u.timeout&&clearTimeout(u.timeout),u=null},a=i.placeholder,c=!1,u.checkplaceholder=function(){var e;a&&(e=0<n[0].innerHTML.length,c!==e&&(c=e,a.classList.toggle('hidden',e)))},$(W).on('click',o),n.on('keydown',s),n.on('contextmenu',t),i.placeholder&&a&&n.on('input',u.checkplaceholder),n.on('paste',r)))}function A(e,u){var t,p=this,m='function'==typeof e?e:null,n=(e=m?null:e)||p.element.find('> '+v.selectors.component),i=[],d=[],h={};for(t of n){var o={children:[]};i.push(o),function e(t,n){var i,o,r,s=n.uibuilder;if(t.id=n.getAttribute('data-id'),t.component=s.component.id,t.config=CLONE(s.config),h[s.component.id]||(i=p.schema.components[s.component.id])&&(h[s.component.id]=i),s.component.floating&&(o=(i=$(n)).position(),t.x=o.left,t.y=o.top,t.zindex=i.css('z-index')||d.length,t.zindex=+t.zindex,t.zindex<=0&&(t.zindex=1)),!m||m(t)){if(d.push(s),n.classList.contains('UI_gap')&&(t.gap=!0),s.children=[],!s.component.children)for(r of g(p,t.id)){var a,c=[],f=r.element.find('> '+v.selectors.component);t.children||(t.children=[]),t.children.push(c);for(a of f){var l={children:[]};c.push(l),s.children.push(a.uibuilder),e(l,a)}}s.events.stringify&&s.emit('stringify',t,u)}}(o,t)}i=e?i[0]:[i];return{instances:d,children:i,components:h}}}(W.UIBuilder={});