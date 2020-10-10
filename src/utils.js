export class Player {
    constructor(name, favoriteTrack, battlePoints, trackPoints) {
        this.name = name;
        this.favoriteTrack = favoriteTrack; //{id:...,name:...}
        this.battlePoints = battlePoints;
        this.trackPoints = trackPoints;
    }
    addBattlePoints(btPoints) {
        this.battlePoints += btPoints;
    }
    addTrackPoints(tkPoints) {
        this.trackPoints += tkPoints;
    }
    getTotalPoints() {
        return this.battlePoints + this.trackPoints;
    }
}
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
}

export function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function getWinner(players){
    let tempWinners = [];
    let tempPts = Number.POSITIVE_INFINITY;
    players.forEach(pl => {
        let plTot = pl.getTotalPoints();
        if (plTot < tempPts) {
            tempPts = pl.getTotalPoints();
            tempWinners = [pl.name];
        } else if (plTot === tempPts) {
            tempWinners.push(pl.name);
        }
    });
    if (tempWinners.length > 1) {
        let winners = "";
        tempWinners.forEach(w => winners += (w + " "));
        return "Torneo concluso in parità, i vincitori sono: ;" + winners;
    } else {
        return "Vince il torneo: ;" + tempWinners[0];
    }
};
export function getBtWinner(players){
    let tempWinners = [];
    let tempPts = Number.POSITIVE_INFINITY;
    players.forEach(pl => {
        let plTot = pl.battlePoints;
        if (plTot < tempPts) {
            tempPts = pl.battlePoints;
            tempWinners = [pl.name];
        } else if (plTot === tempPts) {
            tempWinners.push(pl.name);
        }
    });
    if (tempWinners.length > 1) {
        let winners = "";
        tempWinners.forEach(w => winners += (w + " "));
        return "Premio battaglia in parità, i vincitori sono: ;" + winners;
    } else {
        return "Vince il premio battaglia: ;" + tempWinners[0];
    }
};
export function getTrWinner(players){
    let tempWinners = [];
    let tempPts = Number.POSITIVE_INFINITY;
    players.forEach(pl => {
        let plTot = pl.trackPoints;
        if (plTot < tempPts) {
            tempPts = pl.trackPoints;
            tempWinners = [pl.name];
        } else if (plTot === tempPts) {
            tempWinners.push(pl.name);
        }
    });
    if (tempWinners.length > 1) {
        let winners = "";
        tempWinners.forEach(w => winners += (w + " "));
        return "Premio gara in parità, i vincitori sono: ;" + winners;
    } else {
        return "Vince il premio gara: ;" + tempWinners[0];
    }
};