const e=document.querySelector(".form"),o=document.querySelector('[name="delay"]'),t=document.querySelector('[name="step"]'),n=document.querySelector('[name="amount"]');document.querySelector('[type="submit"]');function u(e,o){const t=Math.random()>.3;return new Promise(((n,u)=>{setTimeout((()=>{t?n({position:e,delay:o}):u({position:e,delay:o})}),o)}))}e.addEventListener("submit",(function(e){e.preventDefault();let l=Number(o.value);for(let e=1;e<=Number(n.value);e+=1)u(e,l).then((({position:e,delay:o})=>{console.log(`✅ Fulfilled promise ${e} in ${o}ms`)})).catch((({position:e,delay:o})=>{console.log(`❌ Rejected promise ${e} in ${o}ms`)})),l+=Number(t.value)}));
//# sourceMappingURL=03-promises.fe0c8dc8.js.map