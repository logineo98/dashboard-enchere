import React, { useEffect, useState } from 'react'
import { Card, PageTableHeader } from '../../../components'
import { PageTabs, PageTitle, Table } from '../../../components/commons'
import { useDispatch, useSelector } from 'react-redux';
import { ExpirationVerify, delete_enchere, formatNumberWithSpaces, update_enchere_actions } from '../../../libs';
import { useNavigate } from 'react-router-dom';
import Countdown from 'react-countdown';

const ArticlesPrivee = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [activeTab, setActiveTab] = useState("publier");
    const [dropDown, setDropDown] = useState()
    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState("")
    const [data, setData] = useState([])
    const [rows, setRows] = useState([])

    const { host, users } = useSelector(state => state?.user);
    const { encheres } = useSelector(state => state?.enchere);

    const column = [
        { name: "No.", selector: (row, i) => i, },
        { name: "Titre", selector: (row) => row?.title || "...", sortable: true, },
        { name: "Propriétaire", selector: (row) => users?.map(user => user?._id === row?.sellerID && (user?.facebook?.first_name || user?.phone)), sortable: true, },
        { name: "Montant d'incrementation", selector: (row) => formatNumberWithSpaces(row?.increase_price) || "...", sortable: true, },
        { name: "Prix actuel", selector: (row) => formatNumberWithSpaces(row?.history[row?.history?.length - 1]?.montant) || formatNumberWithSpaces(row?.started_price), sortable: true, },
        { name: "Enchère", selector: (row) => row?.enchere_type === "private" ? "Privée" : "...", sortable: true, },
        { name: "Delai d'expiration", selector: (row) => <Countdown date={new Date(row?.expiration_time)} renderer={renderer}></Countdown>, sortable: true, }
    ]

    const tabsItems = [
        { label: "publier", size: encheres?.filter(enchere => !enchere?.trash && enchere?.enchere_status === "published" && enchere?.enchere_type === "private" && !ExpirationVerify(enchere?.expiration_time)).length || 0 },
        { label: "attente", size: encheres?.filter(enchere => !enchere?.trash && enchere?.enchere_status === "pending" && enchere?.enchere_type === "private" && !ExpirationVerify(enchere?.expiration_time)).length || 0 },
        { label: "rejetés", size: encheres?.filter(enchere => !enchere?.trash && enchere?.enchere_status === "rejected" && enchere?.enchere_type === "private" && !ExpirationVerify(enchere?.expiration_time)).length || 0 },
        { label: "terminés", size: encheres?.filter(enchere => !enchere?.trash && enchere?.enchere_type === "private" && (ExpirationVerify(enchere?.expiration_time) || enchere?.enchere_status === "closed")).length || 0 },
        { label: "corbeille", size: encheres?.filter(enchere => enchere?.trash && enchere?.enchere_type === "private").length || 0 }]

    const dropdownItems = [
        { name: "Modifier", value: "modifier", tab: "publier" }, { name: "Attente", value: "attente", tab: "publier" }, { name: "Afficher", value: "afficher", tab: "publier" }, { name: "Mettre à la corbeille", value: "in-trash", tab: "publier" },
        { name: "Modifier", value: "modifier", tab: "attente" }, { name: "Publier", value: "publier", tab: "attente" }, { name: "Afficher", value: "afficher", tab: "attente" }, { name: "Mettre à la corbeille", value: "in-trash", tab: "attente" },
        { name: "Modifier", value: "modifier", tab: "rejetés" }, { name: "Réactiver", value: "reactiver", tab: "rejetés" }, { name: "Afficher", value: "afficher", tab: "rejetés" }, { name: "Mettre à la corbeille", value: "in-trash", tab: "rejetés" },
        { name: "Supprimer", value: "supprimer", tab: "terminés" }, { name: "Vider la corbeille", value: "vider", tab: "terminés" },
        { name: "Restaurer", value: "restaurer", tab: "corbeille" }, { name: "Supprimer", value: "supprimer", tab: "corbeille" }, { name: "Vider la corbeille", value: "vider", tab: "corbeille" },
    ]

    useEffect(() => {
        if (data) setFiltered(data);
    }, [data])


    useEffect(() => {
        switch (activeTab) {
            case "publier": setData(encheres?.filter(enchere => !enchere?.trash && enchere?.enchere_status === "published" && enchere?.enchere_type === "private" && !ExpirationVerify(enchere?.expiration_time))); break;
            case "attente": setData(encheres?.filter(enchere => !enchere?.trash && enchere?.enchere_status === "pending" && enchere?.enchere_type === "private" && !ExpirationVerify(enchere?.expiration_time))); break;
            case "rejetés": setData(encheres?.filter(enchere => !enchere?.trash && enchere?.enchere_status === "rejected" && enchere?.enchere_type === "private" && !ExpirationVerify(enchere?.expiration_time))); break;
            case "terminés": setData(encheres?.filter(enchere => !enchere?.trash && enchere?.enchere_type === "private" && (ExpirationVerify(enchere?.expiration_time) || enchere?.enchere_status === "closed"))); break;
            case "corbeille": setData(encheres?.filter(enchere => enchere?.trash && enchere?.enchere_type === "private")); break;
            default: setData(encheres?.filter(enchere => !enchere?.trash && enchere?.enchere_status === "published" && enchere?.enchere_type === "private" && !ExpirationVerify(enchere?.expiration_time))); break;
        }
    }, [encheres, activeTab]);

    const handleApply = (e) => {
        e.preventDefault();

        if (rows?.length > 0) {
            switch (dropDown) {
                case "modifier": if (rows?.length === 1) navigate(`/articles/edition-article/${rows[0]}`); break;

                case "afficher": if (rows?.length === 1) navigate(`/articles/details-article/${rows[0]}`); break;

                case "publier":
                    data?.forEach((enchere) => {
                        rows?.forEach((id) => {
                            if (enchere?._id === id)
                                dispatch(update_enchere_actions({ id, hostID: host?._id, enchere_status: "published", }));
                        });
                    });
                    break;

                case "attente":
                    if (rows?.includes(host?._id)) { alert("\tErreur de d'exlusion\nVous ne pouvez pas exclure votre profile!"); return; }

                    data?.forEach((enchere) => {
                        rows?.forEach((id) => {
                            if (enchere?._id === id)
                                dispatch(update_enchere_actions({ id, hostID: host?._id, enchere_status: "pending", }));
                        });
                    });
                    break;

                case "rejected":
                    if (rows?.includes(host?._id)) { alert("\tErreur de d'exlusion\nVous ne pouvez pas exclure votre profile!"); return; }

                    data?.forEach((enchere) => {
                        rows?.forEach((id) => {
                            if (enchere?._id === id)
                                dispatch(update_enchere_actions({ id, hostID: host?._id, enchere_status: "rejected", }));
                        });
                    });
                    break;

                case "reactiver":
                    data?.forEach((enchere) => {
                        rows?.forEach((id) => {
                            if (enchere?._id === id)
                                dispatch(update_enchere_actions({ id, hostID: host?._id, enchere_status: "published", }));
                        });
                    });
                    break;

                case "closed":
                    data?.forEach((enchere) => {
                        rows?.forEach((id) => {
                            if (enchere?._id === id)
                                dispatch(update_enchere_actions({ id, hostID: host?._id, enchere_status: "closed", }));
                        });
                    });
                    break;

                case "in-trash":
                    data?.forEach((enchere) => {
                        rows?.forEach((id) => {
                            if (enchere?._id === id)
                                dispatch(update_enchere_actions({ id, hostID: host?._id, trash: true, enchere_status: "pending" }));
                        });
                    });
                    break;

                case "restaurer":
                    data?.forEach((enchere) => {
                        rows.forEach((id) => {
                            if (enchere?._id === id)
                                dispatch(update_enchere_actions({ id, hostID: host?._id, trash: false, }));
                        });
                    });
                    break;

                case "supprimer":
                    data?.forEach((enchere) => {
                        rows.forEach((id) => {
                            if ((enchere?._id === id && enchere?.trash) || (enchere?._id === id && ExpirationVerify(enchere?.expiration_time))) dispatch(delete_enchere({ id, hostID: host?._id }));
                        });
                    });
                    break;

                case "vider": data?.forEach((enchere) => { if (enchere?.trash || ExpirationVerify(enchere?.expiration_time)) dispatch(delete_enchere({ id: enchere?._id, hostID: host?._id })); }); break;

                default: console.log("Choisissez une option"); break;
            }
        }

        if (dropDown === "vider")
            data?.forEach((enchere) => { if (enchere?.trash) dispatch(delete_enchere({ id: enchere?._id, hostID: host?._id })); });
        setRows([]);
    };

    const handleFilter = (e) => {
        const filteredData = data?.filter(enchere => {
            const searchString = e.target.value.trim().toLowerCase()
            const titleMatches = enchere?.title?.trim().toLowerCase().includes(searchString)
            const descriptionMatches = enchere?.description?.trim().toLowerCase().includes(searchString)
            const reserve_priceMatches = enchere?.reserve_price?.toString().trim().toLowerCase().includes(searchString)
            const locationMatches = enchere?.town?.trim().toLowerCase().includes(searchString)
            const categoriesMatches = enchere?.categories?.some(category => category.trim().toLowerCase().includes(searchString))
            const phoneMatches = enchere?.sellerID?.phone?.toString().trim().toLowerCase().includes(searchString)

            return phoneMatches || titleMatches || descriptionMatches || reserve_priceMatches || locationMatches || categoriesMatches
        })

        setSearch(e.target.value);
        setFiltered(filteredData);
    };


    return (
        <div>
            <Card>
                <PageTitle title={"Liste des articles publics"} linked={true} link={"/articles/nouvel-article"} />
                <PageTabs tabsItems={tabsItems} activeTab={activeTab} setActiveTab={setActiveTab} />
                <PageTableHeader dropdownItems={dropdownItems} activeTab={activeTab} dropDown={dropDown} setDropDown={setDropDown} handleApply={handleApply} handleFilter={handleFilter} search={search} />
                <Table column={column} datas={filtered} setRows={setRows} />
            </Card>
        </div>
    )
}

