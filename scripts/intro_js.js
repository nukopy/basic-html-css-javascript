let a = 3, b = 5;
let c = a * b;
let points = [1, 5, 3, 6, 8, 2];
let names = ['tanaka', 'suzuki', 'kato', 'sato'];
console.log(names[2]);
for (name of names) {
    console.log(name);
}

// function
function init() {
    let a = 3, b = 3, c = 5;
    let x = (a === b);  // 比較演算子:=== はデータ型まで比較できる。（==ではデータ型は見てくれない）
    let y = (a !== b);
    let z = (a < b);
    let p = (a > b);
    let q = (a <= b);
    let r = (a >= b);
    let string = `x = ${x}, y = ${y}, z = ${z}`;
    document.getElementById('info').textContent = string;
    console.log(string);
    // window.alert('kkk');
}

function checkEven() {
    let v = document.getElementById('number').value;
    let r = document.getElementById('judge');
    if (isNaN(v)) {
        r.textContent = `${v} は数字ではありません`;
    } else {
        let eo = (v%2 === 0) ? '偶数': '奇数';  // even or odd
        r.textContent = `${v} は${eo}です`;
    }
}

// function literal
let sum = function() {
    let v = document.getElementById('num').value || 50;
    let s = 0;
    for (var i = 1; i <= v; i++) {
        s += i;
    }
    let str = `1 から ${v} までの合計は ${s} です`
    document.getElementById('sum').textContent = str;
}

// switch keydown
// arrow function
let keyManipulate = (e) => {
    let s = '';
    switch (e.keyCode) {
        case 37:
            s = '左';
            break;
        case 38:
            s = '上';
            break;
        case 39:
            s = '右';
            break;
        case 40:
            s = '下';
            break;
        default:
            s = 'それ以外';
            break;
    }
    str = `あなたが押した矢印キー：${s}`;
    document.getElementById('key').textContent = str;
}
window.addEventListener('keydown', keyManipulate);

// debug
let c2f = (c) => {
    let f = (9 / 5) * c + 32;
    return Math.floor(f);
}

let convert = () => {
    let c = document.getElementById('celsius').value;
    let f = c2f(c);
    var str = `摂氏：${c}度 華氏：${f}度`;
    document.getElementById('result').textContent = str;
}

// manipulate DOM
let insertItem = () => {
    let list = document.getElementById('list');
    let item = document.createElement('li');
    item.textContent = 'to do list';
    list.appendChild(item);
}
let removeItem = () => {
    let list = document.getElementById('list');
    let item = list.lastChild;  // 一番後ろにある子要素を取得
    if (item) {
        list.removeChild(item);
    }
}

// alert(document.readyState); // -> 初回 'loading'
// document.addEventListener('readystatechange', function () {
//     alert(document.readyState); // -> 2回目 'interactive'、 3回目 'complate'
// });

// dom

let target = document.getElementById('prop');
let parent = target.parentNode;
// parent.removeChild(target);  子要素の消去


// JavaScriptからstyleの指定
let colors = ['red', 'blue', 'green', 'rgb(230, 165, 30)']
let idx = 0;
let changeColor = () => {
    let ufo = document.getElementById('ufo');
    ufo.style.color = colors[idx];
    idx++;
    if (idx > colors.length - 1) {
        idx = 0;
    }
}

// ○×ゲーム
let title = document.getElementById('maru_batsu');
let marubatsu_idx = 1;
let clickMe = (e) => {
    // 奇数回目：丸、偶数回目：ばつ
    e.textContent = (marubatsu_idx%2 != 0) ? '○': '×';
    marubatsu_idx++;
}
// create table
let table = document.createElement('table');
table.style.border = 3;

let tr_num = td_num = 3;

for (let i = 0; i < tr_num; i++) {
    let tr = document.createElement('tr');
    // add tr to 3 td
    for (let j = 0; j < td_num; j++) {
        let td = document.createElement('td');
        td.className = 'cell';  // class名の追加
        td.setAttribute('onclick', 'clickMe(this)');  // クリックされた時
        tr.appendChild(td);
    }
    // add table to tr
    table.appendChild(tr);
}
table.setAttribute('border', 10)
title.parentNode.insertBefore(table, title.nextElementSibling);

// object
let ufo;
let init_x = init_y = 0;
let xy_plane = document.getElementById('xy-plane');

function init2(x0 = init_x, y0 = init_y) {
    // key操作（イベントkeydown）が行われた時に、自作関数moveが実行される.
    // moveにはイベントkeydownが引数として渡される。
    window.addEventListener('keydown', move);
    ufo = new UFO(document.getElementById('ufo2'), x0, y0);  // 0はUFOの初期位置
    ufo.elem.style.left = x0;
    ufo.elem.style.top = y0;
    xy_plane.textContent = `(${x0}, ${y0})`
}

// moveが実行された時
let caution = document.getElementById('caution');

function move(e) {
    if (e.keyCode === 37) {
        ufo.moveLeft();
        caution.style.color = 'blue';
        caution.textContent = '正常'
    } else if (e.keyCode === 39) {
        ufo.moveRight();
        caution.style.color = 'blue';
        caution.textContent = '正常'
    } else {
        caution.style.color = 'red';
        caution.textContent = '上下には動きません。左右矢印キーを操作してください。';
    }
}


// function でオブジェクトを作成している(ES5以前)
function UFO(_elem, _xpos, _ypos) {
    // property
    this.elem = _elem;
    this.xpos = _xpos;
    this.ypos = _ypos;
    // method
    this.moveLeft = () => {
        this.xpos -= 10;
        this.elem.style.left = this.xpos + 'px';
        xy_plane.textContent = `(${this.xpos}, ${this.ypos})`;
    }
    this.moveRight = () => {
        this.xpos += 10;
        this.elem.style.left = this.xpos + 'px';
        xy_plane.textContent = `(${this.xpos}, ${this.ypos})`;
    }
}

// class でオブジェクトを作成する(ES6以降)
// class UFO_es6 {
//     constructor(_elem, _xpos) {
//         this.elem = _elem;
//         this.xpos = _xpos;
//     }
//
//     // method
//     moveLeft() {
//         this.xpos -= 10;
//         this.elem.style.left = this.xpos + 'px';
//     }
//     moveRight() {
//         this.xpos += 10;
//         this.elem.style.left = this.xpos + 'px';
//     }
// }
//
