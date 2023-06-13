export interface Coordinate {
    x: number;
    y: number;
}

export interface FigureProps extends Coordinate {
    size: number;
    lineWidth: number;
    color: string;
}
