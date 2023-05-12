import React from 'react'

const PageTabs = ({ tabsItems, activeTab, setActiveTab, row }) => {

    //const nav = ["tous", "actifs", "inactifs", "corbeille"]

    return (
        <div className='page-tabs'>
            {tabsItems?.map((n, index) => (
                <div className='page-tabs-items' key={index}>
                    <span onClick={() => setActiveTab(n?.label)} className='label'
                        style={{
                            color: activeTab === n.label ? "#fc6180" : "inherit",
                            cursor: 'pointer',
                        }}>{`${n.label}(${n.size}) `}</span>
                    {index < tabsItems.length - 1 && <span className='bar'>| </span>}
                </div>
            ))}
        </div>
    )
}

export default PageTabs
