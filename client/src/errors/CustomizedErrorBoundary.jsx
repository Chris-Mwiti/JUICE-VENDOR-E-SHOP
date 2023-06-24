import {ErrorBoundary} from 'react-error-boundary'
import ErrorPage from '../pages/errPage';

const CustomizedErrorBoundary = ({children}) => {
    return ( 
        <ErrorBoundary 
        FallbackComponent={ErrorPage} 
        onError={(error,errorInfo) => {
            console.log(error);
            console.log(errorInfo);

        }}
        onReset={() => {
            window.location.reload()
        }}>
            {children}
        </ErrorBoundary>
     );
}
 
export default CustomizedErrorBoundary;