import React, { useEffect, useState } from 'react'
import { Card, PageTableHeader } from '../../components'
import { PageTabs, PageTitle, Table } from '../../components/commons'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateUser } from '../../libs';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Utilisateurs = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [activeTab, setActiveTab] = useState("tous");
    const [dropDown, setDropDown] = useState()
    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState("")
    const [data, setData] = useState([])
    const [rows, setRows] = useState([])
    const [clear, setClear] = useState(false)
    const { users, host } = useSelector(state => state?.user);


    const column = [
        {
            name: "No.",
            selector: (row, i) => i,
        },
        {
            name: "Téléphone",
            selector: (row) => row?.phone || "...",
            sortable: true,
        },
        {
            name: "E-mail",
            selector: (row) => row?.email || "...",
            sortable: true,
        },
        {
            name: "Ville",
            selector: (row) => row?.town || "...",
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row?.rejected ? "Exclus" : "Non exclus",
            sortable: true,
        },
    ]

    const tabsItems = [{ label: "tous", size: users?.filter(user => !user?.trash && user?.admin).length || 0 }]

    let dropdownItems = !rows?.includes(host?._id) ?
        [{ name: "Afficher", value: "afficher", tab: "tous" },] :
        [{ name: "Modifier", value: "modifier", tab: "tous" }, { name: "Afficher", value: "afficher", tab: "tous" },]

    //filter
    useEffect(() => {
        if (data) setFiltered(data);
    }, [data])

    //distinguer son compte des autres compte avec un bgcolor
    const conditionalRowStyles = [
        {
            when: row => row?._id === host?._id,
            style: {
                backgroundColor: 'black',
                color: 'wheat',
            },
        }
    ];

    useEffect(() => {
        switch (activeTab) {
            case "tous": setData(users?.filter(user => !user?.trash && user?.admin)); setClear(true); break;
            case "corbeille": setData(users?.filter(user => user?.trash && user?.admin)); setClear(true); break;
            default: setData(users?.filter(user => !user?.trash && user?.admin)); setClear(true); break;
        }
        setClear(c => !c)
    }, [users, activeTab]);

    const handleApply = (e) => {
        e.preventDefault();

        if (rows?.length > 0) {
            switch (dropDown) {
                case "modifier":
                    if (rows?.length === 1) {
                        console.log(rows[0] + " = " + host?._id)
                        if (rows[0] === host?._id)
                            navigate(`/administrateurs/edition-administrateur/${rows[0]}`);
                        else {
                            const swalWithBootstrapButtons = Swal.mixin({ customClass: { confirmButton: 'btn btn-success', cancelButton: 'btn btn-danger' }, buttonsStyling: false })
                            swalWithBootstrapButtons.fire({
                                title: 'Impossible',
                                text: "Impossible de modifier les informations d'autre administrateur.",
                                icon: 'error',
                                confirmButtonText: "D'accord",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    navigate("/administrateurs")
                                }
                            })
                        }
                    } break;

                case "afficher": if (rows?.length === 1) navigate(`/administrateurs/profile-administrateur/${rows[0]}`); break;

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
        setClear(!clear);
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
                <PageTitle hideExporte={true} title={"Liste des administrateurs"} linked={true} link={"/administrateurs/nouvel-administrateur"} />
                <PageTabs tabsItems={tabsItems} activeTab={activeTab} setActiveTab={setActiveTab} />
                <PageTableHeader dropdownItems={dropdownItems} activeTab={activeTab} dropDown={dropDown} setDropDown={setDropDown} handleApply={handleApply} handleFilter={handleFilter} search={search} />
                <Table conditionalRowStyles={conditionalRowStyles} clear={clear} column={column} datas={filtered} setRows={setRows} />
            </Card>
        </div>
    )
}

export default Utilisateurs
