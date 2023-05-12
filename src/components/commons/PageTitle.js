import React from 'react'
import { Link } from 'react-router-dom'

const PageTitle = ({ title, hideTitle, linked, link, handleSave, hideExporte, buttonText, hideBtns }) => {
    return (
        <div className='page-title'>
            <span className='title'>{!hideTitle && (title || "Liste")}</span>

            {!hideBtns && <div className='page-title-buttons'>
                {!linked && <button className='main-btn' onClick={handleSave}>{buttonText || "Ajouter"}</button>}
                {(linked && link !== "") && <Link to={link} className='main-btn link' onClick={handleSave}>{buttonText || "Ajouter"}</Link>}
                {!hideExporte && <button className='last-btn'>Exporter</button>}
            </div>}
        </div>
    )
}

export default PageTitle
