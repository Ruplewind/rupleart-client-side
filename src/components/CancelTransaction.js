import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Link } from 'react-router-dom';

const CancelTransaction = () => {
    return ( <div> 
    <div className='mt-20 flex justify-center mb-10'>
        <div className='block'>
            <div className='flex justify-center mb-5' style={{fontSize:'100px'}}>
                <CancelOutlinedIcon fontSize="inherit" color="error"/>
            </div>
            <div className="flex justify-center text-center mb-5 px-10 ml-5 text-xl">
                You Have Cancelled Payment
            </div>
            <div className="flex justify-center px-10 ">
                <Link to={'/checkout'}><div className="flex justify-center p-2 bg-purple-900 hover:bg-purple-700 text-white rounded-lg text-sm" >
                        GO BACK
                </div></Link>
            </div>
            
            
        </div>
    </div>

    </div>
    );
}
 
export default CancelTransaction;