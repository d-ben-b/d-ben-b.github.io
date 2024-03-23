var _isopen = new Boolean(false);
_isopen = false;
let slideIndex = 0;
let slides = document.getElementsByClassName("Image");
let dots = document.getElementsByClassName("dot");


$('.sign_in').click(function(){
    $('.sign_in_panel').transition('scale');
  })

$('.close_botton').click(function(){
  $('.sign_in_panel').transition('scale');
})
  
/**side bar seletion**/

$('#Expolore').mouseover(function(){
  if (_isopen == false) {
    console.log(_isopen);
    $('.Explore').transition('scale');
    $('.eye_ball').transition('jiggle');
    _isopen = !_isopen;
    console.log(_isopen);
  }
})

$('.Explore').mouseleave(function(){
  $('.Explore').transition('scale');
  _isopen = !_isopen;
  console.log("out:" + _isopen);
})

$('#Story').mouseover(function(){
  if (_isopen == false) {
    $('.Story').transition('scale');
    $('.eye_ball').transition('jiggle');
    _isopen = !_isopen;
    console.log(_isopen);
  }
})

$('.Story').mouseleave(function(){
  $('.Story').transition('scale');
  _isopen = !_isopen;
  console.log("out:" +_isopen);
})

$('#Plan').mouseover(function(){
  if (_isopen == false) {
    $('.Plan').transition('scale');
    $('.eye_ball').transition('jiggle');
    _isopen = !_isopen;
    console.log(_isopen);
  }
})

$('.Plan').mouseleave(function(){
  $('.Plan').transition('scale');
  _isopen = !_isopen;
  console.log("out:" +_isopen);
})

$('.Home').click(function(){
  console.log("HI")
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})

/**eye move**/ 
const pupils = document.querySelectorAll(".eye .eye_ball");
window.addEventListener("mousemove", (e) => {
  pupils.forEach((pupil) => {
    // get x and y postion of cursor
    var rect = pupil.getBoundingClientRect();
    var x = (e.pageX - rect.left -100) / 100 + "px";
    var y = (e.pageY - rect.top -100) / 100 + "px";
    pupil.style.transform = "translate3d(" + x + "," + y + ", 0px)";
  });
});
/**eye move**/ 
/**slide */
$('.slide__arraw--next').click(function(){
  console.log("Now slide=" + slides[0])
  showSlide(slideIndex + 1);
  hideslide(slideIndex)
  slideIndex = add(slideIndex,1)
  console.log("Now=" + slideIndex)
})

$('.slide__arraw--prev').click(function(){
  console.log("Now slide=" + slideIndex)
  showSlide(slideIndex - 1);
  hideslide(slideIndex)
  slideIndex = add(slideIndex,-1)
})

$('.back').click(function(){
  console.log("Now slide=" + slideIndex)
  showSlide(slideIndex - 1);
  hideslide(slideIndex)
  slideIndex = add(slideIndex,-1)
})

function showSlide(num){
  if (num == 6) {
    num = 0;
  }
  else if(num == -1){
    num = 5;
  }
  dots[num].className += " active";
  //slides[num].style.display = "block";
  $(slides[num]).transition({
    animation : 'fade right',
    duration  : 900
  });
}

function hideslide(num){
  //slides[num].style.display = "none";
  $(slides[num]).transition({
    animation : 'fade right',
    duration  : 900
  });
  dots[num].className = dots[num].className.replace("active", "");
}

function add(num,add){
  if(num + add > 5){
    return 0;
  }
  else if(num + add < 0){
    return 5;
  }
  else{
    return num + add;
  }
}