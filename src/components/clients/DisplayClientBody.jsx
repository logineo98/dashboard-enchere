import React from 'react'
import { ExpirationVerify, api_public, isEmpty } from '../../libs'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const DisplayClientBody = ({ id, user }) => {
    const { encheres } = useSelector(state => state?.enchere)

    let first = user?.facebook?.first_name ? user?.facebook?.last_name : "";
    let last = user?.facebook?.first_name ? user?.facebook?.first_name : "";
    let name = first + " " + last
    let _name = !isEmpty(name) ? name : "Pas de nom"
    let tous = encheres?.filter(enchere => enchere?.sellerID === user?._id)?.length
    let publier = encheres?.filter(enchere => enchere?.sellerID === user?._id && enchere?.enchere_status === "published")?.length
    let attente = encheres?.filter(enchere => enchere?.sellerID === user?._id && enchere?.enchere_status === "pending")?.length

    let enchere_rejetes = encheres?.filter(enchere => enchere?.sellerID === user?._id && enchere?.rejected && !ExpirationVerify(enchere?.expiration_time))?.length
    let enchere_en_cours = encheres?.filter(enchere => enchere?.sellerID === user?._id && !enchere?.rejected && !ExpirationVerify(enchere?.expiration_time))?.length
    let enchere_termines = encheres?.filter(enchere => enchere?.sellerID === user?._id && !enchere?.rejected && ExpirationVerify(enchere?.expiration_time))?.length

    return (


        <div className="article_details">
            <div className="main_content">
                <div className="article_details_left">
                    <div className="image_container">
                        {user?.facebook?.picture ?
                            <Link target={"_blank"} to={api_public + "/images/" + user?.facebook?.picture} className="main_image">
                                <img src={api_public + "/images/" + user?.facebook?.picture} alt="" />
                            </Link> :
                            <div className="main_image">
                                <img src={"assets/avatar.png"} alt="" />
                            </div>}
                    </div>
                </div>
                <div className="article_details_right" style={{ background: "black", color: "white", padding: "10px", borderRadius: "5px" }}>
                    <strong style={{ fontSize: "24px", letterSpacing: "1px", fontWeight: "300", color: "wheat" }}>{_name || user?.phone}</strong>
                    <div className="display_item">
                        <div className="item">
                            <div style={{ fontSize: "12px" }}>Contact: <strong style={{ fontSize: "14px", color: "wheat" }}> {user?.phone}</strong></div>
                        </div>
                    </div>

                    <div className="display_item">
                        <div className="item">
                            <div style={{ fontSize: "12px" }}>Email: <strong style={{ fontSize: "14px", color: "wheat" }}> {user?.email}</strong></div>
                        </div>
                    </div>

                    <div className="display_item">
                        <div className="item">
                            <div style={{ fontSize: "12px" }}>Vile:<strong style={{ fontSize: "14px", color: "wheat" }}> {user?.town}</strong></div>
                        </div>
                    </div>

                    <div className="display_item">
                        <div className="item">
                            <div style={{ fontSize: "12px" }}>Membre:   <strong style={{ fontSize: "14px", color: "wheat" }}> {user?.vip ? "VIP" : "Pas encore vip"}</strong> {user?.vip && <i className='ti ti-crown' style={{ color: "gold", fontWeight: "bold" }} />}</div>

                        </div>
                    </div>

                    {user?.vip &&
                        <div className="display_item">
                            <div className="item">
                                <div >Articles VIP</div>
                                <div style={{ textAlign: "center", color: "wheat" }}><strong>{enchere_en_cours} articles</strong></div>
                            </div>

                            <div className="item">
                                <div style={{ textAlign: "center" }}>Articles publiques</div>
                                <div style={{ textAlign: "center", color: "wheat" }}><strong>{enchere_rejetes} arcticles</strong></div>
                            </div>
                        </div>}

                    <div className="display_item" style={{ borderRadius: "5px", padding: "5px", backgroundColor: "lightgray", color: "black" }}>
                        <div className="item">
                            <div >Articles ajoutés</div>
                            <div style={{ textAlign: "center", color: "brown" }}><strong>{tous} articles</strong></div>
                        </div>

                        <div className="item">
                            <div style={{ textAlign: "center" }}>Articles publiés</div>
                            <div style={{ textAlign: "center", color: "brown" }}><strong>{publier} arcticles</strong></div>
                        </div>

                        <div className="item">
                            <div style={{ textAlign: "center" }}>Articles en attente</div>
                            <div style={{ textAlign: "center", color: "brown" }}><strong>{attente} articles</strong></div>
                        </div>
                    </div>


                    <div className="display_item">
                        <div className="item">
                            <div >Articles en cours</div>
                            <div style={{ textAlign: "center", color: "wheat" }}><strong>{enchere_en_cours} articles</strong></div>
                        </div>

                        <div className="item">
                            <div style={{ textAlign: "center" }}>Articles rejetés</div>
                            <div style={{ textAlign: "center", color: "wheat" }}><strong>{enchere_rejetes} arcticles</strong></div>
                        </div>

                        <div className="item">
                            <div style={{ textAlign: "center" }}>Articles terminés</div>
                            <div style={{ textAlign: "center", color: "wheat" }}><strong>{enchere_termines} articles</strong></div>
                        </div>
                    </div>
                </div>

            </div>

            <div style={{ marginTop: "15px", textAlign: "center", background: "lightblue", color: "black" }}>Souhaitez-vous editer ce client? <Link to={"/clients/edition-client/" + id} style={{ color: "tomato" }}>OUI</Link></div>
        </div>
    )
}

export default DisplayClientBody