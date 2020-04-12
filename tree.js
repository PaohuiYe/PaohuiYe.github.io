function nodeWithinfo(node, flag) {//后序遍历使用。包含一个treeNode，一个标志位的数据结构
    this.node = node;
    this.flag = flag;
};
nodeWithinfo.prototype.toString = function () {
    return this.node.name + "  flag:" + this.flag;
};
/*-------------------------*/
function infoArraySum(cnt) {//，统计一个inFo数组的和
    let sum = 0;
    for (let i = 0; i < cnt.length; i++) {
        sum += cnt[i].num;
    }
    return sum;
}
function inFo(father, num) {//层次遍历使用。包含父节点名称，父节点子节点数量的数据结构
    this.father_name = father;
    this.num = num;
}
function str_replace(str, insert_loc, insert_str, replace_num) {
    return str.slice(0, insert_loc) + insert_str + str.slice(insert_loc + replace_num);
}
/*----------------------------------------------------*/

var head_tag_of_type = {
    "blank": "<span>",
    "#": "<h1>",
    "##": "<h2>",
    "###": "<h3>",
    "####": "<h4>",
    "#####": "<h5>",
    "######": "<h6>",
    "**": "<strong>",
    "*": "<i>",
    "***": "<span class='strongAndI'>",
    "~~": "<del>",
    "==":"<span class='hightlight'>",
    ">": "<div class='quote_div'>",
    "`": "<pre><code>",
    "divider": "<div class='divider'>",
    "img": "<img class='img' ",
    "link": "<a class='link' target='_blank' ",
    "symbol": "<span class='symbol'>",
    "pg1": "<p class='pg1'>",
    "pg2": "<p class='pg2'>",
    "ul": "<ul class='ul'>",
    "li": "<li class='li'>",

};
var tail_tag_of_type = {
    "blank": "</span>",
    "#": "</h1>",
    "##": "</h2>",
    "###": "</h3>",
    "####": "</h4>",
    "#####": "</h5>",
    "######": "</h6>",
    "**": "</strong>",
    "*": "</i>",
    "***": "</span>",
    "~~": "</del>",
    "==": "</span>",
    ">": "</div>",
    "`": "</code></pre>",
    "divider": "</div>",
    "img": "/>",
    "link": "</a>",
    "symbol": "</span>",
    "pg1": "</p>",
    "pg2": "</p>",
    "ul": "</ul>",
    "li": "</li>",
};

