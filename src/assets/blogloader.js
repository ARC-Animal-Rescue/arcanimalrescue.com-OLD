var headerHeight = window.getComputedStyle(document.querySelector('.nav'),null).getPropertyValue('height');
var winHeight = window.innerHeight;

var iframeHeight = winHeight-parseInt(headerHeight);
document.querySelector('#post').height = iframeHeight;

if (location.href.includes('?name=')) {
    var postPath = "blog/"+location.href.split('?name=')[1]+".html";

    document.querySelector('#post').src=postPath;
} else {
    document.write('Resource not found.')
}
