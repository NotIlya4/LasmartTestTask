import Konva from "konva";

export class KonvaProvider {
    private _stage: Konva.Stage;
    private _pointsLayer: Konva.Layer = new Konva.Layer();
    private _gridLayer: Konva.Layer = new Konva.Layer();

    constructor(konvaContainer: HTMLDivElement) {
        this._stage = new Konva.Stage({
            container: konvaContainer
        })
        this._stage.add(this._gridLayer);
        this._stage.add(this._pointsLayer);
    }

    public get stage() {
        return this._stage;
    }

    public get pointsLayer() {
        return this._pointsLayer;
    }

    public get gridLayer() {
        return this._gridLayer;
    }
}