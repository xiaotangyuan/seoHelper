//document.body.style.backgroundColor="red";
//alert("hello");
html="\
<iframe style='position: fixed; \
right: 10px; top: 10px; padding-bottom: 10px; \
font-style: normal; font-variant: normal; font-weight: normal; \
font-size: 12px; line-height: 100%; font-family: arial, sans-serif;\
 color: rgb(51, 51, 51); width: 408px; z-index: 999999; height: 282px;'> \
 <html><body>hello</body></html></iframe>\
"
$('html').append(html);