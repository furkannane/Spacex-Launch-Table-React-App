import { Dispatch,SetStateAction } from 'react';
import { Modal } from 'antd';
import { LaunchDetails } from '../tools/types';
import { Tabs,Timeline } from 'antd';

interface Props {
    openModal: boolean,
    setOpenModal: Dispatch<SetStateAction<boolean>>,
    launch: LaunchDetails,
  }
  
  const LaunchDetailsModal: React.FC<Props> = ({ openModal,setOpenModal,launch}): JSX.Element =>{

    const handleCancel = () => setOpenModal(false);

    return(
        <Modal open={openModal} title="Launch Details" onCancel={handleCancel} footer={null} style={{ }}>
          <Timeline style={{ marginTop:20 }}
            items={[
              {
                children: <div><b>Mission Name: </b> <text>{launch.mission_name}</text></div>,
              },
              {
                children: <div><b>Launch ID: </b> <text>{launch.id}</text></div>,
              },
              {
                children: <div><b>Launch Details: </b> <text>{launch.details?launch.details:"No detail provided"}</text></div>,
              },
              {
                children: <div><b>Rocket Type: </b> <text>{launch.rocket.rocket_name}</text></div>,
              },
              {
                children: <div><b>Launch Date: </b> <text>{new Date(launch.launch_date_utc).toLocaleString()}</text></div>,
              },
            ]}
          />

          <Tabs
            tabPosition="left"
            items={[
              {label: "Article Link",key: "article",children: launch.links.article_link?
                <div>
                  <p>Articles are one of the very informative ways about learning the details of the spaceX launches! Here is the article written about this launch: </p>
                  <a href={launch.links.article_link}>Article Link</a>
                </div>:<p>No article link is provided about this launch</p>},

              {label: "Video Link",key: "video",children: launch.links.video_link?
              <div>
                <p>Videos are one of the really exiciting ways to explore the details of the spaceX launches! Here is the video link of the launch: </p>
                <a href={launch.links.video_link}>Video Link</a>
              </div>:<p>No video link is provided about this launch</p>},

              {label: "Wikipedia Link",key: "wiki",children: launch.links.wikipedia?
              <div>
                <p>Wikipedia is known for being a common knowledge pool. Here is the wikipedia page about this launch: </p>
                <a href={launch.links.wikipedia}>Wikipedia Link</a>
              </div>:<p>No wikipedia link is provided about this launch</p>},
            ]}
          />  
        </Modal>
    )
  }

  export default LaunchDetailsModal;