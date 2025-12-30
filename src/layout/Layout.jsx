import React from 'react';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
    return (
        <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{ paddingTop: '80px', minHeight: '80vh' }}
        >
            {children}
        </motion.main>
    );
};

export default Layout;
