import React, { useEffect, useState } from 'react';
import {getRandomInt, shuffle} from '../utils';

export default function MyTournament({ tipo, numGioc, battles, tracks, players }) {
    //in base al tipo crea il torneo...
    //il numero di preferite è la lunghezza di pref
    //il numero di battaglie è dato dal tipo
    //il numero di gare è dato dal tipo
    const [myTournament, setMyTournament] = useState(null);

    useEffect(() => {
        const numPref = numGioc;
        const numBattles = (tipo === 'small') ? 2 : ((tipo === 'medium') ? 3 : 4);
        const numTracks = (tipo === 'small') ? 3 : ((tipo === 'medium') ? 6 : 9);
        let temp = numPref + numBattles + numTracks;
        let tempBattles = [...battles];
        let tempTracks = [...tracks];
        let randomPref = shuffle(players.map(pl=>{return {num: pl.favoriteTrack.id, name: pl.favoriteTrack.name, player: pl.name}}));
        

        setMyTournament(Array(temp).fill(null).map((el, i) => {
            
            if (i === 0){
                console.log("battaglia random - "+tipo);
                
                let intBattle = getRandomInt(0, tempBattles.length);
                let choice = tempBattles[intBattle];
                tempBattles.splice(intBattle,1);
                return { index: i+1, num: choice.id, name: choice.name, type: 'battle', state: 'uncomplete', points: Array(numGioc).fill(null) };
            }
            else if (i>0 && i<=3){
                console.log("gara random - "+tipo);
                let intTrack = getRandomInt(0, tempTracks.length);
                let choice = tempTracks[intTrack];
                tempTracks.splice(intTrack,1);
                return { index: i+1, num: choice.id, name: choice.name, type: 'track', state: 'uncomplete', points: Array(numGioc).fill(null) };
            }
            else if (i>3 && i<=3+numPref){
                console.log("preferita - "+tipo);
                //randomizzare le preferite
                return { index: i+1, num: choice.id, name: choice.name, type: 'track', state: 'uncomplete', points: Array(numGioc).fill(null) };
            }
            else{
                console.log("battaglia random - "+tipo);
                let intBattle = getRandomInt(0, tempBattles.length);
                let choice = tempBattles[intBattle];
                tempBattles.splice(intBattle,1);
                return { index: i+1, num: choice.id, name: choice.name, type: 'battle', state: 'uncomplete', points: Array(numGioc).fill(null) };
            }
            
        }));


    }, [players, tipo, numGioc, battles, tracks]);

    return (
        <>
            {myTournament && (
                <ul>
                    {myTournament.map((el,i)=><li key={'tm-'+i}>{el.state}</li>)}
                </ul>
            )}
        </>
    )

}