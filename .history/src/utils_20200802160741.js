export class Player {
    constructor(name, battlePoints, trackPoints) {
        this.name = name;
        this.battlePoints = battlePoints;
        this.trackPoints = trackPoints;
    }
    setName(inputName) {
        this.name = inputName;
    }
}
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
}