import { Dispatch,SetStateAction } from 'react';
import { Button } from 'antd';

interface Props {
    seePastLaunches: boolean;
    setseePastLaunches: Dispatch<SetStateAction<boolean>>
  }
  
  const AppHeader: React.FC<Props> = ({ seePastLaunches,setseePastLaunches } ): JSX.Element =>{
    return(
        <div style={{ display: 'flex',flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center', }}>
        <p style={{ color:"black", fontSize:25 ,}}>{seePastLaunches?"Past SpaceX Launches":"Upcoming SpaceX Launches"}</p>
        <Button type="primary" onClick={()=>setseePastLaunches(!seePastLaunches)}>{seePastLaunches?"See Upcoming Launches":"See Past Launches"}</Button>
        </div>  
    )
  }

  export default AppHeader;