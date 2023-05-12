import React, { useEffect, useState } from 'react'
import { Card, NouvelUtilisateurForms } from '../../../components'
import { PageTitle } from '../../../components/commons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { create_admin, isEmpty, validation_create_admin } from '../../../libs'

const NouvelUtilisateur = () => {
    const [inputs, setInputs] = useState({ phone: "", password: "", vip: false, name: "", email: "", town: "", role: "admin" })
    const { errors, users, user_added } = useSelector(state => state?.user)
    const [file, setFile] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [clickSubmit, setClickSubmit] = useState(false)
    const [err, setErr] = useState(null)

    useEffect(() => {
        if (user_added && isEmpty(errors) && isEmpty(err)) {
            const swalWithBootstrapButtons = Swal.mixin({ customClass: { confirmButton: 'btn btn-success', cancelButton: 'btn btn-danger' }, buttonsStyling: false })
            setClickSubmit(false)
            swalWithBootstrapButtons.fire({
                title: 'Compte client créer',
                text: "Compte client créer avec succès!",
                icon: 'success',
                confirmButtonText: 'Oui',
            }).then((result) => {
                setClickSubmit(false)

                if (result.isConfirmed) {
                    navigate("/administrateurs/profile-administrateur/" + user_added?._id)
                }
            })

            dispatch({ type: "_clear_user_added_variable" })
        }
    }, [clickSubmit, user_added, err, errors, navigate, dispatch])


    const handleSave = (e) => {
        e.preventDefault()

        // recuperer les erreurs du control des champs
        const { init_error, error } = validation_create_admin(inputs, users)
        setErr(init_error)

        if (init_error.phone !== error.phone ||
            init_error.password !== error.password ||
            init_error.email !== error.email ||
            init_error.name !== error.name
        ) setErr(error)
        else {
            const blob = new FormData()
            let filename = ""
            if (file) {
                filename = file?.filename
                blob.append('file', file);
            }

            inputs.admin = true
            inputs.dashboard = true
            if (file) inputs.image = filename;
            if (file) dispatch(create_admin(inputs, blob))
            else dispatch(create_admin(inputs))
            setClickSubmit(true)
        }
    }

    return (
        <div>
            <Card>
                <PageTitle title={"Ajouter un nouveau client"} linked={false} hideExporte={true} buttonText={"Enregistrer"} handleSave={handleSave} />
                <NouvelUtilisateurForms err={err} inputs={inputs} setInputs={setInputs} file={file} setFile={setFile} />
                <PageTitle hideTitle={true} linked={false} hideExporte={true} buttonText={"Enregistrer"} handleSave={handleSave} />
            </Card>
        </div>
    )
}

export default NouvelUtilisateur

