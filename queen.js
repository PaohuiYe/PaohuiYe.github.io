function queen() {
    this.date = [];
}

queen.prototype.length = function () {//长度
    return this.date.length;
};
queen.prototype.push = function (element) {//入队
    this.date.push(element);
};
queen.prototype.pop = function () {//出队
    if (this.length() == 0) return -1;
    let nd = this.date[0];
    this.date.shift();
    return nd;
};
queen.prototype.getHead = function () {//返回队首
    if (this.length() == 0) return -1;
    return this.date[0];
};
queen.prototype.getTail = function () {//返回队尾
    if (this.length() == 0) return -1;
    return this.date[this.length() - 1];
};
queen.prototype.toString = function () {//返回队列所有元素
    let ret_str = "";
    this.date.forEach((value) => {
        ret_str += value.toString();
        ret_str += " , ";
    });
    return ret_str.replace(/ , $/, "");
};
queen.prototype.clear = function () {//清空队列
    this.date.length = 0;
};
queen.prototype.isNull = function () {//判断是否为空   
    return (this.length() == 0);
}

//var q = new queen();
//q.push(1);
//q.push(2);
//q.push(3);
//q.pop();
//q.push(4);
//console.log(q.length());
//console.log(q.toString());
//console.log(q.getHead());
//console.log(q.getTail());
//q.clear();
//console.log(q.toString());
//var q2 = new queen();
//console.log(q2.isNull());
//q2.push(8);
//q2.push(8);
//q2.push(8);
//console.log(q2.isNull());
//console.log(q2.toString());
/*************************************************************************/
function queenList(number) {
    this.content = [];
    this.queenNumber = number;
    this.contentIsNull = function () {
        for (let i = 0; i < this.queenNumber; i++) {
            if (!this.content[i].isNull()) return i;
        }
        return -1;
    };
    this.toString = function () {
        let ret_str = "";
        for (let i = 0; i < this.queenNumber; i++) {
            ret_str += "queen" + i + " ：" + this.content[i].toString() + "\n";
        }
        return ret_str;
    }
    this.push = function (num, element) {
        this.content[num].push(element);
    }
    this.pop = function (num) {
        this.content[num].pop();
    }
    this.getHead = function (num) {
        return this.content[num].getHead();
    }
    this.getTail = function (num) {
        return this.content[num].getTail();
    }
    /**********************/
    while (number--) {
        this.content.push(new queen());
    }

}

