import React, { useEffect, useState } from 'react'
import { Card, PageTableHeader } from '../../../components'
import { PageTabs, PageTitle, Table } from '../../../components/commons'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateUser } from '../../../libs';
import { useNavigate } from 'react-router-dom';

const ClientsPrives = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [activeTab, setActiveTab] = useState("tous");
    const [dropDown, setDropDown] = useState()
    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState("")
    const [data, setData] = useState([])
    const [rows, setRows] = useState([])

    const { users, host } = useSelector(state => state?.user);
    const { encheres } = useSelector(state => state?.enchere)

    const column = [
        { name: "No.", selector: (row, i) => i, },
        { name: "Téléphone", selector: (row) => row?.phone || "...", sortable: true, },
        { name: "Articles privés", selector: (row) => encheres?.filter(enchere => (enchere?.sellerID === row?._id && enchere?.enchere_type === "private"))?.length, sortable: true, },
        { name: "Articles publique", selector: (row) => encheres?.filter(enchere => (enchere?.sellerID === row?._id && enchere?.enchere_type === "public"))?.length, sortable: true, },
        { name: "E-mail", selector: (row) => row?.email || "...", sortable: true, },
        { name: "Ville", selector: (row) => row?.town || "...", sortable: true, },
        { name: "Membre", selector: (row) => row?.vip ? "VIP" : "Particulier", sortable: true, },
        { name: "Status", selector: (row) => (!row?.vip && row?.rejected) ? "Exclus" : "Non exclus", sortable: true, }
    ]

    const tabsItems = [{ label: "tous", size: users?.filter(user => !user?.trash && !user?.admin && user?.vip).length || 0 }, { label: "non exclus", size: users?.filter(user => !user?.trash && !user?.rejected && !user?.admin && user?.vip).length || 0 }, { label: "exclus", size: users?.filter(user => !user?.trash && user?.rejected && !user?.admin && user?.vip).length || 0 }, { label: "corbeille", size: users?.filter(user => user?.trash && !user?.admin && user?.vip).length || 0 }]

    const dropdownItems = [
        { name: "Modifier", value: "modifier", tab: "tous" }, { name: "Afficher", value: "afficher", tab: "tous" }, { name: "Mettre à la corbeille", value: "in-trash", tab: "tous" },
        { name: "Modifier", value: "modifier", tab: "non exclus" }, { name: "Exclure", value: "exclure", tab: "non exclus" }, { name: "Afficher", value: "afficher", tab: "non exclus" }, { name: "Mettre à la corbeille", value: "in-trash", tab: "non exclus" },
        { name: "Modifier", value: "modifier", tab: "exclus" }, { name: "Désexclure", value: "desexclure", tab: "exclus" }, { name: "Afficher", value: "afficher", tab: "exclus" }, { name: "Mettre à la corbeille", value: "in-trash", tab: "exclus" },
        { name: "Restaurer", value: "restaurer", tab: "corbeille" }, { name: "Supprimer", value: "supprimer", tab: "corbeille" }, { name: "Vider la corbeille", value: "vider", tab: "corbeille" },
    ]

    useEffect(() => {
        if (data) setFiltered(data);
    }, [data])




    useEffect(() => {
        switch (activeTab) {
            case "tous": setData(users?.filter(user => !user?.trash && !user?.admin && user?.vip)); break;
            case "exclus": setData(users?.filter(user => !user?.trash && user?.rejected && !user?.admin && user?.vip)); break;
            case "non exclus": setData(users?.filter(user => !user?.trash && !user?.rejected && !user?.admin && user?.vip)); break;
            case "corbeille": setData(users?.filter(user => user?.trash && !user?.admin && user?.vip)); break;
            default: setData(users?.filter(user => !user?.trash && !user?.admin && user?.vip)); break;
        }
    }, [users, activeTab]);

    const handleApply = (e) => {
        e.preventDefault();

        if (rows?.length > 0) {
            switch (dropDown) {
                case "modifier": if (rows?.length === 1) navigate(`/clients/edition-client/${rows[0]}`); break;

                case "afficher": if (rows?.length === 1) navigate(`/clients/details-client/${rows[0]}`); break;

                case "exclure":
                    if (rows?.includes(host?._id)) { alert("\tErreur de d'exlusion\nVous ne pouvez pas exclure votre profile!"); return; }

                    data?.forEach((user) => {
                        rows?.forEach((id) => {
                            if (user?._id === id)
                                dispatch(updateUser({ id, hostID: host?._id, rejected: true, }));
                        });
                    });
                    break;

                case "desexclure":
                    data?.forEach((user) => {
                        rows?.forEach((id) => {
                            if (user?._id === id)
                                dispatch(updateUser({ id, hostID: host?._id, rejected: false, }));
                        });
                    });
                    break;

                case "in-trash":
                    if (rows?.includes(host?._id)) { alert("\tErreur de suppression\nVous ne pouvez pas supprimer votre profile!"); return; }

                    data?.forEach((user) => {
                        rows?.forEach((id) => {
                            if (user?._id === id)
                                dispatch(updateUser({ id, hostID: host?._id, trash: true, }));
                        });
                    });
                    break;

                case "restaurer":
                    data?.forEach((user) => {
                        rows.forEach((id) => {
                            if (user?._id === id)
                                dispatch(updateUser({ id, hostID: host?._id, trash: false, }));
                        });
                    });
                    break;

                case "supprimer":
                    data?.forEach((user) => {
                        rows.forEach((id) => {
                            if (user?._id === id && user?.trash) dispatch(deleteUser({ id, hostID: host?._id }));
                        });
                    });
                    break;

                case "vider": data?.forEach((user) => { if (user?.trash) dispatch(deleteUser({ id: user?._id, hostID: host?._id })); }); break;

                default: console.log("Choisissez une option"); break;
            }
        }

        if (dropDown === "vider")
            data?.forEach((user) => { if (user?.trash) dispatch(deleteUser({ id: user?._id, hostID: host?._id })); });
        setRows([]);
    };

    const handleFilter = (e) => {
        const filteredData = data?.filter(user => {

            const searchString = e.target.value.trim().toLowerCase()
            const emailMatches = user?.email?.trim().toLowerCase().includes(searchString)
            const townMatches = user?.town?.trim().toLowerCase().includes(searchString)
            const phoneMatches = user?.phone?.toString().trim().toLowerCase().includes(searchString)
            const nameMatches = user?.name?.trim().toLowerCase().includes(searchString)

            return emailMatches || townMatches || phoneMatches || nameMatches
        })

        setSearch(e.target.value);
        setFiltered(filteredData);
    };




    return (
        <div>
            <Card>
                <PageTitle title={"Liste des clients"} linked={true} link={"/clients/nouveau-client"} />
                <PageTabs tabsItems={tabsItems} activeTab={activeTab} setActiveTab={setActiveTab} />
                <PageTableHeader dropdownItems={dropdownItems} activeTab={activeTab} dropDown={dropDown} setDropDown={setDropDown} handleApply={handleApply} handleFilter={handleFilter} search={search} />
                <Table column={column} datas={filtered} setRows={setRows} />
            </Card>
        </div>
    )
}

export default ClientsPrives
















