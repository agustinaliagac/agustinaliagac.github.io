(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{141:function(e,t,n){"use strict";n.r(t),n.d(t,"pageQuery",function(){return y});n(35);var o=n(7),r=n.n(o),a=n(0),i=n.n(a),s=n(159),c=n.n(s),u=n(148),l=n(160),d=n.n(l),p=n(226),f=n(152),m=n(154),h=n(147),b=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props.data.markdownRemark,t=d()(this.props,"data.site.siteMetadata.title"),n=e.excerpt,o=this.props.pageContext,r=o.previous,a=o.next,s={identifier:e.id,title:e.frontmatter.title},l=this.props.location.pathname;return i.a.createElement(m.a,{location:this.props.location},i.a.createElement(c.a,{htmlAttributes:{lang:"en"},meta:[{name:"description",content:n}],title:e.frontmatter.title+" | "+t}),i.a.createElement("h1",null,e.frontmatter.title),i.a.createElement("p",{style:Object.assign({},Object(h.b)(-.2),{display:"block",marginBottom:Object(h.a)(1),marginTop:Object(h.a)(-1)})},e.frontmatter.date),i.a.createElement("div",{dangerouslySetInnerHTML:{__html:e.html}}),i.a.createElement("hr",{style:{marginBottom:Object(h.a)(1)}}),i.a.createElement(f.a,null),"/about-me"!==l&&i.a.createElement("div",null,i.a.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},i.a.createElement("li",null,r&&i.a.createElement(u.Link,{to:r.fields.slug,rel:"prev"},"← ",r.frontmatter.title)),i.a.createElement("li",null,a&&i.a.createElement(u.Link,{to:a.fields.slug,rel:"next"},a.frontmatter.title," →"))),i.a.createElement(p.DiscussionEmbed,{shortname:"agustin-aliaga",config:s})))},t}(i.a.Component);t.default=b;var y="3804820323"},147:function(e,t,n){"use strict";n.d(t,"a",function(){return c}),n.d(t,"b",function(){return u});var o=n(167),r=n.n(o),a=n(168),i=n.n(a);i.a.overrideThemeStyles=function(){return{"a.gatsby-resp-image-link":{boxShadow:"none"}}},delete i.a.googleFonts;var s=new r.a(i.a);var c=s.rhythm,u=s.scale},148:function(e,t,n){"use strict";n.r(t),n.d(t,"graphql",function(){return h}),n.d(t,"StaticQueryContext",function(){return f}),n.d(t,"StaticQuery",function(){return m});var o=n(0),r=n.n(o),a=n(4),i=n.n(a),s=n(146),c=n.n(s);n.d(t,"Link",function(){return c.a}),n.d(t,"withPrefix",function(){return s.withPrefix}),n.d(t,"navigate",function(){return s.navigate}),n.d(t,"push",function(){return s.push}),n.d(t,"replace",function(){return s.replace}),n.d(t,"navigateTo",function(){return s.navigateTo});var u=n(25);n.d(t,"waitForRouteChange",function(){return u.c});var l=n(149),d=n.n(l);n.d(t,"PageRenderer",function(){return d.a});var p=n(36);n.d(t,"parsePath",function(){return p.a});var f=r.a.createContext({}),m=function(e){return r.a.createElement(f.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};function h(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}m.propTypes={data:i.a.object,query:i.a.string.isRequired,render:i.a.func,children:i.a.func}},149:function(e,t,n){var o;e.exports=(o=n(151))&&o.default||o},151:function(e,t,n){"use strict";n.r(t);n(35);var o=n(0),r=n.n(o),a=n(4),i=n.n(a),s=n(51),c=n(2),u=function(e){var t=e.location,n=c.default.getResourcesForPathnameSync(t.pathname);return r.a.createElement(s.a,Object.assign({location:t,pageResources:n},n.json))};u.propTypes={location:i.a.shape({pathname:i.a.string.isRequired}).isRequired},t.default=u},152:function(e,t,n){"use strict";var o=n(7),r=n.n(o),a=n(0),i=n.n(a),s=(n(165),n(166),n(153)),c=n.n(s),u=n(147),l=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){return i.a.createElement("div",{style:{display:"flex",marginBottom:Object(u.a)(0)}},i.a.createElement("img",{src:c.a,alt:"Agustín Aliaga",style:{marginRight:Object(u.a)(.5),marginBottom:0,width:Object(u.a)(2),height:Object(u.a)(2),borderRadius:"50%"}}),i.a.createElement("p",null,i.a.createElement("strong",null,"Agustín Aliaga"),i.a.createElement("br",null),"Software Developer"))},t}(i.a.Component);t.a=l},153:function(e,t,n){e.exports=n.p+"static/profile-pic-948858fbb9eeaf3575a99336404ffa5a.jpeg"},154:function(e,t,n){"use strict";n(35),n(78),n(50),n(77);var o=n(7),r=n.n(o),a=n(0),i=n.n(a),s=n(148),c=n(150),u=n.n(c),l=n(235),d=(n(49),n(147)),p={root:{path:"/",title:"Blog"},projects:{path:"/projects",title:"Projects"},aboutMe:{path:"/about-me",title:"About Me"}},f=function(e){var t=e.children;return i.a.createElement("div",{style:{margin:Object(d.a)(.5)}},u.a.map(p,function(e){return i.a.createElement("h3",{key:e.path,style:{marginLeft:Object(d.a)(.5),display:"inline"}},i.a.createElement(s.Link,{style:{boxShadow:"none"},to:e.path}," ",e.title," "))}),t)},m=n(169),h=function(){return i.a.createElement("div",{style:{float:"right"}},i.a.createElement("a",{target:"_blank",style:{boxShadow:"none",marginRight:Object(d.a)(.3)},href:"https://github.com/agustinaliagac"},i.a.createElement(m.b,{color:"#ababab",size:30})),i.a.createElement("a",{target:"_blank",style:{boxShadow:"none",marginRight:Object(d.a)(.3)},href:"https://www.linkedin.com/in/agustinaliaga/"},i.a.createElement(m.c,{color:"#ababab",size:30})),i.a.createElement("a",{target:"_blank",style:{boxShadow:"none",marginRight:Object(d.a)(.3)},href:"https://stackoverflow.com/users/3148273/agustin-aliaga"},i.a.createElement(m.e,{color:"#ababab",size:30})),i.a.createElement("a",{target:"_blank",style:{boxShadow:"none",marginRight:Object(d.a)(.3)},href:"https://angel.co/agustin-aliaga"},i.a.createElement(m.a,{color:"#ababab",size:30})),i.a.createElement("a",{target:"_blank",style:{boxShadow:"none"},href:"https://medium.com/@agustin.aliaga"},i.a.createElement(m.d,{color:"#ababab",size:30})))},b=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e,t=this.props,n=t.location,o=t.children,r=u.a.find(u.a.values(p),function(e){return e.path===n.pathname});return e=r?i.a.createElement("h1",{style:Object.assign({},Object(d.b)(1.5),{marginBottom:Object(d.a)(1.5),marginTop:0})},i.a.createElement(s.Link,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},r.title)):i.a.createElement("h3",{style:{fontFamily:"Montserrat, sans-serif",marginTop:0,marginBottom:Object(d.a)(-1)}},i.a.createElement(s.Link,{style:{boxShadow:"none",textDecoration:"none",color:"inherit"},to:"/"},"Agustín Aliaga")),i.a.createElement(l.b.Provider,{value:{color:"inherit"}},i.a.createElement(f,null,i.a.createElement(h,null)),i.a.createElement("div",{style:{marginLeft:"auto",marginRight:"auto",maxWidth:Object(d.a)(24),padding:Object(d.a)(1.5)+" "+Object(d.a)(.75)}},e,o))},t}(i.a.Component);t.a=b},175:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.insertScript=function(e,t,n){var o=window.document.createElement("script");return o.async=!0,o.src=e,o.id=t,n.appendChild(o),o},t.removeScript=function(e,t){var n=window.document.getElementById(e);n&&t.removeChild(n)},t.debounce=function(e,t,n){var o=void 0;return function(){var r=this,a=arguments,i=n&&!o;window.clearTimeout(o),o=setTimeout(function(){o=null,n||e.apply(r,a)},t),i&&e.apply(r,a)}}},226:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DiscussionEmbed=t.CommentEmbed=t.CommentCount=void 0;var o=n(227),r=n(228),a=n(229);t.CommentCount=o.CommentCount,t.CommentEmbed=r.CommentEmbed,t.DiscussionEmbed=a.DiscussionEmbed;var i={CommentCount:o.CommentCount,CommentEmbed:r.CommentEmbed,DiscussionEmbed:a.DiscussionEmbed};t.default=i},227:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CommentCount=void 0;var o,r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=n(0),i=(o=a)&&o.__esModule?o:{default:o},s=n(175);var c=(0,s.debounce)(function(){window.DISQUSWIDGETS&&window.DISQUSWIDGETS.getCount({reset:!0})},300,!1);t.CommentCount=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.default.Component),r(t,[{key:"componentDidMount",value:function(){this.loadInstance()}},{key:"shouldComponentUpdate",value:function(e){if(this.props.shortname!==e.shortname)return!0;var t=e.config,n=this.props.config;return t.url!==n.url&&t.identifier!==n.identifier}},{key:"componentWillUpdate",value:function(e){this.props.shortname!==e.shortname&&this.cleanInstance()}},{key:"componentDidUpdate",value:function(){this.loadInstance()}},{key:"loadInstance",value:function(){var e=window.document;e.getElementById("dsq-count-scr")?c():(0,s.insertScript)("https://"+this.props.shortname+".disqus.com/count.js","dsq-count-scr",e.body)}},{key:"cleanInstance",value:function(){var e=window.document.body;(0,s.removeScript)("dsq-count-scr",e),window.DISQUSWIDGETS=void 0}},{key:"render",value:function(){return i.default.createElement("span",{className:"disqus-comment-count","data-disqus-identifier":this.props.config.identifier,"data-disqus-url":this.props.config.url},this.props.children)}}]),t}()},228:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CommentEmbed=void 0;var o,r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=n(0),i=(o=a)&&o.__esModule?o:{default:o};(t.CommentEmbed=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.default.Component),r(t,[{key:"getSrc",value:function(){return"https://embed.disqus.com/p/"+Number(this.props.commentId).toString(36)+"?p="+(this.props.showParentComment?"1":"0")+"&m="+(this.props.showMedia?"1":"0")}},{key:"render",value:function(){return i.default.createElement("iframe",{src:this.getSrc(),width:this.props.width,height:this.props.height,seamless:"seamless",scrolling:"no",frameBorder:"0"})}}]),t}()).defaultProps={showMedia:!0,showParentComment:!0,width:420,height:320}},229:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.DiscussionEmbed=void 0;var o,r=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),a=n(0),i=(o=a)&&o.__esModule?o:{default:o},s=n(175);t.DiscussionEmbed=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.default.Component),r(t,[{key:"componentWillMount",value:function(){"undefined"!=typeof window&&window.disqus_shortname&&window.disqus_shortname!==this.props.shortname&&this.cleanInstance()}},{key:"componentDidMount",value:function(){this.loadInstance()}},{key:"shouldComponentUpdate",value:function(e){if(this.props.shortname!==e.shortname)return!0;var t=e.config,n=this.props.config;return t.url!==n.url&&t.identifier!==n.identifier}},{key:"componentWillUpdate",value:function(e){this.props.shortname!==e.shortname&&this.cleanInstance()}},{key:"componentDidUpdate",value:function(){this.loadInstance()}},{key:"loadInstance",value:function(){var e=window.document;window&&window.DISQUS&&e.getElementById("dsq-embed-scr")?window.DISQUS.reset({reload:!0,config:this.getDisqusConfig(this.props.config)}):(window.disqus_config=this.getDisqusConfig(this.props.config),window.disqus_shortname=this.props.shortname,(0,s.insertScript)("https://"+this.props.shortname+".disqus.com/embed.js","dsq-embed-scr",e.body))}},{key:"cleanInstance",value:function(){var e=window.document;(0,s.removeScript)("dsq-embed-scr",e.body),window&&window.DISQUS&&window.DISQUS.reset({});try{delete window.DISQUS}catch(e){window.DISQUS=void 0}var t=e.getElementById("disqus_thread");if(t)for(;t.hasChildNodes();)t.removeChild(t.firstChild)}},{key:"getDisqusConfig",value:function(e){return function(){this.page.identifier=e.identifier,this.page.url=e.url,this.page.title=e.title,this.callbacks.onNewComment=[e.onNewComment]}}},{key:"render",value:function(){return i.default.createElement("div",{id:"disqus_thread"})}}]),t}()}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-01274f10712caa3c3217.js.map