import React, { createContext, useContext } from 'react';

export const ModalContext = createContext();

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};

export const ModalProvider = ({ children, value }) => {
    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
};
