import React, { useEffect, useState } from 'react'
import { Card, EditArticleForms } from '../../../components'
import { PageTabs, PageTitle } from '../../../components/commons'
import { get_enchere, isEmpty, update_enchere, validation_create_enchere } from '../../../libs'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'
import 'react-datepicker/dist/react-datepicker.css';
import { deleteSeparator } from '../../../libs/js/fonctions'


const EditionArticles = () => {
    const { id } = useParams()
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const [date, setDate] = useState(tomorrow);
    const [files, setFiles] = useState([])
    const init = { files: [], sellerID: "", title: "", description: "", categories: [], delivery_options: { teliman: true, own: false, cost: false }, started_price: "", increase_price: "", reserve_price: "", expiration_time: "", enchere_status: "", enchere_type: "", hostID: "" }
    const [inputs, setInputs] = useState(init)
    const [categories, setCategories] = useState([]);
    const [description, setDescription] = useState("");
    const [deliveryType, setDeliveryType] = useState({ teliman: true, own: false, cost: false })
    const [delivery, setDelivery] = useState({ deliveryPrice: "" })
    const [clickSubmit, setClickSubmit] = useState(false)
    const [checked, setChecked] = useState(false)
    const [associatedID, setAssociatedID] = useState({ label: "", value: "" })


    const dispatch = useDispatch();
    const [err, setErr] = useState(null)
    const { host } = useSelector(state => state?.user)
    const { enchere, errors } = useSelector(state => state?.enchere)
    const navigate = useNavigate()


    useEffect(() => {
        if (isEmpty(errors) && clickSubmit) {
            const swalWithBootstrapButtons = Swal.mixin({ customClass: { confirmButton: 'btn btn-success', cancelButton: 'btn btn-danger' }, buttonsStyling: false, confirmButtonText: "ooook" })
            setClickSubmit(false)

            swalWithBootstrapButtons.fire({
                title: 'Article mise à jour',
                text: "Votre article a été mise à jour!",
                icon: 'success',
                confirmButtonText: "D'accord",

            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/articles/details-article/" + id)
                    setClickSubmit(false)
                } else {
                    navigate("/articles/details-article/" + id)
                    setClickSubmit(false)
                }
            })
        }

    }, [clickSubmit, navigate, errors, id])

    useEffect(() => {
        dispatch(get_enchere({ id, hostID: host?._id }))
    }, [host, dispatch, id])

    //initialisation
    useEffect(() => {
        setFiles(enchere?.medias)
        setInputs({
            title: enchere?.title,
            description: enchere?.description,
            started_price: enchere?.started_price?.toString(),
            reserve_price: enchere?.reserve_price?.toString(),
            increase_price: enchere?.increase_price?.toString(),
            enchere_type: enchere?.enchere_type
        })
        setDate(Date.parse(enchere?.expiration_time))
        setDeliveryType(enchere?.delivery_options)
        setDelivery({ deliveryPrice: enchere?.delivery_options?.deliveryPrice?.toString() })
        setDescription(enchere?.description)
        const cate = []
        enchere?.categories?.forEach(cat => {
            cate.push({ value: cat, label: cat })
        });
        setCategories(cate)
    }, [enchere])


    console.log(err)

    const handleSave = e => {
        e.preventDefault()

        inputs.hostID = host?._id
        inputs.categories = categories.map(categorie => categorie.value)
        inputs.expiration_time = new Date(date).toISOString()
        inputs.enchere_type = host?.vip ? inputs.enchere_type : "public"
        inputs.enchere_status = host?.vip ? "published" : "pending"
        inputs.files = files
        inputs.delivery_options = { teliman: deliveryType.teliman, own: deliveryType.own, deliveryPrice: deliveryType.cost ? (delivery.deliveryPrice && delivery.deliveryPrice !== "") ? deleteSeparator(delivery.deliveryPrice) : 0 : 0 }
        inputs.started_price = deleteSeparator(inputs.started_price)
        inputs.increase_price = deleteSeparator(inputs.increase_price)
        inputs.reserve_price = deleteSeparator(inputs.reserve_price)


        if (associatedID?.value !== "" && checked) inputs.hostID = associatedID?.value
        if (isEmpty(categories)) inputs.categories = enchere?.categories

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
        )
            setErr(error);
        else {
            const { files, ...rest } = inputs

            if (files?.length > 0) {
                let list_new_img = new FormData()
                let old_img = []

                for (const file of files) {
                    if (typeof file !== "string") list_new_img.append('file', file)
                    else old_img.push(file)
                }

                dispatch(update_enchere(id, host?._id, list_new_img, { ...rest, old_img }))
                setClickSubmit(true)
            }
        }
    }

    return (
        <div className='nouvel-article'>
            <Card>
                <PageTitle title={"Edition de l'article"} linked={false} hideExporte={true} buttonText={"Enregistrer les modifications"} handleSave={handleSave} />
                <PageTabs />
                <EditArticleForms description={description} setDescription={setDescription} err={err} files={files} setFiles={setFiles} inputs={inputs} setInputs={setInputs} categories={categories} setCategories={setCategories} date={date} setDate={setDate} deliveryType={deliveryType} setDeliveryType={setDeliveryType} delivery={delivery} setDelivery={setDelivery} checked={checked} setChecked={setChecked} associatedID={associatedID} setAssociatedID={setAssociatedID} />
                <PageTitle hideTitle={true} title={""} linked={false} hideExporte={true} buttonText={"Enregistrer les modifications"} handleSave={handleSave} />
            </Card>
        </div>
    )
}

export default EditionArticles



