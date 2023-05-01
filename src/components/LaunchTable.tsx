import { Dispatch,SetStateAction } from 'react';
import { Table, Button, TableColumnType } from 'antd';
import { Launch,Rocket } from '../tools/types';
import React, { useState,useEffect } from 'react';
import { LAUNCH_DETAILS_QUERY } from '../tools/queries';
import { HeartTwoTone} from "@ant-design/icons"
import { useQuery } from '@apollo/client';
import LaunchDetailsModal from './LaunchDetailsModal';

interface LaunchTableProps {
  launches: Launch[],
  seePastLaunches: boolean,
}

interface DisplayModalProps {
  openModal: boolean,
  setOpenModal: Dispatch<SetStateAction<boolean>>,
  launchId: string,
}

interface RocketFilter {
  text: string,
  value: string,
}

const DisplayModal: React.FC<DisplayModalProps> = ({ openModal,setOpenModal,launchId }): JSX.Element =>{

  const { loading, error, data } = useQuery(LAUNCH_DETAILS_QUERY,{variables: {launchId}});
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return <LaunchDetailsModal openModal={openModal} setOpenModal={setOpenModal} launch={data.launch} />
}

const LaunchTable: React.FC<LaunchTableProps> = ({ launches, seePastLaunches }): JSX.Element  => {

  // openModal state indicates if modal is visible or not, while launchId states indicates which launch's details are displayed
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [launchId, setLaunchId] = useState<string>(launches[0].id);

  // LaunchTable filter options for rocket type
  const rocketFilter: RocketFilter[] = [...new Set(launches.map(launch => launch.rocket.rocket_name))] // get unique rocket types
  .map(rocket => ({ text: rocket, value: rocket })) // create filter with unique rocket types

  // favlist state keeps track of the IDs of the favourited launches. We also update the local storage everytime there is a change in favList
  const [favList, setFavList] = useState<string[]>(JSON.parse(localStorage.getItem('favList') || '[]'));
  useEffect(() => localStorage.setItem('favList', JSON.stringify(favList)), [favList])

  // sortedLaunches state creates a list where favourite launches are "prioritized", which makes favourite launches displayed first in the table.
  const [sortedLaunches, setSortedLaunches] = useState<Launch[]>([]);
  useEffect(() => {setSortedLaunches([...launches].sort((a, b) =>favList.includes(a.id) && !favList.includes(b.id) ? -1 :!favList.includes(a.id) && favList.includes(b.id) ? 1 :0))
  },[launches,favList])

  // handles showing launch details modal by setting the right launch ID and making the modal visible
  const showModal = (id: string) => {
    setLaunchId(id)
    setOpenModal(true);
  };

  // handles heart click by faving or unfaving a launch 
  const handleHeartClick = (launchId: string, addToFav: boolean) => { 
    if(addToFav)
      // add launchId to favourite list
      setFavList([...favList,launchId])
    else
      // remove launchId from favourite list
      setFavList(favList.filter(el => (el !== launchId)) )
  }

  const columns = [
    {
      title: 'Mission Name',
      dataIndex: 'mission_name',
      key: 'mission_name',
      render: (mission_name: string) => mission_name
    },
    {
      title: 'Rocket Name',
      dataIndex: 'rocket',
      key: 'rocket_name',
      render: (rocket: Rocket) => rocket.rocket_name,
      filters: rocketFilter,
      onFilter: (filter: string | number | boolean, record:Launch) => record.rocket.rocket_name === filter
    },
    {
      title: 'Rocket Type',
      dataIndex: 'rocket',
      key: 'rocket_type',
      render: (rocket: Rocket) => rocket.rocket_type,  
    },
    {
      title: 'Launch Date',
      dataIndex: 'launch_date_utc',
      key: 'launch_date_utc',
      render: (date: string) => new Date(date).toLocaleString(),
      sorter: (a:Launch,b:Launch) => new Date(a.launch_date_utc).getTime()-new Date(b.launch_date_utc).getTime()
    },
    // if we are viewing upcoming launches, we don't want launch success column to be in the table. 
    seePastLaunches?{
      title: 'Launch Success',
      dataIndex: 'launch_success',
      key: 'launch_success',
      filters: [{text:"Yes",value:true},{text:"No",value:false}],
      render: (success: boolean) => (success ? 'Yes' : 'No'),
      onFilter: (filter: string | number | boolean, record:Launch) => (record.launch_success?true:false) === filter
    }:null,
    {
      title: "Actions",
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => {
        return (
          <div style={{  }}>
            {(favList.includes(id))?<HeartTwoTone twoToneColor="red" onClick={()=>handleHeartClick(id,false)} />:
            <HeartTwoTone twoToneColor="#C5C4C1" onClick={()=>handleHeartClick(id,true)} />}
            <Button type="link" onClick={()=>showModal(id)} style={{ marginRight:10 }} >See Details</Button>
          </div>
        
        )}
    },
    // we are filtering the possible null item from launch success column
  ].filter(Boolean) as TableColumnType<Launch>[]

  return (
    <div>
        <Table dataSource={sortedLaunches} columns={columns} bordered={true}  />
        <DisplayModal openModal={openModal} setOpenModal={setOpenModal} launchId={launchId} />
    </div>
  
  )
}

export default LaunchTable;