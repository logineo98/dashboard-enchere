import React, { useState } from 'react'
import { CategoriesArticle, api_public, handleChange, inputSeparatorMille, isEmpty } from '../../libs';
import Select from 'react-select';
import ReactModal from 'react-modal';
import JoditEditor from "jodit-react";
import { useRef } from 'react';
import ReactDatePicker from 'react-datepicker';

const EditArticleForms = ({ err, files, setFiles, inputs, setInputs, categories, setCategories, date, setDate, deliveryType, setDeliveryType, delivery, setDelivery, description, setDescription }) => {
    const [index, setIndex] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const editor = useRef(null);


    const handleFileInputChange = (e) => {

        if (files?.length > 5) {
            alert("max fichiers 5.");
        } else {
            setFiles([...files, ...e.target.files]);
        }
    };

    const removeFile = (index) => {
        const updatedFiles = [...files];
        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
        setIsModalOpen(false)
    };

    const replaceFile = (index, e) => {
        const updatedFiles = [...files];
        updatedFiles[index] = e.target.files[0];
        setFiles(updatedFiles);
        setIsModalOpen(false)
    };

    const handleOpenModal = (i) => {
        setIsModalOpen(true)
        setIndex(i)
    }




    return (
        <div className='nouvel-article'>
            <ReactModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} shouldCloseOnOverlayClick={true} onBlur={() => setIsModalOpen(false)} style={{ content: { width: "60%", height: "40%", zIndex: 100, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', }, overlay: { background: "rgba(0,0,0,0.8)" } }} >
                <div className="modal-content">
                    <label htmlFor="replace" className='replace'>Remplacer l'image</label>
                    {files?.length > 1 && <span className='delete' onClick={(e) => removeFile(index)} >Supprimer</span>}
                    <input type="file" hidden id='replace' onChange={(e) => replaceFile(index, e)} name='Remplacer' />
                </div>
            </ReactModal>

            <div className="new_article_forms">
                <div className="new_article_form_left">
                    <div className="form-item">
                        <label htmlFor="title" className='label'>Titre article <span className='required'>*</span></label>
                        <input type="text" className='input' name='title' value={inputs.title} onChange={(e) => handleChange(e, setInputs)} />
                        {!isEmpty(err) && !isEmpty(err.title) && <span style={{ color: "red", fontStyle: "italic", fontSize: 10 }}>{err.title}</span>}
                    </div>

                    <div className="form-item">
                        <label htmlFor="title" className='label'>Catégories article <span className='required'>*</span></label>
                        <Select
                            options={CategoriesArticle}
                            isMulti
                            value={categories}
                            onChange={setCategories}
                            placeholder="Selectionnez au plus 3 catégories"
                            className='select'
                        />
                        {!isEmpty(err) && !isEmpty(err.categories) && <span style={{ color: "red", fontStyle: "italic", fontSize: 10 }}>{err.categories}</span>}
                    </div>

                    <div className="form-item">
                        <label htmlFor="title" className='label'>Prix de depart <span className='required'>*</span></label>
                        <input type="text" className='input' name='started_price' value={inputs.started_price} onChange={(e) => inputSeparatorMille(e, 'started_price', setInputs)} />
                        {!isEmpty(err) && !isEmpty(err.started_price) && <span style={{ color: "red", fontStyle: "italic", fontSize: 10 }}>{err.started_price}</span>}
                    </div>

                    <div className="form-item">
                        <label htmlFor="title" className='label'>Prix de reservation <span className='required'>*</span></label>
                        <input type="text" className='input' name='reserve_price' value={inputs.reserve_price} onChange={(e) => inputSeparatorMille(e, 'reserve_price', setInputs)} />
                        {!isEmpty(err) && !isEmpty(err.reserve_price) && <span style={{ color: "red", fontStyle: "italic", fontSize: 10 }}>{err.reserve_price}</span>}
                    </div>

                    <div className="form-item">
                        <label htmlFor="title" className='label'>Montant d'incrementation <span className='required'>*</span></label>
                        <input type="text" className='input' name='increase_price' value={inputs.increase_price} onChange={(e) => inputSeparatorMille(e, 'increase_price', setInputs)} />
                        {!isEmpty(err) && !isEmpty(err.increase_price) && <span style={{ color: "red", fontStyle: "italic", fontSize: 10 }}>{err.increase_price}</span>}
                    </div>

                    <div className="form-item">
                        <label htmlFor="title" className='label'>Delai de fin de l'enchère <span className='required'>*</span></label>
                        {/* <input type="date" className='input' value={date} onChange={(e) => setDate(e.target.value)} /> */}
                        <ReactDatePicker value={date} selected={date} onChange={date => setDate(date)} className='date' dateFormat="dd-MM-yyyy" />
                    </div>

                    <div className="form-item">
                        <label htmlFor="title" className='label'>Type d'enchère <span className='required'>*</span></label>
                        <select className='input' name='enchere_type' value={inputs.enchere_type} onChange={e => handleChange(e, setInputs)} >
                            <option value={""}>Choisir un type d'enchère</option>
                            <option value={"public"}>Publique</option>
                            <option value={"private"}>Privée</option>
                        </select>
                    </div>


                    <div className="form-item">
                        <span style={{ marginBottom: "10px" }}>Options de livraison <span className='required'>*</span></span>
                        <div className='options-livraison'>
                            <div className='livraison-item'>
                                <label htmlFor="teliman">Teliman</label>
                                <input type="checkbox" name="" id="teliman"
                                    checked={deliveryType?.teliman ? "checked" : ""}
                                    onChange={() => setDeliveryType({ teliman: true, own: false, cost: false })}
                                    style={{ textDecoration: deliveryType?.own ? "line-through" : "none", }}
                                />
                            </div>

                            <div className='livraison-item'>
                                <label htmlFor="own">A main propre</label>
                                <input type="checkbox" name="" id="own"
                                    checked={deliveryType?.own ? "checked" : ""}
                                    onChange={() => setDeliveryType(old => { return { ...old, teliman: false, own: true } })}
                                    style={{ textDecoration: deliveryType?.teliman ? "line-through" : "none" }}
                                />
                            </div>

                            {deliveryType?.own && <div className='livraison-item'>
                                <label htmlFor="cost">Avec frais</label>
                                <input type="checkbox" name="" id="cost"
                                    checked={deliveryType.cost ? "checked" : ""}
                                    onChange={() => setDeliveryType(old => { return { ...old, teliman: false, cost: !deliveryType.cost } })}
                                />
                            </div>}
                        </div>

                        {(deliveryType?.own && deliveryType.cost) &&
                            <div className="form-item">
                                <input type="text" className='input' placeholder='Prix de livraison'
                                    name='deliveryPrice'
                                    value={delivery.deliveryPrice}
                                    onChange={(e) => inputSeparatorMille(e, 'deliveryPrice', setDelivery)}
                                />
                            </div>
                        }
                    </div>




                </div>
                <div className="new_article_form_right">
                    <div className="form-item">
                        <label htmlFor="">Description</label>
                        <JoditEditor
                            ref={editor}
                            value={description}
                            placeholder="Description ici.."
                            tabIndex={1} // tabIndex of textarea
                            onChange={(newContent) => setDescription(newContent)}
                        />
                    </div>

                    <div className="image-container">
                        <label htmlFor='file' className="upload-box">
                            <div className="upload-content">
                                <i className="ti ti-upload"></i>
                                <span>Uploader des fichiers (max: 5 fichiers)</span>
                            </div>
                        </label>
                        <input type="file" multiple id='file' onChange={handleFileInputChange} style={{ display: "none" }} />
                    </div>


                    <div className="upload-items">
                        {files?.length > 0 && <div className="autre-images">
                            {files?.map((file, i) => (
                                <img src={typeof file !== "string" ? URL.createObjectURL(file) : api_public + "/images/" + file} key={file?.name} alt={file?.name} onClick={() => handleOpenModal(i)} />
                            ))}
                        </div>}
                        {!isEmpty(err) && !isEmpty(err.files) && <span style={{ color: "red", fontStyle: "italic", fontSize: 10 }}>{err.files}</span>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditArticleForms

