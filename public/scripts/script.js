btn = document.getElementsByClassName('scrolltotop');
console.log(btn);
btn.style.display = "hidden";
window.onscroll = topfunction
function topfunction(w){
  console.log("Scrolling");
  console.log(w.scrollTop);
}
