import {motion} from "framer-motion";

export function Projects() {
    return (
        <motion.div
            exit={{opacity: 0}}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{
                duration: 1.5
            }}
        >
            <p></p>
        </motion.div>
    );
}