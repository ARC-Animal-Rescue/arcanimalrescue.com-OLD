async function loadImg(dir, elem, style) {
    const req_commits = await fetch('https://api.github.com/repos/ARC-Animal-Rescue/arcanimalrescue.com/contents/src/'+dir);

    var resolution = await req_commits.json();
    
    for (var i=0; i < resolution.length; i++) {
    	var filename = resolution[i].download_url;
    
    	elem.innerHTML += `
    	<div class="staff-member" style="`+style+`">
    		<img src="`+filename+`"/>
    	</div>
    	`
    }
}

loadImg("votm", document.querySelector("#votm"), "width:30%; float:left; display:inline;");