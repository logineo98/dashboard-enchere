import React from 'react'
import { Card } from '../../components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { api_public, formatNumberWithSpaces } from '../../libs';

const Dashboard = () => {
    const { users } = useSelector(state => state?.user)
    const { encheres } = useSelector(state => state?.enchere)

    const nb_article_pub = encheres?.filter(enchere => enchere?.enchere_type === "public")?.length
    const nb_article_priv = encheres?.filter(enchere => enchere?.enchere_type === "private")?.length
    const nb_clt_pub = users?.filter(user => !user?.vip && !user?.admin)?.length
    const nb_clt_priv = users?.filter(user => user?.vip && !user?.admin)?.length

    return (
        <div className="main">
            {/* <!-- ======================= Cards ================== --> */}
            <div className="cardBox card">
                <div className="card">
                    <Link to={"/articles/articles-publics"}>
                        <div className="numbers">{formatNumberWithSpaces(nb_article_pub)}</div>
                        <div className="cardName">Nombre article public</div>
                    </Link>

                    <div className="iconBx">
                        <ion-icon name="eye-outline"></ion-icon>
                    </div>
                </div>

                <div className="card">
                    <Link to={"/articles/articles-prives"}>
                        <div className="numbers">{formatNumberWithSpaces(nb_article_priv)}</div>
                        <div className="cardName">Nombre article privé</div>
                    </Link>

                    <div className="iconBx">
                        <ion-icon name="cart-outline"></ion-icon>
                    </div>
                </div>

                <div className="card">
                    <Link to={"/clients/clients-publics"}>
                        <div className="numbers">{formatNumberWithSpaces(nb_clt_pub)}</div>
                        <div className="cardName">Nombre client publique</div>
                    </Link>

                    <div className="iconBx">
                        <ion-icon name="chatbubbles-outline"></ion-icon>
                    </div>
                </div>

                <div className="card">
                    <Link to={"/clients/clients-vip"}>
                        <div className="numbers">{formatNumberWithSpaces(nb_clt_priv)}</div>
                        <div className="cardName">Nombre client privé</div>
                    </Link>

                    <div className="iconBx">
                        <ion-icon name="cash-outline"></ion-icon>
                    </div>
                </div>
            </div>

            <Card>
                <div className="details">
                    <div className="recentOrders">
                        <div className="cardHeader">
                            <h2>Articles recents</h2>
                            <Link to="/articles" className="btn">
                                Voir plus
                            </Link>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>Titre</th>
                                    <th>Prix initial</th>
                                    <th>Prix de reserve</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {encheres?.slice(0, 10)?.map((enchere) => (
                                    // <Link to={"/articles/details-article/" + enchere?._id}>
                                    <tr>
                                        <td>{enchere?.title}</td>
                                        <td>{enchere?.started_price}</td>
                                        <td>{enchere?.reserve_price}</td>
                                        <td>{enchere?.enchere_type}</td>
                                        <td>
                                            <span className={enchere?.enchere_status === "pending" ? "status pending" : enchere?.enchere_status === "livrer" && "status delivered"}>
                                                {enchere?.enchere_status}
                                            </span>
                                        </td>
                                    </tr>
                                    // </Link>
                                ))}

                                {/* <span className="status inProgress">In Progress</span>
                                        <span className="status return">Return</span> */}
                            </tbody>
                        </table>
                    </div>

                    {/* <!-- ================= New Customers ================ --> */}
                    <div className="recentCustomers">
                        <div className="cardHeader">
                            <h2>Clients recents</h2>
                        </div>

                        <table>
                            <tbody>
                                {users?.slice(0, 10)?.map((user, i) => (
                                    <tr>
                                        <td width="60px">
                                            <Link to={"/clients/details-client/" + user?._id} className="imgBx">
                                                <img src={user?.facebook?.picture ? (api_public + "/images/" + user?.facebook?.picture) : "assets/avatar.png"} alt='alt={`alt{i}`} ' />
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={"/clients/details-client/" + user?._id} className="imgBx">
                                                <h4>
                                                    {user?.facebook?.last_name || user?.phone} <br /> <span>{user?.town}</span>
                                                </h4>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default Dashboard
