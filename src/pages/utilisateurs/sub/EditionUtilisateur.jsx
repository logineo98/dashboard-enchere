import React, { useEffect, useState } from 'react'
import { Card, EditUtilisateurForms } from '../../../components'
import { PageTitle } from '../../../components/commons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { getUser, isEmpty, update_admin, validation_update_admin } from '../../../libs'

const EditionUtilisateur = () => {
    const { id } = useParams()
    const [inputs, setInputs] = useState({ phone: "", password: "", vip: false, name: "", email: "", town: "", role: "admin" })
    const { errors, users, user_updated, host, user } = useSelector(state => state?.user)
    const [file, setFile] = useState(null)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [clickSubmit, setClickSubmit] = useState(false)
    const [err, setErr] = useState(null)
    const [pass, setPass] = useState(false)
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (user_updated && isEmpty(errors) && isEmpty(err)) {
            const swalWithBootstrapButtons = Swal.mixin({ customClass: { confirmButton: 'btn btn-success', cancelButton: 'btn btn-danger' }, buttonsStyling: false })
            setClickSubmit(false)
            swalWithBootstrapButtons.fire({
                title: 'Compte mise a jour',
                text: "Votre compte administrateur à bien été mise à jour!",
                icon: 'success',
                confirmButtonText: 'Oui',
            }).then((result) => {
                setClickSubmit(false)

                if (result.isConfirmed) {
                    navigate("/administrateurs/profile-administrateur/" + user_updated?._id)
                }
            })

            dispatch({ type: "_clear_user_updated_variable" })
        }
    }, [clickSubmit, user_updated, err, errors, navigate, dispatch])


    useEffect(() => {
        dispatch(getUser({ id, hostID: host?._id }))
    }, [dispatch, id, host])

    useEffect(() => {
        setInputs({
            phone: user?.phone,
            role: user?.admin && "admin",
            name: user?.name,
            email: user?.email,
            town: user?.town
        })
        setFile(user?.image)
    }, [user])


    const handleSave = (e) => {
        e.preventDefault()

        // recuperer les erreurs du control des champs
        const { init_error, error } = validation_update_admin(inputs, users, pass)
        setErr(init_error)

        if (init_error.phone !== error.phone ||
            init_error.password !== error.password ||
            init_error.email !== error.email ||
            init_error.name !== error.name
        ) setErr(error)
        else {
            const blob = new FormData()
            let filename = user?.image

            if (file && typeof file !== "string") {
                filename = file?.filename
                blob.append('file', file);
            }

            if (pass) inputs.password = password
            inputs.id = id
            inputs.hostID = host?._id
            inputs.admin = true
            inputs.dashboard = true
            inputs.image = filename;

            if (user?.image) inputs.old_img = user?.image
            if (typeof file !== "string")
                dispatch(update_admin(inputs, blob))
            else dispatch(update_admin(inputs))
            setClickSubmit(true)
        }
    }

    return (
        <div>
            <Card>
                <PageTitle title={"Modifier les informations de l'admin"} linked={false} hideExporte={true} buttonText={"Enregistrer les modifications"} handleSave={handleSave} />
                <EditUtilisateurForms pass={pass} setPass={setPass} password={password} setPassword={setPassword} err={err} inputs={inputs} setInputs={setInputs} file={file} setFile={setFile} />
                <PageTitle hideTitle={true} linked={false} hideExporte={true} buttonText={"Enregistrer les modifications"} handleSave={handleSave} />
            </Card>
        </div>
    )
}

export default EditionUtilisateur




