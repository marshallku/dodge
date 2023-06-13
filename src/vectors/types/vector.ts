export interface Coordinate {
    x: number;
    y: number;
}

export interface Figure extends Coordinate {
    size: number;
    lineWidth: number;
    color: string;
}
