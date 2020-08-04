import React, { useEffect, useState } from 'react';
import {getRandomInt} from '../utils';

export default function MyTournament({ tipo, numGioc, battles, tracks, pref }) {
    //in base al tipo crea il torneo...
    //il numero di preferite è la lunghezza di pref
    //il numero di battaglie è dato dal tipo
    //il numero di gare è dato dal tipo
    const [myTournament, setMyTournament] = useState(null);

    useEffect(() => {
        const numPref = pref.length;
        const numBattles = (tipo === 'small') ? 2 : ((tipo === 'medium') ? 3 : 4);
        const numTracks = (tipo === 'small') ? 3 : ((tipo === 'medium') ? 6 : 9);
        let temp = numPref + numBattles + numTracks;
        let tempBattles = [...battles];
        let tempTracks = [...tracks];
        setMyTournament(Array(temp).fill(null).map((el, i) => {
            
            if (i === 0){
                let intBattle = getRandomInt(0, tempBattles.length);
                let choice = tempBattles[intBattle];
                tempBattles.splice(intBattle,1);
                return { index: i+1, num: intBattle, choice: choice, type: 'battle', state: 'uncomplete', points: Array(numGioc).fill(null) };
            }
            else if (i>0 && i<=3){
                let intTrack = getRandomInt(0, tempTracks.length);
                let choice = tempTracks[intTrack];
                tempTracks.splice(intTrack,1);
                return { index: i+1, num: intTrack, choice: choice, type: 'track', state: 'uncomplete', points: Array(numGioc).fill(null) };
            }
            else if (i>3 && i<(i+numPref)){

            }
            else{
                let intBattle = getRandomInt(0, tempBattles.length);
                let choice = tempBattles[intBattle];
                tempBattles.splice(intBattle,1);
                return { index: i+1, num: intBattle, choice: choice, type: 'battle', state: 'uncomplete' };
            }
            

            
        }));


    }, [tipo, numGioc, pref, battles, tracks]);

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