export default ArticlesPrivee






const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        // Le compte à rebours est terminé
        return <span>Expiré!</span>;
    } else {
        // Afficher les labels pour chaque élément
        return (
            <div style={{ display: 'flex', alignItems: 'center', fontSize: "12px", gap: "2px" }}>
                <div style={{ background: "black", color: "white", borderRadius: "5px", width: "30px", height: "30px", justifyContent: "center" }}>
                    <div style={{ textAlign: "center" }}>{days}</div>
                    <div style={{ fontSize: "5px", textAlign: "center" }}>Jours</div>
                </div>
                <div style={{ background: "black", color: "white", borderRadius: "5px", width: "30px", height: "30px", justifyContent: "center" }}>
                    <div style={{ textAlign: "center" }}>{hours}</div>
                    <div style={{ fontSize: "5px", textAlign: "center" }}>Heures</div>
                </div>
                <div style={{ background: "black", color: "white", borderRadius: "5px", width: "30px", height: "30px", justifyContent: "center" }}>
                    <div style={{ textAlign: "center" }}>{minutes}</div>
                    <div style={{ fontSize: "5px", textAlign: "center" }}>Minutes</div>
                </div>
                <div style={{ background: "black", color: "white", borderRadius: "5px", width: "30px", height: "30px", justifyContent: "center" }}>
                    <div style={{ textAlign: "center" }}>{seconds}</div>
                    <div style={{ fontSize: "5px", textAlign: "center" }}>Secondes</div>
                </div>
            </div>
        );
    }
};






