import React from "react"

interface HeaderProps {
    title: string,
    description: string
}


const Header: React.FC<HeaderProps> = ({ title, description }) => {
    return (
        <div>
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            <p className="tetx-sm text-muted-foreground">{description}</p>
        </div>
    )
}

export default Header