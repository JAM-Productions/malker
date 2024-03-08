import { ProgressBar } from "react-loader-spinner";

const Loader = () => {
    return (
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <ProgressBar
                visible={true}
                height={"47"}
                width={"47"}
                barColor={"#0789c2"}
                borderColor={"#3dc2f3"}
                ariaLabel="progress-bar-loading"
            />
        </div>
    );
};

export default Loader;
