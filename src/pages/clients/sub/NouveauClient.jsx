import React, { useEffect, useState } from 'react'
import { Card, NouveauCientForms } from '../../../components'
import { PageTitle } from '../../../components/commons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { isEmpty, register, validation_create_client } from '../../../libs'

const NouveauClient = () => {
    const [inputs, setInputs] = useState({ phone: "", password: "", vip: false, password_confirm: "", email: "", town: "", membre: "particulier" })
    const { errors, users, user_added } = useSelector(state => state?.user)
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
                    navigate("/clients")
                }
            })

            dispatch({ type: "_clear_user_added_variable" })
        }
    }, [clickSubmit, user_added, err, errors, navigate, dispatch])


    const handleSave = (e) => {
        e.preventDefault()

        // recuperer les erreurs du control des champs
        const { init_error, error } = validation_create_client(inputs, users)
        setErr(init_error)

        if (init_error.phone !== error.phone ||
            init_error.password !== error.password ||
            init_error.password_confirm !== error.password_confirm
        ) setErr(error)
        else {
            inputs.dashboard = true

            console.log(inputs)
            inputs.vip = inputs?.membre === "particulier" ? false : inputs.membre === "vip" ? true : false
            dispatch(register(inputs))
            setClickSubmit(true)
        }
    }

    return (
        <div>
            <Card>
                <PageTitle title={"Ajouter un nouveau client"} linked={false} hideExporte={true} buttonText={"Enregistrer"} handleSave={handleSave} />
                <NouveauCientForms err={err} inputs={inputs} setInputs={setInputs} />
                <PageTitle hideTitle={true} linked={false} hideExporte={true} buttonText={"Enregistrer"} handleSave={handleSave} />
            </Card>
        </div>
    )
}

export default NouveauClient