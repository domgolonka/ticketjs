Modernizr.addTest("pointerevents",function(){var supports,element=document.createElement("x"),documentElement=document.documentElement,getComputedStyle=window.getComputedStyle;return"pointerEvents"in element.style?(element.style.pointerEvents="auto",element.style.pointerEvents="x",documentElement.appendChild(element),supports=getComputedStyle&&"auto"===getComputedStyle(element,"").pointerEvents,documentElement.removeChild(element),!!supports):!1});