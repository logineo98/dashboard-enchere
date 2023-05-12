import React from 'react'

const Card = ({ children, style, rest }) => {
    const _card = {
        // borderRadius: "5px",
        boxShadow: "0 1px 11px 0 rgba(0, 0, 0, 0.12)",
        border: "none",
        padding: "10px",
        marginBottom: "30px",
        background: "#ffffff",
    }


    return (
        <div style={_card} {...rest}> {children}  </div>
    )
}

export default Card
