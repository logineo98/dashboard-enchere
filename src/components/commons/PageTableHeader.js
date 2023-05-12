import React from 'react'

const PageTableHeader = ({ dropdownItems, activeTab, search, dropDown, setDropDown, handleFilter, handleApply }) => {

    return (
        <div className='table-header'>
            <div className='table-header-left'>
                <div className='table-header-left-actions' >
                    <select value={dropDown} onChange={(e) => setDropDown(e.target.value)}>
                        <option value={""}>Choisir une option</option>
                        {dropdownItems.map((item, i) => activeTab === item?.tab && <option value={item.value} key={i}>{item.name}</option>)}
                    </select>

                    <button onClick={handleApply}><i className='ti ti-check' /> Appliquer</button>
                </div>
            </div>
            <div className='table-header-right'><i className='ti ti-search' /><input type={"search"} placeholder='Rechercher...' value={search} onChange={handleFilter} /></div>
        </div>


    )
}

export default PageTableHeader
