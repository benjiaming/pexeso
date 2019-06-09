(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,a){e.exports=a(22)},20:function(e,t,a){},21:function(e,t,a){},22:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(12),i=a.n(r),c=a(3),o=a(4),u=a(6),l=a(5),d=a(2),h=a(7),m=a(10),g=a(8),f=a.n(g),p=a(9),v=a(1),k=(a(20),function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(l.a)(t).call(this,e))).handleClick=a.handleClick.bind(Object(d.a)(a)),a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"handleClick",value:function(e){this.props.onClick(this.props.square,this.props.id)}},{key:"render",value:function(){var e=this.props,t=e.square,a=e.loaded,n=s.a.createElement("img",{src:t.image,style:{maxWidth:"100%",maxHeight:"100%"},alt:"cat"}),r="pexeso-box";return t.guessed&&(r+=" flip-vertical-right hidden"),s.a.createElement("div",{className:r,onClick:this.handleClick},a&&t.shown?n:s.a.createElement("i",{className:"far fa-question-circle question"}))}}]),t}(n.Component)),b=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(l.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props,t=e.rowLen,a=e.squares,n=e.loaded,r=e.onClick,i=Object(v.a)(Array(t)).fill().map(function(e,i){return s.a.createElement("div",{key:i,className:"box-row"},function(e,t){return Object(v.a)(Array(e)).fill().map(function(i,c){var o=t+c*e;return n?s.a.createElement(k,{key:o,id:o,square:a[o],loaded:n,onClick:r}):void 0})}(t,i))});return s.a.createElement("div",{className:"box-list"},n?i:"Loading...")}}]),t}(n.Component),y=function(e){var t=e.img,a=e.deck,n=e.onClick;return s.a.createElement("div",{className:"game-over"},s.a.createElement("div",null),s.a.createElement("img",{className:"flip-vertical-right",src:t,width:"300px",alt:"box",style:{margin:"20px",borderRadius:"10px",boxShadow:"-10px 10px 10px black"}}),s.a.createElement("button",{onClick:n},a.tryAgainMsg))},O=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(l.a)(t).call(this,e))).rowLen=2,a.state={squares:a.createSquares(),loaded:!1,images:[],paused:!1,numTries:0},a.onClick=a.onClick.bind(Object(d.a)(a)),a.loadGame=a.loadGame.bind(Object(d.a)(a)),a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"componentDidUpdate",value:function(e){e.deck.id!==this.props.deck.id&&this.loadGame()}},{key:"componentDidMount",value:function(){this.loadGame()}},{key:"loadGame",value:function(){this.preloadImages(Math.pow(this.rowLen,2)/2,this.props.deck),this.setState({numTries:0})}},{key:"createSquares",value:function(){return Object(v.a)(Array(Math.pow(this.rowLen,2))).fill({})}},{key:"shuffle",value:function(e){for(var t=e.length-1;t>0;t--){var a=Math.floor(Math.random()*(t+1)),n=[e[a],e[t]];e[t]=n[0],e[a]=n[1]}}},{key:"getRandomPosition",value:function(e){return Math.floor(Math.random()*e.length)}},{key:"newSquare",value:function(e){return{image:e,shown:!1,guessed:!1}}},{key:"initSquares",value:function(e){var t=this,a=Object(v.a)(this.state.squares),n=[].concat(Object(v.a)(this.state.images),Object(v.a)(this.state.images));this.shuffle(n),this.setState({images:n},function(){for(var e=0;e<a.length;e++)a[e]=t.newSquare(n.pop().src);t.setState({squares:a,loaded:!0})})}},{key:"preloadImages",value:function(){var e=Object(p.a)(f.a.mark(function e(t,a){var n,s=this;return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,a.preloadImages(t);case 3:n=e.sent,this.setState({images:n},function(){s.initSquares(s.rowLen)}),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0),this.setState({crashed:!0});case 11:case"end":return e.stop()}},e,this,[[0,7]])}));return function(t,a){return e.apply(this,arguments)}}()},{key:"otherSquareId",value:function(e,t,a){var n;return a.forEach(function(a,s){t!==s&&a.image===e.image&&a.shown&&(n=s)}),n}},{key:"isGuessingSecond",value:function(e){return e.reduce(function(e,t){return t.shown&&!t.guessed&&e++,e},0)%2===0}},{key:"hideAllSquares",value:function(){var e=this,t=Object(v.a)(this.state.squares);this.state.squares.forEach(function(e,a){if(e.shown){var n=Object(m.a)({},e);n.shown=!1,t[a]=n}}),this.setState({paused:!0},function(){setTimeout(function(){e.setState({paused:!1,squares:t})},1e3)})}},{key:"checkOtherSquareId",value:function(e,t,a){var n=this.otherSquareId(e,t,a);void 0!==n?this.disableSelectedSquares(e,a,n):this.hideAllSquares()}},{key:"disableSelectedSquares",value:function(e,t,a){var n=this;this.setState({paused:!0},function(){setTimeout(function(){e.guessed=!0;var s=Object(m.a)({},t[a]);s.guessed=!0,t[a]=s,n.setState({paused:!1,squares:t})},500)})}},{key:"isOver",value:function(){return!!this.state.loaded&&this.state.squares.every(function(e){return e.guessed})}},{key:"onClick",value:function(e,t){var a=this;if(!this.state.paused){var n=Object(v.a)(this.state.squares),s=Object(m.a)({},n[t]);s.shown=!s.shown,n[t]=s,this.setState({squares:n},function(){a.isGuessingSecond(n)&&a.setState(function(e){e.numTries=e.numTries+1},function(){a.checkOtherSquareId(s,t,n)})})}}},{key:"render",value:function(){return this.isOver()?s.a.createElement(y,{img:this.state.squares[this.getRandomPosition(this.state.squares)].image,deck:this.props.deck,onClick:this.loadGame}):s.a.createElement("div",{className:"game"},this.state.loaded?s.a.createElement("div",null,s.a.createElement(b,{rowLen:this.rowLen,loaded:this.state.loaded,squares:this.state.squares,onClick:this.onClick}),s.a.createElement("div",null,"Attempts: ",this.state.numTries)):this.state.crashed?s.a.createElement("div",null,this.props.deck.crashedMsg):s.a.createElement("div",null,this.props.deck.loadingMsg))}}]),t}(n.Component),w={preloadImages:function(){var e=Object(p.a)(f.a.mark(function e(t){var a,n,s=this;return f.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return a=Object(v.a)(Array(t)).fill().map(function(e){return fetch(s.url).then(function(e){return e.json()})}),e.next=3,Promise.all(a);case 3:return n=e.sent,e.abrupt("return",n.map(function(e){var t=new Image;return t.src=s.getImg(e),t}));case 5:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()},j={id:"cat",icon:"\ud83d\udc31",url:"https://api.thecatapi.com/v1/images/search?size=full",getImg:function(e){return e[0].url},gameOverMsg:"Purrrr! Nicely done!! Meow!!!",loadingMsg:"Herding cats. Please wait...",crashedMsg:"Cats are sleeping. Please try again later.",footerMsg:s.a.createElement(function(){return s.a.createElement("span",null,"Cats provided by"," ",s.a.createElement("a",{href:"https://thecatapi.com/"},"TheCatAPI - Cats as a Service"),", Everyday is Caturday.")},null),tryAgainMsg:"Trrrrry again?"};j.preloadImages=w.preloadImages;var E={id:"dog",icon:"\ud83d\udc36",url:"https://dog.ceo/api/breeds/image/random",getImg:function(e){return e.message},gameOverMsg:"Woof woof.",loadingMsg:"Fetching all the dogs. Please wait...",crashedMsg:"Dogs are sleeping. Please try again later.",footerMsg:s.a.createElement(function(){return s.a.createElement("span",null,"Dog images courtesy of ",s.a.createElement("a",{href:"https://dog.ceo/dog-api/"},"Dog CEO"),".")},null),tryAgainMsg:"Would you like another try?"};E.preloadImages=w.preloadImages;a(21);var q=function(e){var t=e.deck,a=e.settings,n=s.a.createElement("span",{role:"img","aria-label":"icon"},t.icon);return s.a.createElement("div",{className:"header"},s.a.createElement("span",{className:"header-icons"},n," Pexeso ",n),s.a.createElement("span",null,s.a.createElement("i",{className:"settings fas fa-cogs",onClick:a})))},S=function(e){var t=e.deck;return s.a.createElement("div",{className:"footer"},t.footerMsg)},C=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(l.a)(t).call(this,e))).state={deck:j},a.settings=a.settings.bind(Object(d.a)(a)),a}return Object(h.a)(t,e),Object(o.a)(t,[{key:"settings",value:function(){var e=j;"cat"===this.state.deck.id&&(e=E),this.setState({deck:e})}},{key:"render",value:function(){return s.a.createElement("div",{className:"Pexeso"},s.a.createElement(q,{deck:this.state.deck,settings:this.settings}),s.a.createElement(O,{deck:this.state.deck}),s.a.createElement(S,{deck:this.state.deck}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(C,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[13,1,2]]]);
//# sourceMappingURL=main.a426575d.chunk.js.map