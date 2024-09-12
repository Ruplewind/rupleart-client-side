import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Link } from 'react-router-dom';

const CancelTransaction = () => {
    return ( <div> 
    <div className='mt-40 flex justify-center'>
        <div className='block'>
            <div className='flex justify-center mb-10' style={{fontSize:'150px'}}>
                <CancelOutlinedIcon fontSize="inherit" color="error"/>
            </div>
            <div className="flex justify-center text-center mb-10 px-10 ml-5 text-2xl">
                You Have Cancelled Payment
            </div>
            <div className="flex justify-center px-10 ml-5">
                <Link to={'/checkout'}><div className="collapse lg:visible w-48 flex justify-center p-1 border-2 border-black" >
                        GO BACK
                </div></Link>
            </div>
            
            
        </div>
    </div>
    
    <Link to={'/checkout'}><div className="visible lg:collapse fixed bottom-0 bg-blue-950 text-white text-center w-full lg:w-0 p-4 text-bold tracking-wider font-serif" >
        GO BACK
    </div></Link>

    </div>
    );
}
 
export default CancelTransaction;