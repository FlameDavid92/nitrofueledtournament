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