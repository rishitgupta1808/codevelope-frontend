import { Tabs,Button } from 'antd';
import axios from 'axios';
import  Router, { useRouter }  from 'next/router';
import { useState } from 'react';
import { baseUrl } from '../../../baseUrl';
import { postUserProfileData } from '../../../endpoints';
import { createPlan } from '../../../utils/contractsFunctions';
import Basics from '../Basics';
import PageSettings from '../PageSettings';
import TierPage from '../Tiers';

const { TabPane } = Tabs;

const ProfileTopPanel = () => {

  const [profileData,setProfileData] = useState()

  const router = useRouter()

  const handleClick = async() =>{

    let formdata = new FormData();

    console.log(profileData)
        

        let wallet_id = localStorage.getItem('wallet_id');



        // postData.attachments.map(file=>{
        //     console.log(file)
        //    attachments.push(file.originFileObj)
        // })
        profileData.tiers.map(async (tier)=>{

          await createPlan(tier.price,1)

        })
        
        //delete postData.attachments
        let payload = {
          wallet_id,
           ...profileData
        }
        
        formdata.append("post",JSON.stringify(payload));
        formdata.append("files",profileData.imageUrl)
        formdata.append("files",profileData.coverImageUrl)
        
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

    try{


    let res = await axios.post(baseUrl+postUserProfileData,formdata,config)

    consoel.log(res)
    if(res.data.success)
    router.push('/user')

    }catch(err){
      console.log("Component : ProfileTopPanel :"+err)

    }
   }

    return(
     <>
     <div style={{display:`flex`}}>
       <div>
     <Tabs defaultActiveKey="1" size="large"  >
       <TabPane tab="Basic" key="1">
         <Basics profileData={profileData} setProfileData={setProfileData}/>
       </TabPane>
       <TabPane tab="Tiers" key="2">
         <TierPage profileData={profileData} setProfileData={setProfileData}/>
       </TabPane>
       <TabPane tab="Page Settings" key="3">
         <PageSettings profileData={profileData} setProfileData={setProfileData}/>
       </TabPane>
     </Tabs>
     </div>
     <div>
     <Button type="primary" shape="round" size="large" onClick={handleClick}>Save Changes</Button>
     </div>
     </div>
     
     </>
    )
};

export default ProfileTopPanel