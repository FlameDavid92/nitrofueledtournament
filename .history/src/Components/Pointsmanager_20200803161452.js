import React,{useState} from 'react';

export default function PointsManager({ players, setPlayers, currentGameId, setCurrentGameId }) {
    const [endGame, setEndGame] = useState();
    const inserisciPunti = (e) => {
        e.preventDefault();
        let tempPlayers = [...players];
        tempPlayers.map((pl,i)=>{
            console.log(e.target[i].value);
            pl.trackPoints += e.target[i].value;
        });
        setPlayers(tempPlayers);
        setCurrentGameId(currentGameId + 1); //controllare se si è alla fine
        if(currentGameId>end){
            setEndGame(true);
        }
        e.target.reset();
    }
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <form onSubmit={inserisciPunti}>
                        <div className="form-row text-center">
                            <div className="form-group col-12">
                                {
                                    players.map((pl, i) => {
                                        return(
                                        <div key={"pt-pl-"+i}>
                                            <label htmlFor={"pt-pl-"+i}>Punti {pl.name}:</label>
                                            <select name="tipo" id={"pt-pl-"+i} className="form-control text-center" defaultValue="" required>
                                                <option disabled hidden value="">Inserisci il punteggio</option>
                                                {[1,2,3,4,5,6,7,8].map(el=><option value={el}>{el}</option>)}
                                            </select>
                                        </div>)
                                    })
                                }
                                <input className="btn btn-outline-primary mt-2" type="submit" value="Inserisci punti" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}