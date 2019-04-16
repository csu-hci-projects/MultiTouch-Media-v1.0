class Line {
    constructor(width, color, identifier=0){
        this.width = width;
        this.color = color;
        this.fid = identifier;
        this.points = [];
        this.drawPointer = 0;
        this.finished = false;
        this.hasNext = false;
    }

    push(pos){
        if(this.points.length > 0){
            let last = this.points[this.points.length - 1];
            if(last.x == pos.x && last.y == pos.y) return true; //No add for duplicates.
        }
        this.points.push(Object.assign({}, pos));
        this.hasNext = true;
        return false;
    }

    next(){
        let point = Object.assign({}, this.points[this.drawPointer]);
        this.drawPointer++;
        if(this.drawPointer == this.points.length) this.hasNext = false;
        return point;
    }
    reset(){
        this.drawPointer = 0;
        this.hasNext = this.points.length > 0;
    }
}
