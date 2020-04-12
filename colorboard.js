var current_fontColor;
var color_list = [
    ['#ffffff', '#000000', '#eeece0', '#1c487f', '#4d80bf', '#c24f4a', '#9abc52', '#7b5ba1', '#46acc8', '#f9963b'],
    ['#f2f2f2', '#808080', '#ddd9c2', '#c5d9f2', '#dce6f3', '#f3dcdb', '#ebf1dd', '#e6e0ec', '#daeef4', '#feead9'],
    ['#d9d9d9', '#595959', '#c4be95', '#8db3e5', '#b8cde6', '#e7b9b7', '#d7e5bb', '#ccc0db', '#b6dee9', '#fdd5b3'],
    ['#bfbfbf', '#404040', '#948b50', '#528cd8', '#94b2d9', '#da9693', '#c3d798', '#b3a1c8', '#91cdde', '#fbc08c'],
    ['#a6a6a6', '#262626', '#4a4528', '#15365f', '#355f94', '#973632', '#769436', '#60487c', '#2c859d', '#e66c00'],
    ['#808080', '#0d0d0d', '#1e1c10', '#0f2340', '#243f62', '#642422', '#4f6324', '#403053', '#1e5969', '#994800'],
    ['#df402a', '#f77567', '#fad4d3', '#e5d23d', '#b19067', '#77c94b', '#98dede', '#184e87', '#9896a4', '#90a7d1'],];



function creatColorBoard(callnum) {
    //颜色板主框架html代码
    var content_color_board = '\
<div id="color_default_and_current" class="color_default_and_currents"></div>\
<div class="divider"></div >\
<div id="color_main_select" class="color_selects"></div>\
<br />\
<div id="color_select" class="color_selects"></div>\
<div class="divider"></div>\
<div id="color_recommend" class="color_recommends"></div>';

    //默然颜色与当前颜色html代码
    var content_def_and_cur = ' <table>\
<thead ></thead>\
<tbody>\
<tr>\
<td><div id="color_default" class="color_defaults">默认颜色</div></td>\
<td><div id="color_current" class="color_currents">当前颜色</div></td>\
</tr>\
</tbody>\
</table >';
    //表示一行颜色方块
    var content_blocks = '\
<table id="colors" >\
<thead></thead >\
<tbody>\
<tr class="color_blocks">\
<td><div></div></td>\
<td><div></div></td>\
<td><div></div></td>\
<td><div></div></td>\
<td><div></div></td>\
<td><div></div></td>\
<td><div></div></td>\
<td><div></div></td>\
<td><div></div></td>\
<td><div></div></td>\
</tr>\
</tbody>\
</table > ';

    //当有多个颜色版时，给每个颜色板的元素id加上数字尾椎
    function contentHandle(content_color_board, content_def_and_cur, content_blocks, called_number) {
        function addNumberAtEnd(string, replace_part, number) {

            var t = string.replace(replace_part, replace_part + number.toString());
            return t;
        }
        //给主框架四个div加id尾缀编号
        content_color_board = addNumberAtEnd(content_color_board, "color_default_and_current", called_number);
        content_color_board = addNumberAtEnd(content_color_board, "color_main_select", called_number);
        content_color_board = addNumberAtEnd(content_color_board, 'id="color_select', called_number);
        content_color_board = addNumberAtEnd(content_color_board, "color_recommend", called_number);


        //给默然当前颜色区域id加尾缀编号
        content_def_and_cur = addNumberAtEnd(content_def_and_cur, "color_default", called_number)
        content_def_and_cur = addNumberAtEnd(content_def_and_cur, "color_current", called_number)
        //给颜色方块区域id加尾缀编号编号
        content_blocks = addNumberAtEnd(content_blocks, "colors", called_number);

        return [content_color_board, content_def_and_cur, content_blocks];
    }


    /*---------------给id加尾缀编号--------------*/
    var res = contentHandle(content_color_board, content_def_and_cur, content_blocks, callnum);
    content_color_board = res[0];
    content_def_and_cur = res[1];
    content_blocks = res[2];

    /*---------------获取各主div元素--------------*/
    var color_board = "color_board" + callnum;
    var color_default_and_current = "color_default_and_current" + callnum;
    var color_main_select = "color_main_select" + callnum;
    var color_select = "color_select" + callnum;
    var color_recommend = "color_recommend" + callnum;
    //获取画板框架div元素，因此生成画板的div的id要取名为color_board+数字编号
    var color_board_div = document.getElementById(color_board);
    color_board_div.innerHTML = content_color_board;//注入html代码
    //获取默然颜色与当前颜色div元素
    var color_default_and_current_div = document.getElementById(color_default_and_current);
    //获取主颜色div元素
    var color_main_select_div = document.getElementById(color_main_select);
    //获取其余颜色div元素
    var color_select_div = document.getElementById(color_select);
    //获取标准颜色div元素
    var color_recommend_div = document.getElementById(color_recommend);

    /*---------------设置各主div元素的内容--------------*/
    color_default_and_current_div.innerHTML = content_def_and_cur;//注入html代码
    for (var i = 0; i < color_list.length; i++) {
        var content_temp = content_blocks.replace("colors" + callnum, "colors" + callnum + i.toString());//给每行方块加一个尾缀编号
        if (i == color_list.length - 1) {//左后一行加到color_recommend_div中            
            color_recommend_div.innerHTML = content_temp;
            break;
        }
        if (i == 0) {//第一行加到color_main_select_div中
            color_main_select_div.innerHTML += content_temp;
            continue;
        }
        //其他行加到color_select_div中
        color_select_div.innerHTML += content_temp;
    }

    /*********调色板添加onclick**********/
    let cb = document.getElementsByClassName("color_blocks");
    let l = 0;//0~6行
    for (let i = callnum * 7; i < (callnum + 1) * 7; i++) {  //根据编号不同选取不同范围的行，编号0:0~6.编号1:7~13
        let tds = cb[i].children;        
        for (let j = 0; j < tds.length; j++) {         
            let color_div = tds[j].children[0];
            color_div.onclick = colorBlocksOnclickHandler;//给每个方块添加事件处理程序
            color_div.setAttribute("blocksId", i.toString() + j.toString());//设置id
            color_div.style.backgroundColor = color_list[l][j];//设置颜色
        }
        l++;//行加一
    }
    var color_df = document.getElementById("color_default" + callnum);
    color_df.style.backgroundColor = "#55afe4";
    color_df.onclick = defaultColorOnclickHandler;

    var color_cr = document.getElementById("color_current" + callnum);
    color_cr.style.backgroundColor = "#55afe4";    

}
function defaultColorOnclickHandler() {
    color_board_number = event.target.id[13];
    document.getElementById("color_current" + color_board_number).style.backgroundColor = event.target.style.backgroundColor;
    document.getElementsByTagName("body")[0].style.backgroundColor = event.target.style.backgroundColor;//设置body背景色

}
function colorBlocksOnclickHandler() {
    var select_color_block = event.target;//被点击的元素
    var color_board_number = select_color_block.parentNode.parentNode.parentNode.parentNode.id[6]; //colorsxx位置6表示画板编号
    //var color_location = select_color_block.attributes["blocksId"].value;//颜色方块的编号        
    document.getElementById("color_current" + color_board_number).style.backgroundColor = select_color_block.style.backgroundColor;
    document.getElementsByTagName("body")[0].style.backgroundColor = select_color_block.style.backgroundColor;//设置body背景色

}

