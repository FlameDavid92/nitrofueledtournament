import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function MyModal({clicksModal, text, title }) {
    const divModale = document.getElementById('divModale');
    const [opened, setOpened] = useState(false);
    const closeModal = () => {
        setOpened(false);
    }

    useEffect(() => {
        clicksModal && setOpened(true);
    }, [clicksModal]);

    return createPortal(
        <>
            {opened && (
                <div className="containermodale">
                    <div className="shadow modale">
                            <div className="row justify-content-between m-0 p-1">
                                <div className="h3 text-uppercase">{title}</div>
                                <button onClick={closeModal} className="btn btn-sm btn-danger rounded p-1 h-50">X</button>
                            </div>
                            <hr className="separator m-0"></hr>
                            <div className="row modal-children w-100 m-0">
                                { text.split(';').map(i => <div key={'t'+i} className="col-12"><span>{i}</span></div>) }
                            </div>
                        </div>
                </div>
            )}
        </>, divModale
    )
}