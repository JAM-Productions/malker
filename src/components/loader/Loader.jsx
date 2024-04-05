import { ProgressBar } from "react-loader-spinner";

const Loader = ({ height = "47", width = "47", barColor = "#3C82F6", borderColor = "#3C82F6" }) => {
    return (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <ProgressBar
                visible={true}
                height={height}
                width={width}
                barColor={barColor}
                borderColor={borderColor}
                ariaLabel="progress-bar-loading"
            />
        </div>
    );
};

export default Loader;
