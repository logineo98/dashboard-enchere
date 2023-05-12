import React, { useEffect, useState } from 'react'
import { Card, EditCientForms } from '../../../components'
import { PageTitle } from '../../../components/commons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { getUser, isEmpty, updateUser } from '../../../libs'


const EditionClients = () => {
    const { id } = useParams()
    const [inputs, setInputs] = useState({ vip: false, password: "", email: "", town: "", membre: "particulier" })
    const { errors, user_updated, host, user } = useSelector(state => state?.user)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [clickSubmit, setClickSubmit] = useState(false)
    const [err, setErr] = useState(null)
    const [pass, setPass] = useState(false)

    useEffect(() => {
        dispatch(getUser({ id, hostID: host?._id }))
    }, [dispatch, id, host])

    //initialisation
    useEffect(() => {
        setInputs(old => {
            return {
                ...old, email: user?.email, town: user?.town, membre: user?.vip ? "vip" : "particulier"
            }
        })
    }, [user])


    useEffect(() => {
        if (user_updated && isEmpty(errors) && isEmpty(err)) {
            const swalWithBootstrapButtons = Swal.mixin({ customClass: { confirmButton: 'btn btn-success', cancelButton: 'btn btn-danger' }, buttonsStyling: false })
            setClickSubmit(false)
            swalWithBootstrapButtons.fire({
                title: 'Mise à jour',
                text: "Compte client mise à jour!",
                icon: 'success',
                confirmButtonText: 'Oui',
            }).then((result) => {
                setClickSubmit(false)

                if (result.isConfirmed) {
                    navigate("/clients")
                }
            })
            dispatch({ type: "_clear_user_updated_variable" })
        }
    }, [clickSubmit, user_updated, err, errors, navigate, dispatch])

    const handleSave = (e) => {
        e.preventDefault()

        if (inputs.email === "") setErr("Un e-mail est requis.")
        else {
            const datas = {
                id,
                hostID: host?._id,
                email: inputs.email,
                vip: inputs?.membre === "particulier" ? false : inputs.membre === "vip" ? true : false
            }
            if (inputs.password && pass) datas.password = inputs.password
            if (inputs.town) datas.town = inputs.town
            datas.dashboard = "true"

            dispatch(updateUser(datas))
            setClickSubmit(true)
        }
    }

    return (
        <div>
            <Card>
                <PageTitle title={"Ajouter un nouveau client"} linked={false} hideExporte={true} buttonText={"Enregistrer"} handleSave={handleSave} />
                <EditCientForms pass={pass} setPass={setPass} err={err} inputs={inputs} setInputs={setInputs} />
                <PageTitle hideTitle={true} linked={false} hideExporte={true} buttonText={"Enregistrer"} handleSave={handleSave} />
            </Card>
        </div>
    )
}

export default EditionClients