function stack() {
    this.date = [];
}

stack.prototype.length = function () {//长度
    return this.date.length;
};
stack.prototype.push = function (element) {//入栈
    this.date.push(element);
};
stack.prototype.pop = function () {//出栈
    if (this.length() == 0) return -1;
    let nd = this.date[this.length() - 1];
    this.date.pop();
    return nd;
};
stack.prototype.getTop = function () {//返回栈顶
    if (this.length() == 0) return -1;
    return this.date[this.length() - 1];
};
stack.prototype.getBottom = function () {//返回栈底
    if (this.length() == 0) return -1;
    return this.date[0];
};
stack.prototype.toString = function () {//返回栈所有元素
    let ret_str = "";
    this.date.forEach((value) => {
        ret_str += value.toString();
        ret_str += " \n";
    });
    return ret_str.replace(/ , $/, "");
};
stack.prototype.clear = function () {//清空栈
    this.date.length = 0;
};
stack.prototype.isNull = function () {//判断是否为空   
    return (this.length() == 0);
}


//var q = new stack();
//q.push(1);
//q.push(2);
//q.push(3);
//q.pop();
//q.push(4);
//console.log(q.length());
//console.log(q.toString());
//console.log(q.getTop());
//console.log(q.getBottom());
//q.clear();
//console.log(q.toString());
//var q2 = new stack();
//console.log(q2.isNull());
//q2.push(8);
//q2.push(8);
//q2.push(8);
//console.log(q2.isNull());
//console.log(q2.toString());