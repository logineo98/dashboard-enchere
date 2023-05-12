import React from 'react'
import { handleChange, handleChangeCheck } from '../../libs/js/fonctions'

const RejectMotifs = ({ message, _msg, msg, set_msg, setMsg, check, setCheck }) => {

    return (
        <div className='rejected'>
            <div className="check_item" >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <label htmlFor="title">Titre de l'article</label>
                    <input type="checkbox" name="title" id="title" value={check.title} onChange={e => handleChangeCheck(e, setCheck)} />
                </div>
                {check.title && !_msg.title && <div>{message.title}</div>}
                <div className='question'>Souhaitez-vous envoyé un message personnalisé?  <strong style={{ cursor: "pointer" }} onClick={(e) => set_msg(old => { return { ...old, title: !_msg.title } })}>OUI</strong></div>
                {_msg?.title && <textarea className='message_input' name="title" id="" cols="30" rows="4" value={msg.title} onChange={e => handleChange(e, setMsg)}></textarea>}
            </div>

            <div className="check_item"  >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <label htmlFor="Description">Description de l'article</label>
                    <input type="checkbox" name="description" id="Description" value={check.description} onChange={e => handleChangeCheck(e, setCheck)} />
                </div>
                {check.description && !_msg.description && <div>{message.description}</div>}
                <div className='question'>Souhaitez-vous envoyé un message personnalisé?  <strong style={{ cursor: "pointer" }} onClick={(e) => set_msg(old => { return { ...old, description: !_msg.description } })}>OUI</strong></div>
                {_msg?.description && <textarea className='message_input' name="description" id="" cols="30" rows="4" value={msg.description} onChange={e => handleChange(e, setMsg)}></textarea>}
            </div>

            <div className="check_item" >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <label htmlFor="Categories">Categories de l'article</label>
                    <input type="checkbox" name="categories" id="Categories" value={check.categories} onChange={e => handleChangeCheck(e, setCheck)} />
                </div>
                {check.categories && !_msg.categories && <div>{message.categories}</div>}
                <div className='question'>Souhaitez-vous envoyé un message personnalisé?  <strong style={{ cursor: "pointer" }} onClick={(e) => set_msg(old => { return { ...old, categories: !_msg.categories } })}>OUI</strong></div>
                {_msg?.categories && <textarea className='message_input' name="categories" id="" cols="30" rows="4" value={msg?.categories} onChange={e => handleChange(e, setMsg)}></textarea>}
            </div>

            <div className="check_item" >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <label htmlFor="Medias">Medias de l'article</label>
                    <input type="checkbox" name="medias" id="Medias" value={check.medias} onChange={e => handleChangeCheck(e, setCheck)} />
                </div>
                {check.medias && !_msg.medias && <div>{message.medias}</div>}
                <div className='question'>Souhaitez-vous envoyé un message personnalisé?  <strong style={{ cursor: "pointer" }} onClick={(e) => set_msg(old => { return { ...old, medias: !_msg.medias } })}>OUI</strong></div>
                {_msg?.medias && <textarea className='message_input' name="medias" id="" cols="30" rows="4" value={msg?.medias} onChange={e => handleChange(e, setMsg)}></textarea>}
            </div>

            <div className="check_item" >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <label htmlFor="Prix">Prix de l'article</label>
                    <input type="checkbox" name="started_price" id="Prix" value={check.started_price} onChange={e => handleChangeCheck(e, setCheck)} />
                </div>
                {check.started_price && !_msg.started_price && <div>{message.started_price}</div>}
                <div className='question'>Souhaitez-vous envoyé un message personnalisé?  <strong style={{ cursor: "pointer" }} onClick={(e) => set_msg(old => { return { ...old, started_price: !_msg.started_price } })}>OUI</strong></div>
                {_msg?.started_price && <textarea className='message_input' name="started_price" id="" cols="30" rows="4" value={msg?.started_price} onChange={e => handleChange(e, setMsg)}></textarea>}
            </div>

            <div className="check_item" >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <label htmlFor="incrementation">Montant d'incrementation</label>
                    <input type="checkbox" name="increase_price" id="incrementation" value={check.increase_price} onChange={e => handleChangeCheck(e, setCheck)} />
                </div>
                {check.increase_price && !_msg.increase_price && <div>{message.increase_price}</div>}
                <div className='question'>Souhaitez-vous envoyé un message personnalisé?  <strong style={{ cursor: "pointer" }} onClick={(e) => set_msg(old => { return { ...old, increase_price: !_msg.increase_price } })}>OUI</strong></div>
                {_msg?.increase_price && <textarea className='message_input' name="increase_price" id="" cols="30" rows="4" value={msg?.increase_price} onChange={e => handleChange(e, setMsg)}></textarea>}
            </div>

            <div className="check_item" >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <label htmlFor="reservation">Prix de reservation</label>
                    <input type="checkbox" name="reserve_price" id="reservation" value={check.reserve_price} onChange={e => handleChangeCheck(e, setCheck)} />
                </div>
                {check.reserve_price && !_msg.reserve_price && <div>{message.reserve_price}</div>}
                <div className='question'>Souhaitez-vous envoyé un message personnalisé?  <strong style={{ cursor: "pointer" }} onClick={(e) => set_msg(old => { return { ...old, reserve_price: !_msg.reserve_price } })}>OUI</strong></div>
                {_msg?.reserve_price && <textarea className='message_input' name="reserve_price" id="" cols="30" rows="4" value={msg?.reserve_price} onChange={e => handleChange(e, setMsg)}></textarea>}
            </div>
        </div>
    )
}

export default RejectMotifs