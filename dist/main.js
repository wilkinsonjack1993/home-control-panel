(()=>{"use strict";class e extends HTMLElement{constructor(){super(),this.name="",this.name="World"}static get observedAttributes(){return["name"]}attributeChangedCallback(e,t,n){t!==n&&(this.name=n)}connectedCallback(){const e=this.attachShadow({mode:"closed"}),t=document.getElementById("hello-world").content.cloneNode(!0),n=`Hello ${this.name}`;Array.from(t.querySelectorAll(".hw-text")).forEach((e=>e.textContent=n)),e.append(t)}}customElements.define("hello-world",e);class t extends HTMLElement{constructor(){super()}connectedCallback(){return e=this,t=void 0,o=function*(){this.render()},new((n=void 0)||(n=Promise))((function(c,l){function r(e){try{i(o.next(e))}catch(e){l(e)}}function a(e){try{i(o.throw(e))}catch(e){l(e)}}function i(e){var t;e.done?c(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,a)}i((o=o.apply(e,t||[])).next())}));var e,t,n,o}render(){this.innerHTML+='\n    \n    <div id="app-root">\n      <p>Jack\'s Application</p>\n      <hello-world></hello-world>\n    </div>\n    '}}customElements.define("application-root",t)})();