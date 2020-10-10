import React, { useState, useRef } from 'react';

export default function InitForm({ setLoad, setTournamentName, setNumGioc, setTipo, setInitForm, setInitForm2, setAudio }) {
    const [prev, setPrev] = useState((window.localStorage.getItem("nitrofueledtournament")) !== null);
    const [fileError, setFileError] = useState(false);

    let loadFile = useRef(null);

    const inizializzaTorneo = (e) => {
        e.preventDefault();
        setTournamentName(e.target.tournamentName.value);
        setNumGioc(parseInt(e.target.numGioc.value));
        setTipo(e.target.tipo.value);
        /*window.localStorage.setItem( "nitrofueledtournament",
        JSON.stringify({
            tournamentName : e.target.tournamentName.value,
            tipo : e.target.tipo.value,
            numgioc : parseInt(e.target.numGioc.value)
        }));*/
        setInitForm(false);
        return;
    }

    const loadStorage = () => {
        setLoad(true);
        setAudio(false);
        setInitForm2(false);
        setInitForm(false);
    }

    const scegliFileTorneo = () => {
        loadFile.click();
    }

    const caricaTorneoDaFile = (e) => {
        var fr = new FileReader();
        fr.onload = function () {
            try {
                let parse = JSON.parse(fr.result);
                if(parse.tournamentName){
                    setFileError(false);
                    window.localStorage.setItem("nitrofueledtournament", JSON.stringify(parse));
                    setLoad(true);
                    setAudio(false);
                    setInitForm2(false);
                    setInitForm(false);
                    /*console.log(fr.result)*/
                }else{
                    setFileError(true);
                }
            } catch (error) {
                setFileError(true);
            }
        }
        fr.readAsText(e.target.files[0]);
    }

    return (
        <>
            <div className="row m-0 justify-content-center align-items-center h-75">
                <div className="col-12 col-md-4 p-0">
                    <form onSubmit={inizializzaTorneo}>
                        <div className="form-row text-center">
                            <div className="form-group col-12">
                                <div>
                                {fileError && <label className="my-label-error mb-4">File selezionato non corretto!</label>}
                                </div>
                                <div>
                                    <label className="my-label" htmlFor="inputState1">Torneo:</label>
                                    <input name="tournamentName" className="form-control form-control-sm mb-1" type="text" placeholder="Inserisci un nome per il torneo" required></input>
                                </div>
                                <div className="mt-2">
                                    <label className="my-label" htmlFor="inputState1">Tipologia torneo:</label>
                                    <select name="tipo" id="inputState1" className="form-control form-control-sm text-center" defaultValue="" required>
                                        <option disabled hidden value="">Scegli il tipo di torneo</option>
                                        <option value="small">Small</option>
                                        <option value="medium">Medium</option>
                                        <option value="big">Big</option>
                                    </select>
                                </div>
                                <div className="mt-2">
                                    <label className="my-label" htmlFor="inputState2">Numero giocatori:</label>
                                    <select name="numGioc" id="inputState2" className="form-control form-control-sm text-center" defaultValue="" required>
                                        <option disabled hidden value="">Scegli il numero di giocatori</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
                                <input className="btn btn-secondary mt-2" type="submit" value="Nuovo torneo" />
                                <input ref={input => loadFile = input} onChange={caricaTorneoDaFile} className="btn btn-secondary mt-2 ml-2 d-none" type="file" id="carica-torneo" accept=".txt"></input>
                                <input onClick={scegliFileTorneo} className="btn btn-secondary mt-2 ml-2" type="button" value="Carica torneo" />
                                {prev && <input onClick={loadStorage} className="btn btn-secondary mt-2" type="button" value="Torna all'ultimo torneo" />}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}