//
//            0.   1. 2.      3.                                 4.    5.                     6.                              7.                             8.        9.
var regexp = /\n{1}|- |#{1,6} |-{3,} {0,}\n|> |`{3}[a-zA-Z+ -]{0,}\n{1}|!\[[^\[\]]{0,}\]\([^\(\)]{0,}\)|\[[^\[\]]{0,}\]\([^\(\)]{0,}\)|\*{1,3}|~{2}|={2}/;
var regexp_enter = /\n{1}/;//0.换行
var regexp_list = /- /;//1.列表
var regexp_header = /#{1,6} /;//2.标题
var regexp_header2 = /#{1,6}/;
var regexp_divider = /-{3,} {0,}\n/;//3.分割线
var regexp_quote = /> /;//4.引用
var regexp_code_start = /`{3}[a-zA-Z+ -]{0,}\n{1}/;//5.代码

var regexp_img = /!\[[^\[\]]{0,}\]\([^\(\)]{0,}\)/;//6.图片
var regexp_link = /\[[^\[\]]{0,}\]\([^\(\)]{0,}\)/;//7.链接 
var regexp_link = /\[[^\[\]]{0,}\]\([^\(\)]{0,}\)/;//7.链接 
var regexp_text = /(\*{1,3})|~{2}|={2}/;






function tree(root) {
    this.root = root;
}

function buildTree(in_str) {
   
    //if (in_str == "\n") in_str = "";
    in_str = in_str.replace(/\n/g, "\n");
    //console.log("*********************")
    //console.log("in_str1:" + in_str);
    if (in_str.charAt(in_str.length - 1) == "\n") in_str = in_str.slice(0, in_str.length - 1);
    in_str = "0" + in_str;
    //console.log("in_str2:" + in_str);
    let in_str_backup = in_str;

    let t = new tree(new treeNode("roottype", true, -1, -1));
    t.root.childrens.push(new treeNode("pg1", false, 0, -1));
    let ul_root = t.root;
    let ul_root_stack = new stack();
    ul_root_stack.push(ul_root);

    let quote_root = t.root;
    let quote_root_stack = new stack();
    quote_root_stack.push(quote_root);
    let a = 10;
    let ul_check_end_flag = false;
    let enter_code_falg = false;
    while (true) {
        /*--------------------------------------------------*/
        let search_res ;
   
        search_res = in_str.search(regexp);
        if (search_res == -1) {
            //console.log("jinru end");
            if (ul_check_end_flag) {
                break;
            }
            else {
                let last_node_type = t.root.childrens[t.root.childrens.length - 1].type;
                //console.log("结束处理");
                if (last_node_type == "ul" || last_node_type == ">") {
                    in_str += "\n\n";
                    in_str_backup += "\n\n";
                    search_res = in_str.search(/\n\n/);
                    ul_check_end_flag = true;
                }
                else if (last_node_type == "`") {
                    in_str += "\n```\n";
                    in_str_backup += "\n```\n";
                    search_res = in_str.search(/\n```\n/);
                    ul_check_end_flag = true;
                }
                //else if (last_node_type == "divider") {
                //    in_str += "\n";
                //    in_str_backup += "\n";
                //    search_res = in_str.search(/\n/);
                //    ul_check_end_flag = true;
                //}
                else break;
                //console.log("str:" + in_str);
                //console.log("str:" + in_str_backup);
            }
        }
        let current_name = in_str.charAt(search_res); 
        let mt_res = in_str.match(regexp)[0];
        //console.log("mt_res:" + mt_res + "***");
        /*----------------------------------------------------*/
        if (current_name == "\n") {
            let last_node = t.root.childrens[t.root.childrens.length - 1];//第一层最后一个节点
            if (last_node.type == "pg1") {//第一层最后一个节点是普通段落节点
                //console.log("进入段落换行:");
                //console.log("tree:\n" + t.toString());
                //console.log("str:" + in_str_backup);
                //console.log("search_res:" + search_res);


                if (last_node.left_loc == search_res - 1) {
                    last_node.type = "pg2";
                    last_node.right_loc = last_node.left_loc + 1;
                    last_node.finished = true;

                    t.root.childrens.push(new treeNode("pg1", false, search_res + 1, -1));

                }
                else {
                    last_node.right_loc = search_res;
                    last_node.finished = true;
                    t.root.childrens.push(new treeNode("pg1", false, search_res + 1, -1));
                }
                let sr = in_str.search(regexp_enter);
                let mr = in_str.match(regexp_enter)[0];
                in_str = str_replace(in_str, sr, "00", mr.length);
                in_str_backup = str_replace(in_str_backup, sr, "00", mr.length);


                //console.log("tree:\n" + t.toString());
                //console.log("str:" + in_str_backup);

            }
            else if (last_node.type == "ul") {//第一层最后一个节点是ul         
                //console.log("进入列表换行");

                let parallel_child_list_regexp = /\n{1,3} {0,}- /;//创建子列表或同级列表
                let end_list_regexp = /\n{2}(?!(- ))|\n{2}(?![ ])/;//结束当前列表
                let newparagraph_regexp = /\n{1,2} {0,}(?=[^ ])/;//在该li下创建新段落

                function finishListRightLoc(last_pg1, search_res) {

                    /*--------先序遍历树---------*/
                    let stk = new stack();
                    let s = new stack();
                    stk.push(last_pg1);
                    while (!stk.isNull()) {
                        let node = stk.pop();
                        s.push(node);
                        if (node.childrens.length == 0 || node.type == "pg1") break;
                        for (let i = 0; i < node.childrens.length; i++) {
                            stk.push(node.childrens[i]);
                        }
                    }
                    let finish_count = 0;
                    while (s.length() != 0) {
                        let node = s.pop();
                        if (node.right_loc != -1) { continue; }

                        node.right_loc = search_res + finish_count;
                        finish_count++;
                    }

                    return finish_count;

                }

                if (in_str.search(parallel_child_list_regexp) == search_res) {//插入同级或子级列表
                    let match_res = in_str.match(parallel_child_list_regexp);
                    if (match_res != null) {
                        match_res = match_res[0];
                        /*--------确定层次---------*/
                        let space_num = match_res.replace(/\n{1,3}|- /g, "").length;//计算空格数
                        space_num = space_num % 2 == 0 ? space_num : space_num - 1;//space转偶数
                        //console.log("space_num:" + space_num);
                        let level = space_num / 2 > ul_root_stack.length() - 1
                            ? ul_root_stack.length()//space_num/2大于栈的长度说明要插入新的子列表
                            : space_num / 2;//space_num/2小于等于栈的长度说明要插入当前某级的同级列表
                        //console.log("level:" + level);
                        /*--------插入---------*/
                        if (level == ul_root_stack.length()) {//新的子列表
                            //console.log("进入新的子列表");
                            //console.log("tree:\n" + t.toString());
                            //console.log("str:" + in_str_backup);

                            let ul_root = ul_root_stack.getTop();//找到最深层的ul_root
                            let last_node = ul_root.childrens[ul_root.childrens.length - 1];//ul_root下第一层最后一个节点,即当前ul
                            let pg_root = last_node.childrens[last_node.childrens.length - 1];//ul_root下最后一个li,即当前li
                            let last_pg1 = pg_root.childrens[pg_root.childrens.length - 1];

                            /*--------插入子列表---------*/
                            let finish_count = finishListRightLoc(last_pg1, search_res);

                            pg_root.childrens.push(new treeNode("ul", false, search_res + finish_count, -1));//在li中插入一个ul
                            finish_count++;
                            ul_root = pg_root;//pg_root变为ul_root
                            ul_root_stack.push(ul_root);
                            last_node = ul_root.childrens[ul_root.childrens.length - 1];//更新last_node，即ul


                            last_node.childrens.push(new treeNode("li", false, search_res + finish_count, -1));//向ul中插入一个li
                            finish_count++;
                            last_node.childrens[0].childrens.push(new treeNode("pg1", false, search_res + finish_count, -1));//向li中插入一个p
                            finish_count++;
                            let rplc = "";
                            while (finish_count--) rplc += "0";

                            let sr = in_str.search(parallel_child_list_regexp);
                            let mr = in_str.match(parallel_child_list_regexp)[0];
                            in_str = str_replace(in_str, sr, rplc, mr.length);
                            in_str_backup = str_replace(in_str_backup, sr, rplc, mr.length);
                    

                            // in_str = in_str.replace(parallel_child_list_regexp, rplc);
                            // in_str_backup = in_str_backup.replace(parallel_child_list_regexp, rplc);
                        }//新的子列表
                        else {//同级列表
                            //console.log("进入同级列表");
                            //console.log("tree:\n" + t.toString());
                            //console.log("str:" + in_str_backup);

                            let ul_root = ul_root_stack.date[level];
                            //console.log("ulroot,type:" + ul_root.type);
                            let last_node = ul_root.childrens[ul_root.childrens.length - 1];//ul_root下第一层最后一个节点,即当前ul
                            let pg_root = last_node.childrens[last_node.childrens.length - 1];//ul_root下最后一个li,即当前li

                            let finish_count = finishListRightLoc(pg_root, search_res);
                            /*--------插入同级列表---------*/
                            //console.log(pg_root.type);
                            //console.log(pg_root.childrens.length);                          

                            last_node.childrens.push(new treeNode("li", false, search_res + finish_count, -1));//创建新的li
                            finish_count++;
                            pg_root = last_node.childrens[last_node.childrens.length - 1];//更新最后的li
                            pg_root.childrens.push(new treeNode("pg1", false, search_res + finish_count, -1));//创建新的p
                            finish_count++;

                            let rplc = "";
                            while (finish_count--) rplc += "0";

                            let sr = in_str.search(parallel_child_list_regexp);
                            let mr = in_str.match(parallel_child_list_regexp)[0];
                            in_str = str_replace(in_str, sr, rplc, mr.length);
                            in_str_backup = str_replace(in_str_backup, sr, rplc, mr.length);
                    
                            
                            // in_str = in_str.replace(parallel_child_list_regexp, rplc);
                            // in_str_backup = in_str_backup.replace(parallel_child_list_regexp, rplc);

                            ul_root_stack.date.length = level + 1;

                        }//同级列表
                    }
                    //console.log("tree:\n" + t.toString());
                    //console.log("str:" + in_str_backup);
                    continue;
                }//插入同级或子级列表

                if (in_str.search(end_list_regexp) == search_res) {//退出当前列表
                    //console.log("进入退出列表");
                    //console.log("tree:\n" + t.toString());
                    //console.log("str:" + in_str_backup);
                    //console.log("search_res:" + search_res);

                    let last_node = t.root.childrens[t.root.childrens.length - 1];//第一层最后一个节点
                    let finish_count = finishListRightLoc(last_node, search_res);
                    //console.log("finish_count:" + finish_count);
                    t.root.childrens.push(new treeNode("pg1", false, search_res + finish_count, -1));
                    finish_count++;
                    let rplc = "";
                    while (finish_count--) rplc += "0";

                    let sr = in_str.search(end_list_regexp);
                    let mr = in_str.match(end_list_regexp)[0];
                    in_str = str_replace(in_str, sr, rplc, mr.length);
                    in_str_backup = str_replace(in_str_backup, sr, rplc, mr.length);
                    

                    // in_str = in_str.replace(end_list_regexp, rplc);
                    // in_str_backup = in_str_backup.replace(end_list_regexp, rplc);

                    //console.log("tree:\n" + t.toString());
                    //console.log("str:" + in_str_backup);
                    continue;
                }//退出当前列表

                if (in_str.search(newparagraph_regexp) == search_res) {//插入新段落
                    //console.log("进入插入新段落");
                    //console.log("tree:\n" + t.toString());
                    //console.log("str:" + in_str_backup);
                    let match_res = in_str.match(newparagraph_regexp);
                    //console.log("search_res:"+search_res);
                    if (match_res != null) {
                        match_res = match_res[0];
                        /*--------确定层次---------*/
                        let space_num = match_res.length - match_res.replace(/ +/, "").length;//计算空格数
                        space_num = space_num % 2 == 0 ? space_num : space_num - 1;//space转偶数
                        let level = space_num / 2 > ul_root_stack.length() - 1
                            ? ul_root_stack.length() - 1
                            : space_num / 2;//计算level
                        //console.log("levell:" + level);
                        //console.log("stack\n" + ul_root_stack.toString());
                        let ul_root = ul_root_stack.date[level];
                        //console.log("ul_root:" + ul_root.right_loc);
                        let last_node = ul_root.childrens[ul_root.childrens.length - 1];//ul_root下第一层最后一个节点,即当前ul或pg1
                        //console.log("last_node:" + last_node.right_loc);
                        let pg_root = last_node.childrens[last_node.childrens.length - 1];//last_node下最后一个li,即当前li
                        let last_pg1 = pg_root.childrens[pg_root.childrens.length - 1];//pg_root下最后一个li,即当前li

                        /*--------插入新段落节点---------*/
                        let finish_count = finishListRightLoc(last_pg1, search_res);

                        pg_root.childrens.push(new treeNode("pg1", false, search_res + finish_count, -1));
                        finish_count++;
                        let rplc = "";
                        while (finish_count--) rplc += "0";
                        
                        let sr = in_str.search(newparagraph_regexp);
                        let mr = in_str.match(newparagraph_regexp)[0];
                        in_str = str_replace(in_str, sr, rplc, mr.length);
                        in_str_backup = str_replace(in_str_backup, sr, rplc, mr.length);
                        

                        // in_str = in_str.replace(newparagraph_regexp, rplc);
                        // in_str_backup = in_str_backup.replace(newparagraph_regexp, rplc);

                        ul_root_stack.date.length = level + 1;
                    }
                    //console.log("tree:\n" + t.toString());
                    //console.log("str:" + in_str_backup);
                    //console.log("str:" + in_str);
                    continue;
                }//插入新段落


                //console.log("进入列表无操作");
                //console.log("tree:\n" + t.toString());
                //console.log("str:" + in_str_backup);

                let sr = in_str.search(regexp_enter);
                let mr = in_str.match(regexp_enter)[0];
                in_str = str_replace(in_str, sr, "", mr.length);
                in_str_backup = str_replace(in_str_backup, sr, "", mr.length);

                // in_str = in_str.replace(regexp_enter, "");
                // in_str_backup = in_str_backup.replace(regexp_enter, "");
                //console.log("tree:\n" + t.toString());
                //console.log("str:" + in_str_backup);
            }
            else if (last_node.type.match(regexp_header2) != null) {
                //console.log("进入标题换行:");
                //console.log("tree:\n" + t.toString());
                //console.log("str:" + in_str_backup);

                last_node.right_loc = search_res;
                last_node.finished = true;
                t.root.childrens.push(new treeNode("pg1", false, search_res + 1, -1));

                let sr = in_str.search(regexp_enter);
                let mr = in_str.match(regexp_enter)[0];
                in_str = str_replace(in_str, sr, "00", mr.length);
                in_str_backup = str_replace(in_str_backup, sr, "00", mr.length);

                // in_str = in_str.replace(regexp_enter, "00");
                // in_str_backup = in_str_backup.replace(regexp_enter, "00");

                //console.log("tree:\n" + t.toString());
                //console.log("str:" + in_str_backup);
            }
            else if (last_node.type == ">") {
                let quote_add_regexp = /\n{1}(> ){1,}/;
                let end_quote_regexp = /\n{2}/;//结束当前引用
                function finishQuoteRightLoc(last_pg1_or_div, search_res) {
                    /*--------先序遍历树---------*/
                    //console.log("last_pg1_or_div_name:" + last_pg1_or_div);
                    let stk = new stack();
                    let s = new stack();
                    stk.push(last_pg1_or_div);
                    while (!stk.isNull()) {
                        let node = stk.pop();
                        s.push(node);
                        if (node.childrens.length == 0 || node.type == "pg1") break;
                        for (let i = 0; i < node.childrens.length; i++) {
                            stk.push(node.childrens[i]);
                        }
                    }
                    let finish_count = 0;
                    while (s.length() != 0) {
                        let node = s.pop();
                        if (node.right_loc != -1) { continue; }
                        node.right_loc = search_res + finish_count;
                        finish_count++;
                    }
                    return finish_count;
                }
                if (in_str.search(quote_add_regexp) == search_res) {//创建引用                 
                    //console.log("进入创建引用");
                    //console.log("tree:\n" + t.toString());
                    //console.log("str:" + in_str_backup);

                    let match_res = in_str.match(quote_add_regexp);
                    if (match_res != null) {
                        match_res = match_res[0];
                        let level = match_res.replace(/\n/g, "").length / 2 - 1;//计算层次                       
                        //console.log("level:" + level);
                        if (level > quote_root_stack.length() - 1) {//创建子引用
                            //console.log("创建子引用");
                            let finish_count = 0;
                            let leng_record = quote_root_stack.length() - 1;
                            for (let i = quote_root_stack.length() - 1; i < level; i++) {
                                //console.log("---------第" + i + "次--------");
                                //console.log(quote_root_stack.toString());
                                let quote_root = quote_root_stack.date[i];
                                let last_node = quote_root.childrens[quote_root.childrens.length - 1];//quote_root下最后一个节点  

                                let last_div_or_pg1 = last_node.childrens[last_node.childrens.length - 1];

                                if (i == leng_record) {
                                    finish_count += finishQuoteRightLoc(last_div_or_pg1, search_res);
                                    last_node.childrens.push(new treeNode(">", false, search_res + finish_count, -1));
                                    finish_count++;
                                }
                                else {
                                    last_div_or_pg1.type = ">";
                                }


                                quote_root_stack.push(last_node);
                                quote_root = quote_root_stack.getTop();
                                last_node = quote_root.childrens[quote_root.childrens.length - 1];

                                last_node.childrens.push(new treeNode("pg1", false, search_res + finish_count, -1));
                                finish_count++;

                                //console.log("tree:\n" + t.toString());
                                //console.log("str:" + in_str_backup);
                            }
                            let rplc = "";
                            while (finish_count--) rplc += "0";
                            
                            let sr = in_str.search(quote_add_regexp);
                            let mr = in_str.match(quote_add_regexp)[0];
                            in_str = str_replace(in_str, sr, rplc, mr.length);
                            in_str_backup = str_replace(in_str_backup, sr, rplc, mr.length);


                            // in_str = in_str.replace(quote_add_regexp, rplc);
                            // in_str_backup = in_str_backup.replace(quote_add_regexp, rplc);

                        } //创建子引用 
                        else if (level <= quote_root_stack.length() - 1) {//创建新段落
                            //console.log("创建新段落");
                            let quote_root = quote_root_stack.date[level];
                            let last_node = quote_root.childrens[quote_root.childrens.length - 1];//quote_root下最后一个节点                            
                            let last_pg1_or_div = last_node.childrens[last_node.childrens.length - 1];
                            let finish_count = finishQuoteRightLoc(last_pg1_or_div, search_res);

                            last_node.childrens.push(new treeNode("pg1", false, search_res + finish_count, -1));
                            finish_count++;


                            let rplc = "";
                            while (finish_count--) rplc += "0";

                            let sr = in_str.search(quote_add_regexp);
                    let mr = in_str.match(quote_add_regexp)[0];
                    in_str = str_replace(in_str, sr, rplc, mr.length);
                    in_str_backup = str_replace(in_str_backup, sr, rplc, mr.length);

                            // in_str = in_str.replace(quote_add_regexp, rplc);
                            // in_str_backup = in_str_backup.replace(quote_add_regexp, rplc);
                            quote_root_stack.date.length = level + 1;
                        }//创建新段落    
                    }
                    //console.log("tree:\n" + t.toString());
                    //console.log("str:" + in_str_backup);
                    continue
                }//创建引用
                if (in_str.search(end_quote_regexp) == search_res) {//退出引用
                    //console.log("进入退出引用");
                    //console.log("tree:\n" + t.toString());
                    //console.log("str:" + in_str_backup);
                    //console.log("search_res:" + search_res);

                    let last_node = t.root.childrens[t.root.childrens.length - 1];//第一层最后一个节点
                    let finish_count = finishQuoteRightLoc(last_node, search_res);


                    t.root.childrens.push(new treeNode("pg1", false, search_res + finish_count, -1));
                    finish_count++;

                    let rplc = "";
                    while (finish_count--) rplc += "0";

                    let sr = in_str.search(end_quote_regexp);
                    let mr = in_str.match(end_quote_regexp)[0];
                    in_str = str_replace(in_str, sr, rplc, mr.length);
                    in_str_backup = str_replace(in_str_backup, sr, rplc, mr.length);

                    // in_str = in_str.replace(end_quote_regexp, rplc);
                    // in_str_backup = in_str_backup.replace(end_quote_regexp, rplc);

                    //console.log("tree:\n" + t.toString());
                    //console.log("str:" + in_str_backup);
                    continue;
                }//退出引用
                if (in_str.search(regexp_enter) == search_res) {
                    //console.log("进入引用非标准换行");
                    //console.log("tree:\n" + t.toString());
                    //console.log("str:" + in_str_backup);
                    let quote_root = t.root;
                    let last_node = quote_root.childrens[quote_root.childrens.length - 1];//quote_root下最后一个节点                            
                    let last_pg1_or_div = last_node.childrens[last_node.childrens.length - 1];
                    let finish_count = finishQuoteRightLoc(last_pg1_or_div, search_res);

                    last_node.childrens.push(new treeNode("pg1", false, search_res + finish_count, -1));
                    finish_count++;


                    let rplc = "";
                    while (finish_count--) rplc += "0";
                    let sr = in_str.search(regexp_enter);
                    let mr = in_str.match(regexp_enter)[0];
                    in_str = str_replace(in_str, sr, rplc, mr.length);
                    in_str_backup = str_replace(in_str_backup, sr, rplc, mr.length);

                    // in_str = in_str.replace(regexp_enter, rplc);
                    // in_str_backup = in_str_backup.replace(regexp_enter, rplc);
                    //console.log("tree:\n" + t.toString());
                    //console.log("str:" + in_str_backup);

                    quote_root_stack.date.length = 0 + 1;
                    continue;
                }//非标准换行
                //console.log("进入引用无操作");
                //console.log("tree:\n" + t.toString());
                //console.log("str:" + in_str_backup);

                let sr = in_str.search(regexp_enter);
                let mr = in_str.match(regexp_enter)[0];
                in_str = str_replace(in_str, sr, "", mr.length);
                in_str_backup = str_replace(in_str_backup, sr, "", mr.length);

                // in_str = in_str.replace(regexp_enter, "");
                // in_str_backup = in_str_backup.replace(regexp_enter, "");
                //console.log("tree:\n" + t.toString());
                //console.log("str:" + in_str_backup);
            }
            else if (last_node.type == "`") {                               
                //console.log("代码换行");

          
                in_str = str_replace(in_str, search_res, "0", 1);                               

                //console.log(" tree:\n" + t.toString());
                //console.log("in_str:" + in_str);
                //console.log("in_str_backup:" + in_str_backup);
                continue;                               
            }           
        }
        else if (in_str.search(regexp_divider) == search_res) {//分割线 
            //console.log("进入分割线");
            //console.log("tree:\n" + t.toString());
            //console.log("str:" + in_str_backup);
            let match_res = in_str.match(regexp_divider)[0];
            let last_node = t.root.childrens[t.root.childrens.length - 1];//t.root下最后一个p节点   
            if (last_node.type == "pg1" && last_node.left_loc == search_res - 1) {//是在段落开头
                last_node.type = "divider";

                last_node.right_loc = search_res;
                last_node.finished = true;

                t.root.childrens.push(new treeNode("pg1", false, search_res + 1, -1));

                let sr = in_str.search(regexp_divider);//即search_res
                let mr = in_str.match(regexp_divider)[0];
                in_str = str_replace(in_str, sr, "00", mr.length);
                in_str_backup = str_replace(in_str_backup, sr, "00", mr.length);
            }
            else {
                let l = match_res.length - 1;//去掉regexp_divider最后那个换行符
                let rplc = "";
                while (l--) rplc += "0";              
                in_str = str_replace(in_str, search_res, rplc, match_res.length - 1);
            }
            //console.log("tree:\n" + t.toString());
            //console.log("str:" + in_str);
            //console.log("str:" + in_str_backup);
        }//分割线
        else if (mt_res == "- ") {//列表
            //console.log("进入列表");
            //console.log("tree:\n" + t.toString());
            //console.log("str:" + in_str_backup);
            let last_node = t.root.childrens[t.root.childrens.length - 1];//t.root下最后一个p节点   

            if (last_node.left_loc == search_res - 1) {//若"- "是在一个普通段落的开头                     
                last_node.type = "ul";//将这个段落变为列表段落
                last_node.childrens.push(new treeNode("li", false, search_res, -1));
                last_node.childrens[0].childrens.push(new treeNode("pg1", false, search_res + 1, -1));

                let sr = in_str.search(regexp_list);
                let mr = in_str.match(regexp_list)[0];
                in_str = str_replace(in_str, sr, "00", mr.length);
                in_str_backup = str_replace(in_str_backup, sr, "00", mr.length);

            }
            else {
                in_str = in_str.replace(regexp_list, "00");
            }

            //console.log("tree:\n" + t.toString());
            //console.log("str:" + in_str_backup);
        }//列表
        else if (current_name == "#") {
            //console.log("进入标题");
            //console.log("tree:\n" + t.toString());
            //console.log("str:" + in_str_backup);
            let last_node = t.root.childrens[t.root.childrens.length - 1];//t.root下最后一个p节点 

            let match_res = in_str.match(regexp_header)[0];
            if (last_node.type == "pg1" && last_node.left_loc == search_res - 1) {
                let type_length = match_res.length - 1;
                let current_type = "";
                while (type_length--) current_type += "#";
                last_node.type = current_type;

                let sr = in_str.search(regexp_header);
                let mr = in_str.match(regexp_header)[0];
                in_str = str_replace(in_str, sr, "", mr.length);
                in_str_backup = str_replace(in_str_backup, sr, "", mr.length);
            }
            else {
                let l = match_res.length;
                let rplc = "";
                while (l--) rplc += "0";
                in_str = in_str.replace(regexp_header, rplc);
            }

            //console.log("tree:\n" + t.toString());
            //console.log("str:" + in_str_backup);
        }//标题
        else if (mt_res == "> ") {
            //console.log("进入引用");
            //console.log("tree:\n" + t.toString());
            //console.log("str:" + in_str_backup);
            let last_node = t.root.childrens[t.root.childrens.length - 1];//t.root下最后一个p节点 

            if (last_node.type == "pg1" && last_node.left_loc == search_res - 1) {
                last_node.type = ">";
                last_node.childrens.push(new treeNode("pg1", false, search_res, -1));

                let sr = in_str.search(regexp_quote);
                let mr = in_str.match(regexp_quote)[0];
                in_str = str_replace(in_str, sr, "0", mr.length);
                in_str_backup = str_replace(in_str_backup, sr, "0", mr.length);

            }
            else {
                in_str = in_str.replace(regexp_quote, "00");
            }

            //console.log("tree:\n" + t.toString());
            //console.log("str:" + in_str_backup);
        }//引用
        else if (current_name == "`") {
            //console.log("进入代码");
            //console.log("tree:\n" + t.toString());
            //console.log("str:" + in_str_backup);
            let last_node = t.root.childrens[t.root.childrens.length - 1];//t.root下最后一个p节点 
            let match_res = in_str.match(regexp_code_start)[0];
            if (last_node.type == "pg1" && last_node.left_loc == search_res - 1) {
                //console.log("进入代码1");
                enter_code_falg = true;
                last_node.type = "`";                
                let sr = in_str.search(regexp_code_start);
                let mr = in_str.match(regexp_code_start)[0];
                in_str = str_replace(in_str, sr, "", mr.length);
                in_str_backup = str_replace(in_str_backup, sr, "", mr.length);
            }
            else if (last_node.type == "`") {
                enter_code_falg = false;
                //console.log("进入代码2");
                //if (last_node.left_loc == search_res - 1) {
                    last_node.right_loc = search_res;
                    last_node.finished = true;
                    t.root.childrens.push(new treeNode("pg1", false, search_res + 1, -1));
                    let sr = in_str.search(regexp_code_start);
                    let mr = in_str.match(regexp_code_start)[0];
                    in_str = str_replace(in_str, sr, "00", mr.length);
                    in_str_backup = str_replace(in_str_backup, sr, "00", mr.length);
                                               
            }           
            else {                
                let l = match_res.length-1;//去掉regexp_code_start最后那个换行符
                let rplc = "";
                while (l--) rplc += "0";
                in_str = str_replace(in_str, search_res, rplc, match_res.length-1);
            }

            //console.log("tree:\n" + t.toString());
            //console.log("str:" + in_str);
            //console.log("str:" + in_str_backup);
        } //代码
        else if (current_name == "!") {
            //console.log("进入图片");
            //console.log("tree:\n" + t.toString());
            //console.log("str:" + in_str_backup);
            let mr = in_str.match(regexp_img)[0];//匹配结果
            let temp = mr.replace(/!\[[^]{0,}\]\(/, "");
            let img_addr = temp.slice(0, temp.length - 1);//图片的地址

            temp = mr.replace(/!\[/, "");
            let img_show = temp.replace(/(\]\([^]{0,}\))$/, "");//图片默认值            
            let last_node = t.root.childrens[t.root.childrens.length - 1];
            if (last_node.type != "`") {
                let current_root;
                if (last_node.type == "ul" || last_node.type == ">"
                    || last_node.type == "pg1") {
                    /*--------先序遍历树，找到最右下的p---------*/
                    let stk = new stack();
                    let s = new stack();
                    stk.push(last_node);
                    while (!stk.isNull()) {
                        let node = stk.pop();
                        s.push(node);
                        if (node.childrens.length == 0 || node.type == "pg1") break;
                        for (let i = 0; i < node.childrens.length; i++) {
                            stk.push(node.childrens[i]);
                        }
                    }
                    current_root = s.getTop();                    
                }
                else if (last_node.type.match(regexp_header2) != null) {
                    current_root = last_node;
                }
                current_root.childrens.push(new treeNodeImg("img", true, search_res, search_res + 1, img_addr, img_show));
                in_str = str_replace(in_str, search_res, "00", mr.length);
                in_str_backup = str_replace(in_str_backup, search_res, "00", mr.length);
            }
            else {
                let n = mr.length;
                let rplc = "";
                while (n--) rplc += "0";
                in_str = in_str.replace(regexp_img, rplc);               
            }

            //console.log("tree:\n" + t.toString());
            //console.log("str:" + in_str);
            //console.log("str:" + in_str_backup);
        }//图片
        else if (current_name == "[") {
            //console.log("进入链接");
            //console.log("tree:\n" + t.toString());
            //console.log("str:" + in_str_backup);
            let mr = in_str.match(regexp_link)[0];//匹配结果
            let temp = mr.replace(/\[[^]{0,}\]\(/, "");
            let link_addr = temp.slice(0, temp.length - 1);//链接的地址

            temp = mr.replace(/\[/, "");
            let link_name = temp.replace(/(\]\([^]{0,}\))$/, "");//链接的名字

            let last_node = t.root.childrens[t.root.childrens.length - 1];
            if (last_node.type != "`") {
                let current_root;
                if (last_node.type == "ul" || last_node.type == ">" || last_node.type == "pg1") {
                    /*--------先序遍历树，找到最右下的p---------*/
                    let stk = new stack();
                    let s = new stack();
                    stk.push(last_node);
                    while (!stk.isNull()) {
                        let node = stk.pop();
                        s.push(node);
                        if (node.childrens.length == 0 || node.type == "pg1") break;
                        for (let i = 0; i < node.childrens.length; i++) {
                            stk.push(node.childrens[i]);
                        }
                    }
                    current_root = s.getTop();                   
                }
                else if (last_node.type.match(regexp_header2) != null) {
                    current_root = last_node;
                }
                current_root.childrens.push(new treeNodeImg("link", true, search_res, search_res + 1, link_addr, link_name));

                in_str = str_replace(in_str, search_res, "00", mr.length);
                in_str_backup = str_replace(in_str_backup, search_res, "00", mr.length);
            }
            else {
                let n = mr.length;
                let rplc = "";
                while (n--) rplc += "0";
                in_str = in_str.replace(regexp_link, rplc);
            }           
            //console.log("tree:\n" + t.toString());
            //console.log("str:" + in_str_backup);
        }//链接
        else if (current_name == "*" || current_name == "~" || current_name == "="){
            //console.log("进入文本修饰");
            //console.log("tree:\n" + t.toString());
            //console.log("str:" + in_str_backup);
            let current_type = in_str.match(regexp_text)[0];
            //console.log(current_type);
            let last_node = t.root.childrens[t.root.childrens.length - 1];
            if (last_node.type != "`") {
                let current_root = null;
                if (last_node.type == "ul" || last_node.type == ">" || last_node.type == "pg1") {
                    /*--------先序遍历树，找到最右下的p---------*/
                    let stk = new stack();
                    let s = new stack();
                    stk.push(last_node);
                    while (!stk.isNull()) {
                        let node = stk.pop();
                        s.push(node);
                        if (node.childrens.length == 0 || node.type == "pg1") break;
                        for (let i = 0; i < node.childrens.length; i++) {
                            stk.push(node.childrens[i]);
                        }
                    }
                    current_root = s.getTop();
                }              
                else if (last_node.type.match(regexp_header2) != null) {
                    current_root = last_node;
                }
                t.insertNode(new tagNode(current_type, search_res), current_root);
            }
          
            let n = current_type.length;
            //console.log(current_type);
            //console.log(current_type.replace(/\n/,"*"));
            //console.log(current_type.length);
            //console.log(n);
            let rplc = "";
            while (n--) rplc += "0";
            //console.log(rplc);
            in_str = in_str.replace(regexp_text, rplc);
            //in_str_backup = in_str_backup.replace(regexp_text, rplc);


            //console.log("tree:\n" + t.toString());
            //console.log("str:" + in_str);
            //console.log("str:" + in_str_backup);
        }

        let q = new queen();
        q.push(t.root);

        let count = 0;
        while (!q.isNull()) {//bfs
            let nd = q.pop();
            nd.name = count++;//按bfs的顺序给节点设置名字       
            for (let i = 0; i < nd.childrens.length; i++) {
                nd.childrens[i].father_node = nd;//父节点信息
                nd.childrens[i].self_loc = i;//节点自己在父节点childrens的位置            
                q.push(nd.childrens[i]);

            }
        }//补充信息

    }

    let q = new queen();
    q.push(t.root);
    let count = 0;
    while (!q.isNull()) {//bfs
        var nd = q.pop();

        if (nd.type == "pg1" && nd.right_loc == -1) {
            in_str_backup += "0";
            nd.right_loc = in_str_backup.length - 1;
        }
        if (nd.type.match(regexp_header2) != null && nd.right_loc == -1) {
            in_str_backup += "0";
            nd.right_loc = in_str_backup.length - 1;
        }
        if (nd.type == ">" && nd.right_loc == -1) {
            in_str_backup += "0";
            nd.right_loc = in_str_backup.length - 1;
        }
        if (nd.type == "`" && nd.right_loc == -1) {
            in_str_backup += "0";
            nd.right_loc = in_str_backup.length - 1;
        }
        nd.name = count++;//按bfs的顺序给节点设置名字       
        for (let i = 0; i < nd.childrens.length; i++) {
            nd.childrens[i].father_node = nd;//父节点信息
            nd.childrens[i].self_loc = i;//节点自己在父节点childrens的位置            
            q.push(nd.childrens[i]);

        }
    }



    //console.log("finally:\n");
    //console.log("backupstr:\n" + in_str_backup);
    //console.log("tree:\n" + t.toString());
    let res_str = t.treeToHTML(in_str_backup);
    //console.log("res_str:\n" + res_str);
    return res_str;
    //return in_str;
}

