import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { api_public, getUser } from '../../libs'
import { useEffect } from 'react'

const ProfileDisplay = () => {
    const { id } = useParams()
    const dispatch = useDispatch();
    const { host, user } = useSelector(state => state?.user)
    console.log(user)
    useEffect(() => {
        dispatch(getUser({ id, hostID: host?._id }))
    }, [dispatch, id, host])


    return (
        <div className='medias' >
            <div className="card">
                <div className="profile">

                    <div className="ligne xs ">
                        <div className="col-4">
                            <section class="userProfile card">
                                {user?.image ? <Link target='_blank' to={api_public + "/images/" + user?.image} class="profile">
                                    <figure><img src={user?.image ? api_public + "/images/" + user?.image : "/assets/avatar.png"} alt="profile" width="250px" height="250px" /></figure>
                                </Link> :
                                    <div class="profile">
                                        <figure><img src={user?.image ? api_public + "/images/" + user?.image : "/assets/avatar.png"} alt="profile" width="250px" height="250px" /></figure>
                                    </div>
                                }
                            </section>
                        </div>

                        <div className="col-8">
                            <section class="timeline_about ">
                                <div class="contact_Info">
                                    <h1 class="heading">Information</h1>
                                    <ul>
                                        <li class="phone fx-w">
                                            <h3 class="label">Nom:</h3>
                                            <span class="info">{user?.name}</span>
                                        </li>

                                        <li class="address fx-w">
                                            <h3 class="label">Téléphone:</h3>
                                            <span class="info">{user?.phone}</span>
                                        </li>

                                        <li class="email fx-w">
                                            <h3 class="label">E-mail:</h3>
                                            <span class="info">{user?.email}</span>
                                        </li>

                                    </ul>
                                </div>

                                <div class="basic_info">
                                    <h1 class="heading">Information Basiques</h1>
                                    <ul>
                                        <li class="birthday fx-w">
                                            <h3 class="label">Status</h3>
                                            <span class="info">{user?.admin ? "Admin" : ""}</span>
                                        </li>

                                        <li class="sex fx-w">
                                            <h3 class="label">Ville:</h3>
                                            <span class="info">{user?.town}</span>
                                        </li>
                                    </ul>
                                </div>


                                {host?._id === id && <div
                                    className="want-editer-user"
                                    style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "15px", }}>
                                    <span>
                                        Souhaitez-vous modifier vos informations?{" "}
                                        <Link to={"/administrateurs/edition-administrateur/" + user?._id} style={{ color: "darkblue" }}>
                                            OUI!
                                        </Link>
                                    </span>
                                </div>}
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProfileDisplay