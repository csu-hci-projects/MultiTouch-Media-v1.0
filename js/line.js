class Line {
    constructor(width, color){
        this.width = width;
        this.color = color;
        this.points = [];
    }

    push(pos){
        if(this.points.length > 0){
            let last = this.points[this.points.length - 1];
            if(last.x == pos.x && last.y == pos.y)
                return;//Do nothing if same point as last time.
        }
        this.points.push(pos);
    }
}
