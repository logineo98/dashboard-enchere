import React from 'react'
import { handleChange, isEmpty } from '../../libs'

const NouveauCientForms = ({ err, inputs, setInputs }) => {
    return (

        <div className="nouveau_client">
            <div className="nouveau_client_container">

                <div className='nouveau_client_required'>
                    <div className="form-item">
                        <label htmlFor="phone" className='label'>Numéro de téléphone <span className='required'>*</span></label>
                        <input type="text" className='input' name='phone' value={inputs.phone} onChange={(e) => handleChange(e, setInputs)} />
                        {!isEmpty(err) && !isEmpty(err.phone) && <span style={{ color: "red", fontStyle: "italic", fontSize: 10 }}>{err.phone}</span>}
                    </div>

                    <div className="form-item">
                        <label htmlFor="password" className='label'>Mot de passe <span className='required'>*</span></label>
                        <input type="text" className='input' name='password' value={inputs.password} onChange={(e) => handleChange(e, setInputs)} />
                        {!isEmpty(err) && !isEmpty(err.password) && <span style={{ color: "red", fontStyle: "italic", fontSize: 10 }}>{err.password}</span>}
                    </div>

                    <div className="form-item">
                        <label htmlFor="password_confirm" className='label'>Confirmer le mot de passe <span className='required'>*</span></label>
                        <input type="text" className='input' name='password_confirm' value={inputs.password_confirm} onChange={(e) => handleChange(e, setInputs)} />
                        {!isEmpty(err) && !isEmpty(err.password_confirm) && <span style={{ color: "red", fontStyle: "italic", fontSize: 10 }}>{err.password_confirm}</span>}
                    </div>
                </div>

                <div className='nouveau_client_facultatif'>
                    <div className="form-item">
                        <label htmlFor="email" className='label'>Adresse e-mail <span style={{ fontStyle: "italic", fontSize: "10px" }}>(optionnel)</span></label>
                        <input type="text" className='input' name='email' value={inputs.email} onChange={(e) => handleChange(e, setInputs)} />
                        {!isEmpty(err) && !isEmpty(err.email) && <span style={{ color: "red", fontStyle: "italic", fontSize: 10 }}>{err.email}</span>}
                    </div>

                    <div className="form-item">
                        <label htmlFor="town" className='label'>Ville<span style={{ fontStyle: "italic", fontSize: "10px" }}>(optionnel)</span></label>
                        <input type="text" className='input' name='town' value={inputs.town} onChange={(e) => handleChange(e, setInputs)} />
                        {!isEmpty(err) && !isEmpty(err.town) && <span style={{ color: "red", fontStyle: "italic", fontSize: 10 }}>{err.town}</span>}
                    </div>

                    <div className="form-item">
                        <label htmlFor="membre" className='label'>Membre <span style={{ fontStyle: "italic", fontSize: "10px" }}>(optionnel)</span></label>
                        <select className='input' name='membre' value={inputs.membre} onChange={e => handleChange(e, setInputs)} >
                            <option value={"particulier"}>Particulier</option>
                            <option value={"vip"}>VIP</option>
                        </select>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NouveauCientForms