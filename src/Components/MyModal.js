import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './mymodal.css';

export default function MyModal({clicksModal, text }) {
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
                                <div className="h3 text-uppercase">ATTENZIONE</div>
                                <button onClick={closeModal} className="btn btn-sm btn-danger rounded p-1 h-50">X</button>
                            </div>
                            <hr className="separator m-0"></hr>
                            <div className="row modal-children w-100 m-0">
                                <p>{text}</p>
                            </div>
                        </div>
                </div>
            )}
        </>, divModale
    )
}