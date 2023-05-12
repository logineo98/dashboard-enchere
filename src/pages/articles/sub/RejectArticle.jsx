import { useNavigate, useParams } from "react-router-dom";
import { Card, DisplayArticleBody, RejectMotifs } from "../../../components";
import { PageTabs, PageTitle } from "../../../components/commons";
import { useDispatch, useSelector } from "react-redux";
import { get_enchere, isEmpty, send_notification, update_enchere_actions } from "../../../libs";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const RejectArticle = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { host, users } = useSelector(state => state?.user)
    const { enchere, errors } = useSelector(state => state?.enchere)
    const [check, setCheck] = useState({ title: false, description: false, categories: false, started_price: false, increase_price: false, medias: false, reserve_price: false })
    const [msg, setMsg] = useState({ title: "", description: "", categories: "", started_price: "", increase_price: "", medias: "", reserve_price: "" })
    const [_msg, set_msg] = useState({ title: false, description: false, categories: false, started_price: false, increase_price: false, medias: false, reserve_price: false })
    const [clickSubmit, setClickSubmit] = useState(false)

    useEffect(() => {
        dispatch(get_enchere({ id, hostID: host?._id }))
    }, [dispatch, id, host])

    useEffect(() => {
        setCheck({ title: enchere?.reject_motif?.title, description: enchere?.reject_motif?.description, categories: enchere?.reject_motif?.categories, started_price: enchere?.reject_motif?.started_price, increase_price: enchere?.reject_motif?.increase_price, medias: enchere?.reject_motif?.medias, reserve_price: enchere?.reject_motif?.reserve_price })
    }, [enchere])


    useEffect(() => {
        if (isEmpty(errors) && clickSubmit) {
            const swalWithBootstrapButtons = Swal.mixin({ customClass: { confirmButton: 'btn btn-success', cancelButton: 'btn btn-danger' }, buttonsStyling: false, confirmButtonText: "ooook" })
            setClickSubmit(false)

            swalWithBootstrapButtons.fire({
                title: 'Rejet d\'article',
                text: `L'article ${enchere?.title} a été rejeté!`,
                icon: 'success',
                confirmButtonText: "D'accord",

            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/articles")

                    setClickSubmit(false)
                } else {
                    navigate("/articles")
                    setClickSubmit(false)
                }

                users?.forEach(user => { if (user?._id === enchere?.sellerID) dispatch(send_notification({ title: "Article rejeté", body: `Votre article ${enchere?.title} a été rejété.\nArticle: ${enchere?.title}\nPrix: ${enchere?.started_price} FCFA\nMontant d'incrementation: ${enchere?.increase_price} FCFA\n\nVerifier dans l'option mes enchères de l'option "Profile" pour les motifs du rejet.`, to: user?.notification_token, data: null })) })

            })
        }

    }, [clickSubmit, navigate, errors, dispatch, enchere, users])





    const message = {
        title: "Le titre de votre article n'est pas conforme à la politique de l'application",
        description: "Le titre de votre article n'est pas conforme à la politique de l'application",
        medias: "Certain(s) de vos medias contiennent des contenues illicites",
        started_price: "Le prix de votre article n'est pas correct",
        reserve_price: "Le prix de reservation de votre article n'est pas correct",
        increase_price: "Le prix de reservation de votre article n'est pas correct",
        categories: "Problèmes liés aux choix de categorie",
    }

    const handleSave = () => {
        const datas = {
            reject_motif: {
                title: { message: _msg?.title ? msg.title : check.title ? message.title : "" },
                description: { message: _msg?.description ? msg.description : check.description ? message.description : "" },
                medias: { message: _msg?.medias ? msg.medias : message.medias },
                started_price: { message: _msg?.started_price ? msg.started_price : check.started_price ? message.started_price : "" },
                reserve_price: { message: _msg?.reserve_price ? msg.reserve_price : check.reserve_price ? message.reserve_price : "" },
                increase_price: { message: _msg?.increase_price ? msg.increase_price : check.increase_price ? message.increase_price : "" },
                categories: { message: _msg?.categories ? msg.categories : check.categories ? message.categories : "" },
            },
            enchere_status: "rejected",
            id, hostID: host?._id
        }

        dispatch(update_enchere_actions(datas));
        setClickSubmit(true)
    }
    console.log(check)

    return (
        <div className='display-article'>

            <Card>
                <PageTitle title={"Motifs de rejet"} buttonText={"Rejeter maintenant"} linked={false} hideExporte={true} handleSave={handleSave} />
                <PageTabs />
                <RejectMotifs _msg={_msg} set_msg={set_msg} msg={msg} setMsg={setMsg} enchere={enchere} check={check} setCheck={setCheck} message={message} />
            </Card>

            <Card>
                <PageTitle title={"Details de l'article"} hideBtns={true} linked={false} hideExporte={true} link={""} />
                <PageTabs />
                <DisplayArticleBody />
            </Card>


        </div>
    )
}

export default RejectArticle;