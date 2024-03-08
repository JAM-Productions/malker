import { ProgressBar } from "react-loader-spinner";
import PropTypes from "prop-types";

const Loader = ({ height, width, barColor, borderColor }) => {
    Loader.propTypes = {
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        barColor: PropTypes.string.isRequired,
        borderColor: PropTypes.string.isRequired,
    };

    return (
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <ProgressBar
                visible={true}
                height={height}
                width={width}
                barColor={barColor}
                borderColor={borderColor}
                ariaLabel='progress-bar-loading'
            />
        </div>
    );
};

export default Loader;
