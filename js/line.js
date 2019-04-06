class Line {
    constructor(width, color){
        this.width = width;
        this.color = color;
        this.points = [];
        this.drawPointer = 0;
    }

    push(pos){
        if(this.points.length > 0){
            let last = this.points[this.points.length - 1];
            if(last.x == pos.x && last.y == pos.y) return; //No add for duplicates.
        }
        this.points.push(pos);
    }
}
