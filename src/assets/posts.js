async function loadBlog() {
    const req_commits = await fetch('https://api.github.com/repos/ARC-Animal-Rescue/arcanimalrescue.com/contents/src/blog');

    var resolution = await req_commits.json();
    
    for (var i=0; i < resolution.length; i++) {
    	var filename = resolution[i].download_url;
    
        if ((filename.endsWith('.html'))&&(!filename.includes("404.html"))) {
            var req = await fetch(filename);
    		var description = await req.text();
    	    document.querySelector("#posts").innerHTML += `
    	    <br><a style="font-size:1.2em;" href="post.html?name=`+filename.split("blog/")[1].split('.html')[0]+`">`+filename.split("blog/")[1].split('.html')[0]+`</a>
    	    `
        }
    }
}

loadBlog();
