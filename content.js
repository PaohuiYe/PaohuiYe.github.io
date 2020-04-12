creatColorBoard(0);



if (browser.versions.mobile && browser.versions.android) {  	 
    let ClassContent = document.getElementsByClassName("content");
    
    for (let i = 0; i < ClassContent.length; i++) {
        ClassContent[i].style.width = "80%";

    }
}

