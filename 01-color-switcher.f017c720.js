const t={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")};t.startBtn.addEventListener("click",(function(){e=setInterval(n,1e3)})),t.stopBtn.addEventListener("click",(function(){clearInterval(e),t.startBtn.removeAttribute("disabled")}));let e=null;function n(){const e=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;document.body.style.backgroundColor=e,t.startBtn.setAttribute("disabled","disabled")}
//# sourceMappingURL=01-color-switcher.f017c720.js.map
