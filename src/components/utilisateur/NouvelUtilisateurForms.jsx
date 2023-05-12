import React from 'react'
import { handleChange, isEmpty } from '../../libs'

const NouvelUtilisateurForms = ({ err, inputs, setInputs, file, setFile }) => {

    console.log(err)

    return (

        <div className='new-user'>
            <div className="card">
                <div class="container">

                    <div>
                        <div class="form first">
                            <div class="details-personal">

                                <div className="ligne xs">
                                    <div class="w-100 fx ">
                                        <label htmlFor='file' class="input-field brs"><img src={file ? URL.createObjectURL(file) : "/assets/avatar.png"} alt="" style={{ width: "250px", height: "250px", objectFit: "contain" }} /> </label>
                                    </div>
                                    <input type="file" name="file" id="file" hidden onChange={e => setFile(e.target.files[0])} />
                                </div>

                                <div className="ligne xs">
                                    <div className="col-4">
                                        <label>Nom complet<span className='red'>*</span></label>
                                        <input type="text" className='w-100 input' name='name' value={inputs.name} onChange={e => handleChange(e, setInputs)} />
                                        {!isEmpty(err) && !isEmpty(err.name) && <span style={{ color: "red", fontStyle: "italic", fontSize: 10 }}>{err.name}</span>}
                                    </div>
                                    <div className="col-4">
                                        <label>Téléphone<span className='red'>*</span></label>
                                        <input type="text" className='w-100 input' name='phone' value={inputs.phone} onChange={e => handleChange(e, setInputs)} />
                                        {!isEmpty(err) && !isEmpty(err.phone) && <span style={{ color: "red", fontStyle: "italic", fontSize: 10 }}>{err.phone}</span>}

                                    </div>
                                    <div className="col-4">
                                        <label>Email<span className='red'>*</span></label>
                                        <input type="text" className='w-100 input' name='email' value={inputs.email} onChange={e => handleChange(e, setInputs)} />
                                        {!isEmpty(err) && !isEmpty(err.email) && <span style={{ color: "red", fontStyle: "italic", fontSize: 10 }}>{err.email}</span>}

                                    </div>
                                </div>

                                <div className="ligne xs">
                                    <div className="col-4">
                                        <label>Password<span className='red'>*</span></label>
                                        <input type="text" className='w-100 input' name='password' value={inputs.password} onChange={e => handleChange(e, setInputs)} />
                                        {!isEmpty(err) && !isEmpty(err.password) && <span style={{ color: "red", fontStyle: "italic", fontSize: 10 }}>{err.password}</span>}
                                    </div>

                                    <div className="col-4">
                                        <label>Ville</label>
                                        <input type="text" className='w-100 input' name='town' value={inputs.town} onChange={e => handleChange(e, setInputs)} />
                                    </div>

                                    <div className="col-4 fc">
                                        <label>Status<span className='red'>*</span></label>
                                        <select className='w-100 input' name='role' value={inputs.role} onChange={e => handleChange(e, setInputs)}>
                                            <option value={"admin"}>Administrateur</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default NouvelUtilisateurForms