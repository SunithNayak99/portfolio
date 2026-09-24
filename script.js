(function(){
  var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};

  // Mobile menu
  var nav=$('#nav'),btn=$('#menu-btn');
  btn.addEventListener('click',function(){var o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
  $$('#nav a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');btn.setAttribute('aria-expanded','false')})});

  // Highlight the menu link of the section on screen
  var links=$$('#nav a');
  $$('main section').forEach(function(s){
    new IntersectionObserver(function(es){es.forEach(function(e){
      if(e.isIntersecting)links.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+s.id)});
    })},{rootMargin:'-45% 0px -50% 0px'}).observe(s);
  });

  // Fade sections in as you scroll
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  $$('.reveal').forEach(function(el){io.observe(el)});

  // Photos: show the image if the file exists, otherwise keep the dashed box.
  // Click a photo to enlarge it.
  var lb=$('#lb');
  $$('.slot').forEach(function(f){
    var img=new Image();img.alt=f.dataset.alt;
    img.onload=function(){f.classList.add('has')};
    img.onerror=function(){f.classList.remove('has')};
    f.prepend(img);img.src=f.dataset.src;
    f.addEventListener('click',function(){
      if(f.classList.contains('has')){$('img',lb).src=img.src;lb.classList.add('on')}
    });
  });
  lb.addEventListener('click',function(){lb.classList.remove('on')});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')lb.classList.remove('on')});

  // Back to top
  var top=$('#top-btn');
  var header=$('.site-header');
  var progress=$('#progress');
  addEventListener('scroll',function(){
    top.classList.toggle('show',scrollY>600);
    header.classList.toggle('scrolled',scrollY>50);
    var h=document.documentElement.scrollHeight-document.documentElement.clientHeight;
    var p=(scrollY/h)*100;
    progress.style.width=p+'%';
  },{passive:true});
  top.addEventListener('click',function(){scrollTo({top:0,behavior:'smooth'})});
})();
