import React, { useEffect, useState } from 'react';

export default function MyTournament({ tipo, battles, tracks, pref }) {
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
        setMyTournament(Array(temp).fill(null).map((el, i) => {
            return { [i]: el, state: 'uncomplete' };
        }));
        console.log(myTournament);



    }, [tipo, pref, battles, tracks]);

    return (
        <>
            {myTournament && (
                <ul>
                    {myTournament.map((el,i)=><li key={'tm-'+i}>el</li>)}
                </ul>
            )}
        </>
    )

}