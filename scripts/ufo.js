// init
let ufo3, newufo;
let new_xy_plane = document.getElementById('new-xy-plane')
let x0 = y0 = 0;
function init_ufo() {
    window.addEventListener('keydown', move_all);
    ufo3 = new UFO3(document.getElementById('ufo3'), x0, y0);
    // コンストラクタNewUFOにufoインスタンスを関連付け
    NewUFO.prototype = ufo3;
    // コンストラクタにprototypeの関連付けが終わったら、
    // NewUFOコンストラクタを用いてインスタンスを生成する
    newufo = new NewUFO();
}

function move_all(e) {
    switch (e.keyCode) {
        case 37:
            newufo.moveLeft();
            break;
        case 38:
            newufo.moveUp();
            break;
        case 39:
            newufo.moveRight();
            break;
        case 40:
            newufo.moveDown();
            break;
        default:
            console.log('無効なキーが押されました');
            break;
    }
}


// pUFO
function UFO3(_elem, _xpos, _ypos) {
    // property
    this.elem = _elem;
    this.xpos = _xpos;
    this.ypos = _ypos;

    // method
    this.moveLeft = function() {
        this.xpos -= 10;
        this.elem.style.left = this.xpos + 'px';
        new_xy_plane.textContent = `(${this.xpos}, ${this.ypos})`;
    }
    this.moveRight = function() {
        this.xpos += 10;
        this.elem.style.left = this.xpos + 'px';
        new_xy_plane.textContent = `(${this.xpos}, ${this.ypos})`;
    }
}

function NewUFO() {
    // property
    // this.ypos = _ypos;

    // method
    this.moveUp = function() {
        this.ypos -= 10;
        this.elem.style.top = this.ypos + 'px';
        new_xy_plane.textContent = `(${this.xpos}, ${this.ypos})`;
    }
    this.moveDown = function() {
        this.ypos += 10;
        this.elem.style.top = this.ypos + 'px';
        new_xy_plane.textContent = `(${this.xpos}, ${this.ypos})`;
    }
}
