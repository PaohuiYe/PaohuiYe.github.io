


if (browser.versions.mobile && browser.versions.android) {
    let EleContent = document.getElementsByTagName("main")[0];
    let ClassArticleTitle = document.getElementsByClassName("articleTitle");
    let EleTopTitle = document.getElementById("topTitle");
    //手机端main:before不使用图片
    var style = document.createElement('style');
    document.head.appendChild(style);
    let sheet = style.sheet;
    sheet.addRule("main:before", "background-image:none;");
    sheet.addRule("header:before", "background-image:none;");
    //手机端因为不适用图片减少透明度
    sheet.addRule("header", "background: rgba(0, 0, 0, 0.7);");
    sheet.addRule("main", "background: rgba(0, 0, 0, 0.7);");

    //修改手机端宽度
    EleContent.style.width = "90%";
    //修改手机端下边距
    EleTopTitle.style.marginBottom = 240 + "px";
    //修改content最大宽度
    for (let i = 0; i < ClassArticleTitle.length; i++) {
        ClassArticleTitle[i].style.maxWidth = "70%";

    }
}





