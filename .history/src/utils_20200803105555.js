export class Player {
    constructor(name, favoriteTrack, battlePoints, trackPoints) {
        this.name = name;
        this.favoriteTrack = favoriteTrack;
        this.battlePoints = battlePoints;
        this.trackPoints = trackPoints;
    }
    addBattlePoints(btPoints) {
        this.battlePoints += btPoints;
    }
    addTrackPoints(tkPoints){
        this.trackPoints += tkPoints;
    }
    getTotalPoints(){
        return this.battlePoints+this.trackPoints;
    }
}
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
}