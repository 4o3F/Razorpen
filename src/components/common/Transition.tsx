import {motion} from "framer-motion";

const animationConfiguration = {
    initial: {opacity: 0},
    animate: {opacity: 1},
    exit: {opacity: 0},
};
const Transitions = ({children}: any) => {
    return (
        <motion.div
            variants={animationConfiguration}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{duration: 0.5}}
        >
            {children}
        </motion.div>
    );
};

export default Transitions