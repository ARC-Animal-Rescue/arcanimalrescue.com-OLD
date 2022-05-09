/* ================================ UTILS ====================================== */

function endsWithAny(suffixes, string) {
    return suffixes.some(function (suffix) {
        return string.endsWith(suffix);
    });
}

/*
====================================================================================

/////////////////////////   Featured Pets Slideshow    /////////////////////////////

====================================================================================
*/

function CloseFunction() {
    document.querySelector('.overlay').style.display='none';
}

// request all pet images for featured pets slider using GitHub API. Images
// are dynamically added to DOM within the function.
getPetImg("featured-pets", document.querySelector('#featured-pets')).then(function(){
	var i=0;

	for (let image of document.querySelectorAll('#featured-pets img')) {
		image.setAttribute("onclick", "$('.descrip').eq("+i+").dialog('open'); document.querySelector('.overlay').style.display='block';");

		i++;
	}

	$('#featured-pets').bxSlider({
		captions: true,
		minSlides: 3,
		auto: true,
  		autoControls: false,
  		stopAutoOnClick: true,
		pager: false,
		infiniteLoop: true,
		preloadImages: 'all'
	});
});

async function getPetImg(dir, elem) {
    const req_commits = await fetch('https://api.github.com/repos/ARC-Animal-Rescue/arcanimalrescue.com/contents/src/'+dir);

	var text = 0;
    var descriptions = [];
    var resolution = await req_commits.json();
    
    for (var i=0; i < resolution.length; i++) {
    	var filename = resolution[i].download_url;

    	if (endsWithAny(['.png', '.jpg', '.jpeg'], filename)) {
    		var img = document.createElement('img');
			img.src = filename;
			elem.appendChild(img);
	 	// load text file of description
    	} else if (filename.endsWith('.txt')) {
            var req = await fetch(filename);
    		var description = await req.text();

            if (filename.includes('-caption')) {
                descriptions.push(description);
            } else {
                var popup = document.createElement('div')
			    popup.innerHTML = description;
			    popup.className = "descrip";
			    document.body.appendChild(popup)

			    $('.descrip').eq(text).dialog({
				    autoOpen: false,
				    modal : false,
                    close: CloseFunction
			    });

			    text++;
            }
    	}
    }

    for (var i=0; i<descriptions.length; i++) {
        var image = document.querySelectorAll('#featured-pets img');

        image[i].setAttribute('title', descriptions[i])
    }
}


/*
====================================================================================

/////////////////////////  Success Stories Slideshow   /////////////////////////////

====================================================================================
*/
var currentSlideCount = 1;

setInterval(function() {
    var slide = document.querySelector('#slides');
    var images = ['https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=',
		  'https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=',
		  'https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=',
		  'https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=',
		  'https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=',
		  'https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=',
		  'https://i.imgur.com/S7j0dZr.png'];
    var descriptions = [
        "Dear ARC:  I couldn’t resist sending these photos to you of the wonderful girl dog we adopted through ARC! Lucy is 100% our girl.  We often refer to our girls, Patti, Sunny Jane & Our Lucy girl.  She is so smart, & fun & playful & so eager to please.  She’s so patient too, we are thankful that she came to our family, she’s the perfect fit for us and I’m most certain she’s totally bonded with us as well.   Thanks again for helping us bring her into our family.Dear ARC:  I couldn’t resist sending these photos to you of the wonderful girl dog we adopted through ARC! Lucy is 100% our girl.  We often refer to our girls, Patti, Sunny Jane & Our Lucy girl.  She is so smart, & fun & playful & so eager to please.  She’s so patient too, we are thankful that she came to our family, she’s the perfect fit for us and I’m most certain she’s totally bonded with us as well.   Thanks again for helping us bring her into our family.",
        "Dear ARC: After a chance meeting with Victoria Turner last year, she and ARC Rescue have been able to help me and my beloved pets when the need was the greatest. I had a few trips to the ER in 2019 and called upon Victoria to find a last minute pet sitter. Never knowing how long I'd be in hospital, she was able to secure a safe place and friendly person to care for my dogs. When one developed a serious health issue that I couldn't afford to take care of myself, she researched and arranged for another organization to assist in saving the eyesight of my little Lola. I'll be forever grateful for that effort, and all of the other niceties she's shown my dogs. From treats to kibble to toys, tails have wagged!",
        "Dear ARC: Aimee changed my life!  I didn’t know that I needed this dog and now we cannot imagine life without her.  We love Aimee so much that she was a part of our Wedding!  I know the huge, year-long efforts and massive financial investment that ARC invested to care for and love Aimee before we found you and we are so very grateful! She is the jewel in our family and we treasure her. THANK YOU to Victoria and all the rest of the wonderful volunteers at ARC RESCUE for SAVING AIMEE!",
        "Just a quick update. Kitty Ava is doing GREAT! She's Playful nearly all hours of the day, and has at least 12 \"spots\" she likes. Ironically, none are on the cat porch. But, still, she's very happy. She's filled out nicely as welll Thank you for bringing this wonderful girl to our family!  Ava loves our children and us, and even the chickens!",
        "Wonderful ARC Rescuers!  Just wanted to reach out with an update on MR. Peeps, our Tuxedo kitty adopted during this pandemic! . He has totally bonded with me and he loves the other M too, but I’m his favorite! He is so happy, and greets us when we come home from work. Allows us to pet him and give him lots of love. He loves his big sister Aspen, and she is showing him the ropes. He is growing and thriving and we are all feeling so blessed to have each other. You were so much a part of that and we appreciate all you do for those less fortunate kitties. Here are some latest pics and we will keep you posted!!",
        "Dear ARC RESCUE , Thanking you again so very much for bringing this healthy dog to us, one year ago.  I really appreciate all your hard work making it happen. Prince is a happy loving spirited dog, now about a hundred pounds,  who loves us and our grandson, as we love him …I do hope you are continuing to enjoy all your good work for finding nice homes for wonderful dogs like him.Wishing you all the best."	
    ];

    if (currentSlideCount < images.length-1) {
        slide.src = images[currentSlideCount];
        document.querySelector("#stories").innerText = descriptions[currentSlideCount];
    } else {
        currentSlideCount = 0;
        slide.src = images[0];
    }

    currentSlideCount++;
}, 9000);

// COUNTERS

document.querySelectorAll('.counter').forEach(item => {
    var countTo = parseInt(item.getAttribute('data-counto'));

    var i=1;
    var step=Math.round(countTo/1000);

    var num = setInterval(function() {
        if (i<countTo) {
            if (countTo >= i+step) {
                i = i+step;
            } else {
                var remainder = countTo-i;

                i = i+remainder;
            }

            item.innerText = i;
        } else {
            clearInterval(num);
        }
    }, 0.1);

});

document.querySelectorAll('.slide').forEach(item => {
    item.addEventListener('click', event => {
        if (event.target.className != "fade") {
            event.target.parentNode.querySelectorAll('.slide').forEach(elem => {
                if (elem.className.includes(' active')) {
                    elem.className = `slide`;
                }
            });

            event.target.className = `slide active`;
            document.querySelector('#text').innerHTML = event.target.getAttribute('data-descrip');
        }
    });
});
