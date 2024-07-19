// Sidebar.tsx

import React, { useState } from 'react';
import './Sidebar.css'; // Stil dosyası, isteğe bağlı olarak kullanabilirsiniz


const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button className="menu-toggle" onClick={toggleMenu}>
                Menu
            </button>
            <div className="menu-items">
                <a href="/Phonebook">Phonebook</a>
            </div>
        </div>
    );
};

export default Sidebar;
