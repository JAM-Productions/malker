import Loader from "./Loader";

const LoadingView = ({ loading, children }) => {
    return <div>{loading ? <Loader /> : children}</div>;
};

export default LoadingView;