tree.prototype.updateTreeNodesLoc = function (changeed_loc, extra_length, change_node, change_driction) {
    let q = new queen();

    q.push(this.root);
    while (!q.isNull()) {//bfs树

        let nd = q.pop();
        for (let i = 0; i < nd.childrens.length; i++) {
            q.push(nd.childrens[i]);
        }
        nd.left_loc > changeed_loc ? (nd.left_loc += extra_length) : 1;
        nd.right_loc > changeed_loc ? (nd.right_loc += extra_length) : 1;
        //if (nd.name == change_node.name) {
        //    //nd.left_loc > changeed_loc ? (nd.left_loc += extra_length) : 1;
        //    nd.right_loc > changeed_loc ? (nd.right_loc += extra_length) : 1;
        //}
        //else if (nd.father_node.name == change_node.father_node.name) {
        //    nd.left_loc >= changeed_loc ? (nd.left_loc += extra_length) : 1;
        //    nd.right_loc > changeed_loc ? (nd.right_loc += extra_length) : 1;
        //}
        //else {
        //    if (nd.name < change_node.name) {
        //        if (change_driction) {//左
        //            nd.left_loc > changeed_loc ? (nd.left_loc += extra_length) : 1;
        //            nd.right_loc >= changeed_loc ? (nd.right_loc += extra_length) : 1;
        //        }
        //        else {//右
        //            nd.left_loc > changeed_loc ? (nd.left_loc += extra_length) : 1;
        //            nd.right_loc >= changeed_loc ? (nd.right_loc += extra_length) : 1;
        //        }
        //    }
        //    else {
        //        if (change_driction) {//左
        //            nd.left_loc >= changeed_loc ? (nd.left_loc += extra_length) : 1;
        //            nd.right_loc >= changeed_loc ? (nd.right_loc += extra_length) : 1;
        //        }
        //        else {
        //            nd.left_loc > changeed_loc ? (nd.left_loc += extra_length) : 1;
        //            nd.right_loc > changeed_loc ? (nd.right_loc += extra_length) : 1;
        //        }
        //    }


        //}

    }
};

