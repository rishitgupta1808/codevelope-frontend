import { useRouter } from "next/router";
import React from "react";

import UserVisit from "../../components/userPanel/userVisit";


const UserVisitPage = () => {

    const router = useRouter()

    const {userId} = router.query

    return(
        <div style={{margin: `0 auto`,width: `100%`, paddingTop: `0em`}}>
          <UserVisit userId={userId}/>
        </div>
    )
}

export default UserVisitPage