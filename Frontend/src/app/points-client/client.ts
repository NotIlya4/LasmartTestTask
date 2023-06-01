import {Point} from "../models/point";
import * as $ from "jquery";
import {PointBackend} from "../misc/point-backend";
import {BackendModelMapper} from "../misc/backend-model-mapper";

export class PointsClient {
    private baseUrl: string = 'http://localhost:5000/api/points'

    constructor(private mapper: BackendModelMapper) {

    }

    public async getPoints(): Promise<Point[]> {
        const response: PointBackend[] = await $.ajax({
            method: 'GET',
            url: this.baseUrl
        });
        return this.mapper.MapBackendPoints(response);
    }

    public async removePoint(pointId: number): Promise<void> {
        await $.ajax({
            method: 'DELETE',
            url: `${this.baseUrl}/id/${pointId}`
        })
    }

    public async updatePointPosition(id: number, x: number, y: number): Promise<void> {
        await $.ajax({
            method: 'POST',
            url: `${this.baseUrl}/position`,
            contentType: 'application/json',
            data: JSON.stringify({
                pointId: id,
                x: x,
                y: y
            })
        });
    }
}

