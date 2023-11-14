'use client'
import style from './loading.module.scss'; // Make sure to create a CSS file for styling


const Loading = () => {

    return (
        <div className={style.loadingContainer}>
            <div className={style.loadingSpinner}>
            </div>
        </div>
    );
};

export default Loading