import { useState,Dispatch,SetStateAction } from 'react';
import { useQuery } from '@apollo/client';
import { LAUNCHES_PAST_QUERY,LAUNCHES_UPCOMING_QUERY } from './tools/queries';
import LaunchTable from './components/LaunchTable';
import AppHeader from './components/AppHeader';

interface AppProps {
  seePastLaunches: boolean,
  setseePastLaunches: Dispatch<SetStateAction<boolean>>,
}

const DisplayAppContent: React.FC<AppProps> = ({ seePastLaunches,setseePastLaunches } ): JSX.Element =>{

  const { loading, error, data } = useQuery(seePastLaunches?LAUNCHES_PAST_QUERY:LAUNCHES_UPCOMING_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="App" style={{ display: 'flex',justifyContent: 'center',alignItems: 'center',margin:"auto"}}>
      <div style={{ display: 'flex',flexDirection: 'column',justifyContent: 'center'}}>
        <AppHeader seePastLaunches={seePastLaunches} setseePastLaunches={setseePastLaunches} />
        <LaunchTable launches={seePastLaunches?data.launchesPast:data.launchesUpcoming} seePastLaunches={seePastLaunches} />
      </div>
    </div>
  )
}

function App(): JSX.Element {

  // seePastLaunches state indicates if the table content is past launches or upcoming launches
  const [seePastLaunches, setseePastLaunches] = useState<boolean>(true);

  return <DisplayAppContent seePastLaunches={seePastLaunches} setseePastLaunches={setseePastLaunches} />
}

export default App;

