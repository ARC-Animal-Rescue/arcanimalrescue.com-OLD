var headerHeight = window.getComputedStyle(document.querySelector('.nav'),null).getPropertyValue('height');
var winHeight = window.innerHeight;

function endsWithAny(suffixes, string) {
    return suffixes.some(function (suffix) {
        return string.endsWith(suffix);
    });
}

async function getIdea(dir, elem) {
    const req_commits = await fetch('https://api.github.com/repos/ARC-Animal-Rescue/arcanimalrescue.com/contents/src/'+dir);

    var resolution = await req_commits.json();
    var toAdd = "";
    
    for (var i=0; i < resolution.length; i++) {
    	var filename = resolution[i].download_url;

    	if (endsWithAny(['.png', '.jpg', '.jpeg'], filename)) {
    		toAdd += 
                `
                <div class="idea">
    		        <img src="`+filename+`"/>
                `;
    	// load text file of description
    	} else if (filename.endsWith('.txt')) {
    		var req = await fetch(filename);
    		var description = await req.text();
    	
    		toAdd += `
                <p>`+description+`</p>
            </div>
            `

            elem.innerHTML += toAdd;
            toAdd = "";
    	}
    }
}

getIdea('big-ideas-info', document.querySelector('#ideas'))

