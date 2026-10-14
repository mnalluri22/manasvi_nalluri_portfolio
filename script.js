(function(){
  document.documentElement.classList.add('js');
  var tabs=[].slice.call(document.querySelectorAll('[role="tab"]'));
  var panels=[].slice.call(document.querySelectorAll('[role="tabpanel"]'));
  function show(id,focus,scroll){
    var found=panels.some(function(p){return p.id===id});
    if(!found) id='overview';
    tabs.forEach(function(t){var on=t.getAttribute('aria-controls')===id;t.setAttribute('aria-selected',on);t.tabIndex=on?0:-1;if(on&&focus)t.focus();if(on)t.scrollIntoView({block:'nearest',inline:'nearest'});});
    panels.forEach(function(p){p.hidden=p.id!==id});
    try{history.replaceState(null,'','#'+id)}catch(e){}
    if(scroll) window.scrollTo(0,0);
  }
  tabs.forEach(function(t,i){
    t.addEventListener('click',function(){show(t.getAttribute('aria-controls'),false,true)});
    t.addEventListener('keydown',function(e){
      var k=e.key,n=null;
      if(k==='ArrowRight')n=(i+1)%tabs.length; else if(k==='ArrowLeft')n=(i-1+tabs.length)%tabs.length; else if(k==='Home')n=0; else if(k==='End')n=tabs.length-1;
      if(n!==null){e.preventDefault();show(tabs[n].getAttribute('aria-controls'),true,false)}
    });
  });
  document.querySelectorAll('[data-go]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();show(b.getAttribute('data-go'),false,true)})});
  var h=(location.hash||'').slice(1); if(h) show(h,false,false);
})();