tree.prototype.deleteErrorNode = function () {

    for (let i = 0; i < this.root.childrens.length; i++) {
        for (let j = 0; j < this.root.childrens[i].childrens.length; j++) {
            if (!this.root.childrens[i].childrens[j].finished) {//如果左边有右边没有
                this.root.childrens[i].childrens.length = j;
            }
        }

    }
};
tree.prototype.treeToHTML = function (in_str) {
    let q = new queen();
    q.push(this.root);

    while (!q.isNull()) {//bfs树
        let nd = q.pop();
        //if (nd.name != 0 && nd.left_loc != -1 && nd.right_loc == -1) 
        //    continue;
        for (let i = 0; i < nd.childrens.length; i++) {//bfs步骤
            q.push(nd.childrens[i]);
        }
        if (nd.type == "roottype") {
            continue;
        }
        let symbol_tag = head_tag_of_type["symbol"] + nd.type + tail_tag_of_type["blank"];
        let symbol_tag_length = head_tag_of_type["symbol"].length + nd.type.length + tail_tag_of_type["blank"].length;


        if (nd.type == "pg1" || nd.type == "pg2" ) {
            //console.log("in_str1:\n" + in_str);
            //console.log(this.toString());

            in_str = str_replace(in_str, nd.left_loc
                , head_tag_of_type[nd.type]//段落的头标签
                , 1);
            this.updateTreeNodesLoc(nd.left_loc, head_tag_of_type[nd.type].length - 1, nd, true);//更新所有节点的位置信息             
            //console.log("in_str2:\n" + in_str);
            //console.log(this.toString());
            /*------------------------*/

            in_str = str_replace(in_str, nd.right_loc
                , tail_tag_of_type[nd.type]   //段落的尾标签                    
                , 1);
            this.updateTreeNodesLoc(nd.right_loc, tail_tag_of_type[nd.type].length - 1, nd, false);//更新所有      
            //console.log("in_str3:\n" + in_str);
            //console.log(this.toString());
        }
        else if (nd.type == "ul") {
            //console.log("in_str7:\n" + in_str);
            //console.log(this.toString());
            in_str = str_replace(in_str, nd.left_loc
                , head_tag_of_type[nd.type]//段落的头标签
                , 1);
            this.updateTreeNodesLoc(nd.left_loc, head_tag_of_type[nd.type].length - 1, nd, true);//更新所有节点的位置信息             
            //console.log("in_str8:\n" + in_str);
            //console.log(this.toString());
            if (nd.right_loc == -1) {
                in_str = in_str + tail_tag_of_type[nd.type];
                //console.log("in_str9:\n" + in_str);
                //console.log(this.toString());
                continue;
            }
            in_str = str_replace(in_str, nd.right_loc
                , tail_tag_of_type[nd.type]//段落的头标签
                , 1);
            this.updateTreeNodesLoc(nd.right_loc, tail_tag_of_type[nd.type].length - 1, nd, false);//更新所有节点的位置信息             
            //console.log("in_str9:\n" + in_str);
            //console.log(this.toString());
        }
        else if (nd.type == "li") {
            //console.log("in_str10:\n" + in_str);
            //console.log(this.toString());
            in_str = str_replace(in_str, nd.left_loc
                , head_tag_of_type[nd.type]//段落的头标签
                , 1);
            this.updateTreeNodesLoc(nd.left_loc, head_tag_of_type[nd.type].length - 1, nd, true);//更新所有节点的位置信息    
            //console.log("in_str11:\n" + in_str);
            //console.log(this.toString());
            if (nd.right_loc == -1) {
                nd.right_loc = nd.father_node.right_loc;
                alert("dsaf");
            }
            //console.log(nd.right_loc);
            in_str = str_replace(in_str, nd.right_loc
                , tail_tag_of_type[nd.type]//段落的头标签
                , 1);
            this.updateTreeNodesLoc(nd.right_loc, tail_tag_of_type[nd.type].length - 1, nd, false);//更新所有节点的位置信息
            //console.log("in_str12:\n" + in_str);
            //console.log(this.toString());

        }
        else if (nd.type.match(regexp_header2) != null) {
            //console.log("in_str20:\n" + in_str);
            //console.log(this.toString());

            in_str = str_replace(in_str, nd.left_loc
                , head_tag_of_type[nd.type]//标题的头标签
                , 1);
            this.updateTreeNodesLoc(nd.left_loc, head_tag_of_type[nd.type].length - 1, nd, true);//更新所有节点的位置信息             
            //console.log("in_str21:\n" + in_str);
            //console.log(this.toString());
            /*------------------------*/

            in_str = str_replace(in_str, nd.right_loc
                , tail_tag_of_type[nd.type]//标题的尾标签                    
                , 1);
            this.updateTreeNodesLoc(nd.right_loc, tail_tag_of_type[nd.type].length - 1, nd, false);//更新所有      
            //console.log("in_str22:\n" + in_str);
            //console.log(this.toString());
        }
        else if (nd.type == ">") {
            //console.log("in_str23:\n" + in_str);
            //console.log(this.toString());

            in_str = str_replace(in_str, nd.left_loc
                , head_tag_of_type[nd.type]//引用的头标签
                , 1);
            this.updateTreeNodesLoc(nd.left_loc, head_tag_of_type[nd.type].length - 1, nd, true);//更新所有节点的位置信息             
            //console.log("in_str24:\n" + in_str);
            //console.log(this.toString());
            /*------------------------*/

            in_str = str_replace(in_str, nd.right_loc
                , tail_tag_of_type[nd.type]//引用的尾标签                    
                , 1);
            this.updateTreeNodesLoc(nd.right_loc, tail_tag_of_type[nd.type].length - 1, nd, false);//更新所有      
            //console.log("in_str25:\n" + in_str);
            //console.log(this.toString());
        }
        else if (nd.type == "`") {
            //console.log("in_str26:\n" + in_str);
            //console.log(this.toString());

            in_str = str_replace(in_str, nd.left_loc
                , head_tag_of_type[nd.type]//代码的头标签               
                , 1);
            this.updateTreeNodesLoc(nd.left_loc, head_tag_of_type[nd.type].length - 1, nd, true);//更新所有节点的位置信息             
            //console.log("in_str27:\n" + in_str);
            //console.log(this.toString());
            /*------------------------*/

            in_str = str_replace(in_str, nd.right_loc
                , tail_tag_of_type[nd.type]//代码的尾标签                    
                , 1);
            this.updateTreeNodesLoc(nd.right_loc, tail_tag_of_type[nd.type].length - 1, nd, false);//更新所有      
            //console.log("in_str28:\n" + in_str);
            //console.log(this.toString());
        }
        else if (nd.type == "divider") {
            //console.log("in_str29:\n" + in_str);
            //console.log(this.toString());

            in_str = str_replace(in_str, nd.left_loc
                , head_tag_of_type[nd.type]//分割线的头标签               
                , 1);
            this.updateTreeNodesLoc(nd.left_loc, head_tag_of_type[nd.type].length - 1, nd, true);//更新所有节点的位置信息             
            //console.log("in_str30:\n" + in_str);
            //console.log(this.toString());
            /*------------------------*/

            in_str = str_replace(in_str, nd.right_loc
                , tail_tag_of_type[nd.type]//分割线的尾标签                    
                , 1);
            this.updateTreeNodesLoc(nd.right_loc, tail_tag_of_type[nd.type].length - 1, nd, false);//更新所有      
            //console.log("in_str31:\n" + in_str);
            //console.log(this.toString());
        }
        else if (nd.type == "img") {
            //console.log("img1:\n" + in_str);
            //console.log(this.toString());

            let img_head_tag = head_tag_of_type[nd.type] + "src='" + nd.addr + "' alt='" + nd.show + "' ";

            in_str = str_replace(in_str, nd.left_loc
                , img_head_tag//图片的头标签
                , 1);
            this.updateTreeNodesLoc(nd.left_loc, img_head_tag.length - 1, nd, true);//更新所有节点的位置信息             
            //console.log("img2:\n" + in_str);
            //console.log(this.toString());
            /*------------------------*/

            in_str = str_replace(in_str, nd.right_loc
                , tail_tag_of_type[nd.type]//图片的尾标签                    
                , 1);
            this.updateTreeNodesLoc(nd.right_loc, tail_tag_of_type[nd.type].length - 1, nd, false);//更新所有      
            //console.log("img3:\n" + in_str);
            //console.log(this.toString());
        }
        else if (nd.type == "link") {
            //console.log("link1:\n" + in_str);
            //console.log(this.toString());

            let link_head_tag = head_tag_of_type[nd.type] + "href='" + nd.addr + "'>"

            in_str = str_replace(in_str, nd.left_loc
                , link_head_tag//链接的头标签
                + nd.show
                , 1);
            this.updateTreeNodesLoc(nd.left_loc, link_head_tag.length + nd.show.length - 1, nd, true);//更新所有节点的位置信息             
            //console.log("link2:\n" + in_str);
            //console.log(this.toString());
            /*------------------------*/

            in_str = str_replace(in_str, nd.right_loc
                , tail_tag_of_type[nd.type]//链接的尾标签                    
                , 1);
            this.updateTreeNodesLoc(nd.right_loc, tail_tag_of_type[nd.type].length - 1, nd, false);//更新所有      
            //console.log("link3:\n" + in_str);
            //console.log(this.toString());
        }
        else if (nd.finished) {//有左右位置  
            let tag_length = nd.type.length;
            //console.log("in_str26:\n" + in_str);
            //console.log(this.toString());
            in_str = str_replace(in_str, nd.left_loc
                , head_tag_of_type["blank"]
                + symbol_tag// 标记的头标签，标记，标记的尾标签                 
                + head_tag_of_type[nd.type]//当前节点的头标签
                , tag_length);

            this.updateTreeNodesLoc(nd.left_loc
                , head_tag_of_type["blank"].length
                + symbol_tag_length
                + head_tag_of_type[nd.type].length
                - tag_length, nd, true);//更新所有节点的位置信息         

            //console.log("in_str27:\n" + in_str);
            //console.log(this.toString());

            in_str = str_replace(in_str, nd.right_loc
                , tail_tag_of_type[nd.type]
                + symbol_tag// 标记的头标签，标记，标记的尾标签
                + tail_tag_of_type["blank"]//当前节点的尾标签                
                , tag_length);
            this.updateTreeNodesLoc(nd.right_loc
                , tail_tag_of_type[nd.type].length
                + symbol_tag_length
                + tail_tag_of_type["blank"].length
                - tag_length, nd, false);//更新所有节点的位置信息              
            //console.log("in_str28:\n" + in_str);
            //console.log(this.toString());
        }
        //else if (nd.left_loc == -1 && nd.right_loc != -1) {//左边未确定，右边确定            
        //    /*----------------头标签---------------*/
        //    //console.log("tree:\n" + this.toString());
        //    //console.log("in_str1:\n" + in_str);
        //    let add_loc;


        //    if (nd.self_loc != 0) {//有兄弟节点           
        //        add_loc = nd.father_node.childrens[nd.self_loc - 1].right_loc
        //            + tail_tag_of_type["blank"].length + symbol_tag_length;//添加位置为前一个兄弟的右位置加他的尾标签长度加标记标签长度
        //    }
        //    else {//无兄弟节点
        //        //console.log("进入");
        //        //console.log("nd.father_node.left_loc:" + nd.father_node.left_loc);
        //        //console.log("head_tag_of_type[nd.father_node.type].length:" + head_tag_of_type[nd.father_node.type].length);
        //        //console.log("symbol_tag_length:" + symbol_tag_length);

        //        add_loc = nd.father_node.left_loc
        //            + head_tag_of_type[nd.father_node.type].length
        //            + symbol_tag_length; //添加位置为父节点的左位置加他的头标签的长度加标记标签长度
        //        //console.log("add_loc:\n" + add_loc);
        //        //console.log()
        //        if (nd.father_node.right_loc == -1)
        //            add_loc = nd.father_node.left_loc + 2;
        //    }   

        //    //console.log("add_loc:\n" + add_loc);
        //    in_str = str_replace(in_str, add_loc
        //        , head_tag_of_type[nd.type]//当前节点的头标签
        //        , 0);
        //    this.updateTreeNodesLoc(add_loc, head_tag_of_type[nd.type].length, nd);
        //    nd.left_loc = add_loc;
        //    nd.finished = true;                        
        //    /*----------------尾标签---------------*/
        //    //console.log("in_str2:\n" + in_str);
        //    in_str = str_replace(in_str, nd.right_loc
        //        , symbol_tag// 标记的头标签，标记，标记的尾标签
        //        + tail_tag_of_type["blank"]//当前节点的尾标签                   
        //        , tag_length);
        //    this.updateTreeNodesLoc(nd.right_loc, tail_tag_of_type["blank"].length + symbol_tag_length - tag_length, nd);//更新所有节点的位置信息
        //    //console.log("in_str3:\n" + in_str);           
        //}
        //else if (nd.divide_fnished && nd.right_loc == -1) {

        //    /*----------------头标签---------------*/
        //    //console.log("in_str0:\n" + in_str);
        //    in_str = str_replace(in_str, nd.left_loc
        //        , head_tag_of_type[nd.type]//当前节点的头标签
        //        + symbol_tag// 标记的头标签，标记，标记的尾标签                 
        //        , tag_length);
        //    this.updateTreeNodesLoc(nd.left_loc, symbol_tag_length + head_tag_of_type[nd.type].length - tag_length, nd);//更新所有节点的位置信息              


        //    /*----------------尾标签---------------*/
        //    //console.log("in_str1:\n" + in_str);
        //    //无兄弟节点
        //    let valid_father_node = nd.father_node;
        //    //while (valid_father_node.right_loc == -1) {
        //    //    valid_father_node = valid_father_node.father_node;
        //    //}
        //    let add_loc = valid_father_node.right_loc;//添加位置为父节点的右位置           
        //    //console.log("loc:" + add_loc);

        //    in_str = str_replace(in_str, add_loc
        //        , tail_tag_of_type["blank"]//当前节点的尾标签
        //        , 0);
        //    this.updateTreeNodesLoc(add_loc, tail_tag_of_type["blank"].length, nd);
        //    nd.right_loc = add_loc;
        //    nd.finished = true;
        //    //console.log("in_str2:\n" + in_str);
        //}
    }

    //if (this.root.childrens.length == 0) {
    //    in_str = head_tag_of_type["blank"] + in_str + tail_tag_of_type["blank"];
    //}

    //for (let i = 0; i < this.root.childrens.length; i++) {

    //    let temp_nd = new treeNode("blank", false, -1, -1);
    //    temp_nd.name = "blank"
    //    let nd = this.root.childrens[i];
    //    if (!nd.finished) continue;
    //    if (nd.self_loc == 0) {//第一层第一个节点

    //        in_str = str_replace(in_str, 0, head_tag_of_type["blank"], 0);//插入空白头标签                    
    //        this.updateTreeNodesLoc(nd.left_loc, head_tag_of_type["blank"].length, temp_nd);

    //        in_str = str_replace(in_str, nd.left_loc, tail_tag_of_type["blank"], 0);//插入空白尾标签
    //        this.updateTreeNodesLoc(nd.left_loc, tail_tag_of_type["blank"].length, temp_nd);
    //    }      
    //    /*-----------------*/

    //    let blank_left_loc = nd.right_loc + symbol_tag_length + 2*tail_tag_of_type["blank"].length;

    //    in_str = str_replace(in_str, blank_left_loc, head_tag_of_type["blank"], 0);

    //    this.updateTreeNodesLoc(blank_left_loc, head_tag_of_type["blank"].length, temp_nd);
    //    /*-----------------*/
    //    if (nd.self_loc == nd.father_node.childrens.length - 1) {//第一层最后一个节点
    //        let blank_right_loc = in_str.length;
    //        in_str = str_replace(in_str, blank_right_loc, tail_tag_of_type["blank"], 0);
    //        break;
    //    }
    //    let blank_right_loc = nd.father_node.childrens[nd.self_loc + 1].left_loc;
    //    in_str = str_replace(in_str, blank_right_loc, tail_tag_of_type["blank"], 0);
    //    this.updateTreeNodesLoc(blank_right_loc, tail_tag_of_type["blank"].length, temp_nd);
    //}
    return in_str;
}
tree.prototype.bfs = function () {
    let q = new queen();

    q.push(this.root);
    while (!q.isNull()) {
        let nd = q.pop();
        //console.log(nd.name);
        for (let i = 0; i < nd.childrens.length; i++) {
            q.push(nd.childrens[i]);
        }
    }
};
tree.prototype.preOrderDFS = function () {
    let s = new stack();
    s.push(this.root);
    while (!s.isNull()) {
        let node = s.pop();
        for (let i = node.childrens.length - 1; i >= 0; i--) {
            s.push(node.childrens[i]);
        }
    }
};
tree.prototype.insertNode = function (insert_tag_node, current_root) {
    if (insert_tag_node.type == "img") {
        current_root.childrens.push(new treeNode("img", true, insert_tag_node.loc, insert_tag_node.loc));
    }
    let insert_head_tree_node = new treeNode(insert_tag_node.type, false, insert_tag_node.loc, -1);//头节点 
    let insert_tail_tree_node = new treeNode(insert_tag_node.type, false, -1, insert_tag_node.loc);//尾节点
    /*---------------后序遍历该子树，根据是否发现与插入节点类型相同且未闭合的节点判断插入的节点是头结点还是尾节点--------------*/
    let is_head = true;
    let s = new stack();
    s.push(new nodeWithinfo(current_root, true));
    while (!s.isNull()) {
        if (s.getTop().flag) {//不能直接访问   (后续遍历的操作，与Markdown无关)      
            let e = s.pop();
            e.flag = false;
            s.push(e);
            for (let i = e.node.childrens.length - 1; i >= 0; i--) {
                s.push(new nodeWithinfo(e.node.childrens[i], true));
            }
        }
        else {
            let nd = s.pop().node;//遍历的节点
            if (nd.type == insert_tag_node.type && nd.right_loc == -1) {//如果类型相同 且 该节点未闭合
                //将两个节点关联
                nd.divide_fnished = true;
                nd.pair_node = insert_tail_tree_node;
                insert_tail_tree_node.pair_node = nd;

                is_head = false;//该节点是尾巴节点
                break;
            }
            else if (insert_tag_node.type == "**") {
                if (nd.type == "***" && nd.right_loc == -1) {
                    nd.type = "**";
                    //将两个节点关联
                    nd.divide_fnished = true;
                    nd.pair_node = insert_tail_tree_node;
                    insert_tail_tree_node.pair_node = nd;

                    is_head = false;//该节点是尾巴节点  
                }
                else if (nd.type == "*" && nd.right_loc == -1) {
                    insert_tail_tree_node.type = "*";
                    //将两个节点关联
                    nd.divide_fnished = true;
                    nd.pair_node = insert_tail_tree_node;
                    insert_tail_tree_node.pair_node = nd;

                    is_head = false;//该节点是尾巴节点  
                }
            }
            else if (insert_tag_node.type == "*") {
                if (nd.type == "***" && nd.right_loc == -1) {
                    nd.type = "*";
                    //将两个节点关联
                    nd.divide_fnished = true;
                    nd.pair_node = insert_tail_tree_node;
                    insert_tail_tree_node.pair_node = nd;

                    is_head = false;//该节点是尾巴节点            
                }
                else if (nd.type == "**" && nd.right_loc == -1) {
                    nd.type = "*";
                    //将两个节点关联
                    nd.divide_fnished = true;
                    nd.pair_node = insert_tail_tree_node;
                    insert_tail_tree_node.pair_node = nd;

                    is_head = false;//该节点是尾巴节点            
                }

            }


        }

    }

    /*-----------------------------*/
    is_head
        ? this.insertNodeByPostOrder(insert_head_tree_node, current_root)//作为头节点插入
        : this.insertNodeByPreOrder(insert_tail_tree_node, current_root);//作为尾节点插入
}
tree.prototype.insertNodeByPostOrder = function (insert_tree_node, current_root_node) {//插入头标签        
    let s = new stack();
    s.push(new nodeWithinfo(current_root_node, true));
    while (!s.isNull()) {
        if (s.getTop().node.right_loc != -1) {//节点已闭合，跳过            
            s.pop();
            continue;
        }
        if (s.getTop().flag) {//不能直接访问 postOrder dfs步骤        
            let e = s.pop();
            e.flag = false;
            s.push(e);
            for (let i = e.node.childrens.length - 1; i >= 0; i--) {

                s.push(new nodeWithinfo(e.node.childrens[i], true));
            }
        }
        else {//可以访问
            let node_inserted = s.pop();
            node_inserted.node.childrens.push(insert_tree_node)
            return true;
        }
    }
    return false;
};//插入头标签
tree.prototype.insertNodeByPreOrder = function (insert_tree_node, current_root_node) {//插入尾标签        
    let s = new stack();
    s.push(current_root_node);
    while (!s.isNull()) {//先序遍历
        if (s.getTop().finished && s.getTop().type != "roottype") {//左右位置都已经确定不可以插入
            s.pop();
            continue;
        }

        let node = s.pop();
        /*在node的子节点中寻找与insert_tag_node的type相同且未闭合的treeNode*/
        for (let i = 0; i < node.childrens.length; i++) {//遍历node的子节点  
            let temp_nd = node.childrens[i];
            if (temp_nd.type == insert_tree_node.type
                && temp_nd.right_loc == -1) {//发现与insert_tag_node的type相同且未闭合的treeNode   

                temp_nd.right_loc = insert_tree_node.right_loc;//闭合
                temp_nd.finished = true//闭合
                /*--------将该闭合节点的子节点中未闭合的删除-------*/
                for (let j = 0; j < temp_nd.childrens.length; j++) {
                    if (!temp_nd.childrens[j].finished) {
                        temp_nd.childrens.splice(j, 1);
                    }
                }
                return true;
            }
        }
        /*未发现符合要求的子节点，继续dfs，若无有效子节点，创建新的treeNode插入的node中*/
        let valid_childen_num = 0;//有效子节点的数量统计
        for (let i = node.childrens.length - 1; i >= 0; i--) {//遍历node的子节点
            let temp_nd = node.childrens[i];
            if (temp_nd.finished || temp_nd.left_loc == -1)
                continue;//若该子节点已经闭合 继续
            s.push(node.childrens[i]);//将该子节点入栈
            valid_childen_num++;//有效子节点统计加一
        }

        if (valid_childen_num == 0) {//无有效子节点           
            node.childrens.push(insert_tree_node);
            return true;
        }
    }
    return false;
};//插入尾标签
tree.prototype.postOrderDFS = function () {
    let s = new stack();
    s.push(new nodeWithinfo(this.root, true));
    while (!s.isNull()) {
        if (s.getTop().flag) {//不能直接访问         
            let e = s.pop();
            e.flag = false;
            s.push(e);
            for (let i = e.node.childrens.length - 1; i >= 0; i--) {

                s.push(new nodeWithinfo(e.node.childrens[i], true));
            }
        }
        else {
            //console.log(s.pop().node.name);
        }

    }

};
tree.prototype.toString = function () {
    let res_str = "";
    let q = new queen();
    q.push(this.root);
    //count迭代一层的总数  数组是将每子节点的数量分别存储 每输出一个节点减一
    let cnt = [new inFo(null, 1)];
    //count一层的总数       
    let cnt2 = [];
    while (!q.isNull()) {
        let nd = q.pop();
        res_str += nd.name + nd.type + ":" + Number(nd.finished) + "," + nd.left_loc + "," + nd.right_loc + ";  ";
        for (let i = 0; i < cnt.length; i++) {//相当于cnt--
            if (cnt[i].num != 0) {
                cnt[i].num--;
                if (cnt[i].num == 0) {
                    res_str += ",preNode:" + cnt[i].father_name + "  |  ";
                }
                break;
            }
        }
        let children_num = nd.childrens.length;
        cnt2.push(new inFo(nd.name, children_num));


        if (infoArraySum(cnt) == 0) {
            cnt = cnt2;
            cnt2 = [];
            res_str += "\n";
        }

        for (let i = 0; i < children_num; i++) {
            q.push(nd.childrens[i]);
        }
    }
    return res_str;
};
/*--------------------------------------------------------------*/
function treeNode(type, finished, left_loc, right_loc) {
    this.childrens = [];//子结点

    this.type = type;//元素类型
    this.left_loc = left_loc;//头标记位置
    this.right_loc = right_loc;//尾标记位置
    this.finished = finished;//是否闭合
    this.divide_fnished = false;
    this.pair_node = null;
    this.father_node = "null";
    this.self_loc = -1;
    this.name = null;
}
function treeNodeImg(type, finished, left_loc, right_loc, addr, show) {
    this.childrens = [];

    this.type = type;
    this.left_loc = left_loc;
    this.right_loc = right_loc;
    this.finished = finished;
    this.father_node = "null";
    this.self_loc = -1;
    this.name = null;
    this.addr = addr;
    this.show = show;
}

treeNode.prototype.toString = function () {

    let res_str = "tp:" + this.type
        + " nm:" + this.name
        + " ll:" + this.left_loc
        + " rl:" + this.right_loc;
    //+ " fa:{ " + this.father_node.toString() + " }";
    return res_str;
};
/*--------------------------------------------------------------*/
function tagNode(type, location) {
    this.type = type;//表示节点的类型 
    this.name = null;
    this.loc = location;//表示该标签在文本的位置
}
