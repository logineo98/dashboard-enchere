import React, { useEffect, useState } from 'react'
import { Card } from '../../../components'
import { PageTabs, PageTitle } from '../../../components/commons'
import { NouvelArticleForms, create_enchere, isEmpty, validation_create_enchere } from '../../../libs'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css';
import { deleteSeparator } from '../../../libs/js/fonctions'


const NouvelArticles = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const [date, setDate] = useState(tomorrow);
    const [files, setFiles] = useState([])
    const init = { files: [], sellerID: "", title: "", description: "", categories: [], delivery_options: { teliman: true, own: false, cost: false }, started_price: "", increase_price: "", reserve_price: "", expiration_time: "", enchere_status: "", enchere_type: "public", hostID: "" }
    const [inputs, setInputs] = useState(init)
    const [categories, setCategories] = useState([]);
    const [deliveryType, setDeliveryType] = useState({ teliman: true, own: false, cost: false })
    const [delivery, setDelivery] = useState({ deliveryPrice: "" })
    const [clickSubmit, setClickSubmit] = useState(false)
    const [checked, setChecked] = useState(false)
    const [description, setDescription] = useState("");
    const [associatedID, setAssociatedID] = useState({ label: "", value: "" })
    const dispatch = useDispatch();
    const [err, setErr] = useState(null)
    const { host } = useSelector(state => state?.user)
    const { errors, created_id } = useSelector(state => state?.enchere)
    const navigate = useNavigate()

    useEffect(() => {
        if (created_id && isEmpty(errors)) {
            const swalWithBootstrapButtons = Swal.mixin({ customClass: { confirmButton: 'btn btn-success', cancelButton: 'btn btn-danger' }, buttonsStyling: false })
            setClickSubmit(false)
            swalWithBootstrapButtons.fire({
                title: 'Article créer',
                text: "Article créer avec succès!",
                icon: 'success',
                confirmButtonText: 'Oui',
            }).then((result) => {
                if (result.isConfirmed) {
                    setClickSubmit(false)
                    navigate("/articles/details-article/" + created_id?._id)
                }
            })

            dispatch({ type: "_clear_created_id" })
        }
    }, [clickSubmit, navigate, created_id, dispatch, errors])


    const handleSave = e => {
        e.preventDefault()

        inputs.sellerID = host?._id
        inputs.categories = categories.map(categorie => categorie.value)
        inputs.expiration_time = new Date(date).toISOString()
        inputs.enchere_status = host?.vip ? "published" : "pending"
        inputs.description = description
        inputs.files = files
        inputs.delivery_options = { teliman: deliveryType.teliman, own: deliveryType.own, cost: deliveryType.cost, deliveryPrice: deliveryType.cost ? (delivery.deliveryPrice && delivery.deliveryPrice !== "") ? delivery.deliveryPrice : 0 : 0 }
        inputs.hostID = checked ? associatedID.value : host?._id

        inputs.started_price = deleteSeparator(inputs.started_price)
        inputs.increase_price = deleteSeparator(inputs.increase_price)
        inputs.reserve_price = deleteSeparator(inputs.reserve_price)

        console.log(inputs)

        // recuperer les erreurs du control des champs
        const { init_error, error } = validation_create_enchere(inputs)
        setErr(init_error)

        if (init_error.hostID !== error.hostID ||
            init_error.sellerID !== error.sellerID ||
            init_error.files !== error.files ||
            init_error.categories !== error.categories ||
            init_error.title !== error.title ||
            init_error.description !== error.description ||
            init_error.started_price !== error.started_price ||
            init_error.reserve_price !== error.reserve_price ||
            init_error.increase_price !== error.increase_price
        ) setErr(error)
        else {
            const { files, ...rest } = inputs

            if (files?.length > 0) {
                let data = new FormData()

                for (const file of files) {
                    data.append('file', file)
                }


                console.log(inputs)

                dispatch(create_enchere(data, rest))
                setClickSubmit(true)
            }
        }
    }




    return (
        <form enctype="multipart/form-data" className='nouvel-article'>
            <Card>
                <PageTitle title={"Ajouter un nouvel article"} linked={false} hideExporte={true} buttonText={"Enregistrer"} handleSave={handleSave} />
                <PageTabs />
                <NouvelArticleForms description={description} setDescription={setDescription} err={err} files={files} setFiles={setFiles} inputs={inputs} setInputs={setInputs} categories={categories} setCategories={setCategories} date={date} setDate={setDate} deliveryType={deliveryType} setDeliveryType={setDeliveryType} delivery={delivery} setDelivery={setDelivery} checked={checked} setChecked={setChecked} associatedID={associatedID} setAssociatedID={setAssociatedID} />
                <PageTitle hideTitle={true} title={""} linked={false} hideExporte={true} buttonText={"Enregistrer"} handleSave={handleSave} />
            </Card>
        </form>
    )
}

export default NouvelArticles