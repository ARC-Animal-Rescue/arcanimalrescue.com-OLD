async function uploaded_images() {
    var images = []
    const req_commits = await fetch('https://api.github.com/repos/ARC-Animal-Rescue/arcanimalrescue.com/contents/src/xmas2022');

    var resolution = await req_commits.json();
    
    for (var i=0; i < resolution.length; i++) {
    	var filename = JSON.stringify(resolution[i].download_url);
    
    	images.push(filename);
    }
    
    return images;
}
